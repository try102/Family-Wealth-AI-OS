/*

Family Wealth AI OS V7.7

Tax Strategy Test

*/

import TaxStrategy from "../taxStrategy.js";

// =====================

// Create Tax Strategy

// =====================

const strategy = new TaxStrategy({

    id:1,

    name:"Retirement Contribution Strategy",

    description:

        "Optimize retirement contribution for tax reduction",

    taxYear:2026,

    expectedSaving:5000

});

// =====================

// ID Test

// =====================

if(

    strategy.id !== 1

){

    throw new Error(

        "Tax strategy id failed"

    );

}

// =====================

// Name Test

// =====================

if(

    strategy.name !==

    "Retirement Contribution Strategy"

){

    throw new Error(

        "Tax strategy name failed"

    );

}

// =====================

// Description Test

// =====================

if(

    strategy.description !==

    "Optimize retirement contribution for tax reduction"

){

    throw new Error(

        "Tax strategy description failed"

    );

}

// =====================

// Year Test

// =====================

if(

    strategy.taxYear !== 2026

){

    throw new Error(

        "Tax strategy year failed"

    );

}

// =====================

// Saving Test

// =====================

if(

    strategy.expectedSaving !== 5000

){

    throw new Error(

        "Expected saving failed"

    );

}

console.log(

    "Tax Strategy Test Passed"

);
