/*

Family Wealth AI OS

Event Bus V7

*/

const EventBus = {

    listeners:{},

    history:[],

    subscribe(

        event,

        callback

    ){

        if(

            !this.listeners[event]

        ){

            this.listeners[event] = [];

        }

        this.listeners[event]

        .push(

            callback

        );

    },

    unsubscribe(

        event,

        callback

    ){

        if(

            !this.listeners[event]

        ){

            return;

        }

        this.listeners[event] =

        this.listeners[event]

        .filter(

            item =>

            item !== callback

        );

    },

    publish(

        event,

        data

    ){

        const record = {

            event,

            data,

            timestamp:

            new Date()

            .toISOString()

        };

        this.history.push(

            record

        );

        const callbacks =

        this.listeners[event]

        ||

        [];

        callbacks.forEach(

            callback =>{

                callback(

                    data

                );

            }

        );

        return record;

    },

    getHistory(){

        return this.history;

    },

    clear(){

        this.listeners = {};

        this.history = [];

    }

};

export default EventBus;
