/*

Family Wealth AI OS

Message Manager

*/

const MessageManager = {

    inbox:{},

    history:[],

    send(

        to,

        message

    ){

        if(

            !this.inbox[to]

        ){

            this.inbox[to]=[];

        }

        const record = {

            to,

            message,

            timestamp:

            new Date()

            .toISOString()

        };

        this.inbox[to]

        .push(

            record

        );

        this.history.push(

            record

        );

        return record;

    },

    receive(

        target

    ){

        return this.inbox[target]

        ||

        [];

    },

    all(){

        return this.history;

    },

    clear(){

        this.inbox={};

        this.history=[];

    }

};

export default MessageManager;
