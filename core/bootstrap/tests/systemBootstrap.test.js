/*

Family Wealth AI OS V7

System Bootstrap Test

*/

import SystemBootstrap

from "../systemBootstrap.js";

import AgentRegistry

from "../../registry/agentRegistry.js";

import ModuleRegistry

from "../../registry/moduleRegistry.js";

import EngineRegistry

from "../../engines/engineRegistry.js";

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

// Status Test

// =====================

if(

    result.status !==

    "READY"

){

    throw new Error(

        "Bootstrap failed"

    );

}

// =====================

// Advisor Test

// =====================

if(

    result.advisor !==

    "Family Wealth Advisor AI V7"

){

    throw new Error(

        "Advisor loading failed"

    );

}

// =====================

// Agent Test

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

        "No agents registered"

    );

}

// =====================

// Module Test

// =====================

const requiredModules = [

    "assets",

    "investment",

    "tax",

    "liability",

    "income",

    "cashflow"

];

requiredModules.forEach(

    name => {

        const module =

        ModuleRegistry.get(

            name

        );

        if(

            !module

        ){

            throw new Error(

                name +

                " module missing"

            );

        }

    }

);

// =====================

// Engine Test

// =====================

const requiredEngines = [

    "wealth",

    "cashflow"

];

requiredEngines.forEach(

    name => {

        const engine =

        EngineRegistry.get(

            name

        );

        if(

            !engine

        ){

            throw new Error(

                name +

                " engine missing"

            );

        }

    }

);

// =====================

// Wealth Engine Test

// =====================

const wealthEngine =

EngineRegistry.get(

    "wealth"

);

if(

    typeof wealthEngine.analyze !==

    "function"

){

    throw new Error(

        "Wealth Engine invalid"

    );

}

// =====================

// Cashflow Engine Test

// =====================

const cashflowEngine =

EngineRegistry.get(

    "cashflow"

);

if(

    typeof cashflowEngine.report !==

    "function"

){

    throw new Error(

        "Cashflow Engine invalid"

    );

}

// =====================

// Final

// =====================

console.log(

    "System Bootstrap V7 Test Passed"

);
