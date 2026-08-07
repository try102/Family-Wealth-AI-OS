/*

Family Wealth AI OS V7

Income Agent Test

测试：

Income Agent

↓

Income API

↓

Income Service

↓

Database

*/

import IncomeAgent from "../incomeAgent.js";

import IncomeRepository from "../../repository/incomeRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

// =====================

// Clear Data

// =====================

IncomeRepository.clear();

// =====================

// Agent Init

// =====================

const status =

IncomeAgent.init();

if(

    status.status !== "Income Agent Ready"

){

    throw new Error(

        "Agent initialize failed"

    );

}

// =====================

// Add Income

// =====================

const income =

IncomeAgent.addIncome({

    name:

    "Salary",

    category:

    "工资",

    amount:

    30000,

    owner:

    "Family"

});

if(

    !income.id

){

    throw new Error(

        "Agent add income failed"

    );

}

// =====================

// Get Income

// =====================

const list =

IncomeAgent.getIncome();

if(

    list.length !== 1

){

    throw new Error(

        "Agent get income failed"

    );

}

// =====================

// Summary

// =====================

const summary =

IncomeAgent.getIncomeSummary();

if(

    summary.totalIncome !== 30000

){

    throw new Error(

        "Agent summary failed"

    );

}

// =====================

// Analysis

// =====================

const analysis =

IncomeAgent.analyze();

if(

    analysis.type !== "INCOME_ANALYSIS"

){

    throw new Error(

        "Agent analysis failed"

    );

}

// =====================

// Delete

// =====================

const deleted =

IncomeAgent.deleteIncome(

    income.id

);

if(

    deleted !== true

){

    throw new Error(

        "Agent delete failed"

    );

}

console.log(

    "Income Agent V7 Test Passed"

);
