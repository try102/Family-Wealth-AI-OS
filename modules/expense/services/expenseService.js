/*

Family Wealth AI OS V7

Expense Service

支出业务服务层

Expense View

     ↓

Expense Agent

     ↓

Expense Service

     ├── Expense Repository

     └── Transaction Integration

                 ↓

             Transaction

IMPORTANT:

Transaction is the system-level

Actual Event record.

An Expense Transaction requires

a real Account. We NEVER create

a fake Account ID.

accountId exists

     ↓

create Transaction

accountId does not exist

     ↓

keep Expense record only

*/

import ExpenseSchema

    from "../schema/expenseSchema.js";

import ExpenseRepository

    from "../repository/expenseRepository.js";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js";

const ExpenseService = {

    // =====================================================

    // Create

    // =====================================================

    addExpense(

        data = {}

    ){

        const expense =

            ExpenseSchema.create(

                data

            );

        const savedExpense =

            ExpenseRepository.save(

                expense

            );

        if (

            savedExpense

        ){

            TransactionIntegration

                .recordExpense({

                    date:

                        savedExpense.date ||

                        undefined,

                    accountId:

                        savedExpense.accountId,

                    amount:

                        Number(

                            savedExpense.amount ||

                            0

                        ),

                    currency:

                        savedExpense.currency ||

                        "USD",

                    description:

                        savedExpense.name ||

                        "Expense",

                    expense: {

                        expenseId:

                            savedExpense.id,

                        name:

                            savedExpense.name ||

                            "",

                        category:

                            savedExpense.category ||

                            "Other"

                    },

                    source:

                        "BusinessModule"

                });

        }

        return savedExpense;

    },

    // =====================================================

    // Read

    // =====================================================

    getAllExpense(){

        return ExpenseRepository.findAll();

    },

    getExpenseById(

        id

    ){

        return ExpenseRepository.findById(

            id

        );

    },

    // =====================================================

    // Update

    // =====================================================

    updateExpense(

        id,

        data

    ){

        /*

         * Transaction update is intentionally

         * NOT performed here yet (same policy

         * as Income): one Expense record may

         * correspond to a historical Actual

         * Transaction.

         */

        return ExpenseRepository.update(

            id,

            data

        );

    },

    // =====================================================

    // Delete

    // =====================================================

    deleteExpense(

        id

    ){

        return ExpenseRepository.remove(

            id

        );

    },

    // =====================================================

    // Summary

    // =====================================================

    getSummary(){

        const list =

            ExpenseRepository.findAll();

        let totalExpense = 0;

        list.forEach(

            item => {

                totalExpense +=

                    Number(

                        item.amount ||

                        0

                    );

            }

        );

        return {

            count:

                list.length,

            totalExpense

        };

    }

};

export default ExpenseService;
