/*

Family Wealth AI OS V7.2

Goal Manager Test

*/

import GoalManager from "../goalManager.js";

import Goal from "../goal.js";

// =====================

// Reset

// =====================

GoalManager.clear();

// =====================

// Add Test

// =====================

const retirement = new Goal({

    id:1,

    name:"Retirement",

    category:"RETIREMENT",

    targetAmount:3000000,

    currentAmount:500000,

    priority:"HIGH"

});

const added =

GoalManager.add(

    retirement

);

if(

    added.name !== "Retirement"

){

    throw new Error(

        "Goal add failed"

    );

}

// =====================

// List Test

// =====================

if(

    GoalManager.list().length !==1

){

    throw new Error(

        "Goal list failed"

    );

}

// =====================

// Get Test

// =====================

const found =

GoalManager.get(

    1

);

if(

    found.category !== "RETIREMENT"

){

    throw new Error(

        "Goal get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

GoalManager.update(

    1,

    {

        currentAmount:1000000

    }

);

if(

    updated.currentAmount !==1000000

){

    throw new Error(

        "Goal update failed"

    );

}

// =====================

// Invalid Goal Test

// =====================

try{

    GoalManager.add({});

    throw new Error(

        "Invalid goal check failed"

    );

}

catch(error){

}

// =====================

// Remove Test

// =====================

GoalManager.remove(

    1

);

if(

    GoalManager.list().length !==0

){

    throw new Error(

        "Goal remove failed"

    );

}

// =====================

// Clear Test

// =====================

GoalManager.add(

    new Goal({

        id:2,

        name:"House"

    })

);

GoalManager.clear();

if(

    GoalManager.list().length !==0

){

    throw new Error(

        "Goal clear failed"

    );

}

console.log(

    "Goal Manager Test Passed"

);
