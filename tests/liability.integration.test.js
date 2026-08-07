/*

Family Wealth AI OS V7

Liability Integration Test

完整链路测试

UI

↓

AI

↓

Agent

↓

API

↓

Service

↓

Repository

↓

Database

↓

Storage

*/

import Database from "../storage/database.js";

import LiabilityAPI from "../modules/liability/api/liabilityAPI.js";

import LiabilityAgent from "../modules/liability/agent/liabilityAgent.js";

import LiabilityAI from "../modules/liability/ai/liabilityAI.js";

import LiabilityView from "../modules/liability/ui/liabilityView.js";

import LiabilityRepository from "../modules/liability/repository/liabilityRepository.js";

// =====================

// Initialize

// =====================

Database.init();

LiabilityRepository.clear();

// =====================

// Create Liability

// =====================

const liability =

LiabilityAPI.createLiability({

    name:

    "Home Mortgage",

    category:

    "Mortgage",

    lender:

    "Bank",

    currentBalance:

    300000,

    interestRate:

    5.5,

    monthlyPayment:

    2000

});

if(

    !liability.id

){

    throw new Error(

        "Create liability failed"

    );

}

// =====================

// API Test

// =====================

const list =

LiabilityAPI.getLiabilities();

if(

    list.length !== 1

){

    throw new Error(

        "API chain failed"

    );

}

// =====================

// Agent Test

// =====================

const review =

LiabilityAgent

.generateLiabilityReview();

if(

    !review.summary

){

    throw new Error(

        "Agent chain failed"

    );

}

// =====================

// AI Test

// =====================

const aiResult =

LiabilityAI.generateAdvice(

    "如何优化家庭负债？"

);

if(

    !aiResult.recommendation

){

    throw new Error(

        "AI chain failed"

    );

}

// =====================

// UI Test

// =====================

const dashboard =

LiabilityView.getDashboard();

if(

    dashboard.summary.totalLiability

    !==

    300000

){

    throw new Error(

        "UI data failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Liability Integration V7 Test Passed"

);
