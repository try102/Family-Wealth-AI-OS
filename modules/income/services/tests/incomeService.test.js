/*

    

Family Wealth AI OS V7

Income Service Test

*/

import IncomeService

    from "../incomeService.js";

// ==========================================

// Header

// ==========================================

console.log(

    "=========================================="

);

console.log(

    "Family Wealth AI OS V7"

);

console.log(

    "Income Service Test"

);

console.log(

    "=========================================="

);

// ==========================================

// Test Helper

// ==========================================

function assert(

    condition,

    message

){

    if(!condition){

        throw new Error(

            "❌ FAIL: " +

            message

        );

    }

    console.log(

        "✅ PASS: " +

        message

    );

}

// ==========================================

// Read Existing Data

// ==========================================

const before =

    IncomeService.getAllIncome();

assert(

    Array.isArray(before),

    "Get all income"

);

// ==========================================

// Create

// ==========================================

const testIncome = {

    source:

        "V7 Service Test",

    name:

        "V7 Service Test",

    amount:

        1000,

    value:

        1000,

    type:

        "Other"

};

const created =

    IncomeService.addIncome(

        testIncome

    );

assert(

    created,

    "Add income"

);

assert(

    created.id,

    "Income ID generated"

);

// ==========================================

// Read By ID

// ==========================================

const found =

    IncomeService.getIncomeById(

        created.id

    );

assert(

    found,

    "Get income by ID"

);

assert(

    found.id ===

    created.id,

    "Correct income returned"

);

// ==========================================

// Update

// ==========================================

const updatedData = {

    source:

        "V7 Service Test Updated",

    name:

        "V7 Service Test Updated",

    amount:

        2500,

    value:

        2500,

    type:

        "Business"

};

const updated =

    IncomeService.updateIncome(

        created.id,

        updatedData

    );

assert(

    updated,

    "Update income"

);

// ==========================================

// Verify Update

// ==========================================

const afterUpdate =

    IncomeService.getIncomeById(

        created.id

    );

assert(

    afterUpdate,

    "Read updated income"

);

assert(

    Number(

        afterUpdate.amount ??

        afterUpdate.value ??

        0

    ) === 2500,

    "Updated amount = 2500"

);

// ==========================================

// Summary

// ==========================================

const summary =

    IncomeService.getSummary();

assert(

    summary !== null &&

    summary !== undefined,

    "Get income summary"

);

assert(

    typeof summary.count ===

    "number",

    "Summary count"

);

assert(

    typeof summary.totalIncome ===

    "number",

    "Summary total income"

);

// ==========================================

// Delete

// ==========================================

const deleted =

    IncomeService.deleteIncome(

        created.id

    );

assert(

    deleted !== undefined,

    "Delete income"

);

// ==========================================

// Verify Delete

// ==========================================

const deletedIncome =

    IncomeService.getIncomeById(

        created.id

    );

assert(

    !deletedIncome,

    "Income deleted"

);

// ==========================================

// Final

// ==========================================

console.log(

    "=========================================="

);

console.log(

    "🎉 INCOME SERVICE TEST PASSED"

);

console.log(

    "=========================================="

);
