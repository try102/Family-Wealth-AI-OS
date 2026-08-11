/*

    

Family Wealth AI OS V7

Cash Flow Engine

家庭现金流核心引擎

*/

import cashflowRepository

    from "../../modules/cashflow/repository/cashflowRepository.js";

const CashFlowEngine = {

    name:

        "Cash Flow Engine V7",

    version:

        "7.0",

    status:

        "READY",

    // ==================================================

    // Get All Flows

    // ==================================================

    list(){

        return cashflowRepository

            .findAll();

    },

    // ==================================================

    // Add Flow

    // ==================================================

    add(

        type,

        amount,

        data = {}

    ){

        return cashflowRepository.create({

            type,

            amount:

                Number(

                    amount || 0

                ),

            ...data

        });

    },

    // ==================================================

    // Income

    // ==================================================

    income(){

        return this.list()

            .filter(

                item =>

                    item.type ===

                    "INCOME"

            )

            .reduce(

                (

                    sum,

                    item

                ) =>

                    sum +

                    Number(

                        item.amount || 0

                    ),

                0

            );

    },

    // ==================================================

    // Expense

    // ==================================================

    expense(){

        return this.list()

            .filter(

                item =>

                    item.type ===

                    "EXPENSE"

            )

            .reduce(

                (

                    sum,

                    item

                ) =>

                    sum +

                    Number(

                        item.amount || 0

                    ),

                0

            );

    },

    // ==================================================

    // Net Cash Flow

    // ==================================================

    net(){

        return (

            this.income()

            -

            this.expense()

        );

    },

    // ==================================================

    // Report

    // ==================================================

    report(){

        const income =

            this.income();

        const expense =

            this.expense();

        const net =

            income -

            expense;

        return {

            income,

            expense,

            net

        };

    },

    // ==================================================

    // Clear

    // ==================================================

    clear(){

        cashflowRepository

            .clear();

    }

};

export default CashFlowEngine;
