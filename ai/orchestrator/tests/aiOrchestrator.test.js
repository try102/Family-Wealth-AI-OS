/*

Family Wealth AI OS V7

AI Orchestrator Test

*/

import AIOrchestrator from "../aiOrchestrator.js";

// =====================

// Create Orchestrator

// =====================

const orchestrator =

new AIOrchestrator();

// =====================

// Name Test

// =====================

if(

    orchestrator.name !==

    "Family Wealth AI Orchestrator V7"

){

    throw new Error(

        "AI Orchestrator name failed"

    );

}

// =====================

// Tax Routing Test

// =====================

const taxResult =

orchestrator.process({

    type:

    "tax",

    question:

    "请分析我的投资税务情况"

});

if(

    !taxResult

){

    throw new Error(

        "Tax routing failed"

    );

}

if(

    !taxResult.advice

){

    throw new Error(

        "Tax AI response failed"

    );

}

// =====================

// Investment Routing Test

// =====================

const investmentResult =

orchestrator.process({

    type:

    "investment",

    question:

    "请分析我的投资组合"

});

if(

    !investmentResult

){

    throw new Error(

        "Investment routing failed"

    );

}

if(

    investmentResult.question !==

    "请分析我的投资组合"

){

    throw new Error(

        "Investment question failed"

    );

}

if(

    !investmentResult.recommendation

){

    throw new Error(

        "Investment AI response failed"

    );

}

console.log(

    "AI Orchestrator Test Passed"

);
