/*

Family Wealth AI OS V7

Liability API Test

测试：

API

↓

Service

↓

Repository

↓

Database

*/

import LiabilityAPI from "../liabilityAPI.js";

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

LiabilityAPI.createLiability({

    name:

    "Mortgage",

    category:

    "Mortgage",

    lender:

    "Chase",

    currentBalance:

    300000,

    interestRate:

    5

});

if(

    !created.id

){

    throw new Error(

        "API create failed"

    );

}

// =====================

// Get List Test

// =====================

const list =

LiabilityAPI.getLiabilities();

if(

    list.length !== 1

){

    throw new Error(

        "API get list failed"

    );

}

// =====================

// Get One Test

// =====================

const item =

LiabilityAPI.getLiability(

    created.id

);

if(

    item.name !== "Mortgage"

){

    throw new Error(

        "API get one failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

LiabilityAPI.updateLiability(

    created.id,

    {

        currentBalance:

        280000

    }

);

if(

    updated.currentBalance !== 280000

){

    throw new Error(

        "API update failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

LiabilityAPI.getSummary();

if(

    summary.count !== 1

){

    throw new Error(

        "Summary count failed"

    );

}

if(

    summary.totalLiability !== 280000

){

    throw new Error(

        "Summary amount failed"

    );

}

// =====================

// Delete Test

// =====================

const deleted =

LiabilityAPI.deleteLiability(

    created.id

);

if(

    deleted !== true

){

    throw new Error(

        "API delete failed"

    );

}

console.log(

    "Liability API V7 Test Passed"

);
