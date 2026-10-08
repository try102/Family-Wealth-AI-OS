/*

Family Wealth AI OS

Investment Agent

*/

import InvestmentAPI from "../api/investmentAPI.js";

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
