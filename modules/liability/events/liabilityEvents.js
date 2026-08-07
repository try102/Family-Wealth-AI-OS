/*

Family Wealth AI OS V7

Liability Events

负债事件管理

*/

const LiabilityEvents = {

    name:

    "Liability Events V7",

    events:{

        CREATED:

        "LIABILITY_CREATED",

        UPDATED:

        "LIABILITY_UPDATED",

        DELETED:

        "LIABILITY_DELETED"

    },

    // =====================

    // Create Event

    // =====================

    createEvent(

        liability

    ){

        return {

            type:

            this.events.CREATED,

            payload:

            liability,

            timestamp:

            new Date()

            .toISOString()

        };

    },

    // =====================

    // Update Event

    // =====================

    updateEvent(

        liability

    ){

        return {

            type:

            this.events.UPDATED,

            payload:

            liability,

            timestamp:

            new Date()

            .toISOString()

        };

    },

    // =====================

    // Delete Event

    // =====================

    deleteEvent(

        id

    ){

        return {

            type:

            this.events.DELETED,

            payload:{

                id

            },

            timestamp:

            new Date()

            .toISOString()

        };

    }

};

export default LiabilityEvents;
