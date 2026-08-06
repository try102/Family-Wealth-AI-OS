/*

Family Wealth AI OS V7

Recovery Test

*/

import Backup from "../backup.js";

import Recovery from "../recovery.js";

import Database from "../../storage/database.js";

// =====================

// Prepare Original Data

// =====================

Database.clear();

Database.insert(

    "assets",

    {

        id:1,

        name:"House",

        value:500000

    }

);

// =====================

// Create Snapshot

// =====================

const snapshot =

Backup.create(

    "House Backup"

);

// =====================

// Change Database

// =====================

Database.clear();

Database.insert(

    "assets",

    {

        id:2,

        name:"Car",

        value:30000

    }

);

// =====================

// Restore Test

// =====================

const restored =

Recovery.restore(

    snapshot

);

if(

    restored !== true

){

    throw new Error(

        "Recovery restore failed"

    );

}

const assets =

Database.find(

    "assets"

);

if(

    assets[0].name !== "House"

){

    throw new Error(

        "Recovery data failed"

    );

}

// =====================

// Invalid Snapshot Test

// =====================

const failed =

Recovery.restore(

    null

);

if(

    failed !== false

){

    throw new Error(

        "Recovery invalid failed"

    );

}

console.log(

    "Recovery Test Passed"

);
