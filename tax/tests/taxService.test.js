/*

Family Wealth AI OS V7.7

Tax Service Test

*/

import TaxService from "../taxService.js";

// =====================

// Create Service

// =====================

const service =

    new TaxService();

// =====================

// Create Tax Analysis

// =====================

const result =

    service.analyze({

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

        "Tax service report year failed"

    );

}

// =====================

// Income Test

// =====================

if(

    result.report.totalIncome !== 200000

){

    throw new Error(

        "Tax service income failed"

    );

}

// =====================

// Tax Test

// =====================

if(

    result.report.estimatedTax !== 34000

){

    throw new Error(

        "Tax service estimated tax failed"

    );

}

// =====================

// Optimization Test

// =====================

if(

    result.optimization.taxYear !== 2026

){

    throw new Error(

        "Tax service optimization failed"

    );

}

// =====================

// Opportunity Test

// =====================

if(

    result.optimization.opportunities.length === 0

){

    throw new Error(

        "Tax service opportunities failed"

    );

}

console.log(

    "Tax Service Test Passed"

);
