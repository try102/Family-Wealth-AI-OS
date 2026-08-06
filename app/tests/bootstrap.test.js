/*

Family Wealth AI OS V7

Bootstrap Test

*/

import AppBootstrap from "../bootstrap.js";

// =====================

// Create Instance Test

// =====================

if(

    !AppBootstrap

){

    throw new Error(

        "Bootstrap import failed"

    );

}

// =====================

// Version Test

// =====================

if(

    AppBootstrap.version !==

    "V7.0"

){

    throw new Error(

        "Bootstrap version failed"

    );

}

// =====================

// Start Test

// =====================

const status =

AppBootstrap.start();

console.log(

    "Bootstrap Status:",

    status

);

if(

    status !==

    "READY"

){

    throw new Error(

        "Bootstrap start failed"

    );

}

// =====================

// System State Test

// =====================

if(

    AppBootstrap.status !==

    "READY"

){

    throw new Error(

        "System not ready"

    );

}

console.log(

    "Bootstrap Test Passed"

);
