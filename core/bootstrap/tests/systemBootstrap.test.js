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

// Agent Test

// =====================

const agents =

AgentRegistry.list();

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

const modules =

ModuleRegistry.list();

console.log(

    "Modules:",

    modules

);

const requiredModules = [

    "investment",

    "tax",

    "liability",

    "income",

    "cashflow"

];

requiredModules.forEach(

    name => {

        if(

            !ModuleRegistry.get(

                name

            )

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

const engines =

EngineRegistry.list();

console.log(

    "Engines:",

    engines

);

const requiredEngines = [

    "wealth",

    "cashflow"

];

requiredEngines.forEach(

    name => {

        if(

            !EngineRegistry.get(

                name

            )

        ){

            throw new Error(

                name +

                " engine missing"

            );

        }

    }

);

// =====================

// Wealth Engine Type Test

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

// Cashflow Engine Type Test

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
