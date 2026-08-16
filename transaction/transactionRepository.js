/**

 *

 * Family Wealth AI OS V7

 *

 * Transaction Repository

 *

 * Responsibility:

 *

 * - Persist Transaction data

 * - Load Transaction data

 * - Provide storage boundary for Transaction system

 *

 */

import DataService

    from "../core/database/dataService.js";

import Transaction

    from "./transaction.js";

const TRANSACTION_KEY =

    "family_transactions";

const TransactionRepository = {

    // =====================================================

    //

    // Load All Transactions

    //

    // =====================================================

    getTransactions() {

        const data =

            DataService.load(

                TRANSACTION_KEY

            ) || [];

        if (!Array.isArray(data)) {

            return [];

        }

        return data.map(

            transactionData =>

                transactionData instanceof Transaction

                    ? transactionData

                    : new Transaction(

                        transactionData

                    )

        );

    },

    // =====================================================

    //

    // Get One Transaction

    //

    // =====================================================

    getTransaction(

        transactionId

    ) {

        if (!transactionId) {

            return null;

        }

        return (

            this

                .getTransactions()

                .find(

                    transaction =>

                        transaction.id ===

                        transactionId

                ) || null

        );

    },

    // =====================================================

    //

    // Save One Transaction

    //

    // =====================================================

    saveTransaction(

        transaction

    ) {

        if (!transaction) {

            throw new Error(

                "Transaction is required."

            );

        }

        const normalizedTransaction =

            transaction instanceof Transaction

                ? transaction

                : new Transaction(

                    transaction

                );

        normalizedTransaction.normalize();

        const validation =

            normalizedTransaction.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        let data =

            this.getTransactions();

        const index =

            data.findIndex(

                item =>

                    item.id ===

                    normalizedTransaction.id

            );

        if (index >= 0) {

            data[index] =

                normalizedTransaction;

        } else {

            data.push(

                normalizedTransaction

            );

        }

        DataService.save(

            TRANSACTION_KEY,

            data.map(

                item =>

                    item.toJSON()

            )

        );

        return normalizedTransaction;

    },

    // =====================================================

    //

    // Save Multiple Transactions

    //

    // =====================================================

    saveTransactions(

        transactions = []

    ) {

        if (

            !Array.isArray(

                transactions

            )

        ) {

            throw new Error(

                "Transactions must be an array."

            );

        }

        const normalizedTransactions =

            transactions.map(

                transaction => {

                    const item =

                        transaction instanceof Transaction

                            ? transaction

                            : new Transaction(

                                transaction

                            );

                    item.normalize();

                    const validation =

                        item.validate();

                    if (!validation.valid) {

                        throw new Error(

                            validation.errors.join(" ")

                        );

                    }

                    return item;

                }

            );

        DataService.save(

            TRANSACTION_KEY,

            normalizedTransactions.map(

                transaction =>

                    transaction.toJSON()

            )

        );

        return normalizedTransactions;

    },

    // =====================================================

    //

    // Delete One Transaction

    //

    // =====================================================

    deleteTransaction(

        transactionId

    ) {

        if (!transactionId) {

            return false;

        }

        const data =

            this.getTransactions();

        const filtered =

            data.filter(

                transaction =>

                    transaction.id !==

                    transactionId

            );

        if (

            filtered.length ===

            data.length

        ) {

            return false;

        }

        DataService.save(

            TRANSACTION_KEY,

            filtered.map(

                transaction =>

                    transaction.toJSON()

            )

        );

        return true;

    },

    // =====================================================

    //

    // Replace All Transactions

    //

    // =====================================================

    replaceTransactions(

        transactions = []

    ) {

        return this.saveTransactions(

            transactions

        );

    },

    // =====================================================

    //

    // Clear Transactions

    //

    // =====================================================

    clearTransactions() {

        DataService.save(

            TRANSACTION_KEY,

            []

        );

        return true;

    }

};

// =====================================================

//

// ES Module Export

//

// =====================================================

export default

    TransactionRepository;
