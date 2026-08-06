/*

Family Wealth AI OS V7.2

Goal Manager

*/

import Goal from "./goal.js";

const GoalManager = {

    goals: [],

    add(

        goal

    ){

        if(

            !(goal instanceof Goal)

        ){

            throw new Error(

                "Invalid goal"

            );

        }

        this.goals.push(

            goal

        );

        return goal;

    },

    list(){

        return this.goals;

    },

    get(

        id

    ){

        return this.goals.find(

            goal =>

            goal.id === id

        );

    },

    update(

        id,

        data

    ){

        const goal =

        this.get(

            id

        );

        if(

            !goal

        ){

            return null;

        }

        Object.assign(

            goal,

            data

        );

        return goal;

    },

    remove(

        id

    ){

        this.goals =

        this.goals.filter(

            goal =>

            goal.id !== id

        );

    },

    clear(){

        this.goals=[];

    }

};

export default GoalManager;
