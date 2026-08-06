/*

Family Wealth AI OS V7.3

Forecast Model

*/

class Forecast {

    constructor({

        id,

        name,

        startAmount = 0,

        monthlyContribution = 0,

        annualReturn = 0,

        years = 0

    }){

        this.id = id;

        this.name = name;

        this.startAmount = startAmount;

        this.monthlyContribution = monthlyContribution;

        this.annualReturn = annualReturn;

        this.years = years;

    }

}

export default Forecast;
