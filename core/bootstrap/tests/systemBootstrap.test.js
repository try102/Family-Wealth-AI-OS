/*

Family Wealth AI OS V7

System Bootstrap Test

*/

import SystemBootstrap from "../systemBootstrap.js";

import AgentRegistry from "../../registry/agentRegistry.js";

import ModuleRegistry from "../../registry/moduleRegistry.js";

import EngineRegistry from "../../engines/engineRegistry.js";

import AIRegistry from "../../ai/aiRegistry.js";

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

// Status

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

// Advisor

// =====================

if(

    result.advisor !==

    "Family Wealth Advisor AI V7"

){

    throw new Error(

        "Advisor failed"

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

        "Agents missing"

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

// AI Test

// =====================

const advisorAI =

AIRegistry.get(

    "advisor"

);

if(

    !advisorAI

){

    throw new Error(

        "Advisor AI missing"

    );

}

if(

    advisorAI.name !==

    "Family Wealth Advisor AI V7"

){

    throw new Error(

        "Advisor AI invalid"

    );

}

// =====================

// Final

// =====================

console.log(

    "System Bootstrap V7 Test Passed"

);
