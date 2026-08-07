/*

Family Wealth AI OS V7

Income AI Test

测试：

Income AI

↓

Income Agent

↓

Income API

↓

Database

*/

import IncomeAI from "../incomeAI.js";

import IncomeAgent from "../../agent/incomeAgent.js";

import IncomeRepository from "../../repository/incomeRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

// =====================

// Clear

// =====================

IncomeRepository.clear();

// =====================

// Create Income Data

// =====================

IncomeAgent.addIncome({

    name:

    "Salary",

    category:

    "工资",

    amount:

    50000,

    owner:

    "Family"

});

// =====================

// Analyze Test

// =====================

const analysis =

IncomeAI.analyzeIncome();

if(

    analysis.type !== "INCOME_ANALYSIS"

){

    throw new Error(

        "Income AI analysis failed"

    );

}

if(

    analysis.summary.totalIncome !== 50000

){

    throw new Error(

        "Income AI summary failed"

    );

}

// =====================

// Insight Test

// =====================

if(

    analysis.insights.length === 0

){

    throw new Error(

        "Income AI insight failed"

    );

}

// =====================

// Ask Test

// =====================

const answer =

IncomeAI.ask(

    "如何优化家庭收入?"

);

if(

    !answer.answer

){

    throw new Error(

        "Income AI answer failed"

    );

}

console.log(

    "Income AI V7 Test Passed"

);
