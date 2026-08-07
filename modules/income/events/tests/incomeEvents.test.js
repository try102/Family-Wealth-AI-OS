/*

Family Wealth AI OS V7

Income Events Test

测试：

Income Event Definition

*/

import IncomeEvents from "../incomeEvents.js";

// =====================

// Test Event Names

// =====================

if(

    IncomeEvents.INCOME_CREATED

    !==

    "income.created"

){

    throw new Error(

        "Income created event name failed"

    );

}

if(

    IncomeEvents.INCOME_UPDATED

    !==

    "income.updated"

){

    throw new Error(

        "Income updated event name failed"

    );

}

if(

    IncomeEvents.INCOME_DELETED

    !==

    "income.deleted"

){

    throw new Error(

        "Income deleted event name failed"

    );

}

// =====================

// Create Event Test

// =====================

const income = {

    id:

    1,

    name:

    "Salary",

    amount:

    50000

};

const createdEvent =

IncomeEvents

.createIncomeCreatedEvent(

    income

);

if(

    createdEvent.type

    !==

    "income.created"

){

    throw new Error(

        "Create event type failed"

    );

}

if(

    createdEvent.payload.amount

    !==

    50000

){

    throw new Error(

        "Create event payload failed"

    );

}

if(

    !createdEvent.timestamp

){

    throw new Error(

        "Create event timestamp failed"

    );

}

// =====================

// Update Event Test

// =====================

const updatedEvent =

IncomeEvents

.createIncomeUpdatedEvent(

    income

);

if(

    updatedEvent.type

    !==

    "income.updated"

){

    throw new Error(

        "Update event failed"

    );

}

// =====================

// Delete Event Test

// =====================

const deletedEvent =

IncomeEvents

.createIncomeDeletedEvent(

    1

);

if(

    deletedEvent.type

    !==

    "income.deleted"

){

    throw new Error(

        "Delete event failed"

    );

}

if(

    deletedEvent.payload.id

    !==

    1

){

    throw new Error(

        "Delete payload failed"

    );

}

console.log(

    "Income Events V7 Test Passed"

);
