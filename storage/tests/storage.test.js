/*

Family Wealth AI OS V7

Storage Test

*/

import Storage from "../storage.js";

// =====================

// Reset

// =====================

Storage.clear();

// =====================

// Set Test

// =====================

const value =

Storage.set(

    "assets",

    [

        {

            name:"House",

            value:500000

        }

    ]

);

if(

    value.length !==1

){

    throw new Error(

        "Storage set failed"

    );

}

// =====================

// Get Test

// =====================

const assets =

Storage.get(

    "assets"

);

if(

    assets[0].name !== "House"

){

    throw new Error(

        "Storage get failed"

    );

}

// =====================

// Has Test

// =====================

if(

    Storage.has(

        "assets"

    ) !== true

){

    throw new Error(

        "Storage has failed"

    );

}

// =====================

// Remove Test

// =====================

Storage.remove(

    "assets"

);

if(

    Storage.has(

        "assets"

    )

){

    throw new Error(

        "Storage remove failed"

    );

}

// =====================

// Clear Test

// =====================

Storage.set(

    "test",

    123

);

Storage.clear();

if(

    Object.keys(

        Storage.all()

    ).length !==0

){

    throw new Error(

        "Storage clear failed"

    );

}

console.log(

    "Storage Test Passed"

);
