/*

Family Wealth AI OS V7.7

Tax Report Model

*/

class TaxReport {

    constructor({

        id,

        taxYear,

        totalIncome = 0,

        totalDeductions = 0,

        taxableIncome = 0,

        estimatedTax = 0,

        strategies = []

    }){

        this.id = id;

        this.taxYear = taxYear;

        this.totalIncome = totalIncome;

        this.totalDeductions = totalDeductions;

        this.taxableIncome = taxableIncome;

        this.estimatedTax = estimatedTax;

        this.strategies = strategies;

    }

}

export default TaxReport;
