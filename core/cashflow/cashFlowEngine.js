/*

    

Family Wealth AI OS V7

Cash Flow Engine

家庭现金流核心引擎

*/

const CashFlowEngine = {

    name:

        "Cash Flow Engine V7",

    version:

        "7.0",

    status:

        "READY",

    // ==================================================

    // Data Source

    // ==================================================

    getData(){

        return [];

    },

    // ==================================================

    // Set Data Source

    //

    // Service / Analysis layer can provide

    // repository data here.

    // ==================================================

    setData(data){

        if(

            !Array.isArray(data)

        ){

            return [];

        }

        return data;

    },

    // ==================================================

    // Income

    // ==================================================

    income(data = []){

        return data

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

    expense(data = []){

        return data

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

    net(data = []){

        return (

            this.income(data)

            -

            this.expense(data)

        );

    },

    // ==================================================

    // Report

    // ==================================================

    report(data = []){

        const income =

            this.income(

                data

            );

        const expense =

            this.expense(

                data

            );

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

    // List

    // ==================================================

    list(data = []){

        if(

            !Array.isArray(data)

        ){

            return [];

        }

        return data;

    },

    // ==================================================

    // Clear

    //

    // Actual database clearing is handled

    // by cashflowRepository.

    // ==================================================

    clear(){

        return true;

    }

};

export default CashFlowEngine;
