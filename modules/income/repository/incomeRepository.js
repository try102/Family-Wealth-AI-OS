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

import Database from "../../../storage/database.js";

// 初始化数据库

Database.init();

const IncomeRepository = {

    // =====================

    // Create

    // =====================

    save(

        income

    ){

        return Database.insert(

            "incomes",

            income

        );

    },

    // =====================

    // Read

    // =====================

    findAll(){

        return Database.find(

            "incomes"

        );

    },

    findById(

        id

    ){

        const list =

        Database.find(

            "incomes"

        );

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

        Database.find(

            "incomes"

        );

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

            ...

            list[index],

            ...

            data

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

        Database.find(

            "incomes"

        );

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

        Database.tables.incomes = [];

        Database.save();

    }

};

export default IncomeRepository;
