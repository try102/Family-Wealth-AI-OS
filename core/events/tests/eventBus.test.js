/*

Family Wealth AI OS

Event Bus Test

*/

import EventBus from "../eventBus.js";

// =====================

// Reset

// =====================

EventBus.clear();

let received = null;

const callback =

(data)=>{

    received = data;

};

// =====================

// Subscribe Test

// =====================

EventBus.subscribe(

    "ASSET_UPDATED",

    callback

);

// =====================

// Publish Test

// =====================

const event =

EventBus.publish(

    "ASSET_UPDATED",

    {

        name:

        "House",

        value:

        500000

    }

);

console.log(

    "Event:",

    event

);

if(

    received.name !==

    "House"

){

    throw new Error(

        "Event publish failed"

    );

}

// =====================

// History Test

// =====================

const history =

EventBus.getHistory();

console.log(

    "History:",

    history

);

if(

    history.length !== 1

){

    throw new Error(

        "Event history failed"

    );

}

// =====================

// Unsubscribe Test

// =====================

EventBus.unsubscribe(

    "ASSET_UPDATED",

    callback

);

received = null;

EventBus.publish(

    "ASSET_UPDATED",

    {

        name:

        "Stock"

    }

);

if(

    received !== null

){

    throw new Error(

        "Event unsubscribe failed"

    );

}

console.log(

    "Event Bus Test Passed"

);
