/*

Family Wealth AI OS

Policy Manager

*/

const PolicyManager = {

    policies:{},

    create(

        name,

        policy={}

    ){

        this.policies[name] = {

            name,

            policy

        };

        return this.policies[name];

    },

    get(

        name

    ){

        return this.policies[name];

    },

    update(

        name,

        policy

    ){

        if(

            !this.policies[name]

        ){

            return null;

        }

        this.policies[name]

        .policy = {

            ...this.policies[name]

            .policy,

            ...policy

        };

        return this.policies[name];

    },

    list(){

        return this.policies;

    },

    remove(

        name

    ){

        delete this.policies[name];

    },

    clear(){

        this.policies={};

    }

};

export default PolicyManager;
