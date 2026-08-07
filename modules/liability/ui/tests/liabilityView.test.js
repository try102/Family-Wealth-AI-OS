/*

Family Wealth AI OS V7

Liability View Test

测试：

UI Layer

↓

API

↓

Agent

*/

import LiabilityView from "../liabilityView.js";

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

    500000,

    interestRate:

    5

});

// =====================

// List View Test

// =====================

const listView =

LiabilityView.getListView();

if(

    listView.title !==

    "Liability Center"

){

    throw new Error(

        "List view title failed"

    );

}

if(

    listView.liabilities.length !== 1

){

    throw new Error(

        "List view data failed"

    );

}

// =====================

// Dashboard Test

// =====================

const dashboard =

LiabilityView.getDashboard();

if(

    dashboard.summary.count !== 1

){

    throw new Error(

        "Dashboard summary failed"

    );

}

if(

    !dashboard.analysis

){

    throw new Error(

        "Dashboard analysis failed"

    );

}

// =====================

// Table Data Test

// =====================

const table =

LiabilityView.getTableData();

if(

    table[0].name !==

    "Mortgage"

){

    throw new Error(

        "Table data failed"

    );

}

if(

    table[0].balance !==

    500000

){

    throw new Error(

        "Table balance failed"

    );

}

console.log(

    "Liability View V7 Test Passed"

);
