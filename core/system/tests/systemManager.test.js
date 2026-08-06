/*

Family Wealth AI OS

System Manager Test

*/

import SystemManager from "../systemManager.js";

// =====================

// Start Test

// =====================

const result =

SystemManager.start();

console.log(

    "System Start:",

    result

);

// =====================

// Status Test

// =====================

const status =

SystemManager.status();

console.log(

    "System Status:",

    status

);

// =====================

// Assertions

// =====================

if(

    status.initialized !== true

){

    throw new Error(

        "System not initialized"

    );

}

if(

    !Array.isArray(

        status.modules

    )

){

    throw new Error(

        "Module registry failed"

    );

}

if(

    !Array.isArray(

        status.agents

    )

){

    throw new Error(

        "Agent registry failed"

    );

}

console.log(

    "System Manager Test Passed"

);
