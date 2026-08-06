/*

Family Wealth AI OS

Environment Manager Test

*/

import EnvironmentManager from "../environmentManager.js";

// =====================

// Reset

// =====================

EnvironmentManager.clear();

// =====================

// Register Development

// =====================

EnvironmentManager.register(

    "development",

    {

        debug:

        true,

        logLevel:

        "verbose"

    }

);

// =====================

// Register Production

// =====================

EnvironmentManager.register(

    "production",

    {

        debug:

        false,

        logLevel:

        "error"

    }

);

// =====================

// List Test

// =====================

const list =

EnvironmentManager.list();

if(

    Object.keys(list)

    .length !==2

){

    throw new Error(

        "Environment register failed"

    );

}

// =====================

// Default Environment Test

// =====================

if(

    EnvironmentManager.getCurrent()

    !==

    "development"

){

    throw new Error(

        "Default environment failed"

    );

}

// =====================

// Set Environment Test

// =====================

const changed =

EnvironmentManager.set(

    "production"

);

if(

    changed !== true

){

    throw new Error(

        "Environment set failed"

    );

}

if(

    EnvironmentManager.getCurrent()

    !==

    "production"

){

    throw new Error(

        "Current environment failed"

    );

}

// =====================

// Config Test

// =====================

const config =

EnvironmentManager.config();

if(

    config.debug !== false

){

    throw new Error(

        "Environment config failed"

    );

}

// =====================

// Clear Test

// =====================

EnvironmentManager.clear();

if(

    Object.keys(

        EnvironmentManager.list()

    )

    .length !==0

){

    throw new Error(

        "Environment clear failed"

    );

}

console.log(

    "Environment Manager Test Passed"

);
