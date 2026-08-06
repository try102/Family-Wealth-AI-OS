/*

Family Wealth AI OS

Config Manager Test

*/

import ConfigManager from "../configManager.js";

// =====================

// Reset

// =====================

ConfigManager.clear();

// =====================

// Set Test

// =====================

const currency =

ConfigManager.set(

    "currency",

    "USD"

);

console.log(

    "Currency:",

    currency

);

if(

    currency !== "USD"

){

    throw new Error(

        "Config set failed"

    );

}

// =====================

// Get Test

// =====================

const result =

ConfigManager.get(

    "currency"

);

console.log(

    "Get Config:",

    result

);

if(

    result !== "USD"

){

    throw new Error(

        "Config get failed"

    );

}

// =====================

// Has Test

// =====================

if(

    ConfigManager.has(

        "currency"

    )

    !== true

){

    throw new Error(

        "Config has failed"

    );

}

// =====================

// Remove Test

// =====================

ConfigManager.remove(

    "currency"

);

if(

    ConfigManager.has(

        "currency"

    )

){

    throw new Error(

        "Config remove failed"

    );

}

// =====================

// Clear Test

// =====================

ConfigManager.set(

    "version",

    "7.0"

);

ConfigManager.clear();

if(

    Object.keys(

        ConfigManager.all()

    )

    .length !== 0

){

    throw new Error(

        "Config clear failed"

    );

}

console.log(

    "Config Manager Test Passed"

);
