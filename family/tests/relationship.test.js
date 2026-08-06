/*

Family Wealth AI OS V7.1

Relationship Test

*/

import Relationship from "../relationship.js";

if(

    Relationship.SELF !== "SELF"

){

    throw new Error(

        "SELF relationship failed"

    );

}

if(

    Relationship.SPOUSE !== "SPOUSE"

){

    throw new Error(

        "SPOUSE relationship failed"

    );

}

if(

    Relationship.SON !== "SON"

){

    throw new Error(

        "SON relationship failed"

    );

}

if(

    Relationship.DAUGHTER !== "DAUGHTER"

){

    throw new Error(

        "DAUGHTER relationship failed"

    );

}

if(

    Relationship.FATHER !== "FATHER"

){

    throw new Error(

        "FATHER relationship failed"

    );

}

if(

    Relationship.MOTHER !== "MOTHER"

){

    throw new Error(

        "MOTHER relationship failed"

    );

}

console.log(

    "Relationship Test Passed"

);
