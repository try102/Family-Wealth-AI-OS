/*

Family Wealth AI OS

Risk Engine Test

*/

import RiskEngine from "../riskEngine.js";

// =====================

// Reset

// =====================

RiskEngine.clear();

// =====================

// Register Risk Factors

// =====================

const stockRisk =

RiskEngine.register(

    "STOCK_CONCENTRATION",

    30

);

console.log(

    "Stock Risk:",

    stockRisk

);

if(

    stockRisk !==30

){

    throw new Error(

        "Risk register failed"

    );

}

RiskEngine.register(

    "LIQUIDITY_RISK",

    20

);

RiskEngine.register(

    "MARKET_VOLATILITY",

    25

);

// =====================

// Total Score Test

// =====================

const score =

RiskEngine.totalScore();

console.log(

    "Risk Score:",

    score

);

if(

    score !==75

){

    throw new Error(

        "Risk total score failed"

    );

}

// =====================

// Level Test

// =====================

const level =

RiskEngine.level();

console.log(

    "Risk Level:",

    level

);

if(

    level !==

    "HIGH"

){

    throw new Error(

        "Risk level failed"

    );

}

// =====================

// Report Test

// =====================

const report =

RiskEngine.report();

if(

    report.score !==75

){

    throw new Error(

        "Risk report score failed"

    );

}

if(

    report.level !==

    "HIGH"

){

    throw new Error(

        "Risk report level failed"

    );

}

if(

    !report.factors

    .STOCK_CONCENTRATION

){

    throw new Error(

        "Risk report factors failed"

    );

}

// =====================

// Clear Test

// =====================

RiskEngine.clear();

if(

    RiskEngine.totalScore()

    !==0

){

    throw new Error(

        "Risk clear failed"

    );

}

console.log(

    "Risk Engine Test Passed"

);
