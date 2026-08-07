/*

Family Wealth AI OS V7

Income API

收入模块统一接口

*/

import IncomeService from "../services/incomeService.js";

const IncomeAPI = {

    // =====================

    // Create

    // =====================

    createIncome(

        data

    ){

        return IncomeService.addIncome(

            data

        );

    },

    // =====================

    // Read

    // =====================

    getAllIncome(){

        return IncomeService.getAllIncome();

    },

    getIncomeById(

        id

    ){

        return IncomeService.getIncomeById(

            id

        );

    },

    // =====================

    // Update

    // =====================

    updateIncome(

        id,

        data

    ){

        return IncomeService.updateIncome(

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

        return IncomeService.deleteIncome(

            id

        );

    },

    // =====================

    // Summary

    // =====================

    getSummary(){

        return IncomeService.getSummary();

    }

};

export default IncomeAPI;
