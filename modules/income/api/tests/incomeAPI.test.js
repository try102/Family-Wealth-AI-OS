/*

Family Wealth AI OS V7

Income API Test

*/

import IncomeAPI from "../incomeAPI.js";

import IncomeRepository from "../../repository/incomeRepository.js";

// =====================

// Clear Test Data

// =====================

IncomeRepository.clear();

// =====================

// Create Income Test

// =====================

const income =

IncomeAPI.createIncome({

    name: "Salary",

    category: "工资",

    amount: 8000

});

if(

    !income

){

    throw new Error(

        "Create income failed"

    );

}

// =====================

// Query Test

// =====================

const list =

IncomeAPI.getAllIncome();

if(

    list.length !== 1

){

    throw new Error(

        "Get all income failed"

    );

}

// =====================

// Get By Id Test

// =====================

const item =

IncomeAPI.getIncomeById(

    income.id

);

if(

    item.name !== "Salary"

){

    throw new Error(

        "Get income by id failed"

    );

}

// =====================

// Update Test

// =====================

IncomeAPI.updateIncome(

    income.id,

    {

        amount: 9000

    }

);

const updated =

IncomeAPI.getIncomeById(

    income.id

);

if(

    updated.amount !== 9000

){

    throw new Error(

        "Update income failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

IncomeAPI.getSummary();

if(

    summary.totalIncome !== 9000

){

    throw new Error(

        "Income summary failed"

    );

}

// =====================

// Delete Test

// =====================

IncomeAPI.deleteIncome(

    income.id

);

if(

    IncomeAPI.getAllIncome().length !== 0

){

    throw new Error(

        "Delete income failed"

    );

}

console.log(

    "Income API Test Passed"

);
