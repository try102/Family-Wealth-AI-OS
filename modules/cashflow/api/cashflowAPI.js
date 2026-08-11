/*

    

Family Wealth AI OS V7

Cashflow API

现金流统一接口层

*/

import cashflowService

    from "../services/cashflowService.js";

const cashflowAPI = {

    // ==================================================

    // Create

    // ==================================================

    createCashflow(

        data

    ){

        return cashflowService.create(

            data

        );

    },

    // ==================================================

    // Get All

    // ==================================================

    getCashflows(){

        return cashflowService.list();

    },

    // ==================================================

    // Get One

    // ==================================================

    getCashflow(

        id

    ){

        return cashflowService.get(

            id

        );

    },

    // ==================================================

    // Update

    // ==================================================

    updateCashflow(

        id,

        data

    ){

        return cashflowService.update(

            id,

            data

        );

    },

    // ==================================================

    // Delete

    // ==================================================

    deleteCashflow(

        id

    ){

        return cashflowService.delete(

            id

        );

    },

    // ==================================================

    // Summary

    // ==================================================

    getSummary(){

        return cashflowService.summary();

    },

    // ==================================================

    // Monthly

    // ==================================================

    getMonthlyCashflow(){

        return cashflowService.monthlyCashflow();

    }

};

export default cashflowAPI;
