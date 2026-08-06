/*

Family Wealth AI OS

Transaction Manager Test

*/

import TransactionManager from "../transactionManager.js";

// =====================

// Reset

// =====================

TransactionManager.clear();

// =====================

// Create Test

// =====================

const transaction =

TransactionManager.create(

    "BUY_STOCK",

    {

        symbol:

        "VOO",

        amount:

        10000

    }

);

console.log(

    "Transaction:",

    transaction

);

if(

    transaction.type !==

    "BUY_STOCK"

){

    throw new Error(

        "Transaction create failed"

    );

}

// =====================

// Second Transaction

// =====================

TransactionManager.create(

    "SALARY_INCOME",

    {

        amount:

        8000

    }

);

// =====================

// All Test

// =====================

const all =

TransactionManager.all();

if(

    all.length !==2

){

    throw new Error(

        "Transaction all failed"

    );

}

// =====================

// Find Type Test

// =====================

const stocks =

TransactionManager.findByType(

    "BUY_STOCK"

);

if(

    stocks.length !==1

){

    throw new Error(

        "Transaction find failed"

    );

}

// =====================

// Get Test

// =====================

const current =

TransactionManager.get(

    transaction.id

);

if(

    current.data.symbol !==

    "VOO"

){

    throw new Error(

        "Transaction get failed"

    );

}

// =====================

// Remove Test

// =====================

TransactionManager.remove(

    transaction.id

);

if(

    TransactionManager.get(

        transaction.id

    )

){

    throw new Error(

        "Transaction remove failed"

    );

}

console.log(

    "Transaction Manager Test Passed"

);
