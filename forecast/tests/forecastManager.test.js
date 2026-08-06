/*

Family Wealth AI OS V7.3

Forecast Manager Test

*/

import ForecastManager from "../forecastManager.js";

import Forecast from "../forecast.js";

// =====================

// Reset

// =====================

ForecastManager.clear();

// =====================

// Add Test

// =====================

const retirement = new Forecast({

    id:1,

    name:"Retirement Forecast",

    startAmount:500000,

    monthlyContribution:3000,

    annualReturn:0.07,

    years:20

});

const added =

ForecastManager.add(

    retirement

);

if(

    added.name !== "Retirement Forecast"

){

    throw new Error(

        "Forecast add failed"

    );

}

// =====================

// List Test

// =====================

if(

    ForecastManager.list().length !==1

){

    throw new Error(

        "Forecast list failed"

    );

}

// =====================

// Get Test

// =====================

const found =

ForecastManager.get(

    1

);

if(

    found.startAmount !==500000

){

    throw new Error(

        "Forecast get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

ForecastManager.update(

    1,

    {

        annualReturn:0.08

    }

);

if(

    updated.annualReturn !==0.08

){

    throw new Error(

        "Forecast update failed"

    );

}

// =====================

// Invalid Forecast Test

// =====================

try{

    ForecastManager.add({});

    throw new Error(

        "Invalid forecast check failed"

    );

}

catch(error){

}

// =====================

// Remove Test

// =====================

ForecastManager.remove(

    1

);

if(

    ForecastManager.list().length !==0

){

    throw new Error(

        "Forecast remove failed"

    );

}

// =====================

// Clear Test

// =====================

ForecastManager.add(

    new Forecast({

        id:2,

        name:"Education Forecast"

    })

);

ForecastManager.clear();

if(

    ForecastManager.list().length !==0

){

    throw new Error(

        "Forecast clear failed"

    );

}

console.log(

    "Forecast Manager Test Passed"

);
