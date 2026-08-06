/*

Family Wealth AI OS

Wealth Engine Test

*/

import WealthCalculator from "../wealthCalculator.js";

import WealthScore from "../wealthScore.js";

const assets = [

    {

        category:"STOCK",

        value:500000

    },

    {

        category:"REAL_ESTATE",

        value:1000000

    }

];

const liabilities = [

    {

        value:300000

    }

];

const cashFlow = {

    netCashFlow:50000

};

// Test Net Worth

const wealth =

WealthCalculator.calculateNetWorth(

    assets,

    liabilities

);

console.log(

    "Net Worth Test:",

    wealth

);

// Test Allocation

const allocation =

WealthCalculator.calculateAssetAllocation(

    assets

);

console.log(

    "Allocation Test:",

    allocation

);

// Test Score

const score =

WealthScore.calculate({

    netWorth:

    wealth.netWorth,

    cashFlow:

    cashFlow.netCashFlow,

    liquidityMonths:12,

    assetTypes:2,

    debtRatio:

    20

});

console.log(

    "Wealth Score Test:",

    score

);
