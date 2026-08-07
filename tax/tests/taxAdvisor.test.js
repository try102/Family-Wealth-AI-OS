/*

Family Wealth AI OS V7.7

Tax Advisor Test

*/

import TaxAdvisor from "../taxAdvisor.js";

// =====================

// Create Advisor

// =====================

const advisor =

    new TaxAdvisor();

// =====================

// Create Mock Report

// =====================

const report = {

    taxYear:2026,

    totalIncome:200000,

    totalDeductions:30000,

    estimatedTax:34000,

    strategies:[

        "Retirement Contribution Strategy"

    ]

};

// =====================

// Analyze Report

// =====================

const result =

    advisor.analyze(

        report

    );

// =====================

// Year Test

// =====================

if(

    result.taxYear !== 2026

){

    throw new Error(

        "Tax advisor year failed"

    );

}

// =====================

// Tax Test

// =====================

if(

    result.estimatedTax !== 34000

){

    throw new Error(

        "Tax advisor tax failed"

    );

}

// =====================

// Recommendation Test

// =====================

if(

    result.recommendations.length === 0

){

    throw new Error(

        "Tax advisor recommendations failed"

    );

}

console.log(

    "Tax Advisor Test Passed"

);
