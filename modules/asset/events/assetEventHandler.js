/*

Family Wealth AI OS

Asset Event Handler

*/

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

const AssetEventHandler = {

    initialize(){

        EventBus.subscribe(

            EventTypes.ASSET_CREATED,

            asset=>{

                console.log(

                    "Asset created:",

                    asset

                );

            }

        );

        EventBus.subscribe(

            EventTypes.ASSET_UPDATED,

            asset=>{

                console.log(

                    "Asset updated:",

                    asset

                );

            }

        );

        EventBus.subscribe(

            EventTypes.ASSET_DELETED,

            id=>{

                console.log(

                    "Asset deleted:",

                    id

                );

            }

        );

    }

};

export default AssetEventHandler;
