/*

Family Wealth AI OS V7

Income Agent

家庭收入管理智能代理

*/

import IncomeAPI from "../api/incomeAPI.js";

const IncomeAgent = {

    name:

    "Income Agent V7",

    // =====================

    // Initialize

    // =====================

    init(){

        return {

            status:

            "Income Agent Ready"

        };

    },

    // =====================

    // Create

    // =====================

    addIncome(

        data

    ){

        return IncomeAPI

        .createIncome(

            data

        );

    },

    // =====================

    // Query

    // =====================

    getIncome(){

        return IncomeAPI

        .getAllIncome();

    },

    getIncomeSummary(){

        return IncomeAPI

        .getSummary();

    },

    // =====================

    // Update

    // =====================

    updateIncome(

        id,

        data

    ){

        return IncomeAPI

        .updateIncome(

            id,

            data

        );

    },

    // =====================

    // Delete

    // =====================

    deleteIncome(

        id

    ){

        return IncomeAPI

        .deleteIncome(

            id

        );

    },

    // =====================

    // Analysis

    // =====================

    analyze(){

        const summary =

        this.getIncomeSummary();

        return {

            type:

            "INCOME_ANALYSIS",

            data:

            summary,

            message:

            "Income analysis generated"

        };

    }

};

export default IncomeAgent;
