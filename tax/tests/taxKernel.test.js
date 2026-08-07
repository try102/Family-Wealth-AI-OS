/*

Family Wealth AI OS V7.7

Tax Kernel Test

*/

import TaxKernel from "../taxKernel.js";

// =====================

// Create Kernel

// =====================

const kernel =

    new TaxKernel();

// =====================

// Initial Status Test

// =====================

if(

    kernel.status !== "created"

){

    throw new Error(

        "Tax kernel initial status failed"

    );

}

// =====================

// Initialize Test

// =====================

const result =

    kernel.initialize();

if(

    result.status !== "initialized"

){

    throw new Error(

        "Tax kernel initialize failed"

    );

}

// =====================

// Module Test

// =====================

if(

    result.module.name !== "Tax Module"

){

    throw new Error(

        "Tax kernel module failed"

    );

}

// =====================

// State Test

// =====================

const state =

    kernel.getState();

if(

    state.status !== "initialized"

){

    throw new Error(

        "Tax kernel state failed"

    );

}

// =====================

// Module Instance Test

// =====================

if(

    kernel.getModule() === undefined

){

    throw new Error(

        "Tax kernel module instance failed"

    );

}

console.log(

    "Tax Kernel Test Passed"

);
