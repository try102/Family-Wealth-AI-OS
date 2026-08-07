/*

Family Wealth AI OS V7

Liability Service Test

测试：

Service

↓

Repository

↓

Database

*/

import LiabilityService from "../liabilityService.js";

import LiabilityRepository from "../../repository/liabilityRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

LiabilityRepository.clear();

// =====================

// Create Test

// =====================

const created =

LiabilityService.createLiability({

    name:

    "Car Loan",

    category:

    "Auto Loan",

    lender:

    "Bank",

    principal:

    50000,

    currentBalance:

    40000,

    interestRate:

    6.5,

    monthlyPayment:

    800

});

if(

    !created.id

){

    throw new Error(

        "Create liability failed"

    );

}

if(

    created.category !== "Auto Loan"

){

    throw new Error(

        "Category creation failed"

    );

}

// =====================

// Get Test

// =====================

const list =

LiabilityService.getLiabilities();

if(

    list.length !== 1

){

    throw new Error(

        "Get liabilities failed"

    );

}

// =====================

// Get One Test

// =====================

const item =

LiabilityService.getLiability(

    created.id

);

if(

    item.name !== "Car Loan"

){

    throw new Error(

        "Get one liability failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

LiabilityService.updateLiability(

    created.id,

    {

        currentBalance:

        35000

    }

);

if(

    updated.currentBalance !== 35000

){

    throw new Error(

        "Update liability failed"

    );

}

// =====================

// Count Test

// =====================

const count =

LiabilityService.count();

if(

    count !== 1

){

    throw new Error(

        "Count failed"

    );

}

// =====================

// Delete Test

// =====================

const deleted =

LiabilityService.deleteLiability(

    created.id

);

if(

    deleted !== true

){

    throw new Error(

        "Delete failed"

    );

}

console.log(

    "Liability Service V7 Test Passed"

);
