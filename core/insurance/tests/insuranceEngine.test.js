/*

Family Wealth AI OS

Insurance Engine Test

*/

import InsuranceEngine from "../insuranceEngine.js";

// =====================

// Reset

// =====================

InsuranceEngine.clear();

// =====================

// Add Policy Test

// =====================

const life =

InsuranceEngine.addPolicy(

    {

        name:

        "Life Insurance",

        type:

        "LIFE",

        coverage:

        500000

    }

);

console.log(

    "Policy:",

    life

);

if(

    life.coverage !==500000

){

    throw new Error(

        "Insurance add policy failed"

    );

}

// =====================

// Add Second Policy

// =====================

InsuranceEngine.addPolicy(

    {

        name:

        "Property Insurance",

        type:

        "PROPERTY",

        coverage:

        300000

    }

);

// =====================

// Set Need Test

// =====================

const need =

InsuranceEngine.setNeed(

    "LIFE",

    1200000

);

if(

    need !==1200000

){

    throw new Error(

        "Insurance set need failed"

    );

}

// =====================

// Total Coverage Test

// =====================

const coverage =

InsuranceEngine.totalCoverage();

console.log(

    "Coverage:",

    coverage

);

if(

    coverage !==800000

){

    throw new Error(

        "Insurance coverage calculation failed"

    );

}

// =====================

// Gap Test

// =====================

const gap =

InsuranceEngine.gap(

    "LIFE"

);

console.log(

    "Coverage Gap:",

    gap

);

if(

    gap !==400000

){

    throw new Error(

        "Insurance gap calculation failed"

    );

}

// =====================

// Report Test

// =====================

const report =

InsuranceEngine.report();

if(

    report.coverage !==800000

){

    throw new Error(

        "Insurance report failed"

    );

}

if(

    report.policies.length !==2

){

    throw new Error(

        "Insurance report policies failed"

    );

}

// =====================

// Clear Test

// =====================

InsuranceEngine.clear();

if(

    InsuranceEngine.policies.length !==0

){

    throw new Error(

        "Insurance clear policies failed"

    );

}

if(

    Object.keys(

        InsuranceEngine.needs

    )

    .length !==0

){

    throw new Error(

        "Insurance clear needs failed"

    );

}

console.log(

    "Insurance Engine Test Passed"

);
