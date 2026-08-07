/*

Family Wealth AI OS V7

Cashflow Events Test

*/

import cashflowEvents

from "../cashflowEvents.js";

// =====================

// Clear Before Test

// =====================

cashflowEvents.clear();

// =====================

// Event Variable

// =====================

let received = null;

// =====================

// Register Event

// =====================

cashflowEvents.on(

    "CASHFLOW_CREATED",

    data => {

        received = data;

    }

);

// =====================

// List Test

// =====================

const events =

cashflowEvents.list();

if(

    events.length !== 1

){

    throw new Error(

        "Event registration failed"

    );

}

// =====================

// Emit Test

// =====================

cashflowEvents.emit(

    "CASHFLOW_CREATED",

    {

        amount:

        10000,

        type:

        "INCOME"

    }

);

if(

    !received

){

    throw new Error(

        "Event emit failed"

    );

}

if(

    received.amount !==

    10000

){

    throw new Error(

        "Event data failed"

    );

}

// =====================

// Remove Test

// =====================

cashflowEvents.remove(

    "CASHFLOW_CREATED"

);

if(

    cashflowEvents.list().length !== 0

){

    throw new Error(

        "Event remove failed"

    );

}

// =====================

// Clear Test

// =====================

cashflowEvents.on(

    "TEST",

    ()=>{}

);

cashflowEvents.clear();

if(

    cashflowEvents.list().length !== 0

){

    throw new Error(

        "Event clear failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Events V7 Test Passed"

);
