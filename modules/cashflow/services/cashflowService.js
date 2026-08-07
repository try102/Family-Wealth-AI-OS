/*

Family Wealth AI OS V7

Cashflow Service

*/

import cashflowRepository

from "../repository/cashflowRepository.js";

import CashFlowEngine

from "../../../core/cashflow/cashFlowEngine.js";

const cashflowService = {

    create(data){

        const record =

        cashflowRepository.create(

            data

        );

        CashFlowEngine.add(

            data.type,

            Number(

                data.amount || 0

            ),

            data

        );

        return record;

    },

    list(){

        return cashflowRepository.findAll();

    },

    get(id){

        return cashflowRepository.findById(

            id

        );

    },

    update(

        id,

        data

    ){

        return cashflowRepository.update(

            id,

            data

        );

    },

    delete(id){

        return cashflowRepository.remove(

            id

        );

    },

    summary(){

        const report =

        CashFlowEngine.report();

        return {

            income:

            report.income,

            expense:

            report.expense,

            net:

            report.net

        };

    },

    monthlyCashflow(){

        const list =

        this.list();

        let income = 0;

        let expense = 0;

        list.forEach(

            item=>{

                if(

                    item.type ===

                    "INCOME"

                ){

                    income +=

                    Number(

                        item.amount

                    );

                }

                if(

                    item.type ===

                    "EXPENSE"

                ){

                    expense +=

                    Number(

                        item.amount

                    );

                }

            }

        );

        return {

            income,

            expense,

            net:

            income - expense

        };

    }

};

export default cashflowService;
