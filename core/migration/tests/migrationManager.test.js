/*

Family Wealth AI OS

Migration Manager Test

*/

import MigrationManager from "../migrationManager.js";

// =====================

// Reset

// =====================

MigrationManager.migrations = {};

// =====================

// Register Migration

// =====================

MigrationManager.register(

    "6.4_to_7.0",

    (data)=>{

        return {

            ...data,

            version:

            "7.0"

        };

    }

);

// =====================

// List Test

// =====================

const list =

MigrationManager.list();

console.log(

    "Migrations:",

    list

);

if(

    list.length !== 1

){

    throw new Error(

        "Migration register failed"

    );

}

// =====================

// Execute Migration

// =====================

const oldData = {

    name:

    "Cash",

    value:

    1000

};

const newData =

MigrationManager.migrate(

    "6.4_to_7.0",

    oldData

);

console.log(

    "Migrated Data:",

    newData

);

if(

    newData.version !==

    "7.0"

){

    throw new Error(

        "Migration failed"

    );

}

// =====================

// Remove Test

// =====================

MigrationManager.remove(

    "6.4_to_7.0"

);

if(

    MigrationManager.list()

    .length !==0

){

    throw new Error(

        "Migration remove failed"

    );

}

console.log(

    "Migration Manager Test Passed"

);
