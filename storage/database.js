/*

Family Wealth AI OS V7

Database Manager

*/

import Storage

from "./storage.js";

const Database = {

    tables:{

        users:[],

        assets:[],

        investments:[],

        liabilities:[],

        incomes:[],

        goals:[],

        reports:[],

        auditLogs:[]

    },

    init(){

        const saved =

        Storage.get(

            "wealth_database"

        );

        if(

            saved

        ){

            this.tables =

            saved;

        }

        else{

            this.save();

        }

        return this.tables;

    },

    save(){

        Storage.set(

            "wealth_database",

            this.tables

        );

    },

    insert(

        table,

        data

    ){

        if(

            !this.tables[table]

        ){

            throw new Error(

                "Table not found"

            );

        }

        this.tables[table]

        .push(

            data

        );

        this.save();

        return data;

    },

    find(

        table

    ){

        if(

            !this.tables[table]

        ){

            return [];

        }

        return this.tables[table];

    },

    clear(){

        this.tables={

            users:[],

            assets:[],

            investments:[],

            liabilities:[],

            incomes:[],

            goals:[],

            reports:[],

            auditLogs:[]

        };

        this.save();

    }

};

export default Database;
