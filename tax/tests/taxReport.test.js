/*

Family Wealth AI OS V7.7

Tax Report Test

*/

import TaxReport from "../taxReport.js";

// =====================

// Create Tax Report

// =====================

const report = new TaxReport({

    id:1,

    taxYear:2026,

    totalIncome:200000,

    totalDeductions:30000,

    taxableIncome:170000,

    estimatedTax:34000,

    strategies:[

        "Retirement Contribution Strategy"

    ]

});

// =====================

// ID Test

// =====================

if(

    report.id !== 1

){

    throw new Error(

        "Tax report id failed"

    );

}

// =====================

// Year Test

// =====================

if(

    report.taxYear !== 2026

){

    throw new Error(

        "Tax report year failed"

    );

}

// =====================

// Income Test

// =====================

if(

    report.totalIncome !== 200000

){

    throw new Error(

        "Total income failed"

    );

}

// =====================

// Deduction Test

// =====================

if(

    report.totalDeductions !== 30000

){

    throw new Error(

        "Total deductions failed"

    );

}

// =====================

// Taxable Income Test

// =====================

if(

    report.taxableIncome !== 170000

){

    throw new Error(

        "Taxable income failed"

    );

}

// =====================

// Estimated Tax Test

// =====================

if(

    report.estimatedTax !== 34000

){

    throw new Error(

        "Estimated tax failed"

    );

}

// =====================

// Strategy Test

// =====================

if(

    report.strategies.length !== 1

){

    throw new Error(

        "Strategies failed"

    );

}

console.log(

    "Tax Report Test Passed"

);
