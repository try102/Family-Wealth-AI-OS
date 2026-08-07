/*

Family Wealth AI OS V7

Income Service Test

测试：

Income Service

↓

Income Repository

↓

Database

↓

Storage

*/

import IncomeService from "../incomeService.js";

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

// Create Test

// =====================

const income =

IncomeService.addIncome({

    name:

    "Salary",

    category:

    "工资",

    amount:

    10000,

    owner:

    "Family"

});

if(

    !income.id

){

    throw new Error(

        "Create income failed"

    );

}

// =====================

// Query Test

// =====================

const list =

IncomeService.getAllIncome();

if(

    list.length !== 1

){

    throw new Error(

        "Get income failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

IncomeService.getSummary();

if(

    summary.count !== 1

){

    throw new Error(

        "Summary count failed"

    );

}

if(

    summary.totalIncome !== 10000

){

    throw new Error(

        "Summary amount failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

IncomeService.updateIncome(

    income.id,

    {

        amount:

        12000

    }

);

if(

    updated.amount !== 12000

){

    throw new Error(

        "Update failed"

    );

}

// =====================

// Delete Test

// =====================

const deleted =

IncomeService.deleteIncome(

    income.id

);

if(

    deleted !== true

){

    throw new Error(

        "Delete failed"

    );

}

if(

    IncomeService.getAllIncome()

    .length !== 0

){

    throw new Error(

        "Delete verify failed"

    );

}

console.log(

    "Income Service V7 Test Passed"

);
