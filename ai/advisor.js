/*

Family Wealth AI OS V7

AI Advisor Orchestration Layer

*/

import AdvisorAgent 

from "../agents/advisor/advisorAgent.js";

const AIAdvisor = {

    name:

    "Family Wealth AI Advisor V7",

    ask(

        question

    ){

        const report =

        AdvisorAgent.analyze();

        return {

            question,

            analysis:

            report,

            answer:

            this.generateAnswer(

                question,

                report

            )

        };

    },

    generateAnswer(

        question,

        report

    ){

        const score =

        report.wealthScore.score;

        if(

            question.includes(

                "退休"

            )

        ){

            return (

                "退休分析：当前财富评分为 "

                +

                score

                +

                "，建议继续关注现金流和退休资产覆盖。"

            );

        }

        if(

            question.includes(

                "投资"

            )

        ){

            return (

                "投资分析：当前组合价值 "

                +

                report.portfolio.value

                +

                "，建议关注风险和资产配置。"

            );

        }

        if(

            question.includes(

                "税"

            )

        ){

            return (

                "税务分析已生成，请结合收入和投资收益进一步优化。"

            );

        }

        return (

            "财富分析完成，请查看综合报告。"

        );

    }

};

export default AIAdvisor;
