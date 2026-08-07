/*

Family Wealth AI OS V7.7

Tax Controller Test

*/

import TaxController from "../taxController.js";

// =====================

// Create Controller

// =====================

const controller =

    new TaxController();

// =====================

// Create Tax Analysis

// =====================

const result =

    controller.createTaxAnalysis({

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

// Report Test

// =====================

if(

    result.report.taxYear !== 2026

){

    throw new Error(

        "Tax controller report failed"

    );

}

// =====================

// Estimated Tax Test

// =====================

if(

    result.report.estimatedTax !== 34000

){

    throw new Error(

        "Tax controller tax failed"

    );

}

// =====================

// Optimization Test

// =====================

if(

    result.optimization.taxYear !== 2026

){

    throw new Error(

        "Tax controller optimization failed"

    );

}

// =====================

// Generate Report Test

// =====================

const report =

    controller.generateReport({

        id:2,

        taxYear:2027,

        income:300000,

        deductions:50000,

        taxRate:0.2

    });

if(

    report.taxYear !== 2027

){

    throw new Error(

        "Generate report failed"

    );

}

// =====================

// Optimize Tax Test

// =====================

const optimization =

    controller.optimizeTax(

        report

    );

if(

    optimization.taxYear !== 2027

){

    throw new Error(

        "Optimize tax failed"

    );

}

console.log(

    "Tax Controller Test Passed"

);
