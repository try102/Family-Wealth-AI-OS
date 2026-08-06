/*

Family Wealth AI OS

Policy Manager Test

*/

import PolicyManager from "../policyManager.js";

// =====================

// Reset

// =====================

PolicyManager.clear();

// =====================

// Create Test

// =====================

const policy =

PolicyManager.create(

    "INVESTMENT_POLICY",

    {

        maxStockRatio:

        70,

        maxSingleAsset:

        20

    }

);

console.log(

    "Policy:",

    policy

);

if(

    policy.name !==

    "INVESTMENT_POLICY"

){

    throw new Error(

        "Policy create failed"

    );

}

// =====================

// Get Test

// =====================

const current =

PolicyManager.get(

    "INVESTMENT_POLICY"

);

if(

    current.policy.maxStockRatio !==70

){

    throw new Error(

        "Policy get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

PolicyManager.update(

    "INVESTMENT_POLICY",

    {

        maxStockRatio:

        60

    }

);

console.log(

    "Updated:",

    updated

);

if(

    updated.policy.maxStockRatio !==60

){

    throw new Error(

        "Policy update failed"

    );

}

// =====================

// List Test

// =====================

const list =

PolicyManager.list();

if(

    !list.INVESTMENT_POLICY

){

    throw new Error(

        "Policy list failed"

    );

}

// =====================

// Remove Test

// =====================

PolicyManager.remove(

    "INVESTMENT_POLICY"

);

if(

    PolicyManager.get(

        "INVESTMENT_POLICY"

    )

){

    throw new Error(

        "Policy remove failed"

    );

}

console.log(

    "Policy Manager Test Passed"

);
