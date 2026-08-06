/*

Family Wealth AI OS

Query Bus

*/

const QueryBus = {

    handlers:{},

    register(

        query,

        handler

    ){

        this.handlers[query] =

        handler;

        return query;

    },

    execute(

        query,

        params

    ){

        const handler =

        this.handlers[query];

        if(

            !handler

        ){

            return null;

        }

        return handler(

            params

        );

    },

    list(){

        return Object.keys(

            this.handlers

        );

    },

    remove(

        query

    ){

        delete this.handlers[query];

    },

    clear(){

        this.handlers={};

    }

};

export default QueryBus;
