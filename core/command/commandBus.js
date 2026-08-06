/*

Family Wealth AI OS

Command Bus

*/

const CommandBus = {

    handlers:{},

    register(

        command,

        handler

    ){

        this.handlers[command] =

        handler;

        return command;

    },

    execute(

        command,

        payload

    ){

        const handler =

        this.handlers[command];

        if(

            !handler

        ){

            return null;

        }

        return handler(

            payload

        );

    },

    list(){

        return Object.keys(

            this.handlers

        );

    },

    remove(

        command

    ){

        delete this.handlers[command];

    },

    clear(){

        this.handlers={};

    }

};

export default CommandBus;
