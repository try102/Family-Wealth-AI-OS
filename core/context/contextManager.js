/*

Family Wealth AI OS

Context Manager

*/

const ContextManager = {

    context:{},

    set(

        key,

        value

    ){

        this.context[key] = value;

        return value;

    },

    get(

        key

    ){

        return this.context[key];

    },

    update(

        data

    ){

        this.context = {

            ...this.context,

            ...data

        };

        return this.context;

    },

    remove(

        key

    ){

        delete this.context[key];

    },

    all(){

        return this.context;

    },

    clear(){

        this.context = {};

    }

};

export default ContextManager;
