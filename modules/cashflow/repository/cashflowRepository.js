/*

    

Family Wealth AI OS V7

Cashflow Repository

现金流数据仓库

*/

import Database

    from "../../../storage/database.js";

const TABLE =

    "cashflows";

const cashflowRepository = {

    // ==================================================

    // Initialize

    // ==================================================

    init(){

        Database.init();

        if(

            !Database.tables[TABLE]

        ){

            Database.tables[TABLE] = [];

            Database.save();

        }

        return true;

    },

    // ==================================================

    // Create

    // ==================================================

    create(

        data

    ){

        this.init();

        const record = {

            id:

                Date.now().toString(),

            ...data,

            createdAt:

                new Date().toISOString(),

            updatedAt:

                new Date().toISOString()

        };

        Database.insert(

            TABLE,

            record

        );

        return record;

    },

    // ==================================================

    // Find All

    // ==================================================

    findAll(){

        this.init();

        return Database.find(

            TABLE

        );

    },

    // ==================================================

    // Find One

    // ==================================================

    findById(

        id

    ){

        const list =

            this.findAll();

        return list.find(

            item =>

                String(item.id) ===

                String(id)

        ) || null;

    },

    // ==================================================

    // Update

    // ==================================================

    update(

        id,

        data

    ){

        const list =

            this.findAll();

        const index =

            list.findIndex(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if(

            index === -1

        ){

            return null;

        }

        list[index] = {

            ...list[index],

            ...data,

            id:

                list[index].id,

            updatedAt:

                new Date().toISOString()

        };

        Database.tables[TABLE] =

            list;

        Database.save();

        return list[index];

    },

    // ==================================================

    // Delete

    // ==================================================

    remove(

        id

    ){

        const list =

            this.findAll();

        const index =

            list.findIndex(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if(

            index === -1

        ){

            return false;

        }

        list.splice(

            index,

            1

        );

        Database.tables[TABLE] =

            list;

        Database.save();

        return true;

    },

    // ==================================================

    // Clear

    // ==================================================

    clear(){

        this.init();

        Database.tables[TABLE] = [];

        Database.save();

    }

};

export default cashflowRepository;
