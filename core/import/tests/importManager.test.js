/*

Family Wealth AI OS

Import Manager Test

*/

import ImportManager from "../importManager.js";

// =====================

// JSON Test

// =====================

const jsonText =

`

{

    "name":"Cash",

    "value":1000

}

`;

const jsonData =

ImportManager.json(

    jsonText

);

console.log(

    "JSON Data:",

    jsonData

);

if(

    jsonData.name !==

    "Cash"

){

    throw new Error(

        "JSON import failed"

    );

}

// =====================

// CSV Test

// =====================

const csvText =

`

name,value

Cash,1000

Stock,5000

`;

const csvData =

ImportManager.csv(

    csvText

);

console.log(

    "CSV Data:",

    csvData

);

if(

    csvData.length !== 2

){

    throw new Error(

        "CSV import failed"

    );

}

if(

    csvData[0].name !==

    "Cash"

){

    throw new Error(

        "CSV content failed"

    );

}

// =====================

// Validate Test

// =====================

const valid =

ImportManager.validate(

    jsonData

);

console.log(

    "Validate:",

    valid

);

if(

    valid !== true

){

    throw new Error(

        "Validation failed"

    );

}

console.log(

    "Import Manager Test Passed"

);
