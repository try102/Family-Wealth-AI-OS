/*

Family Wealth AI OS V7

Expense API

支出模块统一接口

*/

import ExpenseService from "../services/expenseService.js?v=20261008ae";

const ExpenseAPI = {

    // =====================

    // Create

    // =====================

    createExpense(

        data

    ){

        return ExpenseService.addExpense(

            data

        );

    },

    // =====================

    // Read

    // =====================

    getAllExpense(){

        return ExpenseService.getAllExpense();

    },

    getExpenseById(

        id

    ){

        return ExpenseService.getExpenseById(

            id

        );

    },

    // =====================

    // Update

    // =====================

    updateExpense(

        id,

        data

    ){

        return ExpenseService.updateExpense(

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

        return ExpenseService.deleteExpense(

            id

        );

    },

    // =====================

    // Summary

    // =====================

    getSummary(){

        return ExpenseService.getSummary();

    }

};

export default ExpenseAPI;
