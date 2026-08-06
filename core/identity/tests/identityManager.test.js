/*

Family Wealth AI OS

Identity Manager Test

*/

import IdentityManager from "../identityManager.js";

// =====================

// Reset

// =====================

IdentityManager.clear();

// =====================

// Create Test

// =====================

const owner =

IdentityManager.create(

    "OWNER",

    {

        name:

        "Family Owner",

        role:

        "OWNER"

    }

);

console.log(

    "Identity:",

    owner

);

if(

    owner.id !==

    "OWNER"

){

    throw new Error(

        "Identity create failed"

    );

}

// =====================

// Get Test

// =====================

const current =

IdentityManager.get(

    "OWNER"

);

if(

    current.role !==

    "OWNER"

){

    throw new Error(

        "Identity get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

IdentityManager.update(

    "OWNER",

    {

        role:

        "ADMIN"

    }

);

if(

    updated.role !==

    "ADMIN"

){

    throw new Error(

        "Identity update failed"

    );

}

// =====================

// List Test

// =====================

const list =

IdentityManager.list();

if(

    list.length !==1

){

    throw new Error(

        "Identity list failed"

    );

}

// =====================

// Remove Test

// =====================

IdentityManager.remove(

    "OWNER"

);

if(

    IdentityManager.get(

        "OWNER"

    )

){

    throw new Error(

        "Identity remove failed"

    );

}

console.log(

    "Identity Manager Test Passed"

);
