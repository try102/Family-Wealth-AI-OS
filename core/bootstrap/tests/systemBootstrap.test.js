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

// Agents Test

// =====================

const agents =

AgentRegistry.list();

console.log(

    "Registered Agents:",

    agents

);

// =====================

// Modules Test

// =====================

const modules =

ModuleRegistry.list();

console.log(

    "Registered Modules:",

    modules

);

// =====================

// Bootstrap Status

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

// Investment Test

// =====================

const investment =

ModuleRegistry.get(

    "investment"

);

if(

    !investment

){

    throw new Error(

        "Investment module missing"

    );

}

// =====================

// Tax Test

// =====================

const tax =

ModuleRegistry.get(

    "tax"

);

if(

    !tax

){

    throw new Error(

        "Tax module missing"

    );

}

// =====================

// Liability Test

// =====================

const liability =

ModuleRegistry.get(

    "liability"

);

if(

    !liability

){

    throw new Error(

        "Liability module missing"

    );

}

if(

    liability.name !==

    "Liability Module V7"

){

    throw new Error(

        "Liability module invalid"

    );

}

// =====================

// Income Test

// =====================

const income =

ModuleRegistry.get(

    "income"

);

if(

    !income

){

    throw new Error(

        "Income module missing"

    );

}

if(

    income.name !==

    "Income Module V7"

){

    throw new Error(

        "Income module invalid"

    );

}

// =====================

// Cashflow Test

// =====================

const cashflow =

ModuleRegistry.get(

    "cashflow"

);

if(

    !cashflow

){

    throw new Error(

        "Cashflow module missing"

    );

}

if(

    cashflow.name !==

    "Cashflow Module V7"

){

    throw new Error(

        "Cashflow module invalid"

    );

}

if(

    cashflow.status !==

    "READY"

){

    throw new Error(

        "Cashflow module status failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "System Bootstrap V7 Test Passed"

);
