/*

Family Wealth AI OS

Cash Flow Engine

*/

const CashFlowEngine = {

    flows:[],

    add(

        type,

        amount,

        data={}

    ){

        const flow = {

            type,

            amount,

            data,

            createdAt:

            new Date()

            .toISOString()

        };

        this.flows.push(

            flow

        );

        return flow;

    },

    income(){

        return this.flows

        .filter(

            item =>

            item.type ===

            "INCOME"

        )

        .reduce(

            (

                sum,

                item

            )=>

                sum +

                item.amount,

            0

        );

    },

    expense(){

        return this.flows

        .filter(

            item =>

            item.type ===

            "EXPENSE"

        )

        .reduce(

            (

                sum,

                item

            )=>

                sum +

                item.amount,

            0

        );

    },

    net(){

        return (

            this.income()

            -

            this.expense()

        );

    },

    report(){

        return {

            income:

            this.income(),

            expense:

            this.expense(),

            net:

            this.net()

        };

    },

    list(){

        return this.flows;

    },

    clear(){

        this.flows=[];

    }

};

export default CashFlowEngine;
