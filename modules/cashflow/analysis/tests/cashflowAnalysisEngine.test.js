/*

Family Wealth AI OS V7

Cashflow Analysis Engine Test

*/

import cashflowAnalysisEngine

from "../cashflowAnalysisEngine.js";

import cashflowRepository

from "../../repository/cashflowRepository.js";

import cashflowAPI

from "../../api/cashflowAPI.js";

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

    40000

});

cashflowAPI.createCashflow({

    type:

    "EXPENSE",

    category:

    "Living",

    amount:

    10000

});

// =====================

// Income Test

// =====================

const income =

cashflowAnalysisEngine.totalIncome();

if(

    income !== 40000

){

    throw new Error(

        "Total income calculation failed"

    );

}

// =====================

// Expense Test

// =====================

const expense =

cashflowAnalysisEngine.totalExpense();

if(

    expense !== 10000

){

    throw new Error(

        "Total expense calculation failed"

    );

}

// =====================

// Net Cashflow Test

// =====================

const net =

cashflowAnalysisEngine.netCashflow();

if(

    net !== 30000

){

    throw new Error(

        "Net cashflow failed"

    );

}

// =====================

// Saving Rate Test

// =====================

const savingRate =

cashflowAnalysisEngine.savingRate();

if(

    savingRate !== 0.75

){

    throw new Error(

        "Saving rate failed"

    );

}

// =====================

// Expense Ratio Test

// =====================

const expenseRatio =

cashflowAnalysisEngine.expenseRatio();

if(

    expenseRatio !== 0.25

){

    throw new Error(

        "Expense ratio failed"

    );

}

// =====================

// Health Score Test

// =====================

const score =

cashflowAnalysisEngine.healthScore();

if(

    score <= 0

){

    throw new Error(

        "Health score failed"

    );

}

// =====================

// Report Test

// =====================

const report =

cashflowAnalysisEngine.report();

if(

    !report.healthScore

){

    throw new Error(

        "Analysis report failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Analysis Engine V7 Test Passed"

);
