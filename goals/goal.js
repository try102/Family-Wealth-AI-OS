/*

Family Wealth AI OS V7.2

Goal Model

*/

class Goal {

    constructor({

        id,

        name,

        category = "GENERAL",

        targetAmount = 0,

        currentAmount = 0,

        targetDate = null,

        priority = "MEDIUM",

        status = "ACTIVE"

    }){

        this.id = id;

        this.name = name;

        this.category = category;

        this.targetAmount = targetAmount;

        this.currentAmount = currentAmount;

        this.targetDate = targetDate;

        this.priority = priority;

        this.status = status;

    }

}

export default Goal;
