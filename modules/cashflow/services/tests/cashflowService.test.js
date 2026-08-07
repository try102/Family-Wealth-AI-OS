/*

Family Wealth AI OS V7

Cashflow Service Test

*/

import cashflowService

from "../cashflowService.js";

import cashflowRepository

from "../../repository/cashflowRepository.js";

// =====================

// Clear Before Test

// =====================

cashflowRepository.clear();

// =====================

// Create Test

// =====================

const income =

cashflowService.create({

    type:

    "INCOME",

    category:

    "Salary",

    amount:

    10000

});

if(

    !income.id

){

    throw new Error(

        "Service create income failed"

    );

}

const expense =

cashflowService.create({

    type:

    "EXPENSE",

    category:

    "Living",

    amount:

    3000

});

if(

    !expense.id

){

    throw new Error(

        "Service create expense failed"

    );

}

// =====================

// List Test

// =====================

const list =

cashflowService.list();

if(

    list.length !== 2

){

    throw new Error(

        "Service list failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

cashflowService.summary();

if(

    summary.income !==

    10000

){

    throw new Error(

        "Income summary failed"

    );

}

if(

    summary.expense !==

    3000

){

    throw new Error(

        "Expense summary failed"

    );

}

if(

    summary.net !==

    7000

){

    throw new Error(

        "Net cashflow failed"

    );

}

// =====================

// Monthly Cashflow Test

// =====================

const monthly =

cashflowService.monthlyCashflow();

if(

    monthly.net !==

    7000

){

    throw new Error(

        "Monthly cashflow failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Service V7 Test Passed"

);
