/*

Family Wealth AI OS

Investment API

*/

import InvestmentService from "../services/investmentService.js";

import PortfolioEngine from "../portfolio/portfolioEngine.js";

import InvestmentAnalysisEngine from "../analysis/investmentAnalysisEngine.js";

import RiskEngine from "../risk/riskEngine.js";

import InvestmentDecisionEngine from "../decision/investmentDecisionEngine.js";

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

        this.getPositions();

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

            this.getPositions()

        );

    },

    // =====================

    // Risk

    // =====================

    getRiskReport(){

        const positions =

        this.getPositions();

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
