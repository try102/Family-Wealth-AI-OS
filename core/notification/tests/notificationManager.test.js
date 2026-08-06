/*

Family Wealth AI OS

Notification Manager Test

*/

import NotificationManager from "../notificationManager.js";

// =====================

// Reset

// =====================

NotificationManager.clear();

// =====================

// Send Test

// =====================

const notification =

NotificationManager.send({

    type:

    "RISK_ALERT",

    title:

    "Investment Risk Warning",

    message:

    "Portfolio concentration is high"

});

console.log(

    "Notification:",

    notification

);

if(

    notification.status !==

    "UNREAD"

){

    throw new Error(

        "Notification send failed"

    );

}

// =====================

// Get All

// =====================

const all =

NotificationManager.getAll();

console.log(

    "All Notifications:",

    all

);

if(

    all.length !== 1

){

    throw new Error(

        "Notification get failed"

    );

}

// =====================

// Unread

// =====================

const unread =

NotificationManager.unread();

console.log(

    "Unread:",

    unread

);

if(

    unread.length !== 1

){

    throw new Error(

        "Unread failed"

    );

}

// =====================

// Mark Read

// =====================

NotificationManager.markRead(

    notification.id

);

const unreadAfter =

NotificationManager.unread();

if(

    unreadAfter.length !== 0

){

    throw new Error(

        "Mark read failed"

    );

}

console.log(

    "Notification Manager Test Passed"

);
