/*

Family Wealth AI OS V7.6

Report Model Test

*/

import Report from "../report.js";

// =====================

// Create Report

// =====================

const report = new Report({

    id:1,

    name:"Annual Wealth Report",

    owner:"Owner",

    createdDate:"2026-08-06",

    summary:"家庭财富年度分析",

    sections:[

        "Asset Allocation",

        "Retirement",

        "Risk Analysis"

    ]

});

// =====================

// ID Test

// =====================

if(

    report.id !== 1

){

    throw new Error(

        "Report id failed"

    );

}

// =====================

// Name Test

// =====================

if(

    report.name !== "Annual Wealth Report"

){

    throw new Error(

        "Report name failed"

    );

}

// =====================

// Owner Test

// =====================

if(

    report.owner !== "Owner"

){

    throw new Error(

        "Report owner failed"

    );

}

// =====================

// Date Test

// =====================

if(

    report.createdDate !== "2026-08-06"

){

    throw new Error(

        "Report date failed"

    );

}

// =====================

// Summary Test

// =====================

if(

    report.summary !== "家庭财富年度分析"

){

    throw new Error(

        "Report summary failed"

    );

}

// =====================

// Sections Test

// =====================

if(

    report.sections.length !==3

){

    throw new Error(

        "Report sections failed"

    );

}

console.log(

    "Report Test Passed"

);
