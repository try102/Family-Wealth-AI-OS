/*

Family Wealth AI OS V7

Wealth API

*/

import WealthEngine from "../core/engines/wealth/wealthEngine.js";

import CashFlowEngine from "../core/engines/cashflow/cashFlowEngine.js";

const WealthAPI = {

    // =====================

    // Wealth Dashboard

    // =====================

    dashboard(

        assets = [],

        liabilities = [],

        cashFlowData = {},

        liquidityMonths = 0

    ){

        return {

            wealth:

            WealthEngine.analyze(

                assets,

                liabilities,

                cashFlowData,

                liquidityMonths

            ),

            cashFlow:

            CashFlowEngine.report()

        };

    },

    // =====================

    // Wealth Analysis

    // =====================

    analyze(

        assets = [],

        liabilities = [],

        cashFlowData = {},

        liquidityMonths = 0

    ){

        return WealthEngine.analyze(

            assets,

            liabilities,

            cashFlowData,

            liquidityMonths

        );

    },

    // =====================

    // Cash Flow

    // =====================

    cashFlow(){

        return CashFlowEngine.report();

    }

};

export default WealthAPI;
