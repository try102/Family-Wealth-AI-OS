/*

Family Wealth AI OS V7.7

Tax Portfolio Test

*/

import TaxPortfolio from "../taxPortfolio.js";

import TaxPlan from "../taxPlan.js";

import TaxReport from "../taxReport.js";

// =====================

// Create Portfolio

// =====================

const portfolio =

    new TaxPortfolio();

// =====================

// Create Plan

// =====================

const plan =

    new TaxPlan({

        id:1,

        name:"2026 Tax Plan",

        taxYear:2026,

        income:200000,

        deductions:30000,

        taxableIncome:170000,

        estimatedTax:34000

    });

// =====================

// Create Report

// =====================

const report =

    new TaxReport({

        id:1,

        taxYear:2026,

        totalIncome:200000,

        totalDeductions:30000,

        taxableIncome:170000,

        estimatedTax:34000

    });

// =====================

// Add Plan Test

// =====================

portfolio.addPlan(

    plan

);

if(

    portfolio.getPlans().length !== 1

){

    throw new Error(

        "Add tax plan failed"

    );

}

// =====================

// Add Report Test

// =====================

portfolio.addReport(

    report

);

if(

    portfolio.getReports().length !== 1

){

    throw new Error(

        "Add tax report failed"

    );

}

// =====================

// Find Year Test

// =====================

const result =

    portfolio.getPlanByYear(

        2026

    );

if(

    result.taxYear !== 2026

){

    throw new Error(

        "Find tax plan by year failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

    portfolio.getSummary();

if(

    summary.plans !== 1 ||

    summary.reports !== 1

){

    throw new Error(

        "Tax portfolio summary failed"

    );

}

console.log(

    "Tax Portfolio Test Passed"

);
