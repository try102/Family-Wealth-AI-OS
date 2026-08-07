/*

Family Wealth AI OS V7

Cashflow API Test

*/

import cashflowAPI

from "../cashflowAPI.js";

import cashflowService

from "../../services/cashflowService.js";

import cashflowRepository

from "../../repository/cashflowRepository.js";

// =====================

// Clear Before Test

// =====================

cashflowRepository.clear();

// =====================

// Create API Test

// =====================

const record =

cashflowAPI.createCashflow({

    type:

    "INCOME",

    category:

    "Salary",

    amount:

    15000

});

if(

    !record.id

){

    throw new Error(

        "API create failed"

    );

}

// =====================

// Get List Test

// =====================

const list =

cashflowAPI.getCashflows();

if(

    list.length !== 1

){

    throw new Error(

        "API get list failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

cashflowAPI.getSummary();

if(

    summary.income !==

    15000

){

    throw new Error(

        "API summary failed"

    );

}

// =====================

// Monthly Test

// =====================

const monthly =

cashflowAPI.getMonthlyCashflow();

if(

    monthly.net !==

    15000

){

    throw new Error(

        "API monthly cashflow failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow API V7 Test Passed"

);
