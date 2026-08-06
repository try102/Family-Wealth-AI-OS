/*

Family Wealth AI OS

Permission Manager Test

*/

import PermissionManager from "../permissionManager.js";

// =====================

// Owner Test

// =====================

const ownerAccess =

PermissionManager.check(

    "owner",

    "ANYTHING"

);

console.log(

    "Owner Access:",

    ownerAccess

);

if(

    ownerAccess !== true

){

    throw new Error(

        "Owner permission failed"

    );

}

// =====================

// Advisor Test

// =====================

const advisorAccess =

PermissionManager.check(

    "advisor",

    "VIEW_INVESTMENT"

);

console.log(

    "Advisor Investment:",

    advisorAccess

);

if(

    advisorAccess !== true

){

    throw new Error(

        "Advisor permission failed"

    );

}

// =====================

// Member Test

// =====================

const memberAccess =

PermissionManager.check(

    "member",

    "VIEW_INVESTMENT"

);

console.log(

    "Member Investment:",

    memberAccess

);

if(

    memberAccess !== false

){

    throw new Error(

        "Member permission failed"

    );

}

// =====================

// Add Role Test

// =====================

PermissionManager.addRole(

    "taxAdvisor",

    [

        "VIEW_TAX"

    ]

);

const taxAccess =

PermissionManager.check(

    "taxAdvisor",

    "VIEW_TAX"

);

if(

    taxAccess !== true

){

    throw new Error(

        "New role failed"

    );

}

console.log(

    "Permission Manager Test Passed"

);
