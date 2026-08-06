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

const log =

AuditManager.record(

    "UPDATE_ASSET",

    "House",

    {

        oldValue:

        400000,

        newValue:

        500000

    }

);

console.log(

    "Audit Log:",

    log

);

if(

    log.action !==

    "UPDATE_ASSET"

){

    throw new Error(

        "Audit record failed"

    );

}

// =====================

// All Test

// =====================

const logs =

AuditManager.all();

console.log(

    "All Logs:",

    logs

);

if(

    logs.length !==1

){

    throw new Error(

        "Audit all failed"

    );

}

// =====================

// Find Test

// =====================

const updateLogs =

AuditManager.find(

    "UPDATE_ASSET"

);

if(

    updateLogs.length !==1

){

    throw new Error(

        "Audit find failed"

    );

}

// =====================

// Remove Test

// =====================

AuditManager.remove(

    log.id

);

if(

    AuditManager.all()

    .length !==0

){

    throw new Error(

        "Audit remove failed"

    );

}

// =====================

// Clear Test

// =====================

AuditManager.record(

    "LOGIN",

    "USER"

);

AuditManager.clear();

if(

    AuditManager.all()

    .length !==0

){

    throw new Error(

        "Audit clear failed"

    );

}

console.log(

    "Audit Manager Test Passed"

);
