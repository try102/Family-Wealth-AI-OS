/*

Family Wealth AI OS V7

Liability Agent Test

测试：

Agent

↓

API

↓

Service

↓

Repository

*/

import LiabilityAgent from "../liabilityAgent.js";

import LiabilityAPI from "../../api/liabilityAPI.js";

import LiabilityRepository from "../../repository/liabilityRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

LiabilityRepository.clear();

// =====================

// Prepare Data

// =====================

LiabilityAPI.createLiability({

    name:

    "Mortgage",

    category:

    "Mortgage",

    currentBalance:

    600000,

    interestRate:

    5.5

});

LiabilityAPI.createLiability({

    name:

    "Credit Card",

    category:

    "Credit Card",

    currentBalance:

    20000,

    interestRate:

    18

});

// =====================

// Get Data Test

// =====================

const list =

LiabilityAgent.getLiabilities();

if(

    list.length !== 2

){

    throw new Error(

        "Agent get liabilities failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

LiabilityAgent.getLiabilitySummary();

if(

    summary.count !== 2

){

    throw new Error(

        "Agent summary count failed"

    );

}

if(

    summary.totalLiability !== 620000

){

    throw new Error(

        "Agent summary amount failed"

    );

}

// =====================

// Analysis Test

// =====================

const analysis =

LiabilityAgent.analyzeDebtStatus();

if(

    analysis.debtLevel !== "HIGH"

){

    throw new Error(

        "Debt level analysis failed"

    );

}

// =====================

// Review Test

// =====================

const review =

LiabilityAgent.generateLiabilityReview();

if(

    !review.recommendation

){

    throw new Error(

        "Review generation failed"

    );

}

console.log(

    "Liability Agent V7 Test Passed"

);
