/*

Family Wealth AI OS

Notification Manager

*/

import DataService from "../database/dataService.js";

const NOTIFICATION_KEY =

"wealth_notifications";

const NotificationManager = {

    getAll(){

        return (

            DataService.load(

                NOTIFICATION_KEY

            )

            ||

            []

        );

    },

    send(

        notification

    ){

        const list =

        this.getAll();

        const item = {

            id:

            Date.now(),

            status:

            "UNREAD",

            createdAt:

            new Date()

            .toISOString(),

            ...notification

        };

        list.push(

            item

        );

        DataService.save(

            NOTIFICATION_KEY,

            list

        );

        return item;

    },

    markRead(

        id

    ){

        const list =

        this.getAll();

        const item =

        list.find(

            n =>

            n.id === id

        );

        if(item){

            item.status =

            "READ";

        }

        DataService.save(

            NOTIFICATION_KEY,

            list

        );

        return item;

    },

    unread(){

        return this.getAll()

        .filter(

            n =>

            n.status ===

            "UNREAD"

        );

    },

    clear(){

        return DataService.remove(

            NOTIFICATION_KEY

        );

    }

};

export default NotificationManager;
