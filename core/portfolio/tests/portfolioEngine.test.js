/*

Family Wealth AI OS

Portfolio Engine Test

*/

import PortfolioEngine from "../portfolioEngine.js";

// =====================

// Reset

// =====================

PortfolioEngine.clear();

// =====================

// Add Holding Test

// =====================

const stock =

PortfolioEngine.add(

    {

        name:

        "VOO",

        type:

        "STOCK",

        value:

        100000

    }

);

console.log(

    "Holding:",

    stock

);

if(

    stock.name !==

    "VOO"

){

    throw new Error(

        "Portfolio add failed"

    );

}

// =====================

// Add Second Holding

// =====================

PortfolioEngine.add(

    {

        name:

        "BOND",

        type:

        "BOND",

        value:

        50000

    }

);

// =====================

// Total Value Test

// =====================

const total =

PortfolioEngine.totalValue();

console.log(

    "Total:",

    total

);

if(

    total !==150000

){

    throw new Error(

        "Portfolio total value failed"

    );

}

// =====================

// Allocation Test

// =====================

const allocation =

PortfolioEngine.allocation();

console.log(

    "Allocation:",

    allocation

);

if(

    Math.round(

        allocation.STOCK

    )

    !==67

){

    throw new Error(

        "Portfolio allocation failed"

    );

}

if(

    Math.round(

        allocation.BOND

    )

    !==33

){

    throw new Error(

        "Portfolio bond allocation failed"

    );

}

// =====================

// List Test

// =====================

const list =

PortfolioEngine.list();

if(

    list.length !==2

){

    throw new Error(

        "Portfolio list failed"

    );

}

// =====================

// Clear Test

// =====================

PortfolioEngine.clear();

if(

    PortfolioEngine.list()

    .length !==0

){

    throw new Error(

        "Portfolio clear failed"

    );

}

console.log(

    "Portfolio Engine Test Passed"

);
