/*

Family Wealth AI OS V7

AI Tax Advisor Test

*/

import TaxAdvisorAI from "../taxAdvisorAI.js";

// =====================

// Create Tax AI

// =====================

const taxAI =

new TaxAdvisorAI();

// =====================

// Name Test

// =====================

if(

    taxAI.name !==

    "Family Wealth AI Tax Advisor V7"

){

    throw new Error(

        "Tax Advisor AI name failed"

    );

}

// =====================

// Analyze Test

// =====================

const result =

taxAI.analyze(

    "请分析我的投资税务情况"

);

// =====================

// Question Test

// =====================

if(

    result.question !==

    "请分析我的投资税务情况"

){

    throw new Error(

        "Tax question failed"

    );

}

// =====================

// Advice Test

// =====================

if(

    !result.advice

){

    throw new Error(

        "Tax advice failed"

    );

}

// =====================

// Report Test

// =====================

if(

    !result.report

){

    throw new Error(

        "Tax report failed"

    );

}

console.log(

    "Tax Advisor AI Test Passed"

);
