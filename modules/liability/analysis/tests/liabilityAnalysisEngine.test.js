/*

Family Wealth AI OS V7

Liability Analysis Engine Test

测试：

Analysis Engine

↓

Liability Data

*/

import LiabilityAnalysisEngine from "../liabilityAnalysisEngine.js";

// =====================

// Test Data

// =====================

const liabilities = [

    {

        name:

        "Mortgage",

        currentBalance:

        400000,

        monthlyPayment:

        2500,

        interestRate:

        5

    },

    {

        name:

        "Credit Card",

        currentBalance:

        20000,

        monthlyPayment:

        800,

        interestRate:

        18

    }

];

// =====================

// Total Debt Test

// =====================

const totalDebt =

LiabilityAnalysisEngine.totalDebt(

    liabilities

);

if(

    totalDebt !== 420000

){

    throw new Error(

        "Total debt calculation failed"

    );

}

// =====================

// Monthly Payment Test

// =====================

const payment =

LiabilityAnalysisEngine.totalMonthlyPayment(

    liabilities

);

if(

    payment !== 3300

){

    throw new Error(

        "Monthly payment calculation failed"

    );

}

// =====================

// Average Interest Test

// =====================

const rate =

LiabilityAnalysisEngine.averageInterestRate(

    liabilities

);

if(

    rate !== 11.5

){

    throw new Error(

        "Average interest rate failed"

    );

}

// =====================

// Risk Score Test

// =====================

const risk =

LiabilityAnalysisEngine.debtRiskScore(

    liabilities

);

if(

    risk <= 0

){

    throw new Error(

        "Risk score failed"

    );

}

// =====================

// Full Analysis Test

// =====================

const analysis =

LiabilityAnalysisEngine.analyze(

    liabilities

);

if(

    analysis.totalDebt !== 420000

){

    throw new Error(

        "Full analysis failed"

    );

}

if(

    !analysis.debtRiskScore

){

    throw new Error(

        "Analysis risk missing"

    );

}

console.log(

    "Liability Analysis Engine V7 Test Passed"

);
