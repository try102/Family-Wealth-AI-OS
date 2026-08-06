/*

Family Wealth AI OS

Data Pipeline Manager

*/

const DataPipelineManager = {

    pipelines:{},

    create(

        name

    ){

        this.pipelines[name] = {

            name,

            steps:[]

        };

        return this.pipelines[name];

    },

    addStep(

        name,

        step

    ){

        if(

            !this.pipelines[name]

        ){

            return null;

        }

        this.pipelines[name]

        .steps

        .push(

            step

        );

        return step;

    },

    run(

        name,

        data

    ){

        const pipeline =

        this.pipelines[name];

        if(

            !pipeline

        ){

            return null;

        }

        let result = data;

        pipeline.steps

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

        return this.pipelines;

    },

    clear(){

        this.pipelines={};

    }

};

export default DataPipelineManager;
