/*

Family Wealth AI OS V7

Income Analysis Engine Test

测试：

Income Analysis Engine

↓

Income Repository

↓

Database

*/

import IncomeAnalysisEngine from "../incomeAnalysisEngine.js";

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

// Prepare Data

// =====================

IncomeRepository.save({

    id:

    1,

    name:

    "Salary",

    category:

    "工资",

    amount:

    50000

});

IncomeRepository.save({

    id:

    2,

    name:

    "Business",

    category:

    "经营收入",

    amount:

    30000

});

// =====================

// Total Income Test

// =====================

const total =

IncomeAnalysisEngine

.calculateTotalIncome();

if(

    total !== 80000

){

    throw new Error(

        "Total income calculation failed"

    );

}

// =====================

// Count Test

// =====================

const count =

IncomeAnalysisEngine

.calculateIncomeCount();

if(

    count !== 2

){

    throw new Error(

        "Income count failed"

    );

}

// =====================

// Category Test

// =====================

const categories =

IncomeAnalysisEngine

.analyzeCategory();

if(

    categories["工资"] !== 50000

){

    throw new Error(

        "Category analysis failed"

    );

}

if(

    categories["经营收入"] !== 30000

){

    throw new Error(

        "Category analysis failed"

    );

}

// =====================

// Stability Test

// =====================

const stability =

IncomeAnalysisEngine

.analyzeStability();

if(

    stability.level !== "STABLE"

){

    throw new Error(

        "Stability analysis failed"

    );

}

// =====================

// Report Test

// =====================

const report =

IncomeAnalysisEngine

.generateReport();

if(

    report.totalIncome !== 80000

){

    throw new Error(

        "Report generation failed"

    );

}

console.log(

    "Income Analysis Engine V7 Test Passed"

);
