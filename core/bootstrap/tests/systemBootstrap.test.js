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

        "Liability module failed"

    );

}

// =====================

// Income Module Test

// =====================

const income =

ModuleRegistry.get(

    "income"

);

if(

    !income

){

    throw new Error(

        "Income module not registered"

    );

}

if(

    income.name !==

    "Income Module V7"

){

    throw new Error(

        "Income module failed"

    );

}

if(

    income.status !==

    "READY"

){

    throw new Error(

        "Income module status failed"

    );

}

// =====================

// Investment Module Test

// =====================

const investment =

ModuleRegistry.get(

    "investment"

);

if(

    !investment

){

    throw new Error(

        "Investment module not registered"

    );

}

// =====================

// Final

// =====================

console.log(

    "System Bootstrap V7 Test Passed"

);
