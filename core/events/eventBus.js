/*

Family Wealth AI OS

Core Event Bus

*/

const listeners = {};

const EventBus = {

    subscribe(

        event,

        callback

    ){

        if(!listeners[event]){

            listeners[event]=[];

        }

        listeners[event]

        .push(callback);

    },

    publish(

        event,

        data

    ){

        if(!listeners[event]){

            return;

        }

        listeners[event]

        .forEach(

            callback=>{

                callback(data);

            }

        );

    },

    unsubscribe(

        event,

        callback

    ){

        if(!listeners[event]){

            return;

        }

        listeners[event] =

        listeners[event]

        .filter(

            fn=>fn!==callback

        );

    }

};

export default EventBus;
