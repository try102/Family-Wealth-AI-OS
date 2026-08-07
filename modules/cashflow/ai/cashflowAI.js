/*

Family Wealth AI OS V7

Cashflow AI

家庭现金流智能分析

*/

import cashflowAgent

from "../agent/cashflowAgent.js";

const cashflowAI = {

    name:

    "Cashflow AI V7",

    analyze(){

        const report =

        cashflowAgent.generateReport();

        return {

            score:

            report.healthScore,

            summary:

            report.summary,

            analysis:

            report.analysis

        };

    },

    generateAdvice(){

        const analysis =

        cashflowAgent.monthlyAnalysis();

        const advice=[];

        if(

            analysis.net < 0

        ){

            advice.push(

                "当前现金流为负，需要降低支出或增加收入"

            );

        }

        else{

            advice.push(

                "当前现金流健康，保持正向现金流"

            );

        }

        if(

            analysis.savingRate < 0.2

        ){

            advice.push(

                "建议提高储蓄率至20%以上"

            );

        }

        else{

            advice.push(

                "储蓄能力良好"

            );

        }

        if(

            analysis.expense >

            analysis.income * 0.7

        ){

            advice.push(

                "支出比例较高，需要优化消费结构"

            );

        }

        return {

            recommendation:

            advice,

            generatedAt:

            new Date()

            .toISOString()

        };

    },

    riskAssessment(){

        const analysis =

        cashflowAgent.monthlyAnalysis();

        let risk =

        "LOW";

        if(

            analysis.net < 0

        ){

            risk =

            "HIGH";

        }

        else if(

            analysis.savingRate < 0.1

        ){

            risk =

            "MEDIUM";

        }

        return {

            risk,

            savingRate:

            analysis.savingRate

        };

    }

};

export default cashflowAI;
