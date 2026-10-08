/*

Family Wealth AI OS V7

Expense Repository

支出数据仓库层

*/

import Database

    from "../../../storage/database.js";

// ==================================================

// Initialize Database

// ==================================================

Database.init();

const ExpenseRepository = {

    // ==================================================

    // Create

    // ==================================================

    save(

        expense

    ){

        return Database.insert(

            "expenses",

            expense

        );

    },

    // ==================================================

    // Read All

    // ==================================================

    findAll(){

        return Database.find(

            "expenses"

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

                "expenses"

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

                "expenses"

            );

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

        const originalId =

            list[index].id;

        list[index] = {

            ...list[index],

            ...data,

            id:

                originalId

        };

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

                "expenses"

            );

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

    // Clear Test Data

    // ==================================================

    clear(){

        Database.tables.expenses = [];

        Database.save();

    }

};

export default ExpenseRepository;
