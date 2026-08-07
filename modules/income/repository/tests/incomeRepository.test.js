/*

Family Wealth AI OS V7

Income Repository Test

测试：

Income Repository

↓

Database

↓

Storage

*/

import IncomeRepository from "../incomeRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize Database

// =====================

Database.init();

// =====================

// Clear Test Data

// =====================

IncomeRepository.clear();

// =====================

// Save Test

// =====================

const income = {

    id:

    1001,

    name:

    "Salary",

    category:

    "工资",

    amount:

    10000,

    owner:

    "Family"

};

const saved =

IncomeRepository.save(

    income

);

if(

    saved.id !== 1001

){

    throw new Error(

        "Save income failed"

    );

}

// =====================

// Find All Test

// =====================

const list =

IncomeRepository.findAll();

if(

    list.length !== 1

){

    throw new Error(

        "Find all income failed"

    );

}

// =====================

// Find By Id Test

// =====================

const found =

IncomeRepository.findById(

    1001

);

if(

    found.name !== "Salary"

){

    throw new Error(

        "Find income by id failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

IncomeRepository.update(

    1001,

    {

        amount:

        15000

    }

);

if(

    updated.amount !== 15000

){

    throw new Error(

        "Update income failed"

    );

}

// =====================

// Delete Test

// =====================

const removed =

IncomeRepository.remove(

    1001

);

if(

    removed !== true

){

    throw new Error(

        "Delete income failed"

    );

}

if(

    IncomeRepository.findAll()

    .length !== 0

){

    throw new Error(

        "Delete verify failed"

    );

}

console.log(

    "Income Repository V7 Test Passed"

);
