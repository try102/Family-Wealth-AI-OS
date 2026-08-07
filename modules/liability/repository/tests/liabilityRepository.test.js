/*

Family Wealth AI OS V7

Liability Repository Test

测试：

Repository

↓

Database

↓

Storage

*/

import LiabilityRepository from "../liabilityRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

LiabilityRepository.clear();

// =====================

// Save Test

// =====================

const liability = {

    id:

    1,

    name:

    "Mortgage",

    category:

    "Mortgage",

    currentBalance:

    400000,

    interestRate:

    5.25

};

const saved =

LiabilityRepository.save(

    liability

);

if(

    saved.id !== 1

){

    throw new Error(

        "Save liability failed"

    );

}

// =====================

// Find All Test

// =====================

const list =

LiabilityRepository.findAll();

if(

    list.length !== 1

){

    throw new Error(

        "Find all failed"

    );

}

// =====================

// Find By Id Test

// =====================

const found =

LiabilityRepository.findById(

    1

);

if(

    found.name !== "Mortgage"

){

    throw new Error(

        "Find by id failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

LiabilityRepository.update(

    1,

    {

        currentBalance:

        380000

    }

);

if(

    updated.currentBalance !== 380000

){

    throw new Error(

        "Update failed"

    );

}

// =====================

// Delete Test

// =====================

const removed =

LiabilityRepository.remove(

    1

);

if(

    removed !== true

){

    throw new Error(

        "Delete failed"

    );

}

const afterDelete =

LiabilityRepository.findAll();

if(

    afterDelete.length !== 0

){

    throw new Error(

        "Delete data failed"

    );

}

console.log(

    "Liability Repository V7 Test Passed"

);
