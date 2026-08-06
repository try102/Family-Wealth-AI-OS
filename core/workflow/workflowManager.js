/*

Family Wealth AI OS

Workflow Manager

*/

const WorkflowManager = {

    workflows:{},

    create(

        name

    ){

        this.workflows[name] = {

            name,

            steps:[]

        };

        return this.workflows[name];

    },

    addStep(

        name,

        step

    ){

        if(

            !this.workflows[name]

        ){

            return null;

        }

        this.workflows[name]

        .steps

        .push(

            step

        );

        return step;

    },

    run(

        name,

        input

    ){

        const workflow =

        this.workflows[name];

        if(

            !workflow

        ){

            return null;

        }

        let result = input;

        workflow.steps

        .forEach(

            step =>{

                result =

                step(

                    result

                );

            }

        );

        return result;

    },

    list(){

        return this.workflows;

    },

    remove(

        name

    ){

        delete this.workflows[name];

    },

    clear(){

        this.workflows={};

    }

};

export default WorkflowManager;
