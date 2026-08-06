/*

Family Wealth AI OS

AI Memory Manager Test

*/

import MemoryManager from "../memoryManager.js";

// =====================

// Reset

// =====================

MemoryManager.clear();

// =====================

// Save Test

// =====================

const memory =

MemoryManager.save(

    "GOAL",

    "Retirement cash flow stability"

);

console.log(

    "Memory:",

    memory

);

if(

    memory.type !==

    "GOAL"

){

    throw new Error(

        "Memory save failed"

    );

}

// =====================

// Second Memory

// =====================

MemoryManager.save(

    "PREFERENCE",

    "Prefer low risk investment"

);

// =====================

// All Test

// =====================

const all =

MemoryManager.all();

if(

    all.length !==2

){

    throw new Error(

        "Memory all failed"

    );

}

// =====================

// Find Type Test

// =====================

const goals =

MemoryManager.findByType(

    "GOAL"

);

console.log(

    "Goals:",

    goals

);

if(

    goals.length !==1

){

    throw new Error(

        "Memory find failed"

    );

}

// =====================

// Remove Test

// =====================

MemoryManager.remove(

    memory.id

);

if(

    MemoryManager.findByType(

        "GOAL"

    )

    .length !==0

){

    throw new Error(

        "Memory remove failed"

    );

}

// =====================

// Clear Test

// =====================

MemoryManager.clear();

if(

    MemoryManager.all()

    .length !==0

){

    throw new Error(

        "Memory clear failed"

    );

}

console.log(

    "Memory Manager Test Passed"

);
