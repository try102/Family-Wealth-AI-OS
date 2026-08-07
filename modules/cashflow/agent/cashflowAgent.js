/*

Family Wealth AI OS V7

Cashflow Agent

家庭现金流智能管理 Agent

*/

import cashflowAPI

from "../api/cashflowAPI.js";

const cashflowAgent = {

    name:

    "Cashflow Agent V7",

    init(){

        return {

            status:

            "READY"

        };

    },

    getCashflow(){

        return cashflowAPI.getCashflows();

    },

    summary(){

        return cashflowAPI.getSummary();

    },

    monthlyAnalysis(){

        const result =

        cashflowAPI.getMonthlyCashflow();

        return {

            income:

            result.income,

            expense:

            result.expense,

            net:

            result.net,

            savingRate:

            result.income

            ?

            (

                result.net /

                result.income

            )

            :

            0

        };

    },

    healthScore(){

        const analysis =

        this.monthlyAnalysis();

        let score = 0;

        if(

            analysis.net > 0

        ){

            score += 50;

        }

        if(

            analysis.savingRate >=

            0.2

        ){

            score += 30;

        }

        if(

            analysis.expense <

            analysis.income

        ){

            score += 20;

        }

        return score;

    },

    generateReport(){

        return {

            summary:

            this.summary(),

            analysis:

            this.monthlyAnalysis(),

            healthScore:

            this.healthScore()

        };

    }

};

export default cashflowAgent;
