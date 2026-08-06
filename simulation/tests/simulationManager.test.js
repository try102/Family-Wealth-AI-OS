/*

Family Wealth AI OS V7.4

Simulation Manager Test

*/

import SimulationManager from "../simulationManager.js";

import Simulation from "../simulation.js";

// =====================

// Reset

// =====================

SimulationManager.clear();

// =====================

// Add Test

// =====================

const retirement = new Simulation({

    id:1,

    name:"Retirement Monte Carlo",

    initialAmount:1000000,

    annualContribution:50000,

    expectedReturn:0.07,

    volatility:0.15,

    years:30,

    trials:10000

});

const added =

SimulationManager.add(

    retirement

);

if(

    added.name !== "Retirement Monte Carlo"

){

    throw new Error(

        "Simulation add failed"

    );

}

// =====================

// List Test

// =====================

if(

    SimulationManager.list().length !==1

){

    throw new Error(

        "Simulation list failed"

    );

}

// =====================

// Get Test

// =====================

const found =

SimulationManager.get(

    1

);

if(

    found.trials !==10000

){

    throw new Error(

        "Simulation get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

SimulationManager.update(

    1,

    {

        volatility:0.20

    }

);

if(

    updated.volatility !==0.20

){

    throw new Error(

        "Simulation update failed"

    );

}

// =====================

// Invalid Simulation Test

// =====================

try{

    SimulationManager.add({});

    throw new Error(

        "Invalid simulation check failed"

    );

}

catch(error){

}

// =====================

// Remove Test

// =====================

SimulationManager.remove(

    1

);

if(

    SimulationManager.list().length !==0

){

    throw new Error(

        "Simulation remove failed"

    );

}

// =====================

// Clear Test

// =====================

SimulationManager.add(

    new Simulation({

        id:2,

        name:"Education Simulation"

    })

);

SimulationManager.clear();

if(

    SimulationManager.list().length !==0

){

    throw new Error(

        "Simulation clear failed"

    );

}

console.log(

    "Simulation Manager Test Passed"

);
