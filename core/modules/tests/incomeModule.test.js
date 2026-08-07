/*

Family Wealth AI OS V7

Income Module Test

测试：

Income Module Definition

*/

import IncomeModule from "../incomeModule.js";

// =====================

// Basic Information

// =====================

if(

    IncomeModule.name !==

    "Income Module V7"

){

    throw new Error(

        "Income module name failed"

    );

}

if(

    IncomeModule.version !==

    "7.0"

){

    throw new Error(

        "Income module version failed"

    );

}

if(

    IncomeModule.type !==

    "WEALTH_MODULE"

){

    throw new Error(

        "Income module type failed"

    );

}

if(

    IncomeModule.status !==

    "READY"

){

    throw new Error(

        "Income module status failed"

    );

}

// =====================

// Component Check

// =====================

if(

    !IncomeModule.schema

){

    throw new Error(

        "Income schema missing"

    );

}

if(

    !IncomeModule.repository

){

    throw new Error(

        "Income repository missing"

    );

}

if(

    !IncomeModule.service

){

    throw new Error(

        "Income service missing"

    );

}

if(

    !IncomeModule.api

){

    throw new Error(

        "Income API missing"

    );

}

if(

    !IncomeModule.agent

){

    throw new Error(

        "Income agent missing"

    );

}

if(

    !IncomeModule.ai

){

    throw new Error(

        "Income AI missing"

    );

}

if(

    !IncomeModule.analysis

){

    throw new Error(

        "Income analysis missing"

    );

}

if(

    !IncomeModule.events

){

    throw new Error(

        "Income events missing"

    );

}

if(

    !IncomeModule.view

){

    throw new Error(

        "Income view missing"

    );

}

// =====================

// Final

// =====================

console.log(

    "Income Module V7 Test Passed"

);
