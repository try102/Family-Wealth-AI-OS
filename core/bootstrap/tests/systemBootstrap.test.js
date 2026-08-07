/*

Family Wealth AI OS

System Bootstrap Test

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

    result.status !== "READY"

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

    tax.constructor.name !== "TaxFacade"

){

    throw new Error(

        "Tax module type failed"

    );

}

console.log(

    "System Bootstrap Test Passed"

);
