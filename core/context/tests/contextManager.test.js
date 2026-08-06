/*

Family Wealth AI OS

Context Manager Test

*/

import ContextManager from "../contextManager.js";

// =====================

// Reset

// =====================

ContextManager.clear();

// =====================

// Set Test

// =====================

const currency =

ContextManager.set(

    "currency",

    "USD"

);

console.log(

    "Currency:",

    currency

);

if(

    currency !== "USD"

){

    throw new Error(

        "Context set failed"

    );

}

// =====================

// Get Test

// =====================

const value =

ContextManager.get(

    "currency"

);

if(

    value !== "USD"

){

    throw new Error(

        "Context get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

ContextManager.update(

    {

        user:

        "OWNER",

        region:

        "USA"

    }

);

console.log(

    "Updated Context:",

    updated

);

if(

    updated.user !==

    "OWNER"

){

    throw new Error(

        "Context update failed"

    );

}

// =====================

// Remove Test

// =====================

ContextManager.remove(

    "region"

);

if(

    ContextManager.get(

        "region"

    )

){

    throw new Error(

        "Context remove failed"

    );

}

// =====================

// Clear Test

// =====================

ContextManager.clear();

if(

    Object.keys(

        ContextManager.all()

    )

    .length !==0

){

    throw new Error(

        "Context clear failed"

    );

}

console.log(

    "Context Manager Test Passed"

);
