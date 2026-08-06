/*

Family Wealth AI OS

Identity Manager

*/

const IdentityManager = {

    identities:{},

    create(

        id,

        data={}

    ){

        this.identities[id] = {

            id,

            ...data

        };

        return this.identities[id];

    },

    get(

        id

    ){

        return this.identities[id];

    },

    update(

        id,

        data

    ){

        if(

            !this.identities[id]

        ){

            return null;

        }

        this.identities[id] = {

            ...this.identities[id],

            ...data

        };

        return this.identities[id];

    },

    list(){

        return Object.values(

            this.identities

        );

    },

    remove(

        id

    ){

        delete this.identities[id];

    },

    clear(){

        this.identities={};

    }

};

export default IdentityManager;
