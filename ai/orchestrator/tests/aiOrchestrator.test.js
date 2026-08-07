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

// Tax Request Test

// =====================

const result =

orchestrator.process({

    type:

    "tax",

    question:

    "请分析我的投资税务情况"

});

// =====================

// Result Test

// =====================

if(

    !result

){

    throw new Error(

        "Orchestrator result failed"

    );

}

// =====================

// Question Test

// =====================

if(

    result.question !==

    "请分析我的投资税务情况"

){

    throw new Error(

        "Orchestrator question failed"

    );

}

// =====================

// Advice Test

// =====================

if(

    !result.advice

){

    throw new Error(

        "Tax AI routing failed"

    );

}

console.log(

    "AI Orchestrator Test Passed"

);
