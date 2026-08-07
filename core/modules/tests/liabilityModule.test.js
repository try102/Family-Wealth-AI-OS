/*

Family Wealth AI OS V7

Liability Module Test

测试：

Module Definition

*/

import LiabilityModule from "../liabilityModule.js";

// =====================

// Basic Info Test

// =====================

if(

    LiabilityModule.name !==

    "Liability Module V7"

){

    throw new Error(

        "Module name failed"

    );

}

if(

    LiabilityModule.version !==

    "7.0"

){

    throw new Error(

        "Module version failed"

    );

}

if(

    LiabilityModule.type !==

    "WEALTH_MODULE"

){

    throw new Error(

        "Module type failed"

    );

}

// =====================

// Component Test

// =====================

if(

    !LiabilityModule.api

){

    throw new Error(

        "API missing"

    );

}

if(

    !LiabilityModule.agent

){

    throw new Error(

        "Agent missing"

    );

}

if(

    !LiabilityModule.ai

)

{

    throw new Error(

        "AI missing"

    );

}

if(

    !LiabilityModule.view

)

{

    throw new Error(

        "View missing"

    );

}

// =====================

// Status Test

// =====================

if(

    LiabilityModule.status !==

    "READY"

){

    throw new Error(

        "Module status failed"

    );

}

console.log(

    "Liability Module V7 Test Passed"

);
