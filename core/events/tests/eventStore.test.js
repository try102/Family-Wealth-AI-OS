/*

Family Wealth AI OS

Event Store Test

*/

import EventStore from "../eventStore.js";

// =====================

// Clear Old Data

// =====================

EventStore.clear();

// =====================

// Save Event

// =====================

const testEvent = {

    type:

    "TEST_EVENT",

    source:

    "SYSTEM_TEST",

    data:{

        value:100

    }

};

EventStore.save(

    testEvent

);

console.log(

    "Event Saved"

);

// =====================

// Load Events

// =====================

const events =

EventStore.getAll();

console.log(

    "Events:",

    events

);

if(

    events.length !== 1

){

    throw new Error(

        "Event save failed"

    );

}

if(

    events[0].type !==

    "TEST_EVENT"

){

    throw new Error(

        "Event data failed"

    );

}

// =====================

// Clear Test

// =====================

EventStore.clear();

const afterClear =

EventStore.getAll();

if(

    afterClear.length !==0

){

    throw new Error(

        "Event clear failed"

    );

}

console.log(

    "Event Store Test Passed"

);
