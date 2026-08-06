/*

Family Wealth AI OS V7.7

Tax Planning Model

*/

class TaxPlan {

    constructor({

        id,

        name,

        taxYear,

        income = 0,

        deductions = 0,

        taxableIncome = 0,

        estimatedTax = 0

    }){

        this.id = id;

        this.name = name;

        this.taxYear = taxYear;

        this.income = income;

        this.deductions = deductions;

        this.taxableIncome = taxableIncome;

        this.estimatedTax = estimatedTax;

    }

}

export default TaxPlan;
