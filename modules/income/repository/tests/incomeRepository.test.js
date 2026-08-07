/*

Family Wealth AI OS V7

Income Repository Test

*/

import IncomeRepository from "../incomeRepository.js";

// =====================

// Clear Before Test

// =====================

IncomeRepository.clear();

// =====================

// Save Test

// =====================

const income = {

    id:

    1,

    name:

    "Salary",

    category:

    "工资",

    amount:

    10000

};

IncomeRepository.save(

    income

);

const list =

IncomeRepository.findAll();

if(

    list.length !== 1

){

    throw new Error(

        "Save income failed"

    );

}

// =====================

// Find Test

// =====================

const result =

IncomeRepository.findById(

    1

);

if(

    !result

){

    throw new Error(

        "Find income failed"

    );

}

if(

    result.amount !== 10000

){

    throw new Error(

        "Income amount incorrect"

    );

}

// =====================

// Update Test

// =====================

const updated =

IncomeRepository.update(

    1,

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

    1

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

        "Remove income failed"

    );

}

console.log(

    "Income Repository Test Passed"

);
