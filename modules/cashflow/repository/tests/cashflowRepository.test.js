/*

Family Wealth AI OS V7

Cashflow Repository Test

*/

import cashflowRepository 

from "../cashflowRepository.js";

// =====================

// Clear Before Test

// =====================

cashflowRepository.clear();

// =====================

// Init Test

// =====================

const initialized =

cashflowRepository.init();

if(

    initialized !== true

){

    throw new Error(

        "Repository init failed"

    );

}

// =====================

// Create Test

// =====================

const record =

cashflowRepository.create({

    type:

    "INCOME",

    category:

    "Salary",

    amount:

    10000,

    owner:

    "Family"

});

if(

    !record.id

){

    throw new Error(

        "Create failed"

    );

}

if(

    record.amount !==

    10000

){

    throw new Error(

        "Amount save failed"

    );

}

// =====================

// Find All Test

// =====================

const list =

cashflowRepository.findAll();

if(

    list.length !== 1

){

    throw new Error(

        "Find all failed"

    );

}

// =====================

// Find By ID Test

// =====================

const found =

cashflowRepository.findById(

    record.id

);

if(

    !found

){

    throw new Error(

        "Find by id failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

cashflowRepository.update(

    record.id,

    {

        amount:

        12000

    }

);

if(

    updated.amount !==

    12000

){

    throw new Error(

        "Update failed"

    );

}

// =====================

// Delete Test

// =====================

cashflowRepository.remove(

    record.id

);

const afterDelete =

cashflowRepository.findAll();

if(

    afterDelete.length !== 0

){

    throw new Error(

        "Delete failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Repository V7 Test Passed"

);
