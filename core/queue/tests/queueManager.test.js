/*

Family Wealth AI OS

Queue Manager Test

*/

import QueueManager from "../queueManager.js";

// =====================

// Reset

// =====================

QueueManager.clear();

// =====================

// Add Test

// =====================

const task1 = {

    id:

    1,

    type:

    "REPORT",

    name:

    "Generate Wealth Report"

};

const task2 = {

    id:

    2,

    type:

    "SYNC",

    name:

    "Sync Data"

};

QueueManager.add(

    task1

);

QueueManager.add(

    task2

);

console.log(

    "Queue:",

    QueueManager.list()

);

if(

    QueueManager.size()

    !==

    2

){

    throw new Error(

        "Queue add failed"

    );

}

// =====================

// Next Test

// =====================

const nextTask =

QueueManager.next();

console.log(

    "Next Task:",

    nextTask

);

if(

    nextTask.id !== 1

){

    throw new Error(

        "Queue next failed"

    );

}

if(

    QueueManager.size()

    !==

    1

){

    throw new Error(

        "Queue size failed"

    );

}

// =====================

// Remove Test

// =====================

QueueManager.add(

    {

        id:

        3,

        type:

        "TEST"

    }

);

const removed =

QueueManager.remove(

    0

);

console.log(

    "Removed:",

    removed

);

if(

    !removed

){

    throw new Error(

        "Queue remove failed"

    );

}

// =====================

// Clear Test

// =====================

QueueManager.clear();

if(

    QueueManager.size()

    !==

    0

){

    throw new Error(

        "Queue clear failed"

    );

}

console.log(

    "Queue Manager Test Passed"

);
