/*

Family Wealth AI OS V7

Cashflow Agent Test

*/

import cashflowAgent

from "../cashflowAgent.js";

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

    20000

});

cashflowAPI.createCashflow({

    type:

    "EXPENSE",

    category:

    "Living",

    amount:

    5000

});

// =====================

// Init Test

// =====================

const init =

cashflowAgent.init();

if(

    init.status !==

    "READY"

){

    throw new Error(

        "Agent init failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

cashflowAgent.summary();

if(

    summary.income !==

    20000

){

    throw new Error(

        "Agent summary income failed"

    );

}

if(

    summary.expense !==

    5000

){

    throw new Error(

        "Agent summary expense failed"

    );

}

// =====================

// Analysis Test

// =====================

const analysis =

cashflowAgent.monthlyAnalysis();

if(

    analysis.net !==

    15000

){

    throw new Error(

        "Monthly analysis failed"

    );

}

if(

    analysis.savingRate <=

    0

){

    throw new Error(

        "Saving rate failed"

    );

}

// =====================

// Health Score Test

// =====================

const score =

cashflowAgent.healthScore();

if(

    score <=

    0

){

    throw new Error(

        "Health score failed"

    );

}

// =====================

// Report Test

// =====================

const report =

cashflowAgent.generateReport();

if(

    !report.analysis

){

    throw new Error(

        "Report generation failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Agent V7 Test Passed"

);
