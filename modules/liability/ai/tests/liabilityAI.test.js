/*

Family Wealth AI OS V7

Liability AI Test

测试：

AI Layer

↓

Agent

↓

API

↓

Service

↓

Repository

*/

import LiabilityAI from "../liabilityAI.js";

import LiabilityAPI from "../../api/liabilityAPI.js";

import LiabilityRepository from "../../repository/liabilityRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

LiabilityRepository.clear();

// =====================

// Prepare High Debt Data

// =====================

LiabilityAPI.createLiability({

    name:

    "Mortgage",

    category:

    "Mortgage",

    currentBalance:

    700000,

    interestRate:

    5.5

});

LiabilityAPI.createLiability({

    name:

    "Credit Card",

    category:

    "Credit Card",

    currentBalance:

    30000,

    interestRate:

    20

});

// =====================

// Analyze Test

// =====================

const analysis =

LiabilityAI.analyzeDebt();

if(

    analysis.type !==

    "LIABILITY_ANALYSIS"

){

    throw new Error(

        "AI analysis type failed"

    );

}

if(

    !analysis.data

){

    throw new Error(

        "AI analysis data failed"

    );

}

// =====================

// Advice Test

// =====================

const advice =

LiabilityAI.generateAdvice(

    "如何降低负债？"

);

if(

    !advice.recommendation

){

    throw new Error(

        "AI recommendation failed"

    );

}

if(

    advice.analysis

    .data

    .analysis

    .debtLevel

    !==

    "HIGH"

){

    throw new Error(

        "Debt level AI analysis failed"

    );

}

console.log(

    "Liability AI V7 Test Passed"

);
