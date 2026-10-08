/*
Family Wealth AI OS V7
Advisor Models
AI 顾问多理论模型层：用六种经典理财理论，基于系统现有数据
（账户/投资/资产/负债/退休参数）生成可解释的模型建议。
不使用任何外部数据；缺失数据时明确给出补充提示。
*/

function num(value) {
    return Number(value || 0);
}

function money(value) {
    return "$" + num(value).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function pct(value) {
    return num(value).toFixed(1) + "%";
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

/*
 * input:
 *   accountsTotal, investmentsTotal, assetsTotal（其他资产）,
 *   largestHoldingWeight（最大单一持仓权重 %，无持仓为 0）,
 *   age（退休档案当前年龄，0 表示未填）,
 *   annualExpense（退休年支出估计）,
 *   liquidityMonths, debts: [{ name, balance, rate }]
 * 返回：[{ id, status: good|warn|alert|info, adviceCode, params }]
 */
export function computeAdvisorModels(input = {}) {
    const accountsTotal = num(input.accountsTotal);
    const investmentsTotal = num(input.investmentsTotal);
    const assetsTotal = num(input.assetsTotal);
    const totalAssets = accountsTotal + investmentsTotal + assetsTotal;
    const annualExpense = num(input.annualExpense);
    const models = [];

    // 1) 现代投资组合理论（Markowitz）：分散与集中度
    const classes = [accountsTotal, investmentsTotal, assetsTotal].filter(v => v > 0).length;
    const topWeight = num(input.largestHoldingWeight);
    let mptStatus = "good";
    let mptAdvice = "mptOk";
    if (topWeight >= 40) {
        mptStatus = "alert";
        mptAdvice = "mptConcentrated";
    } else if (classes < 2) {
        mptStatus = "warn";
        mptAdvice = "mptFewClasses";
    }
    models.push({
        id: "mpt",
        status: mptStatus,
        adviceCode: mptAdvice,
        params: { topWeight: pct(topWeight), classes }
    });

    // 2) 生命周期理论：权益仓位随年龄滑动（110 − 年龄）
    const age = num(input.age);
    const equityShare = totalAssets > 0 ? (investmentsTotal / totalAssets) * 100 : 0;
    if (age <= 0) {
        models.push({
            id: "lifecycle",
            status: "info",
            adviceCode: "lifecycleNoAge",
            params: {}
        });
    } else {
        const target = clamp(110 - age, 20, 90);
        const gap = equityShare - target;
        let status = "good";
        let advice = "lifecycleOk";
        if (gap > 10) {
            status = "warn";
            advice = "lifecycleHigh";
        } else if (gap < -10) {
            status = "warn";
            advice = "lifecycleLow";
        }
        models.push({
            id: "lifecycle",
            status,
            adviceCode: advice,
            params: {
                age,
                target: pct(target),
                share: pct(equityShare)
            }
        });
    }

    // 3) 4% 安全提款法则（Bengen / Trinity）
    const investable = accountsTotal + investmentsTotal;
    const sustainable = investable * 0.04;
    const multiple = annualExpense > 0 ? investable / annualExpense : 0;
    if (annualExpense <= 0) {
        models.push({
            id: "rule4",
            status: "info",
            adviceCode: "rule4NoExpense",
            params: {}
        });
    } else {
        const ok = sustainable >= annualExpense;
        models.push({
            id: "rule4",
            status: ok ? "good" : "warn",
            adviceCode: ok ? "rule4Good" : "rule4Short",
            params: {
                sustainable: money(sustainable),
                expense: money(annualExpense),
                multiple: multiple.toFixed(1)
            }
        });
    }

    // 4) 三桶策略：短期现金桶 / 中期 / 长期增长桶
    const cashYears = annualExpense > 0 ? accountsTotal / annualExpense : 0;
    if (annualExpense <= 0) {
        models.push({
            id: "buckets",
            status: "info",
            adviceCode: "bucketsNoExpense",
            params: {}
        });
    } else {
        let status = "good";
        let advice = "bucketsGood";
        if (cashYears < 1) {
            status = "alert";
            advice = "bucketsLow";
        } else if (cashYears < 2) {
            status = "warn";
            advice = "bucketsThin";
        }
        models.push({
            id: "buckets",
            status,
            adviceCode: advice,
            params: {
                years: cashYears.toFixed(1),
                cash: money(accountsTotal),
                growth: money(investmentsTotal)
            }
        });
    }

    // 5) 债务雪崩法：先还利率最高的债（附雪球法对照）
    const debts = (input.debts || [])
        .filter(d => num(d.balance) > 0)
        .map(d => ({ name: d.name || "Debt", balance: num(d.balance), rate: num(d.rate) }));
    if (debts.length === 0) {
        models.push({
            id: "avalanche",
            status: "good",
            adviceCode: "avalancheNone",
            params: {}
        });
    } else {
        const byRate = [...debts].sort((a, b) => b.rate - a.rate || b.balance - a.balance);
        const top = byRate[0];
        const order = byRate.slice(0, 3).map(d => d.name).join(" → ");
        models.push({
            id: "avalanche",
            status: top.rate >= 15 ? "alert" : "info",
            adviceCode: "avalancheOrder",
            params: {
                order,
                topName: top.name,
                topRate: pct(top.rate)
            }
        });
    }

    // 6) 应急储备与行为金融：先保住底线，再谈收益
    const months = num(input.liquidityMonths);
    let emStatus = "good";
    let emAdvice = "emergencyGood";
    if (months < 3) {
        emStatus = "alert";
        emAdvice = "emergencyLow";
    } else if (months < 6) {
        emStatus = "warn";
        emAdvice = "emergencyThin";
    }
    models.push({
        id: "emergency",
        status: emStatus,
        adviceCode: emAdvice,
        params: { months: months.toFixed(1) }
    });

    return models;
}

export default { computeAdvisorModels };
