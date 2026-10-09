/*

Family Wealth AI OS V7

Investment API

*/

import InvestmentService

from "../services/investmentService.js?v=20261008ac";

import PortfolioEngine

from "../portfolio/portfolioEngine.js";

import InvestmentAnalysisEngine

from "../analysis/investmentAnalysisEngine.js";

import RiskEngine

from "../risk/riskEngine.js";

import InvestmentDecisionEngine

from "../decision/investmentDecisionEngine.js";


function buildEffectivePositions(

    positions,

    records

) {

    const covered =

    new Set(

        (positions || []).map(

            position =>

                String(

                    position.symbol ||

                        position.name ||

                        ""

                ).toUpperCase()

        )

    );

    const extras =

    (records || [])

        .filter(

            record =>

                !covered.has(

                    String(

                        record.symbol ||

                            record.name ||

                            ""

                    ).toUpperCase()

                )

        )

        .map(

            record => {

                const quantity =

                Number(record.quantity || 0);

                const marketValue =

                Number(

                    record.currentValue ??

                        record.marketValue ??

                        0

                );

                const costBasis =

                Number(

                    record.costBasis ??

                        record.totalCost ??

                        marketValue

                );

                return {

                    symbol:

                    record.symbol ||

                        record.name ||

                        "",

                    name:

                    record.name || "",

                    type:

                    record.type || "OTHER",

                    quantity,

                    averageCost:

                    Number(

                        record.averageCost ||

                            (

                                quantity > 0

                                    ? costBasis / quantity

                                    : 0

                            )

                    ),

                    currentPrice:

                    Number(

                        record.currentPrice || 0

                    ),

                    costBasis,

                    marketValue,

                    memberId:

                    record.memberId ||

                        record.ownerId ||

                        ""

                };

            }

        );

    return [

        ...(positions || []),

        ...extras

    ];

}

const InvestmentAPI = {

    // =====================

    // Investment

    // =====================

    createInvestment(

        investment

    ){

        return InvestmentService

        .createInvestment(

            investment

        );

    },

    getInvestments(){

        return InvestmentService

        .getInvestments();

    },

    deleteInvestment(

        id

    ){

        return InvestmentService

        .deleteInvestment(

            id

        );

    },

    // =====================

    // Position

    // =====================

    getPositions(){

        return InvestmentService

        .getPositions();

    },

    updatePosition(

        position

    ){

        return InvestmentService

        .updatePosition(

            position

        );

    },

    // =====================

    // Trade

    // =====================

    recordTrade(

        trade

    ){

        return InvestmentService

        .recordTrade(

            trade

        );

    },

    getTrades(){

        return InvestmentService

        .getTrades();

    },

    // =====================

    // Portfolio

    // =====================

    getPortfolioSummary(){

        const positions =

        buildEffectivePositions(

            this.getPositions(),

            this.getInvestments()

        );

        return {

            totalValue:

            PortfolioEngine

            .calculateTotalValue(

                positions

            ),

            allocation:

            PortfolioEngine

            .calculateAllocation(

                positions

            ),

            concentration:

            PortfolioEngine

            .calculateConcentration(

                positions

            )

        };

    },

    // =====================

    // Analysis

    // =====================

    getPerformance(){

        return InvestmentAnalysisEngine

        .portfolioPerformance(

            buildEffectivePositions(

                this.getPositions(),

                this.getInvestments()

            )

        );

    },

    // =====================

    // Risk

    // =====================

    getRiskReport(){

        const positions =

        buildEffectivePositions(

            this.getPositions(),

            this.getInvestments()

        );

        return {

            concentration:

            RiskEngine

            .concentrationRisk(

                positions

            )

        };

    },

    // =====================

    // Decision

    // =====================

    getInvestmentAdvice(

        data

    ){

        return InvestmentDecisionEngine

        .generateReport(

            data

        );

    }

};

export default InvestmentAPI;
