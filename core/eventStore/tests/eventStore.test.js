/*

Family Wealth AI OS

Event Store Test

*/

import EventStore from "../eventStore.js";

// =====================

// Reset

// =====================

EventStore.clear();

// =====================

// Save Test

// =====================

const event1 =

EventStore.save(

    "ASSET_CREATED",

    {

        asset:

        "House",

        value:

        500000

    }

);

console.log(

    "Event:",

    event1

);

if(

    event1.type !==

    "ASSET_CREATED"

){

    throw new Error(

        "Event save failed"

    );

}

// =====================

// Second Event

// =====================

EventStore.save(

    "INVESTMENT_BUY",

    {

        symbol:

        "VOO"

    }

);

// =====================

// All Test

// =====================

const all =

EventStore.all();

console.log(

    "Events:",

    all

);

if(

    all.length !==2

){

    throw new Error(

        "Event all failed"

    );

}

// =====================

// Find Test

// =====================

const assets =

EventStore.find(

    "ASSET_CREATED"

);

if(

    assets.length !==1

){

    throw new Error(

        "Event find failed"

    );

}

// =====================

// Latest Test

// =====================

const latest =

EventStore.latest();

if(

    latest.type !==

    "INVESTMENT_BUY"

){

    throw new Error(

        "Event latest failed"

    );

}

// =====================

// Clear Test

// =====================

EventStore.clear();

if(

    EventStore.all()

    .length !==0

){

    throw new Error(

        "Event clear failed"

    );

}

console.log(

    "Event Store Test Passed"

);
