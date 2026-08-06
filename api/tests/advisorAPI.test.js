/*

Family Wealth AI OS V7

Advisor API Test

*/

import AdvisorAPI from "../advisorAPI.js";

// =====================

// Health Test

// =====================

const health =

AdvisorAPI.health();

console.log(

    "Health:",

    health

);

if(

    health.status !==

    "OK"

){

    throw new Error(

        "API health failed"

    );

}

if(

    health.version !==

    "V7.0"

){

    throw new Error(

        "API version failed"

    );

}

// =====================

// Empty Question Test

// =====================

const empty =

AdvisorAPI.ask(

    ""

);

if(

    empty.success !== false

){

    throw new Error(

        "Empty question handling failed"

    );

}

// =====================

// Ask Test

// =====================

const result =

AdvisorAPI.ask(

    "我的财富情况怎么样？"

);

console.log(

    "Advisor API Result:",

    result

);

if(

    result.success !== true

){

    throw new Error(

        "Advisor API ask failed"

    );

}

if(

    !result.data

){

    throw new Error(

        "Advisor API data missing"

    );

}

if(

    !result.data.answer

){

    throw new Error(

        "Advisor API answer missing"

    );

}

console.log(

    "Advisor API Test Passed"

);
