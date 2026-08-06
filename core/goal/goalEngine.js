/*

Family Wealth AI OS

Goal Engine

*/

const GoalEngine = {

    goals:[],

    add(

        goal

    ){

        this.goals.push(

            goal

        );

        return goal;

    },

    progress(

        id

    ){

        const goal =

        this.goals.find(

            item =>

            item.id === id

        );

        if(

            !goal

        ){

            return null;

        }

        return (

            goal.current /

            goal.target

        )

        *

        100;

    },

    gap(

        id

    ){

        const goal =

        this.goals.find(

            item =>

            item.id === id

        );

        if(

            !goal

        ){

            return null;

        }

        return (

            goal.target -

            goal.current

        );

    },

    report(){

        return this.goals

        .map(

            goal=>({

                id:

                goal.id,

                name:

                goal.name,

                target:

                goal.target,

                current:

                goal.current,

                progress:

                this.progress(

                    goal.id

                ),

                gap:

                this.gap(

                    goal.id

                )

            })

        );

    },

    list(){

        return this.goals;

    },

    clear(){

        this.goals=[];

    }

};

export default GoalEngine;
