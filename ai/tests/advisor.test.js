/*

Family Wealth AI OS V7

Advisor AI Test

*/

import Advisor

from "../advisor.js";

import ModuleRegistry

from "../../core/registry/moduleRegistry.js";

import EngineRegistry

from "../../core/engines/engineRegistry.js";

// =====================

// Mock Required Modules

// =====================

ModuleRegistry.register(

    "assets",

    {

        name:

        "Assets Module V7"

    }

);

ModuleRegistry.register(

    "income",

    {

        name:

        "Income Module V7"

    }

);

ModuleRegistry.register(

    "liability",

    {

        name:

        "Liability Module V7"

    }

);

ModuleRegistry.register(

    "cashflow",

    {

        name:

        "Cashflow Module V7"

    }

);

ModuleRegistry.register(

    "investment",

    {

        name:

        "Investment Module V7"

    }

);

ModuleRegistry.register(

    "tax",

    {

        name:

        "Tax Module V7"

    }

);

// =====================

// Mock Engine

// =====================

EngineRegistry.register(

    "wealth",

    {

        analyze(){

            return {};

        }

    }

);

EngineRegistry.register(

    "cashflow",

    {

        report(){

            return {};

        }

    }

);

// =====================

// Basic Test

// =====================

if(

    Advisor.name !==

    "Family Wealth Advisor AI V7"

){

    throw new Error(

        "Advisor name failed"

    );

}

if(

    Advisor.version !==

    "7.0"

){

    throw new Error(

        "Advisor version failed"

    );

}

if(

    Advisor.status !==

    "READY"

){

    throw new Error(

        "Advisor status failed"

    );

}

// =====================

// Module Test

// =====================

const modules =

Advisor.modules();

if(

    modules.length === 0

){

    throw new Error(

        "Advisor modules failed"

    );

}

// =====================

// Engine Test

// =====================

const engines =

Advisor.engines();

if(

    engines.length === 0

){

    throw new Error(

        "Advisor engines failed"

    );

}

// =====================

// Analyze Test

// =====================

const analysis =

Advisor.analyze();

if(

    !analysis.profile

){

    throw new Error(

        "Advisor analysis profile failed"

    );

}

if(

    !analysis.recommendations

){

    throw new Error(

        "Advisor recommendations failed"

    );

}

// =====================

// Wealth Report Test

// =====================

const report =

Advisor.wealthReport();

if(

    report.engine !==

    "Wealth Engine Connected"

){

    throw new Error(

        "Advisor wealth report failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Advisor AI V7 Test Passed"

);
