/*

Family Wealth AI OS

Investment Agent

*/

import InvestmentAPI from "../api/investmentAPI.js";

import RiskEngine from "../risk/riskEngine.js";

function decideSignal(weight, returnRate) {

    if (

        weight >=

        40

    ) {

        return {

            code:

            "REDUCE",

            reasonCode:

            "concentration"

        };

    }

    if (

        returnRate <=

        -15

    ) {

        return {

            code:

            "REVIEW",

            reasonCode:

            "loss"

        };

    }

    if (

        returnRate >=

        30

    ) {

        return {

            code:

            "TAKE_PROFIT",

            reasonCode:

            "profit"

        };

    }

    if (

        weight >

            0 &&

        weight <

            3

    ) {

        return {

            code:

            "HOLD",

            reasonCode:

            "small"

        };

    }

    return {

        code:

        "HOLD",

        reasonCode:

        "hold"

    };

}

const InvestmentAgent = {

    name:

    "Investment Agent",

    getPortfolioStatus(){

        return InvestmentAPI

        .getPortfolioSummary();

    },

    getPerformanceReport(){

        return InvestmentAPI

        .getPerformance();

    },

    getRiskAnalysis(){

        return InvestmentAPI

        .getRiskReport();

    },

    recordTrade(

        trade

    ){

        return InvestmentAPI

        .recordTrade(

            trade

        );

    },

    getTrades(){

        return InvestmentAPI

        .getTrades();

    },

    /*

     * 投资决策中心数据：

     * 持仓 + 权重 + 盈亏 + 决策信号 + 风险提示。

     * 信号为本地规则（权重 / 盈亏阈值），

     * 不使用任何外部行情数据。

     */

    getDecisionCenter(){

        const positions =

        InvestmentAPI

        .getPositions();

        const summary =

        InvestmentAPI

        .getPortfolioSummary();

        const totalValue =

        Number(

            summary.totalValue || 0

        );

        let totalCost = 0;

        let totalGainLoss = 0;

        const holdings =

        positions.map(

            position => {

                const marketValue =

                Number(

                    position.marketValue || 0

                );

                const costBasis =

                Number(

                    position.costBasis || 0

                );

                const gainLoss =

                marketValue -

                costBasis;

                const returnRate =

                costBasis > 0

                ? gainLoss /

                    costBasis *

                    100

                : 0;

                const weight =

                totalValue > 0

                ? marketValue /

                    totalValue *

                    100

                : 0;

                totalCost +=

                costBasis;

                totalGainLoss +=

                gainLoss;

                const signal =

                decideSignal(

                    weight,

                    returnRate

                );

                return {

                    symbol:

                    position.symbol || "",

                    name:

                    position.name || "",

                    quantity:

                    Number(

                        position.quantity || 0

                    ),

                    averageCost:

                    Number(

                        position.averageCost || 0

                    ),

                    currentPrice:

                    Number(

                        position.currentPrice || 0

                    ),

                    costBasis,

                    marketValue,

                    gainLoss,

                    returnRate,

                    weight,

                    signalCode:

                    signal.code,

                    signalReason:

                    signal.reasonCode

                };

            }

        );

        const warnings =

        RiskEngine

        .concentrationRisk(

            positions.map(

                position => ({

                    symbol:

                    position.symbol,

                    allocationRatio:

                    totalValue > 0

                    ? Number(

                        position.marketValue || 0

                    ) /

                        totalValue *

                        100

                    : 0

                })

            )

        );

        return {

            totalValue,

            totalCost,

            totalGainLoss,

            totalReturnRate:

            totalCost > 0

            ? totalGainLoss /

                totalCost *

                100

            : 0,

            holdings,

            warnings,

            allocation:

            summary.allocation || {},

            concentration:

            summary.concentration || {}

        };

    },

    generateInvestmentReview(){

        const portfolio =

        this.getPortfolioStatus();

        const performance =

        this.getPerformanceReport();

        const risk =

        this.getRiskAnalysis();

        return {

            portfolio,

            performance,

            risk,

            summary:

            "Investment review generated"

        };

    }

};

export default InvestmentAgent;
