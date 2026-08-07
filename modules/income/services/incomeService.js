/*

Family Wealth AI OS V7

Income Service

收入业务服务层

*/

import IncomeSchema from "../schema/incomeSchema.js";

import IncomeRepository from "../repository/incomeRepository.js";

const IncomeService = {

    // =====================

    // Add Income

    // =====================

    addIncome(

        data

    ){

        const income =

        IncomeSchema.create(

            data

        );

        return IncomeRepository.save(

            income

        );

    },

    // =====================

    // Query

    // =====================

    getAllIncome(){

        return IncomeRepository.findAll();

    },

    getIncomeById(

        id

    ){

        return IncomeRepository.findById(

            id

        );

    },

    // =====================

    // Update

    // =====================

    updateIncome(

        id,

        data

    ){

        return IncomeRepository.update(

            id,

            data

        );

    },

    // =====================

    // Delete

    // =====================

    deleteIncome(

        id

    ){

        return IncomeRepository.remove(

            id

        );

    },

    // =====================

    // Summary

    // =====================

    getSummary(){

        const list =

        IncomeRepository.findAll();

        let total = 0;

        list.forEach(

            item => {

                total +=

                Number(

                    item.amount || 0

                );

            }

        );

        return {

            count:

            list.length,

            totalIncome:

            total

        };

    }

};

export default IncomeService;
