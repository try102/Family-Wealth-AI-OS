/*

Family Wealth AI OS V7

Event Bus

*/

const EventBus = {

    events:{},

    on(

        event,

        callback

    ){

        if(

            !this.events[event]

        ){

            this.events[event]=[];

        }

        this.events[event]

        .push(

            callback

        );

    },

    emit(

        event,

        data

    ){

        const listeners =

        this.events[event];

        if(

            !listeners

        ){

            return [];

        }

        return listeners.map(

            callback =>

            callback(data)

        );

    },

    off(

        event

    ){

        delete this.events[event];

    },

    clear(){

        this.events={};

    }

};

export default EventBus;
