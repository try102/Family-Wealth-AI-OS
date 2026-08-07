/*

Family Wealth AI OS V7

Liability Schema Test

*/

import LiabilitySchema from "../liabilitySchema.js";

// =====================

// Create Test

// =====================

const liability =

LiabilitySchema.create({

    name:

    "Home Mortgage",

    category:

    "Mortgage",

    lender:

    "Chase",

    owner:

    "Family",

    currency:

    "USD",

    principal:

    500000,

    currentBalance:

    420000,

    interestRate:

    5.25,

    monthlyPayment:

    2850,

    minimumPayment:

    2850,

    secured:

    true,

    collateral:

    "Primary Residence"

});

// =====================

// Assertions

// =====================

if(

    !liability.id

){

    throw new Error(

        "Liability id failed"

    );

}

if(

    liability.name

    !==

    "Home Mortgage"

){

    throw new Error(

        "Liability name failed"

    );

}

if(

    liability.category

    !==

    "Mortgage"

){

    throw new Error(

        "Category failed"

    );

}

if(

    liability.currentBalance

    !==

    420000

){

    throw new Error(

        "Balance failed"

    );

}

if(

    liability.interestRate

    !==

    5.25

){

    throw new Error(

        "Interest rate failed"

    );

}

if(

    liability.secured

    !==

    true

){

    throw new Error(

        "Secured flag failed"

    );

}

if(

    !liability.createdAt

){

    throw new Error(

        "createdAt failed"

    );

}

if(

    !liability.updatedAt

){

    throw new Error(

        "updatedAt failed"

    );

}

console.log(

    "Liability Schema V7 Test Passed"

);
