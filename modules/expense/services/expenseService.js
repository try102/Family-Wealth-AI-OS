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

    from "../schema/expenseSchema.js?v=20261008ae";

import ExpenseRepository

    from "../repository/expenseRepository.js?v=20261008ae";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js?v=20261008ak";


/*

 * Deleting an Income / Expense record also revokes

 * the Transaction it created: the account-balance

 * effect is reversed, its cash-flow entries are

 * removed, and the Transaction itself is deleted,

 * so Dashboard / Cash Flow / Tax stop counting it.

 */

function revokeLinkedTransaction(

    kind,

    recordId

) {

    try {

        const transactions =

            TransactionIntegration

                .getAllTransactions() || [];

        const linked =

            transactions.find(

                transaction =>

                    transaction &&

                    transaction.businessDetails &&

                    transaction.businessDetails[kind] &&

                    String(

                        transaction.businessDetails[kind][

                            kind + "Id"

                        ]

                    ) === String(recordId)

            );

        if (!linked) {

            return;

        }

        TransactionIntegration

            .removeTransaction(

                linked.id

            );

    } catch (transactionError) {

    }

}

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

        revokeLinkedTransaction(

            "expense",

            id

        );

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
