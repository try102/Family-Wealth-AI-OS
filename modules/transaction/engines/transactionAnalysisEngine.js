/*

Family Wealth AI OS

Transaction Analysis Engine

*/

const TransactionAnalysisEngine = {

    totalIncome(

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

    totalExpense(

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

    cashFlow(

        transactions

    ){

        const income =

        this.totalIncome(

            transactions

        );

        const expense =

        this.totalExpense(

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

    savingsRate(

        transactions

    ){

        const flow =

        this.cashFlow(

            transactions

        );

        if(flow.income === 0){

            return 0;

        }

        return Number(

            (

            flow.net

            /

            flow.income

            *

            100

            )

            .toFixed(2)

        );

    },

    expenseByCategory(

        transactions

    ){

        const result={};

        transactions

        .filter(

            t =>

            t.direction === "OUT"

        )

        .forEach(

            t=>{

                const category =

                t.category ||

                "OTHER";

                if(!result[category]){

                    result[category]=0;

                }

                result[category] +=

                Number(

                    t.amount || 0

                );

            }

        );

        return result;

    }

};

export default TransactionAnalysisEngine;
