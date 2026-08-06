/*

Family Wealth AI OS V7

Permission Test

*/

import Permission from "../permission.js";

// =====================

// Owner Test

// =====================

const owner =

Permission.check(

    "OWNER",

    "ANY_ACTION"

);

if(

    owner !== true

){

    throw new Error(

        "Owner permission failed"

    );

}

// =====================

// Advisor Test

// =====================

const advisor =

Permission.check(

    "ADVISOR",

    "ANALYZE"

);

if(

    advisor !== true

){

    throw new Error(

        "Advisor analyze permission failed"

    );

}

// =====================

// Advisor Forbidden Test

// =====================

const advisorDenied =

Permission.check(

    "ADVISOR",

    "DELETE_ASSET"

);

if(

    advisorDenied !== false

){

    throw new Error(

        "Advisor restriction failed"

    );

}

// =====================

// Member Test

// =====================

const member =

Permission.check(

    "MEMBER",

    "VIEW_WEALTH"

);

if(

    member !== true

){

    throw new Error(

        "Member permission failed"

    );

}

// =====================

// Unknown Role Test

// =====================

const unknown =

Permission.check(

    "UNKNOWN",

    "VIEW"

);

if(

    unknown !== false

){

    throw new Error(

        "Unknown role failed"

    );

}

console.log(

    "Permission Test Passed"

);
