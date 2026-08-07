/*

Family Wealth AI OS V7

Income AI Layer

家庭收入智能分析层

*/

import IncomeAgent from "../agent/incomeAgent.js";

const IncomeAI = {

    name:

    "Income AI V7",

    // =====================

    // Analyze Income

    // =====================

    analyzeIncome(){

        const summary =

        IncomeAgent

        .getIncomeSummary();

        return {

            type:

            "INCOME_ANALYSIS",

            summary,

            insights:

            this.generateInsights(

                summary

            )

        };

    },

    // =====================

    // Generate Insights

    // =====================

    generateInsights(

        summary

    ){

        const result = [];

        if(

            summary.totalIncome === 0

        ){

            result.push(

                "暂无收入数据"

            );

        }

        else if(

            summary.totalIncome < 5000

        ){

            result.push(

                "当前收入水平较低，建议关注现金流改善"

            );

        }

        else{

            result.push(

                "收入基础稳定，可以进一步规划投资和退休现金流"

            );

        }

        return result;

    },

    // =====================

    // Ask Income Question

    // =====================

    ask(

        question

    ){

        const analysis =

        this.analyzeIncome();

        return {

            question,

            analysis,

            answer:

            "根据当前家庭收入数据，建议结合资产配置和现金流进行综合规划"

        };

    }

};

export default IncomeAI;
