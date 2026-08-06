/*

Family Wealth AI OS V7.4

Monte Carlo Simulation Model

*/

class Simulation {

    constructor({

        id,

        name,

        initialAmount = 0,

        annualContribution = 0,

        expectedReturn = 0,

        volatility = 0,

        years = 0,

        trials = 1000

    }){

        this.id = id;

        this.name = name;

        this.initialAmount = initialAmount;

        this.annualContribution = annualContribution;

        this.expectedReturn = expectedReturn;

        this.volatility = volatility;

        this.years = years;

        this.trials = trials;

    }

}

export default Simulation;
