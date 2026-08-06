/*

Family Wealth AI OS

Tax Engine Test

*/

import TaxEngine from "../taxEngine.js";

// =====================

// Reset

// =====================

TaxEngine.clear();

// =====================

// Add Income Test

// =====================

const income =

TaxEngine.add(

    "INCOME",

    100000,

    {

        source:

        "Salary"

    }

);

console.log(

    "Income Record:",

    income

);

if(

    income.amount !==100000

){

    throw new Error(

        "Tax income add failed"

    );

}

// =====================

// Add Capital Gain Test

// =====================

TaxEngine.add(

    "CAPITAL_GAIN",

    20000,

    {

        source:

        "Stock Sale"

    }

);

// =====================

// Total Test

// =====================

const totalIncome =

TaxEngine.total(

    "INCOME"

);

if(

    totalIncome !==100000

){

    throw new Error(

        "Tax total income failed"

    );

}

const gain =

TaxEngine.total(

    "CAPITAL_GAIN"

);

if(

    gain !==20000

){

    throw new Error(

        "Tax capital gain failed"

    );

}

// =====================

// Estimate Test

// =====================

const tax =

TaxEngine.estimate(

    0.2

);

console.log(

    "Estimated Tax:",

    tax

);

if(

    tax !==24000

){

    throw new Error(

        "Tax estimate failed"

    );

}

// =====================

// Report Test

// =====================

const report =

TaxEngine.report();

if(

    report.totalIncome !==100000

){

    throw new Error(

        "Tax report income failed"

    );

}

if(

    report.capitalGain !==20000

){

    throw new Error(

        "Tax report gain failed"

    );

}

// =====================

// Clear Test

// =====================

TaxEngine.clear();

if(

    TaxEngine.list()

    .length !==0

){

    throw new Error(

        "Tax clear failed"

    );

}

console.log(

    "Tax Engine Test Passed"

);
