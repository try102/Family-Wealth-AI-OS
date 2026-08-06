/*

Family Wealth AI OS V7

Audit Logger Test

*/

import Audit from "../audit.js";

// =====================

// Reset

// =====================

Audit.clear();

// =====================

// Record Test

// =====================

const log =

Audit.record(

    "admin",

    "ADD_ASSET",

    "SUCCESS"

);

console.log(

    "Audit Log:",

    log

);

if(

    log.user !== "admin"

){

    throw new Error(

        "Audit user failed"

    );

}

if(

    log.action !== "ADD_ASSET"

){

    throw new Error(

        "Audit action failed"

    );

}

if(

    log.result !== "SUCCESS"

){

    throw new Error(

        "Audit result failed"

    );

}

// =====================

// List Test

// =====================

const logs =

Audit.list();

if(

    logs.length !==1

){

    throw new Error(

        "Audit list failed"

    );

}

// =====================

// Multiple User Test

// =====================

Audit.record(

    "advisor",

    "VIEW_REPORT",

    "SUCCESS"

);

Audit.record(

    "admin",

    "DELETE_ASSET",

    "FAILED"

);

// =====================

// Find User Test

// =====================

const adminLogs =

Audit.findByUser(

    "admin"

);

if(

    adminLogs.length !==2

){

    throw new Error(

        "Audit find user failed"

    );

}

// =====================

// Clear Test

// =====================

Audit.clear();

if(

    Audit.list().length !==0

){

    throw new Error(

        "Audit clear failed"

    );

}

console.log(

    "Audit Test Passed"

);
