/*

Family Wealth AI OS V7.7

Tax Facade Test

*/

import TaxFacade from "../taxFacade.js";

// =====================

// Create Facade

// =====================

const facade =

    new TaxFacade();

// =====================

// Initialize Test

// =====================

const init =

    facade.initialize();

if(

    init.status !== "initialized"

){

    throw new Error(

        "Tax facade initialize failed"

    );

}

// =====================

// Analysis Test

// =====================

const result =

    facade.analyze({

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

    result.report.taxYear !== 2026

){

    throw new Error(

        "Tax facade analysis year failed"

    );

}

// =====================

// Estimated Tax Test

// =====================

if(

    result.report.estimatedTax !== 34000

){

    throw new Error(

        "Tax facade estimated tax failed"

    );

}

// =====================

// Status Test

// =====================

const status =

    facade.getStatus();

if(

    status.initialized !== true

){

    throw new Error(

        "Tax facade status failed"

    );

}

// =====================

// Registry Test

// =====================

const registry =

    facade.getRegistry();

if(

    registry.name !== "Tax Module"

){

    throw new Error(

        "Tax facade registry failed"

    );

}

console.log(

    "Tax Facade Test Passed"

);
