/*

Family Wealth AI OS

Data Service Test

*/

import DataService from "../dataService.js";

// Test Key

const TEST_KEY =

"test_database_key";

// =====================

// Save

// =====================

const testData = {

    name:

    "Family Wealth Test",

    value:

    1000

};

DataService.save(

    TEST_KEY,

    testData

);

console.log(

    "Save Test Passed"

);

// =====================

// Load

// =====================

const loaded =

DataService.load(

    TEST_KEY

);

console.log(

    "Loaded:",

    loaded

);

if(

    loaded.name !==

    "Family Wealth Test"

){

    throw new Error(

        "Load failed"

    );

}

// =====================

// Exists

// =====================

const exists =

DataService.exists(

    TEST_KEY

);

if(

    exists !== true

){

    throw new Error(

        "Exists failed"

    );

}

console.log(

    "Exists Test Passed"

);

// =====================

// Remove

// =====================

DataService.remove(

    TEST_KEY

);

const removed =

DataService.exists(

    TEST_KEY

);

if(

    removed !== false

){

    throw new Error(

        "Remove failed"

    );

}

console.log(

    "Data Service Test Passed"

);
