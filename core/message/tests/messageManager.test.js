/*

Family Wealth AI OS

Message Manager Test

*/

import MessageManager from "../messageManager.js";

// =====================

// Reset

// =====================

MessageManager.clear();

// =====================

// Send Test

// =====================

const message =

MessageManager.send(

    "WEALTH_ENGINE",

    {

        type:

        "ASSET_UPDATED",

        asset:

        "House"

    }

);

console.log(

    "Message:",

    message

);

if(

    message.to !==

    "WEALTH_ENGINE"

){

    throw new Error(

        "Message send failed"

    );

}

// =====================

// Receive Test

// =====================

const inbox =

MessageManager.receive(

    "WEALTH_ENGINE"

);

console.log(

    "Inbox:",

    inbox

);

if(

    inbox.length !==1

){

    throw new Error(

        "Message receive failed"

    );

}

if(

    inbox[0]

    .message.type !==

    "ASSET_UPDATED"

){

    throw new Error(

        "Message content failed"

    );

}

// =====================

// History Test

// =====================

const history =

MessageManager.all();

if(

    history.length !==1

){

    throw new Error(

        "Message history failed"

    );

}

// =====================

// Clear Test

// =====================

MessageManager.clear();

if(

    MessageManager.all()

    .length !==0

){

    throw new Error(

        "Message clear failed"

    );

}

console.log(

    "Message Manager Test Passed"

);
