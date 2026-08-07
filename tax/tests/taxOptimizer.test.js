/*

Family Wealth AI OS V7.7

Tax Optimizer Test

*/

import TaxOptimizer from "../taxOptimizer.js";

// =====================

// Create Optimizer

// =====================

const optimizer =

    new TaxOptimizer();

// =====================

// Create Mock Report

// =====================

const report = {

    taxYear:2026,

    totalIncome:200000,

    totalDeductions:30000,

    taxableIncome:170000,

    estimatedTax:34000,

    strategies:[

        "Retirement Contribution Strategy"

    ]

};

// =====================

// Optimize Test

// =====================

const result =

    optimizer.optimize(

        report

    );

// =====================

// Year Test

// =====================

if(

    result.taxYear !== 2026

){

    throw new Error(

        "Tax optimizer year failed"

    );

}

// =====================

// Opportunity Test

// =====================

if(

    result.opportunities.length === 0

){

    throw new Error(

        "Tax optimization opportunity failed"

    );

}

// =====================

// Structure Test

// =====================

if(

    result.opportunities[0].type === undefined

){

    throw new Error(

        "Tax optimization structure failed"

    );

}

console.log(

    "Tax Optimizer Test Passed"

);
