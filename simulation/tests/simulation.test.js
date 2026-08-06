/*

Family Wealth AI OS V7.4

Simulation Model Test

*/

import Simulation from "../simulation.js";

// =====================

// Create Simulation

// =====================

const simulation = new Simulation({

    id:1,

    name:"Retirement Monte Carlo",

    initialAmount:1000000,

    annualContribution:50000,

    expectedReturn:0.07,

    volatility:0.15,

    years:30,

    trials:10000

});

// =====================

// ID Test

// =====================

if(

    simulation.id !== 1

){

    throw new Error(

        "Simulation id failed"

    );

}

// =====================

// Name Test

// =====================

if(

    simulation.name !== "Retirement Monte Carlo"

){

    throw new Error(

        "Simulation name failed"

    );

}

// =====================

// Initial Amount Test

// =====================

if(

    simulation.initialAmount !== 1000000

){

    throw new Error(

        "Initial amount failed"

    );

}

// =====================

// Contribution Test

// =====================

if(

    simulation.annualContribution !== 50000

){

    throw new Error(

        "Annual contribution failed"

    );

}

// =====================

// Return Test

// =====================

if(

    simulation.expectedReturn !== 0.07

){

    throw new Error(

        "Expected return failed"

    );

}

// =====================

// Volatility Test

// =====================

if(

    simulation.volatility !== 0.15

){

    throw new Error(

        "Volatility failed"

    );

}

// =====================

// Years Test

// =====================

if(

    simulation.years !== 30

){

    throw new Error(

        "Years failed"

    );

}

// =====================

// Trials Test

// =====================

if(

    simulation.trials !== 10000

){

    throw new Error(

        "Trials failed"

    );

}

console.log(

    "Simulation Test Passed"

);
