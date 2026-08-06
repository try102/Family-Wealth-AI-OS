/*

Family Wealth AI OS V7.2

Goal Model Test

*/

import Goal from "../goal.js";

// =====================

// Create Goal

// =====================

const goal = new Goal({

    id:1,

    name:"Retirement",

    category:"RETIREMENT",

    targetAmount:3000000,

    currentAmount:500000,

    targetDate:"2040-01-01",

    priority:"HIGH",

    status:"ACTIVE"

});

// =====================

// ID Test

// =====================

if(

    goal.id !== 1

){

    throw new Error(

        "Goal id failed"

    );

}

// =====================

// Name Test

// =====================

if(

    goal.name !== "Retirement"

){

    throw new Error(

        "Goal name failed"

    );

}

// =====================

// Category Test

// =====================

if(

    goal.category !== "RETIREMENT"

){

    throw new Error(

        "Goal category failed"

    );

}

// =====================

// Target Amount Test

// =====================

if(

    goal.targetAmount !== 3000000

){

    throw new Error(

        "Goal target amount failed"

    );

}

// =====================

// Current Amount Test

// =====================

if(

    goal.currentAmount !== 500000

){

    throw new Error(

        "Goal current amount failed"

    );

}

// =====================

// Date Test

// =====================

if(

    goal.targetDate !== "2040-01-01"

){

    throw new Error(

        "Goal date failed"

    );

}

// =====================

// Priority Test

// =====================

if(

    goal.priority !== "HIGH"

){

    throw new Error(

        "Goal priority failed"

    );

}

// =====================

// Status Test

// =====================

if(

    goal.status !== "ACTIVE"

){

    throw new Error(

        "Goal status failed"

    );

}

console.log(

    "Goal Test Passed"

);
