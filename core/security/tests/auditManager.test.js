/*

Family Wealth AI OS

Audit Manager Test

*/

import AuditManager from "../auditManager.js";

// =====================

// Reset

// =====================

AuditManager.clear();

// =====================

// Record Test

// =====================

const record =

AuditManager.record({

    user:

    "owner",

    action:

    "UPDATE_ASSET",

    target:

    "Real Estate",

    detail:

    {

        value:500000

    }

});

console.log(

    "Audit Record:",

    record

);

if(

    record.action !==

    "UPDATE_ASSET"

){

    throw new Error(

        "Audit record failed"

    );

}

// =====================

// Get All

// =====================

const all =

AuditManager.getAll();

console.log(

    "All Logs:",

    all

);

if(

    all.length !== 1

){

    throw new Error(

        "Audit get failed"

    );

}

// =====================

// User Query

// =====================

const userLogs =

AuditManager.findByUser(

    "owner"

);

console.log(

    "Owner Logs:",

    userLogs

);

if(

    userLogs.length !== 1

){

    throw new Error(

        "Audit user search failed"

    );

}

// =====================

// Clear

// =====================

AuditManager.clear();

if(

    AuditManager.getAll()

    .length !== 0

){

    throw new Error(

        "Audit clear failed"

    );

}

console.log(

    "Audit Manager Test Passed"

);
