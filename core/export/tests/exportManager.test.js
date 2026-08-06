/*

Family Wealth AI OS

Export Manager Test

*/

import ExportManager from "../exportManager.js";

// =====================

// JSON Test

// =====================

const data = {

    name:

    "Family Wealth AI OS",

    version:

    "7.0"

};

const json =

ExportManager.json(

    data

);

console.log(

    "JSON:",

    json

);

if(

    !json.includes(

        "Family Wealth AI OS"

    )

){

    throw new Error(

        "JSON export failed"

    );

}

// =====================

// CSV Test

// =====================

const csvData = [

    {

        name:

        "Cash",

        value:

        1000

    },

    {

        name:

        "Stock",

        value:

        5000

    }

];

const csv =

ExportManager.csv(

    csvData

);

console.log(

    "CSV:",

    csv

);

if(

    !csv.includes(

        "Cash"

    )

){

    throw new Error(

        "CSV export failed"

    );

}

// =====================

// File Name Test

// =====================

const filename =

ExportManager.downloadName(

    "wealth",

    "json"

);

console.log(

    "Filename:",

    filename

);

if(

    !filename.includes(

        "wealth"

    )

){

    throw new Error(

        "Filename failed"

    );

}

console.log(

    "Export Manager Test Passed"

);
