/*

Family Wealth AI OS

Cash Flow Calculator

*/

const CashFlowCalculator = {

    calculateIncome(

        transactions

    ){

        return transactions

        .filter(

            t =>

            t.direction === "IN"

        )

        .reduce(

            (sum,t)=>

            sum +

            Number(

                t.amount || 0

            ),

            0

        );

    },

    calculateExpense(

        transactions

    ){

        return transactions

        .filter(

            t =>

            t.direction === "OUT"

        )

        .reduce(

            (sum,t)=>

            sum +

            Number(

                t.amount || 0

            ),

            0

        );

    },

    calculateNetCashFlow(

        transactions

    ){

        const income =

        this.calculateIncome(

            transactions

        );

        const expense =

        this.calculateExpense(

            transactions

        );

        return {

            income,

            expense,

            net:

            income -

            expense

        };

    },

    calculateSavingsRate(

        transactions

    ){

        const result =

        this.calculateNetCashFlow(

            transactions

        );

        if(result.income === 0){

            return 0;

        }

        return Number(

            (

            result.net

            /

            result.income

            *

            100

            )

            .toFixed(2)

        );

    }

};

export default CashFlowCalculator;
