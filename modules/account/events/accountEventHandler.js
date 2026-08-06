/*

Family Wealth AI OS

Account Event Handler

*/

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

const AccountEventHandler = {

    initialize(){

        EventBus.subscribe(

            EventTypes.ACCOUNT_CREATED,

            account=>{

                console.log(

                    "Account created:",

                    account

                );

            }

        );

        EventBus.subscribe(

            EventTypes.ACCOUNT_UPDATED,

            account=>{

                console.log(

                    "Account updated:",

                    account

                );

            }

        );

        EventBus.subscribe(

            EventTypes.ACCOUNT_DELETED,

            id=>{

                console.log(

                    "Account deleted:",

                    id

                );

            }

        );

    }

};

export default AccountEventHandler;
