/*

Family Wealth AI OS V7

Storage Manager

*/

const Storage = {

    data:{},

    set(

        key,

        value

    ){

        this.data[key]=value;

        return value;

    },

    get(

        key

    ){

        return (

            this.data[key]

            ||

            null

        );

    },

    remove(

        key

    ){

        delete this.data[key];

    },

    has(

        key

    ){

        return (

            key in this.data

        );

    },

    clear(){

        this.data={};

    },

    all(){

        return this.data;

    }

};

export default Storage;
