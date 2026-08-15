/**

 * Family Wealth AI OS V7

 * Transaction Repository

 *

 * Responsibility:

 * - Persist Transaction data

 * - Load Transaction data

 * - Provide storage boundary for Transaction system

 *

 * TransactionRepository does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Cash Flow calculations

 * - Account balance calculations

 *

 * Architecture:

 *

 * TransactionService

 *        ↓

 * TransactionManager

 *        ↓

 * TransactionRepository

 *        ↓

 * DataService

 *

 * TransactionRepository is the persistence boundary.

 */

const DataService =

    require("../core/database/dataService");

const Transaction =

    require("./transaction");

const TRANSACTION_KEY =

    "family_transactions";

const TransactionRepository = {

    /**

     * Load all Transactions.

     *

     * Stored data is converted back into

     * Transaction objects.

     */

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

    /**

     * Get one Transaction by ID.

     */

    getTransaction(transactionId) {

        if (!transactionId) {

            return null;

        }

        return (

            this.getTransactions()

                .find(

                    transaction =>

                        transaction.id ===

                        transactionId

                ) || null

        );

    },

    /**

     * Save one Transaction.

     *

     * Existing Transaction:

     *   Update

     *

     * New Transaction:

     *   Insert

     */

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

    /**

     * Save multiple Transactions.

     */

    saveTransactions(

        transactions = []

    ) {

        if (!Array.isArray(transactions)) {

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

    /**

     * Delete one Transaction.

     *

     * Normally Actual Transactions should

     * be voided rather than deleted.

     *

     * This method exists only for controlled

     * data maintenance.

     */

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

    /**

     * Replace all stored Transactions.

     *

     * Used for:

     * - Import

     * - Migration

     * - Restore

     * - Controlled synchronization

     */

    replaceTransactions(

        transactions = []

    ) {

        return this.saveTransactions(

            transactions

        );

    },

    /**

     * Clear all Transaction data.

     *

     * Intended only for controlled

     * development / maintenance operations.

     */

    clearTransactions() {

        DataService.save(

            TRANSACTION_KEY,

            []

        );

        return true;

    }

};

module.exports =

    TransactionRepository;
