/*

Family Wealth AI OS V7

Expense Agent

家庭支出管理智能代理

*/

import ExpenseAPI from "../api/expenseAPI.js";

const ExpenseAgent = {

    name:

    "Expense Agent V7",

    // =====================

    // Initialize

    // =====================

    init(){

        return {

            status:

            "Expense Agent Ready"

        };

    },

    // =====================

    // Create

    // =====================

    addExpense(

        data

    ){

        return ExpenseAPI

        .createExpense(

            data

        );

    },

    // =====================

    // Query

    // =====================

    getExpense(){

        return ExpenseAPI

        .getAllExpense();

    },

    getExpenseSummary(){

        return ExpenseAPI

        .getSummary();

    },

    // =====================

    // Update

    // =====================

    updateExpense(

        id,

        data

    ){

        return ExpenseAPI

        .updateExpense(

            id,

            data

        );

    },

    // =====================

    // Delete

    // =====================

    deleteExpense(

        id

    ){

        return ExpenseAPI

        .deleteExpense(

            id

        );

    },

    // =====================

    // Analysis

    // =====================

    analyze(){

        const summary =

        this.getExpenseSummary();

        return {

            type:

            "EXPENSE_ANALYSIS",

            data:

            summary,

            message:

            "Expense analysis generated"

        };

    }

};

export default ExpenseAgent;
