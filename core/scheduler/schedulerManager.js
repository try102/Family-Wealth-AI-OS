/*

Family Wealth AI OS

Scheduler Manager

*/

const SchedulerManager = {

    tasks:{},

    register(

        name,

        callback,

        interval

    ){

        this.tasks[name] = {

            name,

            callback,

            interval,

            lastRun:null

        };

    },

    run(

        name

    ){

        const task =

        this.tasks[name];

        if(!task){

            return null;

        }

        const result =

        task.callback();

        task.lastRun =

        new Date()

        .toISOString();

        return result;

    },

    list(){

        return Object.keys(

            this.tasks

        );

    },

    remove(

        name

    ){

        delete this.tasks[name];

    }

};

export default SchedulerManager;
