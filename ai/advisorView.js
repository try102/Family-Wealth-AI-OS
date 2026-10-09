/*

Family Wealth AI OS V7

AI Advisor View

AI 财富顾问：从系统基础数据层实时汇总（账户 / 收支 / 投资 /

资产 / 负债 / 税务 / 退休），经 WealthEngine 与 AdvisorReport

生成健康评估与建议。

*/

import AdvisorReport from "./advisorReport.js?v=20261008ae";

import WealthEngine from "../core/engines/wealth/wealthEngine.js?v=20261008ae";

import AccountAPI from "../modules/account/api/accountAPI.js?v=20261008aw";

import AssetAPI from "../modules/asset/api/assetAPI.js?v=20261008ae";

import InvestmentAPI from "../modules/investment/api/investmentAPI.js?v=20261008ah";

import LiabilityAPI from "../modules/liability/api/liabilityAPI.js?v=20261008ae";

import cashflowAPI from "../modules/cashflow/api/cashflowAPI.js?v=20261008ae";

import TaxDataIntegration from "../core/integration/taxDataIntegration.js?v=20261009bg";

import { computeAdvisorModels } from "./advisorModels.js?v=20261008ae";

import RetirementAPI from "../modules/retirement/api/retirementAPI.js?v=20261008ae";

import { t, getLanguage, setLanguage, languageOptions } from "../core/i18n/i18n.js?v=20261009bk";

const ADVISOR_TEXT_KEYS = {
    "GOOD": "advisor.health.good",
    "WARNING": "advisor.health.warning",
    "RISK": "advisor.health.risk",
    "LOW": "advisor.risk.low",
    "MEDIUM": "advisor.risk.medium",
    "HIGH": "advisor.risk.high",
    "Increase positive cash flow": "advisor.rec.cashflow",
    "Reduce debt exposure": "advisor.rec.debt",
    "Increase emergency liquidity": "advisor.rec.liquidity",
    "Improve overall wealth structure": "advisor.rec.structure",
    "Maintain current wealth strategy": "advisor.rec.maintain",
    "Wealth score requires attention": "advisor.alert.score",
    "Negative net cash flow": "advisor.alert.cashflow",
    "High debt ratio": "advisor.alert.debt",
    "Low liquidity coverage": "advisor.alert.liquidity",
    "Wealth Engine data unavailable": "advisor.alert.engine",
    "Tax data unavailable": "advisor.alert.tax"
};

function advisorText(text) {
    const key = ADVISOR_TEXT_KEYS[text];
    return key ? t(key) : text;
}

function money(value) {

    return "$" +

        Number(value || 0)

            .toLocaleString(

                undefined,

                {

                    maximumFractionDigits: 0

                }

            );

}

function safe(fn, fallback) {

    try {

        return fn();

    } catch (error) {

        return fallback;

    }

}

const AdvisorView = {

    /*

     * 从基础数据层组装顾问报告输入。

     */

    buildReportData() {

        const accounts =

            safe(

                () => AccountAPI.getAll() || [],

                []

            );

        const accountsTotal =

            accounts

                .filter(

                    account =>

                        account.openingSource !==

                        "asset"

                )

                .reduce(

                    (sum, account) =>

                        sum +

                        Number(account.balance || 0),

                    0

                );

        const assetRecords =

            safe(

                () => AssetAPI.getAll() || [],

                []

            );

        const investments =

            safe(

                () => InvestmentAPI.getInvestments() || [],

                []

            );

        const wealthAssets = [

            ...accounts.map(

                account => ({

                    id:

                        "account-" +

                        account.id,

                    name:

                        account.name ||

                        "Account",

                    category:

                        "Cash & Bank",

                    currentValue:

                        Number(

                            account.balance ||

                            0

                        )

                })

            ),

            ...assetRecords,

            ...investments.map(

                investment => ({

                    id:

                        "investment-" +

                        investment.id,

                    name:

                        investment.name ||

                        "Investment",

                    category:

                        "Investment",

                    currentValue:

                        Number(

                            investment.currentValue ||

                            0

                        )

                })

            )

        ];

        const liabilities =

            safe(

                () => LiabilityAPI.getLiabilities() || [],

                []

            );

        const summary =

            safe(

                () => cashflowAPI.getSummary(),

                { income: 0, expense: 0, net: 0 }

            );

        const cashFlowData = {

            income:

                Number(summary.income || 0),

            expense:

                Number(summary.expense || 0),

            net:

                Number(summary.net || 0),

            netCashFlow:

                Number(summary.net || 0)

        };

        const retirement =

            safe(

                () => RetirementAPI.getProjection(),

                null

            );

        const monthlyExpense =

            retirement &&

            retirement.recentAnnualExpense > 0

            ? retirement.recentAnnualExpense / 12

            : 0;

        const liquidityMonths =

            monthlyExpense > 0

            ? accountsTotal / monthlyExpense

            : 0;

        const wealthResult =

            WealthEngine.analyze(

                wealthAssets,

                liabilities,

                cashFlowData,

                liquidityMonths

            );

        const totalAssets =

            Number(wealthResult.totalAssets || 0);

        const totalLiabilities =

            Number(wealthResult.totalLiabilities || 0);

        const debtRatio =

            totalAssets > 0

            ? totalLiabilities /

                totalAssets *

                100

            : 0;

        const taxData =

            safe(

                () =>

                    TaxDataIntegration

                        .getTaxDataSummary(

                            new Date().getFullYear()

                        ),

                null

            );

        const portfolio =

            safe(

                () => InvestmentAPI.getPortfolioSummary(),

                null

            );

        const positions =

            safe(

                () => InvestmentAPI.getPositions(),

                []

            );

        const portfolioTotal =

            Number(portfolio?.totalValue || 0);

        const largestHoldingWeight =

            portfolioTotal > 0 &&

            positions.length

            ? Math.max(

                ...positions.map(

                    position =>

                        Number(position.marketValue || 0) /

                        portfolioTotal *

                        100

                )

            )

            : 0;

        const profile =

            safe(

                () => RetirementAPI.getProfile(),

                null

            );

        const models =

            computeAdvisorModels({

                accountsTotal,

                investmentsTotal:

                    portfolioTotal,

                assetsTotal:

                    Math.max(

                        0,

                        totalAssets -

                        accountsTotal -

                        portfolioTotal

                    ),

                largestHoldingWeight,

                age:

                    Number(profile?.currentAge || 0),

                annualExpense:

                    Number(

                        retirement?.annualExpenseUsed ||

                        retirement?.recentAnnualExpense ||

                        cashFlowData.expense ||

                        0

                    ),

                liquidityMonths,

                debts:

                    liabilities.map(

                        item => ({

                            name:

                                item.name ||

                                item.type ||

                                "Debt",

                            balance:

                                Number(

                                    item.currentBalance ??

                                    item.balance ??

                                    item.amount ??

                                    0

                                ),

                            rate:

                                Number(item.interestRate || 0)

                        })

                    )

            });

        return {

            wealthResult,

            cashFlowData,

            accountsTotal,

            debtRatio,

            liquidityMonths,

            retirement,

            taxData,

            portfolio,

            models

        };

    },

    render(

        container,

        onBack

    ) {

        const data =

            this.buildReportData();

        const report =

            AdvisorReport.generate({

                wealth: {

                    netWorth:

                        data.wealthResult.netWorth,

                    wealthScore:

                        data.wealthResult.wealthScore,

                    liquidityMonths:

                        data.liquidityMonths,

                    cashFlow: {

                        netCashFlow:

                            data.cashFlowData.netCashFlow

                    }

                },

                liabilities: {

                    debtRatio:

                        data.debtRatio,

                    totalLiability:

                        data.wealthResult

                            .totalLiabilities

                },

                cashflow:

                    data.cashFlowData,

                assets: {

                    totalValue:

                        data.wealthResult.totalAssets

                },

                income: {

                    total:

                        data.cashFlowData.income

                },

                investment:

                    data.portfolio || {},

                tax:

                    data.taxData || {}

            });

        const retirement =

            data.retirement;

        const taxData =

            data.taxData;

        container.innerHTML = `

            <div class="advisor-center">

                <h2>

                    ${t("advisor.title")}

                </h2>

                <button

                    id="advisor-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

                <br><br>

                <label>${t("common.language")}</label>

                <select id="advisor-language-select">${languageOptions(getLanguage())}</select>

                <hr>

                <section>

                    <h3>

                        ${t("advisor.health")}

                    </h3>

                    <p>

                        ${t("advisor.healthStatus")}：${advisorText(report.wealthHealth)}　${t("advisor.riskLevel")}：${advisorText(report.riskLevel)}

                    </p>

                    <p>

                        ${t("advisor.netWorth")}：${money(report.metrics.netWorth)}　${t("advisor.wealthScore")}：${Number(report.metrics.wealthScore || 0).toFixed(0)}

                    </p>

                    <p>

                        ${t("advisor.debtRatio")}：${Number(report.metrics.debtRatio || 0).toFixed(1)}%　${t("advisor.liquidity")}：${Number(report.metrics.liquidityMonths || 0).toFixed(1)} ${t("advisor.months")}

                    </p>

                    <p>

                        ${t("advisor.netCashFlow")}：${money(report.metrics.netCashFlow)}

                    </p>

                </section>

                <section>

                    <h3>

                        ${t("advisor.recommendations")}

                    </h3>

                    <ul>

                        ${

                            report.recommendations.map(

                                item => `<li>${advisorText(item)}</li>`

                            ).join("")

                        }

                    </ul>

                </section>

                <section>

                    <h3>

                        ${t("advisor.modelsTitle")}

                    </h3>

                    ${

                        (data.models || []).map(

                            model => `

                    <div style="border:1px solid #ddd;border-radius:8px;padding:10px;margin:8px 0;">

                        <strong>${model.status === "good" ? "✅" : model.status === "warn" ? "⚠️" : model.status === "alert" ? "🔴" : "ℹ️"} ${t("advisor.model." + model.id + ".name")}</strong>

                        <span> — ${t("advisor.status." + model.status)}</span><br>

                        <small>${t("advisor.model." + model.id + ".theory")}</small><br>

                        ${t("advisor.adv." + model.adviceCode, model.params)}

                    </div>

                            `

                        ).join("")

                    }

                    <p>

                        <small>${t("advisor.behaviorNote")}</small>

                    </p>

                </section>

                ${

                    report.alerts.length

                    ?

                    `

                <section>

                    <h3>

                        ${t("advisor.alerts")}

                    </h3>

                    <ul>

                        ${

                            report.alerts.map(

                                item => `<li>${advisorText(item)}</li>`

                            ).join("")

                        }

                    </ul>

                </section>

                    `

                    :

                    ""

                }

                ${

                    retirement

                    ?

                    `

                <section>

                    <h3>

                        ${t("advisor.retirement")}

                    </h3>

                    <p>

                        ${t("advisor.coverage")}：${(retirement.fundedRatio * 100).toFixed(0)}%

                        （${t("retire.projected")} ${money(retirement.projectedAssets)} / ${t("retire.required")} ${money(retirement.required)}）

                    </p>

                    <p>

                        ${

                            retirement.gap > 0

                            ?

                            t("advisor.gap") + "：" + money(retirement.gap)

                            :

                            t("advisor.surplus") + "：" + money(-retirement.gap)

                        }

                    </p>

                </section>

                    `

                    :

                    ""

                }

                ${

                    taxData

                    ?

                    `

                <section>

                    <h3>

                        ${t("advisor.tax")}（${taxData.year}）

                    </h3>

                    <p>

                        ${t("advisor.totalIncome")}：${money(taxData.totalIncome)}

                        （${t("advisor.wage")} ${money(taxData.wageIncome)}、${t("advisor.dividends")} ${money(taxData.dividendIncome)}、${t("advisor.interest")} ${money(taxData.interestIncome)}、${t("advisor.gains")} ${money(taxData.capitalGains)}）

                    </p>

                    <p>

                        ${t("advisor.mortgageInterest")}：${money(taxData.mortgageInterestPaid)}　${t("advisor.taxPaid")}：${money(taxData.taxPaid)}

                    </p>

                </section>

                    `

                    :

                    ""

                }

            </div>

        `;

        const backButton =

            container.querySelector(

                "#advisor-back-button"

            );

        if (backButton) {

            backButton.addEventListener(

                "click",

                () => {

                    if (

                        typeof onBack ===

                        "function"

                    ) {

                        onBack();

                    }

                }

            );

        }

        const languageSelect =

            container.querySelector(

                "#advisor-language-select"

            );

        if (languageSelect) {

            languageSelect.addEventListener(

                "change",

                () => {

                    setLanguage(

                        languageSelect.value

                    );

                    this.render(

                        container,

                        onBack

                    );

                }

            );

        }

    }

};

export default AdvisorView;
