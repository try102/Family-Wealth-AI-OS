/*

Family Wealth AI OS V7

Liability Events Test

测试：

Event Layer

*/

import LiabilityEvents from "../liabilityEvents.js";

// =====================

// Create Event Test

// =====================

const created =

LiabilityEvents.createEvent({

    id:

    1,

    name:

    "Mortgage",

    currentBalance:

    400000

});

if(

    created.type !==

    "LIABILITY_CREATED"

){

    throw new Error(

        "Create event type failed"

    );

}

if(

    created.payload.name !==

    "Mortgage"

){

    throw new Error(

        "Create event payload failed"

    );

}

if(

    !created.timestamp

){

    throw new Error(

        "Create event timestamp failed"

    );

}

// =====================

// Update Event Test

// =====================

const updated =

LiabilityEvents.updateEvent({

    id:

    1,

    currentBalance:

    380000

});

if(

    updated.type !==

    "LIABILITY_UPDATED"

){

    throw new Error(

        "Update event type failed"

    );

}

if(

    updated.payload.currentBalance

    !==

    380000

){

    throw new Error(

        "Update event payload failed"

    );

}

// =====================

// Delete Event Test

// =====================

const deleted =

LiabilityEvents.deleteEvent(

    1

);

if(

    deleted.type !==

    "LIABILITY_DELETED"

){

    throw new Error(

        "Delete event type failed"

    );

}

if(

    deleted.payload.id !== 1

){

    throw new Error(

        "Delete event payload failed"

    );

}

console.log(

    "Liability Events V7 Test Passed"

);
