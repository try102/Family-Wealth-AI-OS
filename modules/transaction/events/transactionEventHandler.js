/*

Family Wealth AI OS

Transaction Event Handler

*/

import EventBus from "../../../core/events/eventBus.js?v=20261008ae";

import EventTypes from "../../../core/events/eventTypes.js?v=20261008ae";

const TransactionEventHandler = {

    initialize(){

        EventBus.subscribe(

            EventTypes.TRANSACTION_CREATED,

            transaction=>{

                console.log(

                    "Transaction created:",

                    transaction

                );

            }

        );

        EventBus.subscribe(

            EventTypes.TRANSACTION_UPDATED,

            transaction=>{

                console.log(

                    "Transaction updated:",

                    transaction

                );

            }

        );

        EventBus.subscribe(

            EventTypes.TRANSACTION_DELETED,

            id=>{

                console.log(

                    "Transaction deleted:",

                    id

                );

            }

        );

    }

};

export default TransactionEventHandler;
