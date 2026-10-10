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

    from "../../../core/integration/transactionIntegration.js?v=20261009bp";


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

    // Auto Linked Expense

    //

    // Mirror of a loan installment's interest portion

    // into the Expense Center. The installment's own

    // LOAN_PAYMENT transaction already moved the

    // account and Cash Flow, so this record NEVER

    // creates a second transaction — it only makes

    // the borrowing cost visible in the Expense

    // Center. Keyed by (liabilityId, period).

    // =====================================================

    createLinkedExpense(

        data = {}

    ){

        try {

            if (

                !data.autoSource ||

                !data.liabilityId ||

                !data.period

            ){

                return null;

            }

            const existing =

                (

                    ExpenseRepository.findAll() || []

                ).find(

                    record =>

                        record.autoSource &&

                        String(record.liabilityId) ===

                            String(data.liabilityId) &&

                        Number(record.period) ===

                            Number(data.period)

                );

            if (

                existing

            ){

                return existing;

            }

            const record =

                ExpenseSchema.create({

                    id:

                        `auto_${data.autoSource}_${data.liabilityId}_${data.period}`,

                    name:

                        data.name || "",

                    category:

                        data.category || "其他",

                    amount:

                        Number(data.amount || 0),

                    currency:

                        data.currency || "USD",

                    date:

                        data.date || "",

                    accountId:

                        data.accountId || "",

                    memberId:

                        data.memberId || "",

                    note:

                        data.note || ""

                });

            record.autoSource =

                data.autoSource;

            record.liabilityId =

                data.liabilityId;

            record.period =

                Number(data.period);

            return ExpenseRepository.save(

                record

            );

        } catch (linkedError) {

            return null;

        }

    },

    deleteLinkedExpense(

        liabilityId,

        period

    ){

        try {

            const record =

                (

                    ExpenseRepository.findAll() || []

                ).find(

                    item =>

                        item.autoSource &&

                        String(item.liabilityId) ===

                            String(liabilityId) &&

                        Number(item.period) ===

                            Number(period)

                );

            if (

                record

            ){

                ExpenseRepository.remove(

                    record.id

                );

            }

        } catch (deleteError) {

        }

    },

    deleteLinkedExpensesByLiability(

        liabilityId

    ){

        try {

            (

                ExpenseRepository.findAll() || []

            )

                .filter(

                    record =>

                        record.autoSource &&

                        String(record.liabilityId) ===

                            String(liabilityId)

                )

                .forEach(

                    record =>

                        ExpenseRepository.remove(

                            record.id

                        )

                );

        } catch (deleteError) {

        }

    },

    // =====================================================

    // Summary

    // =====================================================

    getSummary(){

        const list =

            ExpenseRepository.findAll();

        let totalExpense = 0;

        let dailyExpense = 0;

        list.forEach(

            item => {

                const amount =

                    Number(

                        item.amount ||

                        0

                    );

                totalExpense +=

                    amount;

                // Auto mirrors (e.g. loan interest) stay

                // out of the daily-expense caliber, the

                // same rule as auto income.

                if (

                    !item.autoSource

                ){

                    dailyExpense +=

                        amount;

                }

            }

        );

        return {

            count:

                list.length,

            totalExpense,

            dailyExpense

        };

    }

};

export default ExpenseService;
