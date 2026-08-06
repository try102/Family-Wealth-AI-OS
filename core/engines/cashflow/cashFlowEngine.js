/*

Family Wealth AI OS

Cash Flow Engine

*/

import CashFlowCalculator from "./cashFlowCalculator.js";

const CashFlowEngine = {

    analyze(

        transactions

    ){

        const cashFlow =

        CashFlowCalculator

        .calculateNetCashFlow(

            transactions

        );

        const savingsRate =

        CashFlowCalculator

        .calculateSavingsRate(

            transactions

        );

        return {

            income:

            cashFlow.income,

            expense:

            cashFlow.expense,

            netCashFlow:

            cashFlow.net,

            savingsRate

        };

    },

    healthScore(

        transactions

    ){

        const analysis =

        this.analyze(

            transactions

        );

        let score = 0;

        // 有正现金流

        if(

            analysis.netCashFlow > 0

        ){

            score +=40;

        }

        // 储蓄率

        if(

            analysis.savingsRate >=20

        ){

            score +=30;

        }

        else if(

            analysis.savingsRate >0

        ){

            score +=15;

        }

        // 支出控制

        if(

            analysis.expense

            <

            analysis.income

        ){

            score +=30;

        }

        return score;

    }

};

export default CashFlowEngine;
