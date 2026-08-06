/*

Family Wealth AI OS

Configuration Loader Test

*/

import ConfigLoader from "../loader.js";

// =====================

// Reset

// =====================

ConfigLoader.clear();

// =====================

// Load Test

// =====================

const config =

ConfigLoader.load(

    "SYSTEM",

    {

        version:

        "V7.0",

        mode:

        "production"

    }

);

console.log(

    "Config:",

    config

);

if(

    config.version !==

    "V7.0"

){

    throw new Error(

        "Config load failed"

    );

}

// =====================

// Get Test

// =====================

const current =

ConfigLoader.get(

    "SYSTEM"

);

if(

    current.mode !==

    "production"

){

    throw new Error(

        "Config get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

ConfigLoader.update(

    "SYSTEM",

    {

        mode:

        "development"

    }

);

if(

    updated.mode !==

    "development"

){

    throw new Error(

        "Config update failed"

    );

}

// =====================

// List Test

// =====================

const list =

ConfigLoader.list();

if(

    !list.SYSTEM

){

    throw new Error(

        "Config list failed"

    );

}

// =====================

// Remove Test

// =====================

ConfigLoader.remove(

    "SYSTEM"

);

if(

    ConfigLoader.get(

        "SYSTEM"

    )

){

    throw new Error(

        "Config remove failed"

    );

}

// =====================

// Clear Test

// =====================

ConfigLoader.load(

    "TEST",

    {}

);

ConfigLoader.clear();

if(

    Object.keys(

        ConfigLoader.list()

    )

    .length !==0

){

    throw new Error(

        "Config clear failed"

    );

}

console.log(

    "Configuration Loader Test Passed"

);
