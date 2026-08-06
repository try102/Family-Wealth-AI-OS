/*

Family Wealth AI OS V7

Database Test

*/

import Database from "../database.js";

// =====================

// Reset

// =====================

Database.clear();

// =====================

// Init Test

// =====================

const tables =

Database.init();

if(

    !tables.assets

){

    throw new Error(

        "Database init failed"

    );

}

// =====================

// Insert Test

// =====================

const asset =

Database.insert(

    "assets",

    {

        id:1,

        name:"Cash",

        value:10000

    }

);

if(

    asset.name !== "Cash"

){

    throw new Error(

        "Database insert failed"

    );

}

// =====================

// Find Test

// =====================

const assets =

Database.find(

    "assets"

);

if(

    assets.length !==1

){

    throw new Error(

        "Database find failed"

    );

}

if(

    assets[0].value !==10000

){

    throw new Error(

        "Database value failed"

    );

}

// =====================

// Table Error Test

// =====================

try{

    Database.insert(

        "unknown",

        {}

    );

    throw new Error(

        "Database invalid table failed"

    );

}

catch(error){

}

// =====================

// Clear Test

// =====================

Database.clear();

if(

    Database.find(

        "assets"

    ).length !==0

){

    throw new Error(

        "Database clear failed"

    );

}

console.log(

    "Database Test Passed"

);
