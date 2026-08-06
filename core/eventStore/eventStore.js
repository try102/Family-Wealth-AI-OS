/*

Family Wealth AI OS

Event Store

*/

const EventStore = {

    events:[],

    save(

        type,

        data={}

    ){

        const event = {

            id:

            Date.now(),

            type,

            data,

            timestamp:

            new Date()

            .toISOString()

        };

        this.events.push(

            event

        );

        return event;

    },

    all(){

        return this.events;

    },

    find(

        type

    ){

        return this.events

        .filter(

            event =>

            event.type === type

        );

    },

    latest(){

        return this.events[

            this.events.length - 1

        ];

    },

    clear(){

        this.events=[];

    }

};

export default EventStore;
