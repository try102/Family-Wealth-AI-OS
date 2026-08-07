/*

Family Wealth AI OS V7

Cashflow View Test

*/

import cashflowView

from "../cashflowView.js";

import cashflowAPI

from "../../api/cashflowAPI.js";

import cashflowRepository

from "../../repository/cashflowRepository.js";

// =====================

// Clear Before Test

// =====================

cashflowRepository.clear();

// =====================

// Prepare Data

// =====================

cashflowAPI.createCashflow({

    type:

    "INCOME",

    category:

    "Salary",

    amount:

    50000

});

cashflowAPI.createCashflow({

    type:

    "EXPENSE",

    category:

    "Living",

    amount:

    15000

});

// =====================

// Dashboard Test

// =====================

const dashboard =

cashflowView.dashboard();

if(

    dashboard.title !==

    "Cashflow Dashboard"

){

    throw new Error(

        "Dashboard title failed"

    );

}

if(

    !dashboard.summary

){

    throw new Error(

        "Dashboard summary missing"

    );

}

if(

    !dashboard.analysis

){

    throw new Error(

        "Dashboard analysis missing"

    );

}

// =====================

// Overview Test

// =====================

const overview =

cashflowView.overview();

if(

    overview.income !==

    50000

){

    throw new Error(

        "Overview income failed"

    );

}

if(

    overview.expense !==

    15000

){

    throw new Error(

        "Overview expense failed"

    );

}

if(

    overview.net !==

    35000

){

    throw new Error(

        "Overview net failed"

    );

}

// =====================

// AI Report Test

// =====================

const aiReport =

cashflowView.aiReport();

if(

    !aiReport.summary

){

    throw new Error(

        "AI report failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow View V7 Test Passed"

);
