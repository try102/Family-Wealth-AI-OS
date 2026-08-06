/*

Family Wealth AI OS V7.3

Forecast Model Test

*/

import Forecast from "../forecast.js";

// =====================

// Create Forecast

// =====================

const forecast = new Forecast({

    id:1,

    name:"Retirement Forecast",

    startAmount:500000,

    monthlyContribution:3000,

    annualReturn:0.07,

    years:20

});

// =====================

// ID Test

// =====================

if(

    forecast.id !== 1

){

    throw new Error(

        "Forecast id failed"

    );

}

// =====================

// Name Test

// =====================

if(

    forecast.name !== "Retirement Forecast"

){

    throw new Error(

        "Forecast name failed"

    );

}

// =====================

// Start Amount Test

// =====================

if(

    forecast.startAmount !== 500000

){

    throw new Error(

        "Forecast start amount failed"

    );

}

// =====================

// Contribution Test

// =====================

if(

    forecast.monthlyContribution !== 3000

){

    throw new Error(

        "Forecast contribution failed"

    );

}

// =====================

// Return Test

// =====================

if(

    forecast.annualReturn !== 0.07

){

    throw new Error(

        "Forecast return failed"

    );

}

// =====================

// Years Test

// =====================

if(

    forecast.years !== 20

){

    throw new Error(

        "Forecast years failed"

    );

}

console.log(

    "Forecast Test Passed"

);
