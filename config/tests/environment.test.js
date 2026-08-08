/*

Family Wealth AI OS V7

Environment Test

*/

import Environment

from "../environment.js";

// =====================

// Development Test

// =====================

if(

    Environment.isDevelopment()

    !== true

){

    throw new Error(

        "Development environment failed"

    );

}

// =====================

// Production Test

// =====================

Environment.current =

"production";

if(

    Environment.isProduction()

    !== true

){

    throw new Error(

        "Production environment failed"

    );

}

console.log(

    "Environment Test Passed"

);
