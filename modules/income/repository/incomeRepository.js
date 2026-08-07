/*

Family Wealth AI OS V7

Income Repository

收入数据存储层

*/

const incomeStorage = [];

const IncomeRepository = {

    // =====================

    // Create

    // =====================

    save(

        income

    ){

        incomeStorage.push(

            income

        );

        return income;

    },

    // =====================

    // Read

    // =====================

    findAll(){

        return incomeStorage;

    },

    findById(

        id

    ){

        return incomeStorage.find(

            item =>

            item.id === id

        );

    },

    // =====================

    // Update

    // =====================

    update(

        id,

        data

    ){

        const index =

        incomeStorage.findIndex(

            item =>

            item.id === id

        );

        if(

            index === -1

        ){

            return null;

        }

        incomeStorage[index] = {

            ...

            incomeStorage[index],

            ...

            data

        };

        return incomeStorage[index];

    },

    // =====================

    // Delete

    // =====================

    remove(

        id

    ){

        const index =

        incomeStorage.findIndex(

            item =>

            item.id === id

        );

        if(

            index === -1

        ){

            return false;

        }

        incomeStorage.splice(

            index,

            1

        );

        return true;

    },

    // =====================

    // Clear Test Data

    // =====================

    clear(){

        incomeStorage.length = 0;

    }

};

export default IncomeRepository;
