/*

Family Wealth AI OS V7

Cashflow Module Test

测试 Cashflow Module Definition

*/

import CashflowModule

from "../cashflowModule.js";

// =====================

// Basic Information

// =====================

if(

    CashflowModule.name !==

    "Cashflow Module V7"

){

    throw new Error(

        "Cashflow module name failed"

    );

}

if(

    CashflowModule.version !==

    "7.0"

){

    throw new Error(

        "Cashflow module version failed"

    );

}

if(

    CashflowModule.type !==

    "WEALTH_MODULE"

){

    throw new Error(

        "Cashflow module type failed"

    );

}

if(

    CashflowModule.status !==

    "READY"

){

    throw new Error(

        "Cashflow module status failed"

    );

}

// =====================

// Component Check

// =====================

if(

    !CashflowModule.schema

){

    throw new Error(

        "Cashflow schema missing"

    );

}

if(

    !CashflowModule.repository

){

    throw new Error(

        "Cashflow repository missing"

    );

}

if(

    !CashflowModule.service

){

    throw new Error(

        "Cashflow service missing"

    );

}

if(

    !CashflowModule.api

){

    throw new Error(

        "Cashflow API missing"

    );

}

if(

    !CashflowModule.agent

){

    throw new Error(

        "Cashflow agent missing"

    );

}

if(

    !CashflowModule.ai

){

    throw new Error(

        "Cashflow AI missing"

    );

}

if(

    !CashflowModule.analysis

){

    throw new Error(

        "Cashflow analysis missing"

    );

}

if(

    !CashflowModule.events

){

    throw new Error(

        "Cashflow events missing"

    );

}

if(

    !CashflowModule.view

){

    throw new Error(

        "Cashflow view missing"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Module V7 Test Passed"

);
