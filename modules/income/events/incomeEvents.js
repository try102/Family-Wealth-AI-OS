/*

Family Wealth AI OS V7

Income Events

收入事件定义

*/

const IncomeEvents = {

    // =====================

    // Event Names

    // =====================

    INCOME_CREATED:

    "income.created",

    INCOME_UPDATED:

    "income.updated",

    INCOME_DELETED:

    "income.deleted",

    // =====================

    // Create Event Payload

    // =====================

    createIncomeCreatedEvent(

        income

    ){

        return {

            type:

            this.INCOME_CREATED,

            payload:

            income,

            timestamp:

            Date.now()

        };

    },

    // =====================

    // Update Event Payload

    // =====================

    createIncomeUpdatedEvent(

        income

    ){

        return {

            type:

            this.INCOME_UPDATED,

            payload:

            income,

            timestamp:

            Date.now()

        };

    },

    // =====================

    // Delete Event Payload

    // =====================

    createIncomeDeletedEvent(

        id

    ){

        return {

            type:

            this.INCOME_DELETED,

            payload:

            {

                id

            },

            timestamp:

            Date.now()

        };

    }

};

export default IncomeEvents;
