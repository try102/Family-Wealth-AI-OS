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

 * - Persist Transaction data through Repository

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

 * Account relationship:

 *

 * Transaction

 *      ↓

 * Financial Line

 *      ↓

 * accountId

 *      ↓

 * Account

 */

const Transaction =

    require("./transaction");

const TransactionRepository =

    require("./transactionRepository");

class TransactionManager {

    constructor(initialTransactions = null) {

        this.transactions = new Map();

        /*

         * If initial transactions are explicitly supplied,

         * load them.

         *

         * Otherwise load persisted Transactions from

         * TransactionRepository.

         */

        const source =

            Array.isArray(initialTransactions)

                ? initialTransactions

                : TransactionRepository

                    .getTransactions();

        if (Array.isArray(source)) {

            source.forEach(

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

                    if (

                        this.transactions.has(

                            transaction.id

                        )

                    ) {

                        throw new Error(

                            `Duplicate Transaction ID "${transaction.id}".`

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

     * Persist the current Transaction registry.

     */

    persist() {

        return TransactionRepository

            .replaceTransactions(

                this.getAllTransactions()

            );

    }

    /**

     * Create a new Transaction.

     *

     * This method creates an Actual Transaction.

     *

     * Planning / forecast data should not be sent here.

     */

    createTransaction(

        data = {}

    ) {

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

        this.persist();

        return transaction;

    }

    /**

     * Get Transaction by ID.

     */

    getTransaction(

        transactionId

    ) {

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

        return this

            .getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Posted"

            );

    }

    /**

     * Get Pending Transactions.

     */

    getPendingTransactions() {

        return this

            .getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Pending"

            );

    }

    /**

     * Get Voided Transactions.

     */

    getVoidedTransactions() {

        return this

            .getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Voided"

            );

    }

    /**

     * Find Transactions by Account.

     *

     * A Transaction can contain multiple

     * Financial Lines and therefore can belong

     * to multiple Accounts.

     */

    getTransactionsByAccount(

        accountId

    ) {

        if (!accountId) {

            return [];

        }

        return this

            .getAllTransactions()

            .filter(

                transaction =>

                    transaction.lines.some(

                        line =>

                            line.accountId ===

                            accountId

                    )

            );

    }

    /**

     * Get Posted Transactions for an Account.

     */

    getPostedTransactionsByAccount(

        accountId

    ) {

        return this

            .getTransactionsByAccount(

                accountId

            )

            .filter(

                transaction =>

                    transaction.status ===

                    "Posted"

            );

    }

    /**

     * Find Transactions by type.

     */

    getTransactionsByType(

        type

    ) {

        if (!type) {

            return [];

        }

        return this

            .getAllTransactions()

            .filter(

                transaction =>

                    transaction.type ===

                    type

            );

    }

    /**

     * Find Transactions by source.

     */

    getTransactionsBySource(

        source

    ) {

        if (!source) {

            return [];

        }

        return this

            .getAllTransactions()

            .filter(

                transaction =>

                    transaction.source ===

                    source

            );

    }

    /**

     * Find Transactions by external ID.

     *

     * Primarily used for import / sync.

     */

    findByExternalId(

        externalId

    ) {

        if (!externalId) {

            return null;

        }

        return (

            this

                .getAllTransactions()

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

        if (

            !startDate ||

            !endDate

        ) {

            return [];

        }

        const start =

            new Date(

                startDate

            ).getTime();

        const end =

            new Date(

                endDate

            ).getTime();

        if (

            Number.isNaN(start) ||

            Number.isNaN(end)

        ) {

            return [];

        }

        return this

            .getAllTransactions()

            .filter(

                transaction => {

                    const transactionTime =

                        new Date(

                            transaction.date

                        ).getTime();

                    return (

                        transactionTime >=

                            start &&

                        transactionTime <=

                            end

                    );

                }

            );

    }

    /**

     * Update an existing Transaction.

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

            transaction.status ===

            "Voided"

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

        allowedFields.forEach(

            field => {

                if (

                    Object.prototype.hasOwnProperty.call(

                        updates,

                        field

                    )

                ) {

                    transaction[field] =

                        updates[field];

                }

            }

        );

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

                this

                    .getAllTransactions()

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

        this.transactions.set(

            transaction.id,

            transaction

        );

        this.persist();

        return transaction;

    }

    /**

     * Void a Transaction.

     *

     * Historical Actual records are retained.

     *

     * We do NOT delete the Transaction.

     */

    voidTransaction(

        transactionId

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

        if (

            transaction.status ===

            "Voided"

        ) {

            return transaction;

        }

        transaction.status =

            "Voided";

        transaction.updatedAt =

            new Date().toISOString();

        this.transactions.set(

            transaction.id,

            transaction

        );

        this.persist();

        return transaction;

    }

    /**

     * Mark a Pending Transaction as Posted.

     */

    postTransaction(

        transactionId

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

        if (

            transaction.status ===

            "Voided"

        ) {

            throw new Error(

                "Voided transactions cannot be posted."

            );

        }

        transaction.status =

            "Posted";

        transaction.updatedAt =

            new Date().toISOString();

        this.transactions.set(

            transaction.id,

            transaction

        );

        this.persist();

        return transaction;

    }

    /**

     * Mark a Posted Transaction as Pending.

     */

    unpostTransaction(

        transactionId

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

        if (

            transaction.status ===

            "Voided"

        ) {

            throw new Error(

                "Voided transactions cannot be unposted."

            );

        }

        transaction.status =

            "Pending";

        transaction.updatedAt =

            new Date().toISOString();

        this.transactions.set(

            transaction.id,

            transaction

        );

        this.persist();

        return transaction;

    }

    /**

     * Remove a Transaction from the registry.

     *

     * This is not the normal way to correct

     * an Actual Transaction.

     *

     * Normal correction should use voidTransaction().

     */

    removeTransaction(

        transactionId

    ) {

        if (

            !this.transactions.has(

                transactionId

            )

        ) {

            return false;

        }

        const removed =

            this.transactions.delete(

                transactionId

            );

        if (removed) {

            this.persist();

        }

        return removed;

    }

    /**

     * Convert all Transactions to plain objects.

     */

    toJSON() {

        return this

            .getAllTransactions()

            .map(

                transaction =>

                    transaction.toJSON()

            );

    }

    /**

     * Replace Manager contents from serialized data.

     *

     * Used by:

     * - Import

     * - Migration

     * - Restore

     * - Controlled synchronization

     */

    loadTransactions(

        transactionData = []

    ) {

        if (

            !Array.isArray(

                transactionData

            )

        ) {

            throw new Error(

                "Transaction data must be an array."

            );

        }

        const newTransactions =

            new Map();

        transactionData.forEach(

            data => {

                const transaction =

                    data instanceof Transaction

                        ? data

                        : new Transaction(

                            data

                        );

                transaction.normalize();

                const validation =

                    transaction.validate();

                if (!validation.valid) {

                    throw new Error(

                        validation.errors.join(" ")

                    );

                }

                if (

                    newTransactions.has(

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

                        Array.from(

                            newTransactions.values()

                        ).find(

                            item =>

                                item.externalId ===

                                transaction.externalId

                        );

                    if (existing) {

                        throw new Error(

                            `Duplicate external Transaction ID "${transaction.externalId}".`

                        );

                    }

                }

                newTransactions.set(

                    transaction.id,

                    transaction

                );

            }

        );

        /*

         * Only replace the current registry

         * after the entire input has been

         * successfully validated.

         */

        this.transactions =

            newTransactions;

        this.persist();

        return this.getAllTransactions();

    }

    /**

     * Reload Transactions from persistent storage.

     *

     * Useful after external import/sync.

     */

    reload() {

        const transactions =

            TransactionRepository

                .getTransactions();

        this.transactions =

            new Map();

        transactions.forEach(

            transaction => {

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

        return this.getAllTransactions();

    }

}

/*

 * CommonJS export.

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports =

        TransactionManager;

}
