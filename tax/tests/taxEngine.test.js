/*

Family Wealth AI OS V7.7

Tax Engine Test

*/

import TaxEngine from "../taxEngine.js";

// =====================

// Create Engine

// =====================

const engine =

    new TaxEngine();

// =====================

// Generate Report

// =====================

const report =

    engine.generateReport({

        id:1,

        taxYear:2026,

        income:200000,

        deductions:30000,

        taxRate:0.2,

        strategies:[

            "Retirement Contribution Strategy"

        ]

    });

// =====================

// Year Test

// =====================

if(

    report.taxYear !== 2026

){

    throw new Error(

        "Tax engine year failed"

    );

}

// =====================

// Income Test

// =====================

if(

    report.totalIncome !== 200000

){

    throw new Error(

        "Tax engine income failed"

    );

}

// =====================

// Deduction Test

// =====================

if(

    report.totalDeductions !== 30000

){

    throw new Error(

        "Tax engine deductions failed"

    );

}

// =====================

// Taxable Income Test

// =====================

if(

    report.taxableIncome !== 170000

){

    throw new Error(

        "Tax engine taxable income failed"

    );

}

// =====================

// Estimated Tax Test

// =====================

if(

    report.estimatedTax !== 34000

){

    throw new Error(

        "Tax engine estimated tax failed"

    );

}

// =====================

// Strategy Test

// =====================

if(

    report.strategies.length !== 1

){

    throw new Error(

        "Tax engine strategies failed"

    );

}

console.log(

    "Tax Engine Test Passed"

);
