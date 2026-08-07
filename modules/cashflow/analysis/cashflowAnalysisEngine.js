/*

Family Wealth AI OS V7

Cashflow Analysis Engine

家庭现金流分析引擎

*/

import cashflowRepository

from "../repository/cashflowRepository.js";

const cashflowAnalysisEngine = {

    name:

    "Cashflow Analysis Engine V7",

    getData(){

        return cashflowRepository.findAll();

    },

    totalIncome(){

        return this.getData()

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

                    item.amount

                ),

            0

        );

    },

    totalExpense(){

        return this.getData()

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

                    item.amount

                ),

            0

        );

    },

    netCashflow(){

        return (

            this.totalIncome()

            -

            this.totalExpense()

        );

    },

    savingRate(){

        const income =

        this.totalIncome();

        if(

            income === 0

        ){

            return 0;

        }

        return (

            this.netCashflow()

            /

            income

        );

    },

    expenseRatio(){

        const income =

        this.totalIncome();

        if(

            income === 0

        ){

            return 0;

        }

        return (

            this.totalExpense()

            /

            income

        );

    },

    healthScore(){

        let score = 0;

        if(

            this.netCashflow() > 0

        ){

            score += 40;

        }

        if(

            this.savingRate() >= 0.2

        ){

            score += 40;

        }

        if(

            this.expenseRatio() <= 0.7

        ){

            score += 20;

        }

        return score;

    },

    report(){

        return {

            income:

            this.totalIncome(),

            expense:

            this.totalExpense(),

            net:

            this.netCashflow(),

            savingRate:

            this.savingRate(),

            expenseRatio:

            this.expenseRatio(),

            healthScore:

            this.healthScore()

        };

    }

};

export default cashflowAnalysisEngine;
