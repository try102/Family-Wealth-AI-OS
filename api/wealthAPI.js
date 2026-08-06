/*

Family Wealth AI OS V7

Wealth API

*/

import WealthScoreEngine

from "../core/wealthScore/wealthScoreEngine.js";

import CashFlowEngine

from "../core/cashflow/cashFlowEngine.js";

import RetirementEngine

from "../core/retirement/retirementEngine.js";

import TaxEngine

from "../core/tax/taxEngine.js";

const WealthAPI = {

    dashboard(){

        return {

            wealthScore:

            WealthScoreEngine.report(),

            cashFlow:

            CashFlowEngine.report(),

            retirement:

            RetirementEngine.report(),

            tax:

            TaxEngine.report()

        };

    },

    score(){

        return (

            WealthScoreEngine.report()

        );

    },

    cashFlow(){

        return (

            CashFlowEngine.report()

        );

    },

    retirement(){

        return (

            RetirementEngine.report()

        );

    },

    tax(){

        return (

            TaxEngine.report()

        );

    }

};

export default WealthAPI;
