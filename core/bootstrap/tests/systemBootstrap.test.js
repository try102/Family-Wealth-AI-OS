/*

Family Wealth AI OS

System Bootstrap Test V7

*/

import SystemBootstrap from "../systemBootstrap.js";

import AgentRegistry from "../../registry/agentRegistry.js";

import ModuleRegistry from "../../registry/moduleRegistry.js";

// =====================

// Start System

// =====================

const result =

SystemBootstrap.initialize();

console.log(

    "Bootstrap Result:",

    result

);

// =====================

// Test Agents

// =====================

const agents =

AgentRegistry.list();

console.log(

    "Registered Agents:",

    agents

);

// =====================

// Test Modules

// =====================

const modules =

ModuleRegistry.list();

console.log(

    "Registered Modules:",

    modules

);

// =====================

// Basic Assertions

// =====================

if(

    result.status !==

    "READY"

){

    throw new Error(

        "Bootstrap failed"

    );

}

if(

    agents.length === 0

){

    throw new Error(

        "No agents registered"

    );

}

if(

    modules.length === 0

){

    throw new Error(

        "No modules registered"

    );

}

// =====================

// Tax Module Test

// =====================

const tax =

ModuleRegistry.get(

    "tax"

);

if(

    !tax

){

    throw new Error(

        "Tax module not registered"

    );

}

if(

    tax.constructor.name !==

    "TaxFacade"

){

    throw new Error(

        "Tax module type failed"

    );

}

// =====================

// Liability Module Test

// =====================

const liability =

ModuleRegistry.get(

    "liability"

);

if(

    !liability

){

    throw new Error(

        "Liability module not registered"

    );

}

if(

    liability.name !==

    "Liability Module V7"

){

    throw new Error(

        "Liability module name failed"

    );

}

if(

    liability.status !==

    "READY"

){

    throw new Error(

        "Liability module status failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "System Bootstrap V7 Test Passed"

);
