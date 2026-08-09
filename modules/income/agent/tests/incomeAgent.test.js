/*

    

Family Wealth AI OS V7

Income Agent Test

*/

import IncomeAgent

    from "../agent/incomeAgent.js";

console.log(

    "=========================================="

);

console.log(

    "Family Wealth AI OS V7"

);

console.log(

    "Income Agent Test"

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

// Initialize

// ==========================================

const initResult =

    IncomeAgent.init();

assert(

    initResult.status ===

    "Income Agent Ready",

    "Initialize"

);

// ==========================================

// Read Existing Data

// ==========================================

const before =

    IncomeAgent.getIncome();

assert(

    Array.isArray(before),

    "Get income"

);

// ==========================================

// Create

// ==========================================

const testIncome = {

    source:

        "V7 Agent Test",

    name:

        "V7 Agent Test",

    amount:

        1000,

    value:

        1000,

    type:

        "Other"

};

const created =

    IncomeAgent.addIncome(

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

// Read Created Income

// ==========================================

const afterCreate =

    IncomeAgent.getIncome();

const createdIncome =

    afterCreate.find(

        item =>

            item.id === created.id

    );

assert(

    createdIncome,

    "Read created income"

);

// ==========================================

// Update

// ==========================================

const updatedData = {

    source:

        "V7 Agent Test Updated",

    name:

        "V7 Agent Test Updated",

    amount:

        2500,

    value:

        2500,

    type:

        "Business"

};

const updated =

    IncomeAgent.updateIncome(

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

    IncomeAgent.getIncome();

const updatedIncome =

    afterUpdate.find(

        item =>

            item.id === created.id

    );

assert(

    updatedIncome,

    "Read updated income"

);

assert(

    Number(

        updatedIncome.amount ||

        updatedIncome.value ||

        0

    ) === 2500,

    "Updated amount = 2500"

);

// ==========================================

// Summary

// ==========================================

const summary =

    IncomeAgent.getIncomeSummary();

assert(

    summary !== null &&

    summary !== undefined,

    "Income summary"

);

// ==========================================

// Analysis

// ==========================================

const analysis =

    IncomeAgent.analyze();

assert(

    analysis.type ===

    "INCOME_ANALYSIS",

    "Income analysis"

);

// ==========================================

// Delete

// ==========================================

const deleted =

    IncomeAgent.deleteIncome(

        created.id

    );

assert(

    deleted !== undefined,

    "Delete income"

);

// ==========================================

// Verify Delete

// ==========================================

const afterDelete =

    IncomeAgent.getIncome();

const deletedIncome =

    afterDelete.find(

        item =>

            item.id === created.id

    );

assert(

    !deletedIncome,

    "Income deleted"

);

console.log(

    "=========================================="

);

console.log(

    "🎉 INCOME AGENT TEST PASSED"

);

console.log(

    "=========================================="

);
