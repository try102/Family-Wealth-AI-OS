/*

Family Wealth AI OS

State Manager Test

*/

import StateManager from "../stateManager.js";

// =====================

// Reset

// =====================

StateManager.clear();

// =====================

// Set Test

// =====================

const value =

StateManager.set(

    "systemStatus",

    "READY"

);

console.log(

    "Set Value:",

    value

);

if(

    value !== "READY"

){

    throw new Error(

        "State set failed"

    );

}

// =====================

// Get Test

// =====================

const status =

StateManager.get(

    "systemStatus"

);

console.log(

    "State:",

    status

);

if(

    status !== "READY"

){

    throw new Error(

        "State get failed"

    );

}

// =====================

// Has Test

// =====================

if(

    StateManager.has(

        "systemStatus"

    )

    !== true

){

    throw new Error(

        "State has failed"

    );

}

// =====================

// Remove Test

// =====================

StateManager.remove(

    "systemStatus"

);

if(

    StateManager.has(

        "systemStatus"

    )

){

    throw new Error(

        "State remove failed"

    );

}

// =====================

// Clear Test

// =====================

StateManager.set(

    "test",

    true

);

StateManager.clear();

if(

    Object.keys(

        StateManager.all()

    )

    .length !== 0

){

    throw new Error(

        "State clear failed"

    );

}

console.log(

    "State Manager Test Passed"

);
