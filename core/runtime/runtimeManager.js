/*

Family Wealth AI OS

Runtime Manager

*/

const RuntimeManager = {

    status:

    "CREATED",

    startedAt:

    null,

    start(){

        this.status =

        "RUNNING";

        this.startedAt =

        new Date()

        .toISOString();

        return this.status;

    },

    stop(){

        this.status =

        "STOPPED";

        return this.status;

    },

    restart(){

        this.stop();

        return this.start();

    },

    getStatus(){

        return {

            status:

            this.status,

            startedAt:

            this.startedAt

        };

    },

    uptime(){

        if(

            !this.startedAt

        ){

            return 0;

        }

        return (

            Date.now()

            -

            new Date(

                this.startedAt

            )

        );

    },

    reset(){

        this.status =

        "CREATED";

        this.startedAt =

        null;

    }

};

export default RuntimeManager;
