/*

Family Wealth AI OS

Configuration Loader

*/

const ConfigLoader = {

    configs:{},

    load(

        name,

        config={}

    ){

        this.configs[name] =

        config;

        return config;

    },

    get(

        name

    ){

        return this.configs[name];

    },

    update(

        name,

        values

    ){

        if(

            !this.configs[name]

        ){

            return null;

        }

        this.configs[name] = {

            ...this.configs[name],

            ...values

        };

        return this.configs[name];

    },

    remove(

        name

    ){

        delete this.configs[name];

    },

    list(){

        return this.configs;

    },

    clear(){

        this.configs={};

    }

};

export default ConfigLoader;
