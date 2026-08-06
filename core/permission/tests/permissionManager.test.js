/*

Family Wealth AI OS

Permission Manager Test

*/

import PermissionManager from "../permissionManager.js";

// =====================

// Reset

// =====================

PermissionManager.clear();

// =====================

// Create Role Test

// =====================

const ownerPermissions =

PermissionManager.createRole(

    "OWNER",

    [

        "READ_ALL",

        "WRITE_ALL",

        "DELETE_ALL"

    ]

);

console.log(

    "Owner Permissions:",

    ownerPermissions

);

if(

    ownerPermissions.length !== 3

){

    throw new Error(

        "Create role failed"

    );

}

// =====================

// Check Permission

// =====================

const canWrite =

PermissionManager.check(

    "OWNER",

    "WRITE_ALL"

);

if(

    canWrite !== true

){

    throw new Error(

        "Permission check failed"

    );

}

const noPermission =

PermissionManager.check(

    "OWNER",

    "EXPORT_DATA"

);

if(

    noPermission !== false

){

    throw new Error(

        "Invalid permission check failed"

    );

}

// =====================

// Add Permission

// =====================

PermissionManager.addPermission(

    "OWNER",

    "EXPORT_DATA"

);

if(

    !PermissionManager.check(

        "OWNER",

        "EXPORT_DATA"

    )

){

    throw new Error(

        "Add permission failed"

    );

}

// =====================

// Remove Permission

// =====================

PermissionManager.removePermission(

    "OWNER",

    "DELETE_ALL"

);

if(

    PermissionManager.check(

        "OWNER",

        "DELETE_ALL"

    )

){

    throw new Error(

        "Remove permission failed"

    );

}

// =====================

// List Test

// =====================

const roles =

PermissionManager.list();

console.log(

    "Roles:",

    roles

);

if(

    !roles.OWNER

){

    throw new Error(

        "List roles failed"

    );

}

console.log(

    "Permission Manager Test Passed"

);
