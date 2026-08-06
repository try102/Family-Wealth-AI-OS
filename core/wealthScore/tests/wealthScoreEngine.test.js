/*

Family Wealth AI OS

Wealth Score Engine Test

*/

import WealthScoreEngine from "../wealthScoreEngine.js";

// =====================

// Reset

// =====================

WealthScoreEngine.clear();

// =====================

// Set Factors Test

// =====================

const netWorth =

WealthScoreEngine.set(

    "NET_WORTH",

    90

);

console.log(

    "Net Worth Score:",

    netWorth

);

if(

    netWorth !==90

){

    throw new Error(

        "Wealth score set failed"

    );

}

WealthScoreEngine.set(

    "CASH_FLOW",

    80

);

WealthScoreEngine.set(

    "INVESTMENT",

    70

);

// =====================

// Total Test

// =====================

const score =

WealthScoreEngine.total();

console.log(

    "Total Score:",

    score

);

if(

    score !==80

){

    throw new Error(

        "Wealth score total failed"

    );

}

// =====================

// Level Test

// =====================

const level =

WealthScoreEngine.level();

console.log(

    "Level:",

    level

);

if(

    level !==

    "EXCELLENT"

){

    throw new Error(

        "Wealth score level failed"

    );

}

// =====================

// Report Test

// =====================

const report =

WealthScoreEngine.report();

if(

    report.score !==80

){

    throw new Error(

        "Wealth score report failed"

    );

}

if(

    !report.factors.NET_WORTH

){

    throw new Error(

        "Wealth score factors failed"

    );

}

// =====================

// Clear Test

// =====================

WealthScoreEngine.clear();

if(

    Object.keys(

        WealthScoreEngine.factors

    )

    .length !==0

){

    throw new Error(

        "Wealth score clear failed"

    );

}

console.log(

    "Wealth Score Engine Test Passed"

);
