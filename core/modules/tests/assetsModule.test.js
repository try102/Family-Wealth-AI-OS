/*

Family Wealth AI OS V7

Assets Module Test

测试 Assets Module Definition

*/

import AssetsModule

from "../assetsModule.js";

// =====================

// Basic Information

// =====================

if(

    AssetsModule.name !==

    "Assets Module V7"

){

    throw new Error(

        "Assets module name failed"

    );

}

if(

    AssetsModule.version !==

    "7.0"

){

    throw new Error(

        "Assets module version failed"

    );

}

if(

    AssetsModule.type !==

    "WEALTH_MODULE"

){

    throw new Error(

        "Assets module type failed"

    );

}

if(

    AssetsModule.status !==

    "READY"

){

    throw new Error(

        "Assets module status failed"

    );

}

// =====================

// Component Check

// =====================

if(

    !AssetsModule.schema

){

    throw new Error(

        "Assets schema missing"

    );

}

if(

    !AssetsModule.repository

){

    throw new Error(

        "Assets repository missing"

    );

}

if(

    !AssetsModule.service

){

    throw new Error(

        "Assets service missing"

    );

}

if(

    !AssetsModule.api

){

    throw new Error(

        "Assets API missing"

    );

}

if(

    !AssetsModule.agent

){

    throw new Error(

        "Assets agent missing"

    );

}

if(

    !AssetsModule.ai

){

    throw new Error(

        "Assets AI missing"

    );

}

if(

    !AssetsModule.analysis

){

    throw new Error(

        "Assets analysis missing"

    );

}

if(

    !AssetsModule.events

){

    throw new Error(

        "Assets events missing"

    );

}

if(

    !AssetsModule.view

){

    throw new Error(

        "Assets view missing"

    );

}

// =====================

// Final

// =====================

console.log(

    "Assets Module V7 Test Passed"

);
