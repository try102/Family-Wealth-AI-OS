/*

Family Wealth AI OS

Event History

*/

import EventStore from "./eventStore.js?v=20261008ae";

const EventHistory = {

    getAll(){

        return EventStore.getAll();

    },

    getByType(

        type

    ){

        return EventStore

        .getAll()

        .filter(

            event =>

            event.type === type

        );

    },

    getBySource(

        source

    ){

        return EventStore

        .getAll()

        .filter(

            event =>

            event.source === source

        );

    },

    latest(

        count = 10

    ){

        return EventStore

        .getAll()

        .slice(-count)

        .reverse();

    }

};

export default EventHistory;
