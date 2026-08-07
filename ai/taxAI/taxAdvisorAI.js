/*

Family Wealth AI OS V7

AI Tax Advisor Layer

*/

import TaxFacade from "../../tax/taxFacade.js";

// =====================

// Tax AI Advisor

// =====================

class TaxAdvisorAI {

    constructor(){

        this.name =

        "Family Wealth AI Tax Advisor V7";

        this.taxService =

        new TaxFacade();

    }

    analyze(

        question

    ){

        const taxReport =

        this.taxService.getReport();

        return {

            question,

            report:

            taxReport,

            advice:

            this.generateAdvice(

                question,

                taxReport

            )

        };

    }

    generateAdvice(

        question,

        report

    ){

        if(

            question.includes(

                "退休"

            )

        ){

            return (

                "税务退休规划分析完成，建议结合退休收入、扣除项目和现金流进行优化。"

            );

        }

        if(

            question.includes(

                "投资"

            )

        ){

            return (

                "投资税务分析完成，建议关注资本利得、收益类型以及税务效率。"

            );

        }

        return (

            "税务分析完成，请结合个人收入、资产和家庭情况进一步优化。"

        );

    }

}

export default TaxAdvisorAI;
