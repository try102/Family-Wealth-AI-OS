/*

Family Wealth AI OS

Session Manager

*/

const SessionManager = {

    sessions:{},

    create(

        id,

        data={}

    ){

        this.sessions[id] = {

            id,

            data,

            createdAt:

            new Date()

            .toISOString()

        };

        return this.sessions[id];

    },

    get(

        id

    ){

        return this.sessions[id];

    },

    update(

        id,

        data

    ){

        if(

            !this.sessions[id]

        ){

            return null;

        }

        this.sessions[id].data = {

            ...this.sessions[id].data,

            ...data

        };

        return this.sessions[id];

    },

    remove(

        id

    ){

        delete this.sessions[id];

    },

    list(){

        return Object.values(

            this.sessions

        );

    },

    clear(){

        this.sessions={};

    }

};

export default SessionManager;
