/*

Family Wealth AI OS V7

AI Advisor View

AI 财富顾问：从系统基础数据层实时汇总（账户 / 收支 / 投资 /

资产 / 负债 / 税务 / 退休），经 WealthEngine 与 AdvisorReport

生成健康评估与建议。

*/

import AdvisorReport from "./advisorReport.js";

import WealthEngine from "../core/engines/wealth/wealthEngine.js";

import AccountAPI from "../modules/account/api/accountAPI.js";

import AssetAPI from "../modules/asset/api/assetAPI.js";

import InvestmentAPI from "../modules/investment/api/investmentAPI.js";

import LiabilityAPI from "../modules/liability/api/liabilityAPI.js";

import cashflowAPI from "../modules/cashflow/api/cashflowAPI.js";

import TaxDataIntegration from "../core/integration/taxDataIntegration.js";

import RetirementAPI from "../modules/retirement/api/retirementAPI.js";

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

            accounts.reduce(

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

        return {

            wealthResult,

            cashFlowData,

            accountsTotal,

            debtRatio,

            liquidityMonths,

            retirement,

            taxData,

            portfolio

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

                    🤖 AI Advisor

                </h2>

                <button

                    id="advisor-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

                <hr>

                <section>

                    <h3>

                        财富健康 Wealth Health

                    </h3>

                    <p>

                        健康状态：${report.wealthHealth}　风险等级：${report.riskLevel}

                    </p>

                    <p>

                        净资产 Net Worth：${money(report.metrics.netWorth)}　财富评分：${Number(report.metrics.wealthScore || 0).toFixed(0)}

                    </p>

                    <p>

                        负债率：${Number(report.metrics.debtRatio || 0).toFixed(1)}%　流动性覆盖：${Number(report.metrics.liquidityMonths || 0).toFixed(1)} 个月

                    </p>

                    <p>

                        净现金流（系统记录）：${money(report.metrics.netCashFlow)}

                    </p>

                </section>

                <section>

                    <h3>

                        建议 Recommendations

                    </h3>

                    <ul>

                        ${

                            report.recommendations.map(

                                item => `<li>${item}</li>`

                            ).join("")

                        }

                    </ul>

                </section>

                ${

                    report.alerts.length

                    ?

                    `

                <section>

                    <h3>

                        提醒 Alerts

                    </h3>

                    <ul>

                        ${

                            report.alerts.map(

                                item => `<li>${item}</li>`

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

                        退休 Retirement

                    </h3>

                    <p>

                        覆盖率：${(retirement.fundedRatio * 100).toFixed(0)}%

                        （退休时预计 ${money(retirement.projectedAssets)} / 需求 ${money(retirement.required)}）

                    </p>

                    <p>

                        ${

                            retirement.gap > 0

                            ?

                            "退休缺口：" + money(retirement.gap)

                            :

                            "退休已覆盖，富余：" + money(-retirement.gap)

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

                        税务 Tax（${taxData.year}）

                    </h3>

                    <p>

                        合计收入：${money(taxData.totalIncome)}

                        （工资/业务 ${money(taxData.wageIncome)}、股息 ${money(taxData.dividendIncome)}、利息 ${money(taxData.interestIncome)}、资本利得 ${money(taxData.capitalGains)}）

                    </p>

                    <p>

                        房贷利息已付：${money(taxData.mortgageInterestPaid)}　已缴税款：${money(taxData.taxPaid)}

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

    }

};

export default AdvisorView;
