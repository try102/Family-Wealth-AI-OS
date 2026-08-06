/*

Family Wealth AI OS

Cash Flow Engine Test

*/

import CashFlowEngine from "../cashFlowEngine.js";

// =====================

// Reset

// =====================

CashFlowEngine.clear();

// =====================

// Add Income Test

// =====================

const salary =

CashFlowEngine.add(

    "INCOME",

    10000,

    {

        source:

        "Salary"

    }

);

console.log(

    "Income:",

    salary

);

if(

    salary.amount !==10000

){

    throw new Error(

        "Cash flow income add failed"

    );

}

// =====================

// Add Expense Test

// =====================

CashFlowEngine.add(

    "EXPENSE",

    3000,

    {

        category:

        "Living"

    }

);

// =====================

// Income Calculation Test

// =====================

const income =

CashFlowEngine.income();

if(

    income !==10000

){

    throw new Error(

        "Income calculation failed"

    );

}

// =====================

// Expense Calculation Test

// =====================

const expense =

CashFlowEngine.expense();

if(

    expense !==3000

){

    throw new Error(

        "Expense calculation failed"

    );

}

// =====================

// Net Cash Flow Test

// =====================

const net =

CashFlowEngine.net();

console.log(

    "Net:",

    net

);

if(

    net !==7000

){

    throw new Error(

        "Net cash flow failed"

    );

}

// =====================

// Report Test

// =====================

const report =

CashFlowEngine.report();

if(

    report.income !==10000

){

    throw new Error(

        "Report income failed"

    );

}

if(

    report.expense !==3000

){

    throw new Error(

        "Report expense failed"

    );

}

// =====================

// Clear Test

// =====================

CashFlowEngine.clear();

if(

    CashFlowEngine.list()

    .length !==0

){

    throw new Error(

        "Cash flow clear failed"

    );

}

console.log(

    "Cash Flow Engine Test Passed"

);
