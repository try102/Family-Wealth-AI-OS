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

// Mock Modules

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

// Mock Wealth Engine

// =====================

const mockWealthEngine = {

    analyze(

        assets,

        liabilities,

        cashFlowData,

        liquidityMonths

    ){

        return {

            totalAssets:

            1000000,

            totalLiabilities:

            200000,

            netWorth:

            800000,

            allocation:

            {},

            cashFlow:

            cashFlowData,

            liquidityMonths,

            wealthScore:

            80

        };

    }

};

// =====================

// Mock Cashflow Engine

// =====================

const mockCashflowEngine = {

    report(){

        return {

            income:

            100000,

            expense:

            50000,

            net:

            50000

        };

    }

};

// =====================

// Register Mock Engines

// =====================

EngineRegistry.register(

    "wealth",

    mockWealthEngine

);

EngineRegistry.register(

    "cashflow",

    mockCashflowEngine

);

// =====================

// Basic Information

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

    !analysis.wealthHealth

){

    throw new Error(

        "Wealth health missing"

    );

}

if(

    !analysis.riskLevel

){

    throw new Error(

        "Risk level missing"

    );

}

if(

    !Array.isArray(

        analysis.recommendations

    )

){

    throw new Error(

        "Recommendations missing"

    );

}

if(

    !Array.isArray(

        analysis.alerts

    )

){

    throw new Error(

        "Alerts missing"

    );

}

// =====================

// Wealth Analysis Test

// =====================

const wealthResult =

Advisor.wealthAnalysis(

    [

        {

            type:

            "Cash",

            value:

            600000

        },

        {

            type:

            "Investment",

            value:

            400000

        }

    ],

    [

        {

            type:

            "Mortgage",

            value:

            200000

        }

    ],

    {

        netCashFlow:

        50000

    },

    6

);

// =====================

// Wealth Result Checks

// =====================

if(

    wealthResult.totalAssets !==

    1000000

){

    throw new Error(

        "Wealth total assets failed"

    );

}

if(

    wealthResult.totalLiabilities !==

    200000

){

    throw new Error(

        "Wealth total liabilities failed"

    );

}

if(

    wealthResult.netWorth !==

    800000

){

    throw new Error(

        "Wealth net worth failed"

    );

}

if(

    wealthResult.liquidityMonths !==

    6

){

    throw new Error(

        "Liquidity months failed"

    );

}

if(

    wealthResult.wealthScore !==

    80

){

    throw new Error(

        "Wealth score failed"

    );

}

// =====================

// Wealth Report Test

// =====================

const report =

Advisor.wealthReport();

if(

    report.wealthEngine !==

    "CONNECTED"

){

    throw new Error(

        "Wealth Engine connection failed"

    );

}

if(

    report.cashflowEngine !==

    "CONNECTED"

){

    throw new Error(

        "Cashflow Engine connection failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Advisor AI V7 Test Passed"

);
