/**

 * Family Wealth AI OS V7

 * Transaction Manager

 *

 * Responsibility:

 * - Create Transactions

 * - Read Transactions

 * - Update Transactions

 * - Void Transactions

 * - Query Transactions

 * - Validate Transaction data

 * - Maintain the system Transaction registry

 *

 * TransactionManager does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Loan calculations

 * - Cash Flow calculations

 * - Account balance calculations

 *

 * Account relationship:

 *

 * Transaction

 *      ↓

 * Financial Line

 *      ↓

 * accountId

 *      ↓

 * Account

 *

 * IMPORTANT:

 *

 * Transaction is the system Actual-event registry.

 *

 * Business modules may create Transactions when

 * an actual business event occurs.

 *

 * Planning / forecasting / simulation data must

 * NOT automatically become Transactions.

 */

const Transaction = require("./transaction");

class TransactionManager {

    constructor(initialTransactions = []) {

        this.transactions = new Map();

        if (Array.isArray(initialTransactions)) {

            initialTransactions.forEach(

                transactionData => {

                    const transaction =

                        transactionData instanceof Transaction

                            ? transactionData

                            : new Transaction(

                                transactionData

                            );

                    transaction.normalize();

                    const validation =

                        transaction.validate();

                    if (!validation.valid) {

                        throw new Error(

                            validation.errors.join(" ")

                        );

                    }

                    this.transactions.set(

                        transaction.id,

                        transaction

                    );

                }

            );

        }

    }

    /**

     * Create a new Transaction.

     *

     * This method creates an Actual Transaction.

     *

     * Planning / forecast data should not be sent here.

     */

    createTransaction(data = {}) {

        const transaction =

            data instanceof Transaction

                ? data

                : new Transaction(data);

        transaction.normalize();

        const validation =

            transaction.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        if (

            this.transactions.has(

                transaction.id

            )

        ) {

            throw new Error(

                `Transaction with ID "${transaction.id}" already exists.`

            );

        }

        /*

         * Prevent duplicate imported transactions

         * when an external ID is available.

         */

        if (transaction.externalId) {

            const existing =

                this.findByExternalId(

                    transaction.externalId

                );

            if (existing) {

                throw new Error(

                    `Transaction with external ID "${transaction.externalId}" already exists.`

                );

            }

        }

        this.transactions.set(

            transaction.id,

            transaction

        );

        return transaction;

    }

    /**

     * Get Transaction by ID.

     */

    getTransaction(transactionId) {

        if (!transactionId) {

            return null;

        }

        return (

            this.transactions.get(

                transactionId

            ) || null

        );

    }

    /**

     * Get all Transactions.

     */

    getAllTransactions() {

        return Array.from(

            this.transactions.values()

        );

    }

    /**

     * Get only Posted Transactions.

     */

    getPostedTransactions() {

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status === "Posted"

            );

    }

    /**

     * Get Pending Transactions.

     */

    getPendingTransactions() {

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status === "Pending"

            );

    }

    /**

     * Get Voided Transactions.

     */

    getVoidedTransactions() {

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status === "Voided"

            );

    }

    /**

     * Find Transactions by Account.

     *

     * A Transaction can contain multiple

     * Financial Lines and therefore can belong

     * to multiple Accounts.

     */

    getTransactionsByAccount(accountId) {

        if (!accountId) {

            return [];

        }

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.lines.some(

                        line =>

                            line.accountId === accountId

                    )

            );

    }

    /**

     * Get Posted Transactions for an Account.

     */

    getPostedTransactionsByAccount(

        accountId

    ) {

        return this.getTransactionsByAccount(

            accountId

        ).filter(

            transaction =>

                transaction.status === "Posted"

        );

    }

    /**

     * Find Transactions by type.

     */

    getTransactionsByType(type) {

        if (!type) {

            return [];

        }

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.type === type

            );

    }

    /**

     * Find Transactions by source.

     */

    getTransactionsBySource(source) {

        if (!source) {

            return [];

        }

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.source === source

            );

    }

    /**

     * Find Transactions by external ID.

     *

     * Primarily used for import / sync.

     */

    findByExternalId(externalId) {

        if (!externalId) {

            return null;

        }

        return (

            this.getAllTransactions()

                .find(

                    transaction =>

                        transaction.externalId ===

                        externalId

                ) || null

        );

    }

    /**

     * Find Transactions by date range.

     *

     * Inclusive date range.

     */

    getTransactionsByDateRange(

        startDate,

        endDate

    ) {

        if (!startDate || !endDate) {

            return [];

        }

        const start =

            new Date(startDate).getTime();

        const end =

            new Date(endDate).getTime();

        if (

            Number.isNaN(start) ||

            Number.isNaN(end)

        ) {

            return [];

        }

        return this.getAllTransactions()

            .filter(transaction => {

                const transactionTime =

                    new Date(

                        transaction.date

                    ).getTime();

                return (

                    transactionTime >= start &&

                    transactionTime <= end

                );

            });

    }

    /**

     * Update an existing Transaction.

     *

     * System identity and audit fields cannot

     * be replaced through normal updates.

     */

    updateTransaction(

        transactionId,

        updates = {}

    ) {

        const transaction =

            this.getTransaction(

                transactionId

            );

        if (!transaction) {

            throw new Error(

                `Transaction "${transactionId}" not found.`

            );

        }

        /*

         * Voided Transactions should not normally

         * be edited.

         */

        if (

            transaction.status === "Voided"

        ) {

            throw new Error(

                "Voided transactions cannot be updated."

            );

        }

        const allowedFields = [

            "date",

            "type",

            "status",

            "currency",

            "description",

            "source",

            "externalId",

            "lines",

            "businessDetails"

        ];

        allowedFields.forEach(field => {

            if (

                Object.prototype.hasOwnProperty.call(

                    updates,

                    field

                )

            ) {

                transaction[field] =

                    updates[field];

            }

        });

        transaction.normalize();

        const validation =

            transaction.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        /*

         * Prevent an external ID from being changed

         * to an ID already used by another Transaction.

         */

        if (transaction.externalId) {

            const duplicate =

                this.getAllTransactions()

                    .find(

                        item =>

                            item.id !==

                                transaction.id &&

                            item.externalId ===

                                transaction.externalId

                    );

            if (duplicate) {

                throw new Error(

                    `Transaction with external ID "${transaction.externalId}" already exists.`

                );

            }

        }

        return transaction;

    }

    /**

     * Void a Transaction.

     *

     * Historical Actual records are retained.

     *

     * We do NOT delete the Transaction.

     */

    voidTransaction(transactionId) {

        const transaction =

            this.getTransaction(

                transactionId

            );

        if (!transaction) {

            throw new Error(

                `Transaction "${transactionId}" not found.`

            );

        }

        if (

            transaction.status === "Voided"

        ) {

            return transaction;

        }

        transaction.status =

            "Voided";

        transaction.updatedAt =

            new Date().toISOString();

        return transaction;

    }

    /**

     * Mark a Pending Transaction as Posted.

     */

    postTransaction(transactionId) {

        const transaction =

            this.getTransaction(

                transactionId

            );

        if (!transaction) {

            throw new Error(

                `Transaction "${transactionId}" not found.`

            );

        }

        if (

            transaction.status === "Voided"

        ) {

            throw new Error(

                "Voided transactions cannot be posted."

            );

        }

        transaction.status =

            "Posted";

        transaction.updatedAt =

            new Date().toISOString();

        return transaction;

    }

    /**

     * Mark a Posted Transaction as Pending.

     *

     * This is intentionally restricted.

     *

     * It is mainly useful for controlled workflows.

     */

    unpostTransaction(transactionId) {

        const transaction =

            this.getTransaction(

                transactionId

            );

        if (!transaction) {

            throw new Error(

                `Transaction "${transactionId}" not found.`

            );

        }

        if (

            transaction.status === "Voided"

        ) {

            throw new Error(

                "Voided transactions cannot be unposted."

            );

        }

        transaction.status =

            "Pending";

        transaction.updatedAt =

            new Date().toISOString();

        return transaction;

    }

    /**

     * Remove a Transaction from the registry.

     *

     * IMPORTANT:

     *

     * This is not the normal way to correct

     * an Actual Transaction.

     *

     * Normal correction should use voidTransaction().

     *

     * Permanent removal should only be used for

     * controlled data maintenance.

     */

    removeTransaction(transactionId) {

        if (

            !this.transactions.has(

                transactionId

            )

        ) {

            return false;

        }

        return this.transactions.delete(

            transactionId

        );

    }

    /**

     * Convert all Transactions to plain objects.

     */

    toJSON() {

        return this.getAllTransactions()

            .map(

                transaction =>

                    transaction.toJSON()

            );

    }

    /**

     * Replace Manager contents from serialized data.

     *

     * This creates a clean boundary for future:

     * - Manual Input

     * - Bank Import

     * - Brokerage Import

     * - External Sync

     * - Migration

     */

    loadTransactions(

        transactionData = []

    ) {

        if (

            !Array.isArray(transactionData)

        ) {

            throw new Error(

                "Transaction data must be an array."

            );

        }

        this.transactions.clear();

        transactionData.forEach(

            data => {

                const transaction =

                    data instanceof Transaction

                        ? data

                        : new Transaction(data);

                transaction.normalize();

                const validation =

                    transaction.validate();

                if (!validation.valid) {

                    throw new Error(

                        validation.errors.join(" ")

                    );

                }

                if (

                    this.transactions.has(

                        transaction.id

                    )

                ) {

                    throw new Error(

                        `Duplicate Transaction ID "${transaction.id}".`

                    );

                }

                if (

                    transaction.externalId

                ) {

                    const existing =

                        this.findByExternalId(

                            transaction.externalId

                        );

                    if (existing) {

                        throw new Error(

                            `Duplicate external Transaction ID "${transaction.externalId}".`

                        );

                    }

                }

                this.transactions.set(

                    transaction.id,

                    transaction

                );

            }

        );

        return this.getAllTransactions();

    }

}

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports =

        TransactionManager;

}
