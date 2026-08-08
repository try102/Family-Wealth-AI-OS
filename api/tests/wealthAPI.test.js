/*

Family Wealth AI OS V7

Wealth API Test

*/

import WealthAPI from "../wealthAPI.js";

// =====================

// Prepare Data

// =====================

const assets = [

    {

        type:

        "Cash",

        value:

        100000

    },

    {

        type:

        "Investment",

        value:

        400000

    }

];

const liabilities = [

    {

        type:

        "Mortgage",

        value:

        200000

    }

];

const cashFlowData = {

    netCashFlow:

    7000

};

const liquidityMonths = 6;

// =====================

// Analyze Test

// =====================

const result =

WealthAPI.analyze(

    assets,

    liabilities,

    cashFlowData,

    liquidityMonths

);

console.log(

    "Wealth Analysis:",

    result

);

if(

    result.totalAssets !==

    500000

){

    throw new Error(

        "Wealth API total assets failed"

    );

}

if(

    result.totalLiabilities !==

    200000

){

    throw new Error(

        "Wealth API total liabilities failed"

    );

}

if(

    result.netWorth !==

    300000

){

    throw new Error(

        "Wealth API net worth failed"

    );

}

if(

    result.cashFlow.netCashFlow !==

    7000

){

    throw new Error(

        "Wealth API cash flow failed"

    );

}

if(

    result.liquidityMonths !==

    6

){

    throw new Error(

        "Wealth API liquidity failed"

    );

}

// =====================

// Dashboard Test

// =====================

const dashboard =

WealthAPI.dashboard(

    assets,

    liabilities,

    cashFlowData,

    liquidityMonths

);

console.log(

    "Wealth Dashboard:",

    dashboard

);

if(

    !dashboard.wealth

){

    throw new Error(

        "Dashboard wealth data missing"

    );

}

if(

    dashboard.wealth.netWorth !==

    300000

){

    throw new Error(

        "Dashboard net worth failed"

    );

}

// =====================

// Cash Flow API Test

// =====================

const cashFlow =

WealthAPI.cashFlow();

console.log(

    "Cash Flow API:",

    cashFlow

);

// =====================

// Final

// =====================

console.log(

    "Wealth API V7 Test Passed"

);
