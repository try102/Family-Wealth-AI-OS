/*

Family Wealth AI OS

Health Check Test

*/

import HealthCheck from "../healthCheck.js";

// =====================

// Reset

// =====================

HealthCheck.clear();

// =====================

// Register OK Test

// =====================

HealthCheck.register(

    "DATABASE",

    ()=>{

        return {

            connected:

            true

        };

    }

);

// =====================

// Register Error Test

// =====================

HealthCheck.register(

    "API",

    ()=>{

        throw new Error(

            "API unavailable"

        );

    }

);

// =====================

// List Test

// =====================

const list =

HealthCheck.list();

console.log(

    "Checks:",

    list

);

if(

    list.length !==2

){

    throw new Error(

        "Health register failed"

    );

}

// =====================

// Run Test

// =====================

const result =

HealthCheck.run();

console.log(

    "Health Result:",

    result

);

if(

    result.DATABASE.status !==

    "OK"

){

    throw new Error(

        "Health OK check failed"

    );

}

if(

    result.API.status !==

    "ERROR"

){

    throw new Error(

        "Health error check failed"

    );

}

// =====================

// Clear Test

// =====================

HealthCheck.clear();

if(

    HealthCheck.list()

    .length !==0

){

    throw new Error(

        "Health clear failed"

    );

}

console.log(

    "Health Check Test Passed"

);
