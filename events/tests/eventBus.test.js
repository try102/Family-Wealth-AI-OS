/*

Family Wealth AI OS V7

Event Bus Test

*/

import EventBus from "../eventBus.js";

// =====================

// Reset

// =====================

EventBus.clear();

let received = null;

// =====================

// ON Test

// =====================

EventBus.on(

    "ASSET_ADDED",

    (data)=>{

        received = data;

        return "received";

    }

);

if(

    !EventBus.events.ASSET_ADDED

){

    throw new Error(

        "Event listener register failed"

    );

}

// =====================

// Emit Test

// =====================

const result =

EventBus.emit(

    "ASSET_ADDED",

    {

        name:"House",

        value:500000

    }

);

if(

    received.name !== "House"

){

    throw new Error(

        "Event emit data failed"

    );

}

if(

    result[0] !== "received"

){

    throw new Error(

        "Event callback failed"

    );

}

// =====================

// OFF Test

// =====================

EventBus.off(

    "ASSET_ADDED"

);

if(

    EventBus.events.ASSET_ADDED

){

    throw new Error(

        "Event off failed"

    );

}

// =====================

// CLEAR Test

// =====================

EventBus.on(

    "TEST",

    ()=>true

);

EventBus.clear();

if(

    Object.keys(

        EventBus.events

    ).length !==0

){

    throw new Error(

        "Event clear failed"

    );

}

console.log(

    "Event Bus Test Passed"

);
