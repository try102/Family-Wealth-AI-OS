/*

Family Wealth AI OS

Metrics Manager Test

*/

import MetricsManager from "../metricsManager.js";

// =====================

// Reset

// =====================

MetricsManager.clear();

// =====================

// Increment Test

// =====================

const count =

MetricsManager.increment(

    "advisor_calls"

);

console.log(

    "Advisor Calls:",

    count

);

if(

    count !== 1

){

    throw new Error(

        "Increment failed"

    );

}

MetricsManager.increment(

    "advisor_calls",

    4

);

if(

    MetricsManager.get(

        "advisor_calls"

    )

    !==

    5

){

    throw new Error(

        "Increment value failed"

    );

}

// =====================

// Set Test

// =====================

MetricsManager.set(

    "active_users",

    10

);

if(

    MetricsManager.get(

        "active_users"

    )

    !==

    10

){

    throw new Error(

        "Set failed"

    );

}

// =====================

// All Test

// =====================

const all =

MetricsManager.all();

console.log(

    "Metrics:",

    all

);

if(

    !all.advisor_calls

){

    throw new Error(

        "All metrics failed"

    );

}

// =====================

// Clear Test

// =====================

MetricsManager.clear();

if(

    Object.keys(

        MetricsManager.all()

    )

    .length !== 0

){

    throw new Error(

        "Clear failed"

    );

}

console.log(

    "Metrics Manager Test Passed"

);
