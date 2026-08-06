/*

Family Wealth AI OS

Event Store

*/

import DataService from "../database/dataService.js";

const EVENT_KEY =

"wealth_event_history";

const EventStore = {

    getAll(){

        return (

            DataService.load(

                EVENT_KEY

            )

            ||

            []

        );

    },

    save(

        event

    ){

        const events =

        this.getAll();

        events.push(

            {

                ...event,

                timestamp:

                new Date()

                .toISOString()

            }

        );

        DataService.save(

            EVENT_KEY,

            events

        );

        return event;

    },

    clear(){

        return DataService.remove(

            EVENT_KEY

        );

    }

};

export default EventStore;
