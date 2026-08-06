/*

Family Wealth AI OS

Goal Engine Test

*/

import GoalEngine from "../goalEngine.js";

// =====================

// Reset

// =====================

GoalEngine.clear();

// =====================

// Add Goal Test

// =====================

const houseGoal =

GoalEngine.add(

    {

        id:

        1,

        name:

        "Buy House",

        target:

        800000,

        current:

        200000

    }

);

console.log(

    "Goal:",

    houseGoal

);

if(

    houseGoal.name !==

    "Buy House"

){

    throw new Error(

        "Goal add failed"

    );

}

// =====================

// Progress Test

// =====================

const progress =

GoalEngine.progress(

    1

);

console.log(

    "Progress:",

    progress

);

if(

    progress !==25

){

    throw new Error(

        "Goal progress failed"

    );

}

// =====================

// Gap Test

// =====================

const gap =

GoalEngine.gap(

    1

);

console.log(

    "Gap:",

    gap

);

if(

    gap !==600000

){

    throw new Error(

        "Goal gap failed"

    );

}

// =====================

// Report Test

// =====================

const report =

GoalEngine.report();

if(

    report.length !==1

){

    throw new Error(

        "Goal report failed"

    );

}

if(

    report[0].progress !==25

){

    throw new Error(

        "Goal report progress failed"

    );

}

// =====================

// Clear Test

// =====================

GoalEngine.clear();

if(

    GoalEngine.list()

    .length !==0

){

    throw new Error(

        "Goal clear failed"

    );

}

console.log(

    "Goal Engine Test Passed"

);
