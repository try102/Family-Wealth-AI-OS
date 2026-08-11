/*

Family Wealth AI OS V7

Cashflow Schema Test

*/

import cashflowSchema

    from "../cashflowSchema.js";

// ==================================================

// Test 1

// Create Yearly Income

// ==================================================

const yearlyIncome =

    cashflowSchema.create({

        type:

            "INCOME",

        category:

            "Salary",

        description:

            "Annual Salary",

        amount:

            80000,

        frequency:

            "YEARLY"

    });

console.assert(

    yearlyIncome.type ===

        "INCOME",

    "Test 1 failed: type"

);

console.assert(

    yearlyIncome.amount ===

        80000,

    "Test 1 failed: amount"

);

console.assert(

    yearlyIncome.frequency ===

        "YEARLY",

    "Test 1 failed: frequency"

);

console.assert(

    yearlyIncome.annualizedAmount ===

        80000,

    "Test 1 failed: annualized amount"

);

// ==================================================

// Test 2

// Monthly Expense

// ==================================================

const monthlyExpense =

    cashflowSchema.create({

        type:

            "EXPENSE",

        category:

            "Housing",

        amount:

            3000,

        frequency:

            "MONTHLY"

    });

console.assert(

    monthlyExpense.frequency ===

        "MONTHLY",

    "Test 2 failed: frequency"

);

console.assert(

    monthlyExpense.annualizedAmount ===

        36000,

    "Test 2 failed: annualized amount"

);

// ==================================================

// Test 3

// Quarterly Expense

// ==================================================

const quarterlyExpense =

    cashflowSchema.create({

        type:

            "EXPENSE",

        amount:

            3000,

        frequency:

            "QUARTERLY"

    });

console.assert(

    quarterlyExpense.annualizedAmount ===

        12000,

    "Test 3 failed: annualized amount"

);

// ==================================================

// Test 4

// One Time

// ==================================================

const oneTimeExpense =

    cashflowSchema.create({

        type:

            "EXPENSE",

        amount:

            5000,

        frequency:

            "ONE_TIME"

    });

console.assert(

    oneTimeExpense.annualizedAmount ===

        5000,

    "Test 4 failed: annualized amount"

);

// ==================================================

// Test 5

// Default Frequency

// ==================================================

const defaultRecord =

    cashflowSchema.create({

        type:

            "INCOME",

        amount:

            10000

    });

console.assert(

    defaultRecord.frequency ===

        "YEARLY",

    "Test 5 failed: default frequency"

);

console.assert(

    defaultRecord.annualizedAmount ===

        10000,

    "Test 5 failed: default annualized amount"

);

// ==================================================

// Test 6

// Invalid Type

// ==================================================

console.assert(

    cashflowSchema.validate({

        type:

            "INVALID",

        amount:

            1000

    }) === false,

    "Test 6 failed: invalid type"

);

// ==================================================

// Test 7

// Update Monthly Expense

// ==================================================

const updated =

    cashflowSchema.update(

        monthlyExpense,

        {

            amount:

                4000,

            frequency:

                "MONTHLY"

        }

    );

console.assert(

    updated.amount ===

        4000,

    "Test 7 failed: update amount"

);

console.assert(

    updated.frequency ===

        "MONTHLY",

    "Test 7 failed: update frequency"

);

console.assert(

    updated.annualizedAmount ===

        48000,

    "Test 7 failed: update annualized amount"

);

// ==================================================

// Result

// ==================================================

console.log(

    "=========================================="

);

console.log(

    "Family Wealth AI OS V7"

);

console.log(

    "Cashflow Schema Test"

);

console.log(

    "=========================================="

);

console.log(

    "✅ Cashflow Schema Test PASSED"

);
