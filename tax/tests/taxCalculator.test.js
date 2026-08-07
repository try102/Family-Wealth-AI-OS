/*

Family Wealth AI OS V7.7

Tax Calculator Test

*/

import TaxCalculator from "../taxCalculator.js";

// =====================

// Create Calculator

// =====================

const calculator =

    new TaxCalculator();

// =====================

// Taxable Income Test

// =====================

const taxableIncome =

    calculator.calculateTaxableIncome(

        200000,

        30000

    );

if(

    taxableIncome !== 170000

){

    throw new Error(

        "Taxable income calculation failed"

    );

}

// =====================

// Estimated Tax Test

// =====================

const estimatedTax =

    calculator.calculateEstimatedTax(

        170000,

        0.2

    );

if(

    estimatedTax !== 34000

){

    throw new Error(

        "Estimated tax calculation failed"

    );

}

// =====================

// Full Calculation Test

// =====================

const result =

    calculator.calculate({

        income:200000,

        deductions:30000,

        taxRate:0.2

    });

if(

    result.taxableIncome !== 170000

){

    throw new Error(

        "Full taxable income failed"

    );

}

if(

    result.estimatedTax !== 34000

){

    throw new Error(

        "Full estimated tax failed"

    );

}

console.log(

    "Tax Calculator Test Passed"

);
