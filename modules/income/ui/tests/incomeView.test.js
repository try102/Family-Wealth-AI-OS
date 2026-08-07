/*

Family Wealth AI OS V7

Income View Test

测试：

Income View

↓

Income Agent

↓

Income API

↓

Database

*/

import IncomeView from "../incomeView.js";

import IncomeAgent from "../../agent/incomeAgent.js";

import IncomeRepository from "../../repository/incomeRepository.js";

import Database from "../../../../storage/database.js";

// =====================

// Initialize

// =====================

Database.init();

IncomeRepository.clear();

// =====================

// Prepare Data

// =====================

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

IncomeAgent.addIncome({

    name:

    "Dividend",

    category:

    "股息",

    amount:

    5000,

    owner:

    "Family"

});

// =====================

// List Test

// =====================

const listView =

IncomeView.renderList();

if(

    listView.title !== "Income List"

){

    throw new Error(

        "Income list title failed"

    );

}

if(

    listView.data.length !== 2

){

    throw new Error(

        "Income list failed"

    );

}

// =====================

// Summary Test

// =====================

const summaryView =

IncomeView.renderSummary();

if(

    summaryView.data.count !== 2

){

    throw new Error(

        "Income summary count failed"

    );

}

if(

    summaryView.data.totalIncome !== 35000

){

    throw new Error(

        "Income summary amount failed"

    );

}

// =====================

// Dashboard Test

// =====================

const dashboard =

IncomeView.renderDashboard();

if(

    dashboard.module !== "income"

){

    throw new Error(

        "Dashboard module failed"

    );

}

if(

    dashboard.analysis.type !== "INCOME_ANALYSIS"

){

    throw new Error(

        "Dashboard analysis failed"

    );

}

console.log(

    "Income View V7 Test Passed"

);
