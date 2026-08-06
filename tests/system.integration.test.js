/*

Family Wealth AI OS

System Integration Test

*/

import SystemManager from "../core/system/systemManager.js";

import AgentRegistry from "../core/registry/agentRegistry.js";

import ModuleRegistry from "../core/registry/moduleRegistry.js";

import Advisor from "../ai/advisor.js";

// =====================

// Start System

// =====================

const result =

SystemManager.start();

console.log(

    "System Start:",

    result

);

// =====================

// Check Modules

// =====================

const modules =

ModuleRegistry.list();

console.log(

    "Modules:",

    modules

);

if(

    modules.length === 0

){

    throw new Error(

        "No modules loaded"

    );

}

// =====================

// Check Agents

// =====================

const agents =

AgentRegistry.list();

console.log(

    "Agents:",

    agents

);

if(

    agents.length === 0

){

    throw new Error(

        "No agents loaded"

    );

}

// =====================

// Advisor Test

// =====================

const advisorAgents =

Advisor.listAgents();

console.log(

    "Advisor Agents:",

    advisorAgents

);

if(

    advisorAgents.length ===0

){

    throw new Error(

        "Advisor cannot access agents"

    );

}

console.log(

    "SYSTEM INTEGRATION TEST PASSED"

);
