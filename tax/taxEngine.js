/*

Family Wealth AI OS V7.7

Tax Engine

Tax 模块核心计算引擎

*/

import TaxCalculator from "./taxCalculator.js";

import TaxReport from "./taxReport.js";

class TaxEngine {

    constructor(){

        this.calculator =

            new TaxCalculator();

    }

    // =====================

    // Generate Tax Report

    // =====================

    generateReport({

        id,

        taxYear,

        income,

        deductions,

        taxRate = 0.2,

        strategies = []

    }){

        const result =

            this.calculator.calculate({

                income,

                deductions,

                taxRate

            });

        return new TaxReport({

            id,

            taxYear,

            totalIncome:

                result.income,

            totalDeductions:

                result.deductions,

            taxableIncome:

                result.taxableIncome,

            estimatedTax:

                result.estimatedTax,

            strategies

        });

    }

}

export default TaxEngine;
