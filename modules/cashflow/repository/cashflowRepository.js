/*

Family Wealth AI OS V7

Cashflow Repository

*/

import Database

from "../../../storage/database.js";

const TABLE =

"cashflows";

const cashflowRepository = {

    init(){

        Database.init();

        if(

            !Database.tables[TABLE]

        ){

            Database.tables[TABLE]=[];

            Database.save();

        }

        return true;

    },

    create(data){

        this.init();

        const record = {

            id:

            Date.now(),

            ...data

        };

        Database.insert(

            TABLE,

            record

        );

        return record;

    },

    findAll(){

        this.init();

        return Database.find(

            TABLE

        );

    },

    findById(id){

        const list =

        this.findAll();

        return list.find(

            item =>

            item.id === id

        );

    },

    update(

        id,

        data

    ){

        const list =

        this.findAll();

        const index =

        list.findIndex(

            item =>

            item.id === id

        );

        if(

            index === -1

        ){

            return null;

        }

        list[index]={

            ...list[index],

            ...data

        };

        Database.save();

        return list[index];

    },

    remove(id){

        const list =

        this.findAll();

        const filtered =

        list.filter(

            item =>

            item.id !== id

        );

        Database.tables[TABLE]=

        filtered;

        Database.save();

        return true;

    },

    clear(){

        Database.tables[TABLE]=[];

        Database.save();

    }

};

export default cashflowRepository;
