/*

Family Wealth AI OS V7.7

Tax Manager Test

*/

import TaxManager from "../taxManager.js";

import TaxPlan from "../taxPlan.js";

// =====================

// Create Manager

// =====================

const taxManager = new TaxManager();

// =====================

// Create Tax Plans

// =====================

const plan2026 = new TaxPlan({

    id:1,

    name:"2026 Tax Plan",

    taxYear:2026,

    income:200000,

    deductions:30000,

    taxableIncome:170000,

    estimatedTax:35000

});

const plan2027 = new TaxPlan({

    id:2,

    name:"2027 Tax Plan",

    taxYear:2027,

    income:220000,

    deductions:35000,

    taxableIncome:185000,

    estimatedTax:38000

});

// =====================

// Add Test

// =====================

taxManager.addPlan(

    plan2026

);

taxManager.addPlan(

    plan2027

);

if(

    taxManager.count() !== 2

){

    throw new Error(

        "Tax Manager add failed"

    );

}

// =====================

// Get Plans Test

// =====================

if(

    taxManager.getPlans().length !== 2

){

    throw new Error(

        "Get plans failed"

    );

}

// =====================

// Find Year Test

// =====================

const result =

    taxManager.getPlanByYear(

        2026

    );

if(

    result.taxYear !== 2026

){

    throw new Error(

        "Find tax plan failed"

    );

}

// =====================

// Remove Test

// =====================

taxManager.removePlan(

    1

);

if(

    taxManager.count() !== 1

){

    throw new Error(

        "Remove tax plan failed"

    );

}

console.log(

    "Tax Manager Test Passed"

);
