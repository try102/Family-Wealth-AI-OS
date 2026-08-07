/*

Family Wealth AI OS V7.7

Tax Registry Test

*/

import TaxRegistry from "../taxRegistry.js";

// =====================

// Create Registry

// =====================

const registry =

    new TaxRegistry();

// =====================

// Module Test

// =====================

const module =

    registry.getModule();

if(

    module.name !== "Tax Module"

){

    throw new Error(

        "Tax registry module name failed"

    );

}

// =====================

// Version Test

// =====================

if(

    module.version !== "V7.7"

){

    throw new Error(

        "Tax registry version failed"

    );

}

// =====================

// Capability Test

// =====================

if(

    module.capabilities.length !== 4

){

    throw new Error(

        "Tax registry capabilities failed"

    );

}

// =====================

// Existing Capability Test

// =====================

if(

    registry.hasCapability(

        "taxPlanning"

    ) !== true

){

    throw new Error(

        "Tax registry capability check failed"

    );

}

// =====================

// Missing Capability Test

// =====================

if(

    registry.hasCapability(

        "investment"

    ) !== false

){

    throw new Error(

        "Tax registry invalid capability failed"

    );

}

console.log(

    "Tax Registry Test Passed"

);
