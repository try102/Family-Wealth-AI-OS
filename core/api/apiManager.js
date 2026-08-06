/*

Family Wealth AI OS

API Manager

*/

const APIManager = {

    routes:{},

    register(

        name,

        handler

    ){

        this.routes[name] =

        handler;

        return name;

    },

    call(

        name,

        payload

    ){

        const api =

        this.routes[name];

        if(!api){

            return null;

        }

        return api(

            payload

        );

    },

    list(){

        return Object.keys(

            this.routes

        );

    },

    remove(

        name

    ){

        delete this.routes[name];

    },

    clear(){

        this.routes = {};

    }

};

export default APIManager;
