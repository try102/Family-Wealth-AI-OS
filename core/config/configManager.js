/*

Family Wealth AI OS

Config Manager

*/

const ConfigManager = {

    config:{},

    set(

        key,

        value

    ){

        this.config[key] = value;

        return value;

    },

    get(

        key

    ){

        return this.config[key];

    },

    has(

        key

    ){

        return Object.prototype

        .hasOwnProperty.call(

            this.config,

            key

        );

    },

    remove(

        key

    ){

        delete this.config[key];

    },

    all(){

        return this.config;

    },

    clear(){

        this.config = {};

    }

};

export default ConfigManager;
