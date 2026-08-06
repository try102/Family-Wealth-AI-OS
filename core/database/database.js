/*

Family Wealth AI OS

Database Core

*/

import StorageAdapter from "./storageAdapter.js";

const Database = {

    adapter:

    StorageAdapter,

    save(

        key,

        data

    ){

        return this.adapter.save(

            key,

            data

        );

    },

    load(

        key

    ){

        return this.adapter.load(

            key

        );

    },

    remove(

        key

    ){

        return this.adapter.remove(

            key

        );

    },

    clear(){

        return this.adapter.clear();

    }

};

export default Database;
