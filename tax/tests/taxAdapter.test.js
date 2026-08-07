/*

Family Wealth AI OS V7.7

Tax Adapter Test

*/

import TaxAdapter from "../taxAdapter.js";

// =====================

// Create Adapter

// =====================

const adapter =

    new TaxAdapter();

// =====================

// Create Mock Analysis

// =====================

const analysis = {

    report:{

        taxYear:2026,

        estimatedTax:34000,

        taxableIncome:170000

    },

    optimization:{

        opportunities:[

            {

                type:"Deduction",

                message:

                    "Potential deduction optimization opportunity"

            }

        ]

    }

};

// =====================

// Adapt Test

// =====================

const result =

    adapter.adapt(

        analysis

    );

// =====================

// Module Test

// =====================

if(

    result.module !== "tax"

){

    throw new Error(

        "Tax adapter module failed"

    );

}

// =====================

// Type Test

// =====================

if(

    result.type !== "taxAnalysis"

){

    throw new Error(

        "Tax adapter type failed"

    );

}

// =====================

// Year Test

// =====================

if(

    result.taxYear !== 2026

){

    throw new Error(

        "Tax adapter year failed"

    );

}

// =====================

// Tax Test

// =====================

if(

    result.estimatedTax !== 34000

){

    throw new Error(

        "Tax adapter estimated tax failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

    adapter.summary(

        analysis

    );

if(

    summary.opportunityCount !== 1

){

    throw new Error(

        "Tax adapter summary failed"

    );

}

console.log(

    "Tax Adapter Test Passed"

);
