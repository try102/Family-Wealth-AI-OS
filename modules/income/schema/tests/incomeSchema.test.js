/*

Family Wealth AI OS V7

Income Schema Test

*/

import IncomeSchema from "../incomeSchema.js";

// =====================

// Default Create Test

// =====================

const income =

IncomeSchema.create();

if(

    income.category !==

    "其他"

){

    throw new Error(

        "Default category failed"

    );

}

if(

    income.currency !==

    "USD"

){

    throw new Error(

        "Default currency failed"

    );

}

// =====================

// Amount Convert Test

// =====================

const salary =

IncomeSchema.create({

    name:

    "Salary",

    category:

    "工资",

    amount:

    "10000"

});

if(

    salary.amount !==

    10000

){

    throw new Error(

        "Amount conversion failed"

    );

}

// =====================

// Custom Field Test

// =====================

const rental =

IncomeSchema.create({

    name:

    "Rental Income",

    category:

    "租金",

    taxable:

    false,

    owner:

    "Family"

});

if(

    rental.taxable !==

    false

){

    throw new Error(

        "Taxable field failed"

    );

}

if(

    rental.owner !==

    "Family"

){

    throw new Error(

        "Owner field failed"

    );

}

console.log(

    "Income Schema Test Passed"

);
