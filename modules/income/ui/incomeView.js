/*

Family Wealth AI OS V7

Income View

收入展示层

*/

import IncomeAgent from "../agent/incomeAgent.js";

const IncomeView = {

    name:

    "Income View V7",

    // =====================

    // List View

    // =====================

    renderList(){

        const incomes =

        IncomeAgent

        .getIncome();

        return {

            title:

            "Income List",

            data:

            incomes

        };

    },

    // =====================

    // Summary View

    // =====================

    renderSummary(){

        const summary =

        IncomeAgent

        .getIncomeSummary();

        return {

            title:

            "Income Summary",

            data:

            summary

        };

    },

    // =====================

    // Dashboard Data

    // =====================

    renderDashboard(){

        const analysis =

        IncomeAgent

        .analyze();

        return {

            module:

            "income",

            analysis

        };

    }

};

export default IncomeView;
