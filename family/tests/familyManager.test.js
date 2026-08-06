/*

Family Wealth AI OS V7.1

Family Manager Test

*/

import FamilyManager from "../familyManager.js";

import Member from "../member.js";

// =====================

// Reset

// =====================

FamilyManager.clear();

// =====================

// Add Test

// =====================

const owner = new Member({

    id:1,

    name:"Owner",

    role:"OWNER",

    relationship:"SELF"

});

const result =

FamilyManager.add(

    owner

);

if(

    result.name !== "Owner"

){

    throw new Error(

        "Family add failed"

    );

}

// =====================

// List Test

// =====================

const members =

FamilyManager.list();

if(

    members.length !==1

){

    throw new Error(

        "Family list failed"

    );

}

// =====================

// Get Test

// =====================

const found =

FamilyManager.get(

    1

);

if(

    found.name !== "Owner"

){

    throw new Error(

        "Family get failed"

    );

}

// =====================

// Remove Test

// =====================

FamilyManager.remove(

    1

);

if(

    FamilyManager.list().length !==0

){

    throw new Error(

        "Family remove failed"

    );

}

// =====================

// Invalid Member Test

// =====================

try{

    FamilyManager.add({});

    throw new Error(

        "Invalid member check failed"

    );

}

catch(error){

}

// =====================

// Clear Test

// =====================

FamilyManager.clear();

if(

    FamilyManager.list().length !==0

){

    throw new Error(

        "Family clear failed"

    );

}

console.log(

    "Family Manager Test Passed"

);
