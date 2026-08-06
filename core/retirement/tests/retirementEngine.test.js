/*

Family Wealth AI OS

Retirement Engine Test

*/

import RetirementEngine from "../retirementEngine.js";

// =====================

// Reset

// =====================

RetirementEngine.clear();

// =====================

// Set Parameters Test

// =====================

const expense =

RetirementEngine.set(

    "annualExpense",

    60000

);

console.log(

    "Annual Expense:",

    expense

);

if(

    expense !==60000

){

    throw new Error(

        "Retirement set expense failed"

    );

}

RetirementEngine.set(

    "years",

    30

);

RetirementEngine.set(

    "assets",

    1000000

);

// =====================

// Calculate Need Test

// =====================

const need =

RetirementEngine.calculateNeed();

console.log(

    "Required:",

    need

);

if(

    need !==1800000

){

    throw new Error(

        "Retirement need calculation failed"

    );

}

// =====================

// Calculate Gap Test

// =====================

const gap =

RetirementEngine.calculateGap();

console.log(

    "Gap:",

    gap

);

if(

    gap !==800000

){

    throw new Error(

        "Retirement gap calculation failed"

    );

}

// =====================

// Report Test

// =====================

const report =

RetirementEngine.report();

if(

    report.required !==1800000

){

    throw new Error(

        "Retirement report required failed"

    );

}

if(

    report.assets !==1000000

){

    throw new Error(

        "Retirement report assets failed"

    );

}

// =====================

// Clear Test

// =====================

RetirementEngine.clear();

if(

    Object.keys(

        RetirementEngine.data

    )

    .length !==0

){

    throw new Error(

        "Retirement clear failed"

    );

}

console.log(

    "Retirement Engine Test Passed"

);
