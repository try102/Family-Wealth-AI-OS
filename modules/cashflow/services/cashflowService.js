/*

    

Family Wealth AI OS V7

Cashflow Service

现金流业务服务层

*/

import cashflowRepository

    from "../repository/cashflowRepository.js";

const cashflowService = {

    // ==================================================

    // Create

    // ==================================================

    create(

        data

    ){

        return cashflowRepository.create({

            type:

                data.type,

            category:

                data.category ||

                "Other",

            description:

                data.description ||

                "",

            amount:

                Number(

                    data.amount || 0

                )

        });

    },

    // ==================================================

    // List

    // ==================================================

    list(){

        return cashflowRepository.findAll();

    },

    // ==================================================

    // Get

    // ==================================================

    get(

        id

    ){

        return cashflowRepository.findById(

            id

        );

    },

    // ==================================================

    // Update

    // ==================================================

    update(

        id,

        data

    ){

        return cashflowRepository.update(

            id,

            {

                type:

                    data.type,

                category:

                    data.category ||

                    "Other",

                description:

                    data.description ||

                    "",

                amount:

                    Number(

                        data.amount || 0

                    )

            }

        );

    },

    // ==================================================

    // Delete

    // ==================================================

    delete(

        id

    ){

        return cashflowRepository.remove(

            id

        );

    },

    // ==================================================

    // Summary

    //

    // IMPORTANT:

    // Summary MUST read from Database.

    //

    // Do NOT use CashFlowEngine here.

    // ==================================================

    summary(){

        const list =

            cashflowRepository.findAll();

        let income = 0;

        let expense = 0;

        list.forEach(

            item => {

                const amount =

                    Number(

                        item.amount || 0

                    );

                if(

                    item.type ===

                    "INCOME"

                ){

                    income += amount;

                }

                if(

                    item.type ===

                    "EXPENSE"

                ){

                    expense += amount;

                }

            }

        );

        return {

            income,

            expense,

            net:

                income - expense

        };

    },

    // ==================================================

    // Monthly Cashflow

    // ==================================================

    monthlyCashflow(){

        return this.summary();

    }

};

export default cashflowService;
