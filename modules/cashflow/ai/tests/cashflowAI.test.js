/*

Family Wealth AI OS V7

Cashflow AI Test

*/

import cashflowAI

from "../cashflowAI.js";

import cashflowAPI

from "../../api/cashflowAPI.js";

import cashflowRepository

from "../../repository/cashflowRepository.js";

// =====================

// Clear Before Test

// =====================

cashflowRepository.clear();

// =====================

// Prepare Data

// =====================

cashflowAPI.createCashflow({

    type:

    "INCOME",

    category:

    "Salary",

    amount:

    30000

});

cashflowAPI.createCashflow({

    type:

    "EXPENSE",

    category:

    "Living",

    amount:

    8000

});

// =====================

// Analyze Test

// =====================

const analysis =

cashflowAI.analyze();

if(

    !analysis.summary

){

    throw new Error(

        "AI analyze summary failed"

    );

}

if(

    analysis.score <= 0

){

    throw new Error(

        "AI score failed"

    );

}

// =====================

// Advice Test

// =====================

const advice =

cashflowAI.generateAdvice();

if(

    !advice.recommendation

){

    throw new Error(

        "AI advice failed"

    );

}

if(

    advice.recommendation.length === 0

){

    throw new Error(

        "AI recommendation empty"

    );

}

// =====================

// Risk Test

// =====================

const risk =

cashflowAI.riskAssessment();

if(

    !risk.risk

){

    throw new Error(

        "Risk assessment failed"

    );

}

if(

    typeof risk.savingRate !==

    "number"

){

    throw new Error(

        "Saving rate type failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow AI V7 Test Passed"

);
