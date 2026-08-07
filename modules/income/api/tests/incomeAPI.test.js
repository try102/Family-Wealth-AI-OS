/*

Family Wealth AI OS V7

Income API Test

测试：

API

↓

Service

↓

Repository

↓

Database

*/

import IncomeAPI from "../incomeAPI.js";

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

// Create Income

// =====================

const income =

IncomeAPI.createIncome({

    name:

    "Business Income",

    category:

    "经营收入",

    amount:

    20000,

    owner:

    "Family"

});

if(

    !income.id

){

    throw new Error(

        "API create failed"

    );

}

// =====================

// Get All

// =====================

const list =

IncomeAPI.getAllIncome();

if(

    list.length !== 1

){

    throw new Error(

        "API get all failed"

    );

}

// =====================

// Get By Id

// =====================

const item =

IncomeAPI.getIncomeById(

    income.id

);

if(

    item.category !== "经营收入"

){

    throw new Error(

        "API get by id failed"

    );

}

// =====================

// Update

// =====================

const updated =

IncomeAPI.updateIncome(

    income.id,

    {

        amount:

        25000

    }

);

if(

    updated.amount !== 25000

){

    throw new Error(

        "API update failed"

    );

}

// =====================

// Summary

// =====================

const summary =

IncomeAPI.getSummary();

if(

    summary.totalIncome !== 25000

){

    throw new Error(

        "API summary failed"

    );

}

// =====================

// Delete

// =====================

const deleted =

IncomeAPI.deleteIncome(

    income.id

);

if(

    deleted !== true

){

    throw new Error(

        "API delete failed"

    );

}

console.log(

    "Income API V7 Test Passed"

);
