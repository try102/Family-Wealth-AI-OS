/*

Family Wealth AI OS V7

Investment API

*/

import InvestmentService

from "../services/investmentService.js?v=20261008ag";

import PortfolioEngine

from "../portfolio/portfolioEngine.js?v=20261008ae";

import InvestmentAnalysisEngine

from "../analysis/investmentAnalysisEngine.js?v=20261008ae";

import RiskEngine

from "../risk/riskEngine.js?v=20261008ae";

import InvestmentDecisionEngine

from "../decision/investmentDecisionEngine.js?v=20261008ae";


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

    deleteTrade(

        tradeId

    ){

        return InvestmentService

        .deleteTrade(

            tradeId

        );

    },

    setCurrentPrice(

        symbol,

        price,

        source

    ){

        return InvestmentService

        .setCurrentPrice(

            symbol,

            price,

            source

        );

    },

    importPrices(

        priceMap,

        source

    ){

        return InvestmentService

        .importPrices(

            priceMap,

            source

        );

    },

    getPriceOverrides(){

        return InvestmentService

        .getPriceOverrides();

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
