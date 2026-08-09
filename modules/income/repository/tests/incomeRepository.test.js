/*

    

Family Wealth AI OS V7

Income Repository Test

*/

import IncomeRepository

    from "../incomeRepository.js";

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

    "Income Repository Test"

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

// Clear Test Data

// ==========================================

IncomeRepository.clear();

const before =

    IncomeRepository.findAll();

assert(

    Array.isArray(before),

    "Find all incomes"

);

assert(

    before.length === 0,

    "Repository initially empty"

);

// ==========================================

// Create

// ==========================================

const testIncome = {

    id:

        "repository-test-001",

    source:

        "V7 Repository Test",

    name:

        "V7 Repository Test",

    amount:

        1000,

    value:

        1000,

    type:

        "Other"

};

const created =

    IncomeRepository.save(

        testIncome

    );

assert(

    created,

    "Save income"

);

assert(

    created.id ===

    "repository-test-001",

    "Income ID saved"

);

// ==========================================

// Read All

// ==========================================

const afterCreate =

    IncomeRepository.findAll();

assert(

    Array.isArray(afterCreate),

    "Find all after create"

);

assert(

    afterCreate.length === 1,

    "One income stored"

);

// ==========================================

// Read By ID

// ==========================================

const found =

    IncomeRepository.findById(

        "repository-test-001"

    );

assert(

    found,

    "Find income by ID"

);

assert(

    found.id ===

    "repository-test-001",

    "Correct income returned"

);

// ==========================================

// Update

// ==========================================

const updated =

    IncomeRepository.update(

        "repository-test-001",

        {

            source:

                "V7 Repository Test Updated",

            name:

                "V7 Repository Test Updated",

            amount:

                2500,

            value:

                2500,

            type:

                "Business"

        }

    );

assert(

    updated,

    "Update income"

);

assert(

    Number(

        updated.amount ??

        updated.value ??

        0

    ) === 2500,

    "Updated amount = 2500"

);

// ==========================================

// Verify Update

// ==========================================

const afterUpdate =

    IncomeRepository.findById(

        "repository-test-001"

    );

assert(

    afterUpdate,

    "Read updated income"

);

assert(

    afterUpdate.name ===

    "V7 Repository Test Updated",

    "Updated name"

);

assert(

    afterUpdate.type ===

    "Business",

    "Updated type"

);

// ==========================================

// Delete

// ==========================================

const deleted =

    IncomeRepository.remove(

        "repository-test-001"

    );

assert(

    deleted === true,

    "Remove income"

);

// ==========================================

// Verify Delete

// ==========================================

const afterDelete =

    IncomeRepository.findById(

        "repository-test-001"

    );

assert(

    afterDelete === null,

    "Income deleted"

);

// ==========================================

// Clear

// ==========================================

IncomeRepository.clear();

const finalData =

    IncomeRepository.findAll();

assert(

    Array.isArray(finalData),

    "Clear repository"

);

assert(

    finalData.length === 0,

    "Repository cleared"

);

// ==========================================

// Final

// ==========================================

console.log(

    "=========================================="

);

console.log(

    "🎉 INCOME REPOSITORY TEST PASSED"

);

console.log(

    "=========================================="

);
