/*

Family Wealth AI OS V7.7

Tax Strategy Model

*/

class TaxStrategy {

    constructor({

        id,

        name,

        description = "",

        taxYear,

        expectedSaving = 0

    }){

        this.id = id;

        this.name = name;

        this.description = description;

        this.taxYear = taxYear;

        this.expectedSaving = expectedSaving;

    }

}

export default TaxStrategy;
