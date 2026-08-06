/*

Family Wealth AI OS V7.5

AI Conversation Model

*/

class Conversation {

    constructor({

        id,

        userId,

        message,

        role = "USER",

        timestamp = new Date()

    }){

        this.id = id;

        this.userId = userId;

        this.message = message;

        this.role = role;

        this.timestamp = timestamp;

    }

}

export default Conversation;
