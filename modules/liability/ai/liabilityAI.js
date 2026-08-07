/*

Family Wealth AI OS V7

Liability AI Layer

负债智能分析层

*/

import LiabilityAgent from "../agent/liabilityAgent.js";

const LiabilityAI = {

    name:

    "Liability AI V7",

    // =====================

    // Analyze Debt

    // =====================

    analyzeDebt(){

        const review =

        LiabilityAgent

        .generateLiabilityReview();

        return {

            type:

            "LIABILITY_ANALYSIS",

            data:

            review

        };

    },

    // =====================

    // Generate Advice

    // =====================

    generateAdvice(

        question

    ){

        const analysis =

        this.analyzeDebt();

        let recommendation =

        "Review debt structure and repayment strategy";

        const debtLevel =

        analysis.data

        .analysis

        .debtLevel;

        if(

            debtLevel ===

            "HIGH"

        ){

            recommendation =

            "High liability detected. Consider reducing high interest debt and improving cash flow.";

        }

        else if(

            debtLevel ===

            "MEDIUM"

        ){

            recommendation =

            "Moderate liability level. Monitor repayment ratio and interest cost.";

        }

        else{

            recommendation =

            "Debt level is healthy. Maintain current strategy.";

        }

        return {

            question,

            analysis,

            recommendation

        };

    }

};

export default LiabilityAI;
