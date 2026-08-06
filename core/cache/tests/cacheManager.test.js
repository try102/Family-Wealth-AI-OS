/*

Family Wealth AI OS

Cache Manager Test

*/

import CacheManager from "../cacheManager.js";

// =====================

// Reset

// =====================

CacheManager.clear();

// =====================

// Set Test

// =====================

CacheManager.set(

    "wealthScore",

    95

);

const value =

CacheManager.get(

    "wealthScore"

);

console.log(

    "Cache Value:",

    value

);

if(

    value !== 95

){

    throw new Error(

        "Cache set/get failed"

    );

}

// =====================

// Has Test

// =====================

const exists =

CacheManager.has(

    "wealthScore"

);

if(

    exists !== true

){

    throw new Error(

        "Cache has failed"

    );

}

// =====================

// Remove Test

// =====================

CacheManager.remove(

    "wealthScore"

);

if(

    CacheManager.has(

        "wealthScore"

    )

){

    throw new Error(

        "Cache remove failed"

    );

}

// =====================

// Clear Test

// =====================

CacheManager.set(

    "test",

    "data"

);

CacheManager.clear();

if(

    CacheManager.has(

        "test"

    )

){

    throw new Error(

        "Cache clear failed"

    );

}

console.log(

    "Cache Manager Test Passed"

);
