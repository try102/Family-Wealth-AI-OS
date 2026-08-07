/*

Family Wealth AI OS V7

Liability Repository

负债数据仓库

*/

import Database from "../../../storage/database.js";

const TABLE =

"liabilities";

const LiabilityRepository = {

    // =====================

    // Initialize

    // =====================

    init(){

        Database.init();

        return true;

    },

    // =====================

    // Save

    // =====================

    save(

        liability

    ){

        return Database.insert(

            TABLE,

            liability

        );

    },

    // =====================

    // Find All

    // =====================

    findAll(){

        return Database.find(

            TABLE

        );

    },

    // =====================

    // Find By Id

    // =====================

    findById(

        id

    ){

        const list =

        this.findAll();

        return list.find(

            item =>

            item.id === id

        )

        ||

        null;

    },

    // =====================

    // Update

    // =====================

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

        list[index] = {

            ...list[index],

            ...data,

            updatedAt:

            new Date()

            .toISOString()

        };

        Database.save();

        return list[index];

    },

    // =====================

    // Delete

    // =====================

    remove(

        id

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

            return false;

        }

        list.splice(

            index,

            1

        );

        Database.save();

        return true;

    },

    // =====================

    // Clear Test Data

    // =====================

    clear(){

        Database.tables[TABLE]=[];

        Database.save();

    }

};

export default LiabilityRepository;
