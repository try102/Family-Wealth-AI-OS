/*

Family Wealth AI OS

Search Manager Test

*/

import SearchManager from "../searchManager.js";

// =====================

// Reset

// =====================

SearchManager.clear();

// =====================

// Register Sources

// =====================

SearchManager.register(

    "assets",

    ()=>[

        {

            name:

            "House",

            value:

            500000

        },

        {

            name:

            "Car",

            value:

            30000

        }

    ]

);

SearchManager.register(

    "investments",

    ()=>[

        {

            symbol:

            "AAPL",

            shares:

            100

        },

        {

            symbol:

            "VOO",

            shares:

            50

        }

    ]

);

// =====================

// Source Test

// =====================

const sources =

SearchManager.listSources();

console.log(

    "Sources:",

    sources

);

if(

    sources.length !== 2

){

    throw new Error(

        "Source register failed"

    );

}

// =====================

// Asset Search

// =====================

const houseResult =

SearchManager.search(

    "House"

);

console.log(

    "House Result:",

    houseResult

);

if(

    houseResult.length !== 1

){

    throw new Error(

        "Asset search failed"

    );

}

// =====================

// Investment Search

// =====================

const appleResult =

SearchManager.search(

    "AAPL"

);

console.log(

    "Apple Result:",

    appleResult

);

if(

    appleResult.length !== 1

){

    throw new Error(

        "Investment search failed"

    );

}

// =====================

// Clear Test

// =====================

SearchManager.clear();

if(

    SearchManager.listSources()

    .length !== 0

){

    throw new Error(

        "Search clear failed"

    );

}

console.log(

    "Search Manager Test Passed"

);
