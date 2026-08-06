/*

Family Wealth AI OS

Data Service

*/

import Database from "./database.js";

const DataService = {

    save(

        key,

        data

    ){

        return Database.save(

            key,

            data

        );

    },

    load(

        key

    ){

        return Database.load(

            key

        );

    },

    remove(

        key

    ){

        return Database.remove(

            key

        );

    },

    clear(){

        return Database.clear();

    },

    exists(

        key

    ){

        const data =

        this.load(

            key

        );

        return data !== null;

    }

};

export default DataService;
