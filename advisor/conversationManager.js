/*

Family Wealth AI OS V7.5

Conversation Manager

*/

import Conversation from "./conversation.js";

const ConversationManager = {

    conversations: [],

    add(

        conversation

    ){

        if(

            !(conversation instanceof Conversation)

        ){

            throw new Error(

                "Invalid conversation"

            );

        }

        this.conversations.push(

            conversation

        );

        return conversation;

    },

    list(){

        return this.conversations;

    },

    get(

        id

    ){

        return this.conversations.find(

            conversation =>

            conversation.id === id

        );

    },

    getByUser(

        userId

    ){

        return this.conversations.filter(

            conversation =>

            conversation.userId === userId

        );

    },

    remove(

        id

    ){

        this.conversations =

        this.conversations.filter(

            conversation =>

            conversation.id !== id

        );

    },

    clear(){

        this.conversations=[];

    }

};

export default ConversationManager;
