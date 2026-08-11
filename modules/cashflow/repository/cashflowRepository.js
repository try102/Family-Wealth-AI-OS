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

            !Array.isArray(

                Database.tables[TABLE]

            )

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

                Date.now(),

            ...data

        };

        return Database.insert(

            TABLE,

            record

        );

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

    // Find By ID

    // ==================================================

    findById(

        id

    ){

        const list =

            this.findAll();

        return (

            list.find(

                item =>

                    String(item.id) ===

                    String(id)

            )

            ||

            null

        );

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

                new Date()

                    .toISOString()

        };

        Database.save();

        return list[index];

    },

    // ==================================================

    // Remove

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

        return true;

    }

};

export default cashflowRepository;
