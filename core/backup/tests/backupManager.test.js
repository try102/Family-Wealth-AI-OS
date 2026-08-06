/*

Family Wealth AI OS

Backup Manager Test

*/

import BackupManager from "../backupManager.js";

// =====================

// Reset

// =====================

BackupManager.clear();

// =====================

// Create Backup

// =====================

const data = {

    assets:[

        {

            name:

            "House",

            value:

            500000

        }

    ],

    accounts:[

        {

            name:

            "Checking",

            value:

            10000

        }

    ]

};

const backup =

BackupManager.create(

    data

);

console.log(

    "Backup:",

    backup

);

if(

    !backup.id

){

    throw new Error(

        "Backup create failed"

    );

}

// =====================

// List Test

// =====================

const list =

BackupManager.list();

console.log(

    "Backup List:",

    list

);

if(

    list.length !== 1

){

    throw new Error(

        "Backup list failed"

    );

}

// =====================

// Restore Test

// =====================

const restored =

BackupManager.restore(

    backup.id

);

console.log(

    "Restored:",

    restored

);

if(

    restored.data.assets[0].name

    !==

    "House"

){

    throw new Error(

        "Restore failed"

    );

}

// =====================

// Remove Test

// =====================

BackupManager.remove(

    backup.id

);

if(

    BackupManager.list()

    .length !== 0

){

    throw new Error(

        "Backup remove failed"

    );

}

console.log(

    "Backup Manager Test Passed"

);
