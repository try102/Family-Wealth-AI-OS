/*

Family Wealth AI OS V7.7

Tax Event Test

*/

import TaxEvent from "../taxEvent.js";

// =====================

// Create Event

// =====================

const event =

    new TaxEvent({

        type:

            "TAX_REPORT_CREATED",

        taxYear:

            2026,

        data:{

            estimatedTax:34000

        }

    });

// =====================

// Type Test

// =====================

if(

    event.type !== "TAX_REPORT_CREATED"

){

    throw new Error(

        "Tax event type failed"

    );

}

// =====================

// Year Test

// =====================

if(

    event.taxYear !== 2026

){

    throw new Error(

        "Tax event year failed"

    );

}

// =====================

// Data Test

// =====================

if(

    event.data.estimatedTax !== 34000

){

    throw new Error(

        "Tax event data failed"

    );

}

// =====================

// Timestamp Test

// =====================

if(

    event.timestamp === undefined

){

    throw new Error(

        "Tax event timestamp failed"

    );

}

console.log(

    "Tax Event Test Passed"

);
