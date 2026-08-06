/*

Family Wealth AI OS

Scheduler Manager Test

*/

import SchedulerManager from "../schedulerManager.js";

// =====================

// Reset

// =====================

SchedulerManager.tasks = {};

// =====================

// Register Task

// =====================

SchedulerManager.register(

    "dailyWealthCheck",

    ()=>{

        return {

            status:

            "COMPLETED",

            task:

            "wealth_check"

        };

    },

    "daily"

);

// =====================

// List Test

// =====================

const tasks =

SchedulerManager.list();

console.log(

    "Tasks:",

    tasks

);

if(

    tasks.length !== 1

){

    throw new Error(

        "Task register failed"

    );

}

// =====================

// Run Test

// =====================

const result =

SchedulerManager.run(

    "dailyWealthCheck"

);

console.log(

    "Run Result:",

    result

);

if(

    result.status !==

    "COMPLETED"

){

    throw new Error(

        "Task execution failed"

    );

}

// =====================

// Remove Test

// =====================

SchedulerManager.remove(

    "dailyWealthCheck"

);

if(

    SchedulerManager.list()

    .length !==0

){

    throw new Error(

        "Task remove failed"

    );

}

console.log(

    "Scheduler Manager Test Passed"

);
