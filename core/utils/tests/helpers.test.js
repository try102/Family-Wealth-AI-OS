/*

Family Wealth AI OS

Helpers Test

*/

import Helpers from "../helpers.js";

// =====================

// ID Test

// =====================

const id =

Helpers.generateId();

console.log(

    "Generated ID:",

    id

);

if(

    !id

){

    throw new Error(

        "ID generation failed"

    );

}

// =====================

// Currency Test

// =====================

const money =

Helpers.formatCurrency(

    1000

);

console.log(

    "Currency:",

    money

);

if(

    !money.includes(

        "1,000"

    )

){

    throw new Error(

        "Currency format failed"

    );

}

// =====================

// Percent Test

// =====================

const percent =

Helpers.formatPercent(

    12.3456

);

console.log(

    "Percent:",

    percent

);

if(

    percent !==

    "12.35%"

){

    throw new Error(

        "Percent format failed"

    );

}

// =====================

// Number Test

// =====================

if(

    Helpers.isNumber(

        "100"

    )

){

    throw new Error(

        "Number validation failed"

    );

}

if(

    !Helpers.isNumber(

        100

    )

){

    throw new Error(

        "Number validation failed"

    );

}

console.log(

    "Helpers Test Passed"

);
