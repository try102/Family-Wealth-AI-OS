/*

Family Wealth AI OS V7

AI Registry Test

*/

import AIRegistry from "../aiRegistry.js";

// =====================

// Clean State

// =====================

AIRegistry.clear();

// =====================

// Mock AI

// =====================

const mockAI = {

    name: "Mock AI V7",

    version: "7.0"

};

// =====================

// Register Test

// =====================

const registered =

AIRegistry.register(

    "mock",

    mockAI

);

if(

    registered !== mockAI

){

    throw new Error(

        "AI Registry register failed"

    );

}

// =====================

// Get Test

// =====================

const result =

AIRegistry.get(

    "mock"

);

if(

    result !== mockAI

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

    ) !== undefined

){

    throw new Error(

        "AI Registry remove failed"

    );

}

// =====================

// Clear Test

// =====================

AIRegistry.register(

    "ai1",

    {

        name:

        "AI 1"

    }

);

AIRegistry.register(

    "ai2",

    {

        name:

        "AI 2"

    }

);

AIRegistry.clear();

if(

    AIRegistry.list().length !== 0

){

    throw new Error(

        "AI Registry clear failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "AI Registry V7 Test Passed"

);
