/*

Family Wealth AI OS

Health Check V7

*/

const HealthCheck = {

    checks:{},

    register(

        name,

        checker

    ){

        this.checks[name] =

        checker;

    },

    run(

    ){

        const result = {};

        Object.keys(

            this.checks

        )

        .forEach(

            name =>{

                try{

                    result[name] = {

                        status:

                        "OK",

                        value:

                        this.checks[name]()

                    };

                }

                catch(error){

                    result[name] = {

                        status:

                        "ERROR",

                        message:

                        error.message

                    };

                }

            }

        );

        return result;

    },

    list(){

        return Object.keys(

            this.checks

        );

    },

    clear(){

        this.checks={};

    }

};

export default HealthCheck;
