/*

Family Wealth AI OS V7

Income Service Test

*/

import IncomeService from "../incomeService.js";

import IncomeRepository from "../../repository/incomeRepository.js";

// =====================

// Clear Test Data

// =====================

IncomeRepository.clear();

// =====================

// Add Income Test

// =====================

const salary =

IncomeService.addIncome({

    name: "Salary",

    category: "工资",

    amount: 10000

});

if(

    !salary

){

    throw new Error(

        "Add income failed"

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

        "Query income failed"

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

IncomeService.updateIncome(

    salary.id,

    {

        amount: 12000

    }

);

const updated =

IncomeService.getIncomeById(

    salary.id

);

if(

    updated.amount !== 12000

){

    throw new Error(

        "Update income failed"

    );

}

// =====================

// Delete Test

// =====================

IncomeService.deleteIncome(

    salary.id

);

if(

    IncomeService.getAllIncome().length !== 0

){

    throw new Error(

        "Delete income failed"

    );

}

console.log(

    "Income Service Test Passed"

);
