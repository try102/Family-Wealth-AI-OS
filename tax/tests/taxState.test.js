/*

Family Wealth AI OS V7.7

Tax State Test

*/

import TaxState from "../taxState.js";

// =====================

// Create State

// =====================

const state =

    new TaxState();

// =====================

// Initial Status Test

// =====================

if(

    state.status !== "initialized"

){

    throw new Error(

        "Tax state initial status failed"

    );

}

// =====================

// Set Year Test

// =====================

state.setTaxYear(

    2026

);

if(

    state.taxYear !== 2026

){

    throw new Error(

        "Tax state year failed"

    );

}

// =====================

// Report Update Test

// =====================

state.setReport({

    estimatedTax:34000

});

if(

    state.status !== "report_updated"

){

    throw new Error(

        "Tax state report update failed"

    );

}

// =====================

// Optimization Update Test

// =====================

state.setOptimization({

    opportunities:[]

});

if(

    state.status !== "optimization_updated"

){

    throw new Error(

        "Tax state optimization update failed"

    );

}

// =====================

// Get State Test

// =====================

const result =

    state.getState();

if(

    result.taxYear !== 2026

){

    throw new Error(

        "Tax state get failed"

    );

}

if(

    result.report.estimatedTax !== 34000

){

    throw new Error(

        "Tax state report data failed"

    );

}

console.log(

    "Tax State Test Passed"

);
