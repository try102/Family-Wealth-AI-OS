/*

Family Wealth AI OS V7.7

Tax Plan Model Test

*/

import TaxPlan from "../taxPlan.js";

// =====================

// Create Tax Plan

// =====================

const taxPlan = new TaxPlan({

    id:1,

    name:"2026 Tax Plan",

    taxYear:2026,

    income:200000,

    deductions:30000,

    taxableIncome:170000,

    estimatedTax:35000

});

// =====================

// ID Test

// =====================

if(

    taxPlan.id !== 1

){

    throw new Error(

        "Tax plan id failed"

    );

}

// =====================

// Name Test

// =====================

if(

    taxPlan.name !== "2026 Tax Plan"

){

    throw new Error(

        "Tax plan name failed"

    );

}

// =====================

// Year Test

// =====================

if(

    taxPlan.taxYear !== 2026

){

    throw new Error(

        "Tax year failed"

    );

}

// =====================

// Income Test

// =====================

if(

    taxPlan.income !== 200000

){

    throw new Error(

        "Income failed"

    );

}

// =====================

// Deduction Test

// =====================

if(

    taxPlan.deductions !== 30000

){

    throw new Error(

        "Deductions failed"

    );

}

// =====================

// Taxable Income Test

// =====================

if(

    taxPlan.taxableIncome !== 170000

){

    throw new Error(

        "Taxable income failed"

    );

}

// =====================

// Estimated Tax Test

// =====================

if(

    taxPlan.estimatedTax !== 35000

){

    throw new Error(

        "Estimated tax failed"

    );

}

console.log(

    "Tax Plan Test Passed"

);
