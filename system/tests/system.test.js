/*

Family Wealth AI OS V7

System Test

*/

import System

from "../system.js";

// =====================

// Initial State Test

// =====================

if(

    System.status !==

    "OFFLINE"

){

    throw new Error(

        "Initial system status failed"

    );

}

// =====================

// Start Test

// =====================

const result =

System.start();

console.log(

    "System Start:",

    result

);

if(

    result.status !==

    "ONLINE"

){

    throw new Error(

        "System start failed"

    );

}

if(

    result.version !==

    "V7.0"

){

    throw new Error(

        "System version failed"

    );

}

// =====================

// Info Test

// =====================

const info =

System.info();

if(

    info.name !==

    "Family Wealth AI OS"

){

    throw new Error(

        "System info failed"

    );

}

// =====================

// Dashboard Test

// =====================

const dashboard =

System.dashboard();

console.log(

    "Dashboard:",

    dashboard

);

if(

    !dashboard

){

    throw new Error(

        "Dashboard loading failed"

    );

}

console.log(

    "System Test Passed"

);
