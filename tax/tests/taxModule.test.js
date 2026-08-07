/*

Family Wealth AI OS V7.7

Tax Module Test

*/

import TaxModule from "../taxModule.js";

// =====================

// Create Module

// =====================

const taxModule =

    new TaxModule();

// =====================

// Module Name Test

// =====================

if(

    taxModule.name !== "Tax Module"

){

    throw new Error(

        "Tax module name failed"

    );

}

// =====================

// Analyze Test

// =====================

const analysis =

    taxModule.analyze({

        id:1,

        taxYear:2026,

        income:200000,

        deductions:30000,

        taxRate:0.2,

        strategies:[

            "Retirement Contribution Strategy"

        ]

    });

if(

    analysis.report.taxYear !== 2026

){

    throw new Error(

        "Tax module analysis failed"

    );

}

// =====================

// Report Test

// =====================

const report =

    taxModule.report({

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

        "Tax module report failed"

    );

}

// =====================

// Optimization Test

// =====================

const optimization =

    taxModule.optimize(

        report

    );

if(

    optimization.taxYear !== 2027

){

    throw new Error(

        "Tax module optimization failed"

    );

}

console.log(

    "Tax Module Test Passed"

);
