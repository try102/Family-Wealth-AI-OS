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

    35

);

console.log(

    "Risk Factor:",

    stockRisk

);

if(

    stockRisk !==35

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

    score !==80

){

    throw new Error(

        "Risk score calculation failed"

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

    report.score !==80

){

    throw new Error(

        "Risk report failed"

    );

}

if(

    report.factors

    .STOCK_CONCENTRATION

    !==35

){

    throw new Error(

        "Risk factor report failed"

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
