/*

Family Wealth AI OS V7.5

Conversation Manager Test

*/

import ConversationManager from "../conversationManager.js";

import Conversation from "../conversation.js";

// =====================

// Reset

// =====================

ConversationManager.clear();

// =====================

// Add Test

// =====================

const userMessage = new Conversation({

    id:1,

    userId:"owner",

    message:"我的退休资金够吗？",

    role:"USER"

});

const added =

ConversationManager.add(

    userMessage

);

if(

    added.message !== "我的退休资金够吗？"

){

    throw new Error(

        "Conversation add failed"

    );

}

// =====================

// List Test

// =====================

if(

    ConversationManager.list().length !==1

){

    throw new Error(

        "Conversation list failed"

    );

}

// =====================

// Get Test

// =====================

const found =

ConversationManager.get(

    1

);

if(

    found.userId !== "owner"

){

    throw new Error(

        "Conversation get failed"

    );

}

// =====================

// Get By User Test

// =====================

const userHistory =

ConversationManager.getByUser(

    "owner"

);

if(

    userHistory.length !==1

){

    throw new Error(

        "Conversation user search failed"

    );

}

// =====================

// Invalid Data Test

// =====================

try{

    ConversationManager.add({});

    throw new Error(

        "Invalid conversation check failed"

    );

}

catch(error){

}

// =====================

// Remove Test

// =====================

ConversationManager.remove(

    1

);

if(

    ConversationManager.list().length !==0

){

    throw new Error(

        "Conversation remove failed"

    );

}

// =====================

// Clear Test

// =====================

ConversationManager.add(

    new Conversation({

        id:2,

        userId:"owner",

        message:"测试",

        role:"USER"

    })

);

ConversationManager.clear();

if(

    ConversationManager.list().length !==0

){

    throw new Error(

        "Conversation clear failed"

    );

}

console.log(

    "Conversation Manager Test Passed"

);
