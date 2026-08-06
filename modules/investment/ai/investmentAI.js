/*

Family Wealth AI OS

Investment AI Layer

*/

import InvestmentAgent from "../agent/investmentAgent.js";

const InvestmentAI = {

    analyzePortfolio(){

        const review =

        InvestmentAgent

        .generateInvestmentReview();

        return {

            type:

            "INVESTMENT_ANALYSIS",

            data:

            review

        };

    },

    generateAdvice(

        question

    ){

        const analysis =

        this.analyzePortfolio();

        return {

            question,

            analysis,

            recommendation:

            "Review investment allocation and risk profile"

        };

    }

};

export default InvestmentAI;
