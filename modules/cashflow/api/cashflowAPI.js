/*

Family Wealth AI OS V7

Cashflow API

*/

import cashflowService

from "../services/cashflowService.js";

const cashflowAPI = {

    createCashflow(data){

        return cashflowService.create(

            data

        );

    },

    getCashflows(){

        return cashflowService.list();

    },

    getCashflow(id){

        return cashflowService.get(

            id

        );

    },

    updateCashflow(

        id,

        data

    ){

        return cashflowService.update(

            id,

            data

        );

    },

    deleteCashflow(id){

        return cashflowService.delete(

            id

        );

    },

    getSummary(){

        return cashflowService.summary();

    },

    getMonthlyCashflow(){

        return cashflowService.monthlyCashflow();

    }

};

export default cashflowAPI;
