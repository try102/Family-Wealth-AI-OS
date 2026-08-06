/*

Family Wealth AI OS V7.6

Report Manager Test

*/

import ReportManager from "../reportManager.js";

import Report from "../report.js";

// =====================

// Reset

// =====================

ReportManager.clear();

// =====================

// Add Test

// =====================

const annualReport = new Report({

    id:1,

    name:"Annual Wealth Report",

    owner:"Owner",

    summary:"家庭财富年度分析",

    sections:[

        "Asset Allocation",

        "Retirement"

    ]

});

const added =

ReportManager.add(

    annualReport

);

if(

    added.name !== "Annual Wealth Report"

){

    throw new Error(

        "Report add failed"

    );

}

// =====================

// List Test

// =====================

if(

    ReportManager.list().length !==1

){

    throw new Error(

        "Report list failed"

    );

}

// =====================

// Get Test

// =====================

const found =

ReportManager.get(

    1

);

if(

    found.owner !== "Owner"

){

    throw new Error(

        "Report get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

ReportManager.update(

    1,

    {

        summary:"Updated Wealth Report"

    }

);

if(

    updated.summary !== "Updated Wealth Report"

){

    throw new Error(

        "Report update failed"

    );

}

// =====================

// Invalid Report Test

// =====================

try{

    ReportManager.add({});

    throw new Error(

        "Invalid report check failed"

    );

}

catch(error){

}

// =====================

// Remove Test

// =====================

ReportManager.remove(

    1

);

if(

    ReportManager.list().length !==0

){

    throw new Error(

        "Report remove failed"

    );

}

// =====================

// Clear Test

// =====================

ReportManager.add(

    new Report({

        id:2,

        name:"Tax Report"

    })

);

ReportManager.clear();

if(

    ReportManager.list().length !==0

){

    throw new Error(

        "Report clear failed"

    );

}

console.log(

    "Report Manager Test Passed"

);
