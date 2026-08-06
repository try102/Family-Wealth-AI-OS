/*

Family Wealth AI OS

Audit Report Generator Test

*/

import AuditReport from "../auditReport.js";

// =====================

// Reset

// =====================

AuditReport.clear();

// =====================

// Create Test

// =====================

const report =

AuditReport.create(

    "Annual Wealth Report",

    [

        {

            title:

            "Asset Summary"

        }

    ]

);

console.log(

    "Report:",

    report

);

if(

    report.title !==

    "Annual Wealth Report"

){

    throw new Error(

        "Report create failed"

    );

}

// =====================

// Add Section Test

// =====================

const updated =

AuditReport.addSection(

    report.id,

    {

        title:

        "Risk Analysis"

    }

);

if(

    updated.sections.length !==2

){

    throw new Error(

        "Report add section failed"

    );

}

// =====================

// Get Test

// =====================

const current =

AuditReport.get(

    report.id

);

if(

    current.sections[1]

    .title !==

    "Risk Analysis"

){

    throw new Error(

        "Report get failed"

    );

}

// =====================

// List Test

// =====================

const list =

AuditReport.list();

if(

    list.length !==1

){

    throw new Error(

        "Report list failed"

    );

}

// =====================

// Clear Test

// =====================

AuditReport.clear();

if(

    AuditReport.list()

    .length !==0

){

    throw new Error(

        "Report clear failed"

    );

}

console.log(

    "Audit Report Test Passed"

);
