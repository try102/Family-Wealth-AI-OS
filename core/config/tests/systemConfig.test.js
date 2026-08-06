/*

Family Wealth AI OS

System Config Test

*/

import SystemConfig from "../systemConfig.js";

// =====================

// Get Test

// =====================

const appName =

SystemConfig.get(

    "appName"

);

console.log(

    "App Name:",

    appName

);

if(

    appName !==

    "Family Wealth AI OS"

){

    throw new Error(

        "Config get failed"

    );

}

// =====================

// Set Test

// =====================

SystemConfig.set(

    "debug",

    false

);

const debug =

SystemConfig.get(

    "debug"

);

console.log(

    "Debug:",

    debug

);

if(

    debug !== false

){

    throw new Error(

        "Config set failed"

    );

}

// =====================

// All Config Test

// =====================

const config =

SystemConfig.all();

console.log(

    "Config:",

    config

);

if(

    !config.version

){

    throw new Error(

        "Config all failed"

    );

}

console.log(

    "System Config Test Passed"

);
