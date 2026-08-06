/*

Family Wealth AI OS

Environment Manager

*/

const EnvironmentManager = {

    environments:{},

    current:

    "development",

    register(

        name,

        config={}

    ){

        this.environments[name] = {

            name,

            config

        };

        return this.environments[name];

    },

    set(

        name

    ){

        if(

            this.environments[name]

        ){

            this.current = name;

            return true;

        }

        return false;

    },

    getCurrent(){

        return this.current;

    },

    config(){

        const env =

        this.environments[this.current];

        return env

        ?

        env.config

        :

        {};

    },

    list(){

        return this.environments;

    },

    clear(){

        this.environments={};

        this.current=

        "development";

    }

};

export default EnvironmentManager;
