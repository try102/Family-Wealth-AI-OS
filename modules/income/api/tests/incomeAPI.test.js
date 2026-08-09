/*

    

Family Wealth AI OS V7

Income API Test

*/

import IncomeAPI

    from "./incomeAPI.js";

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

// Start

// ==========================================

console.log(

    "=========================================="

);

console.log(

    "Family Wealth AI OS V7"

);

console.log(

    "Income API Test"

);

console.log(

    "=========================================="

);

// ==========================================

// Read Existing Data

// ==========================================

const before =

    IncomeAPI.getAllIncome();

assert(

    Array.isArray(before),

    "Get all income"

);

// ==========================================

// Create

// ==========================================

const testIncome = {

    source:

        "V7 API Test",

    name:

        "V7 API Test",

    amount:

        1000,

    value:

        1000,

    type:

        "Other"

};

const created =

    IncomeAPI.createIncome(

        testIncome

    );

assert(

    created,

    "Create income"

);

assert(

    created.id,

    "Income ID generated"

);

// ==========================================

// Read By ID

// ==========================================

const found =

    IncomeAPI.getIncomeById(

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

        "V7 API Test Updated",

    name:

        "V7 API Test Updated",

    amount:

        2500,

    value:

        2500,

    type:

        "Business"

};

const updated =

    IncomeAPI.updateIncome(

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

    IncomeAPI.getIncomeById(

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

    IncomeAPI.getSummary();

assert(

    summary !== null &&

    summary !== undefined,

    "Get income summary"

);

// ==========================================

// Delete

// ==========================================

const deleted =

    IncomeAPI.deleteIncome(

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

    IncomeAPI.getIncomeById(

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

    "🎉 INCOME API TEST PASSED"

);

console.log(

    "=========================================="

);
