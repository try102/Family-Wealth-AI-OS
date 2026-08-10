/*

    

Family Wealth AI OS V7

Income Repository

收入数据仓库层

连接：

Income Module

↓

Database Manager

↓

Storage Manager

*/

import Database

    from "../../../storage/database.js";

// ==================================================

// Initialize Database

// ==================================================

Database.init();

// ==================================================

// Income Repository

// ==================================================

const IncomeRepository = {

    // ==================================================

    // Create

    // ==================================================

    save(

        income

    ){

        return Database.insert(

            "incomes",

            income

        );

    },

    // ==================================================

    // Read All

    // ==================================================

    findAll(){

        return Database.find(

            "incomes"

        );

    },

    // ==================================================

    // Read By ID

    // ==================================================

    findById(

        id

    ){

        const list =

            Database.find(

                "incomes"

            );

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

            Database.find(

                "incomes"

            );

        const index =

            list.findIndex(

                item =>

                    String(item.id) ===

                    String(id)

            );

        // ==============================================

        // Not Found

        // ==============================================

        if(

            index === -1

        ){

            return null;

        }

        // ==============================================

        // Preserve ID

        // ==============================================

        const originalId =

            list[index].id;

        // ==============================================

        // Update

        // ==============================================

        list[index] = {

            ...list[index],

            ...data,

            id:

                originalId

        };

        // ==============================================

        // Save

        // ==============================================

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

            Database.find(

                "incomes"

            );

        const index =

            list.findIndex(

                item =>

                    String(item.id) ===

                    String(id)

            );

        // ==============================================

        // Not Found

        // ==============================================

        if(

            index === -1

        ){

            return false;

        }

        // ==============================================

        // Delete

        // ==============================================

        list.splice(

            index,

            1

        );

        // ==============================================

        // Save

        // ==============================================

        Database.save();

        return true;

    },

    // ==================================================

    // Clear Test Data

    // ==================================================

    clear(){

        Database.tables.incomes = [];

        Database.save();

    }

};

// ==================================================

// Export

// ==================================================

export default IncomeRepository;
