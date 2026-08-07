/*

Family Wealth AI OS V7

AI Registry Test

*/

import AIRegistry

from "../aiRegistry.js";

// =====================

// Register Test

// =====================

const mockAI = {

    name:

    "Mock AI"

};

AIRegistry.register(

    "mock",

    mockAI

);

// =====================

// Get Test

// =====================

const ai =

AIRegistry.get(

    "mock"

);

if(

    ai !== mockAI

){

    throw new Error(

        "AI Registry get failed"

    );

}

// =====================

// List Test

// =====================

const list =

AIRegistry.list();

if(

    !list.includes(

        "mock"

    )

){

    throw new Error(

        "AI Registry list failed"

    );

}

// =====================

// Remove Test

// =====================

AIRegistry.remove(

    "mock"

);

if(

    AIRegistry.get(

        "mock"

    )

){

    throw new Error(

        "AI Registry remove failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "AI Registry V7 Test Passed"

);
