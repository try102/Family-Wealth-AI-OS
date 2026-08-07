/*

Family Wealth AI OS V7

Cashflow View

现金流 UI 数据层

*/

import cashflowAgent

from "../agent/cashflowAgent.js";

import cashflowAI

from "../ai/cashflowAI.js";

const cashflowView = {

    name:

    "Cashflow View V7",

    dashboard(){

        const report =

        cashflowAgent.generateReport();

        const advice =

        cashflowAI.generateAdvice();

        return {

            title:

            "Cashflow Dashboard",

            summary:

            report.summary,

            analysis:

            report.analysis,

            healthScore:

            report.healthScore,

            advice:

            advice.recommendation

        };

    },

    overview(){

        const summary =

        cashflowAgent.summary();

        return {

            income:

            summary.income,

            expense:

            summary.expense,

            net:

            summary.net

        };

    },

    aiReport(){

        return cashflowAI.analyze();

    }

};

export default cashflowView;
