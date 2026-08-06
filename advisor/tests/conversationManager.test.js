/*

Family Wealth AI OS V7.5

Conversation Model Test

*/

import Conversation from "../conversation.js";

// =====================

// Create Conversation

// =====================

const conversation = new Conversation({

    id:1,

    userId:"owner",

    message:"我的退休资金够吗？",

    role:"USER",

    timestamp:"2026-08-06"

});

// =====================

// ID Test

// =====================

if(

    conversation.id !== 1

){

    throw new Error(

        "Conversation id failed"

    );

}

// =====================

// User Test

// =====================

if(

    conversation.userId !== "owner"

){

    throw new Error(

        "Conversation user failed"

    );

}

// =====================

// Message Test

// =====================

if(

    conversation.message !== "我的退休资金够吗？"

){

    throw new Error(

        "Conversation message failed"

    );

}

// =====================

// Role Test

// =====================

if(

    conversation.role !== "USER"

){

    throw new Error(

        "Conversation role failed"

    );

}

// =====================

// Timestamp Test

// =====================

if(

    conversation.timestamp !== "2026-08-06"

){

    throw new Error(

        "Conversation timestamp failed"

    );

}

console.log(

    "Conversation Test Passed"

);
