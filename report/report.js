/*

Family Wealth AI OS V7.6

Wealth Report Model

*/

class Report {

    constructor({

        id,

        name,

        owner,

        createdDate = null,

        summary = "",

        sections = []

    }){

        this.id = id;

        this.name = name;

        this.owner = owner;

        this.createdDate = createdDate;

        this.summary = summary;

        this.sections = sections;

    }

}

export default Report;
