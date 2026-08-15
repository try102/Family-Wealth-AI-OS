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

 * - Maintain Transaction registry

 * - Persist Transaction data through Repository

 *

 * Architecture:

 *

 * Business Module

 *        ↓

 * TransactionService

 *        ↓

 * TransactionManager

 *        ↓

 * TransactionRepository

 *        ↓

 * DataService

 *

 * TransactionManager does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Loan calculations

 * - Cash Flow calculations

 * - Account balance calculations

 */

const Transaction =

    require("./transaction");

const TransactionRepository =

    require("./transactionRepository");

class TransactionManager {

    constructor(

        initialTransactions = []

    ) {

        this.transactions = new Map();

        /*

         * Load persisted Transactions first.

         *

         * This allows the Manager to restore

         * the existing Actual Transaction registry.

         */

        const storedTransactions =

            TransactionRepository

                .getTransactions();

        if (

            Array.isArray(

                storedTransactions

            ) &&

            storedTransactions.length > 0

        ) {

            storedTransactions.forEach(

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

        /*

         * Optional initial Transactions.

         *

         * These are loaded after persisted data.

         */

        if (

            Array.isArray(

                initialTransactions

            )

        ) {

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

     * Persist the current Transaction registry.

     */

    persist() {

        TransactionRepository

            .saveTransactions(

                this.getAllTransactions()

            );

        return true;

    }

    /**

     * Create a new Actual Transaction.

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

         * Prevent duplicate imported

         * transactions.

         */

        if (

            transaction.externalId

        ) {

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

        /*

         * Persist immediately.

         */

        TransactionRepository

            .saveTransaction(

                transaction

            );

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

     * Get Posted Transactions.

     */

    getPostedTransactions() {

        return this.getAllTransactions()

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

        return this.getAllTransactions()

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

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Voided"

            );

    }

    /**

     * Find Transactions by Account.

     *

     * A Transaction may contain

     * multiple Financial Lines.

     */

    getTransactionsByAccount(

        accountId

    ) {

        if (!accountId) {

            return [];

        }

        return this.getAllTransactions()

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

     * Get Posted Transactions for Account.

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

     * Find Transactions by Type.

     */

    getTransactionsByType(

        type

    ) {

        if (!type) {

            return [];

        }

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.type ===

                    type

            );

    }

    /**

     * Find Transactions by Source.

     */

    getTransactionsBySource(

        source

    ) {

        if (!source) {

            return [];

        }

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.source ===

                    source

            );

    }

    /**

     * Find Transaction by external ID.

     */

    findByExternalId(

        externalId

    ) {

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

        return this.getAllTransactions()

            .filter(

                transaction => {

                    const transactionTime =

                        new Date(

                            transaction.date

                        ).getTime();

                    return (

                        transactionTime >= start &&

                        transactionTime <= end

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

         * Voided Transactions cannot

         * normally be edited.

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

         * Prevent duplicate external IDs.

         */

        if (

            transaction.externalId

        ) {

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

        /*

         * Persist updated Transaction.

         */

        TransactionRepository

            .saveTransaction(

                transaction

            );

        return transaction;

    }

    /**

     * Void a Transaction.

     *

     * Historical Actual record remains.

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

        TransactionRepository

            .saveTransaction(

                transaction

            );

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

        TransactionRepository

            .saveTransaction(

                transaction

            );

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

        TransactionRepository

            .saveTransaction(

                transaction

            );

        return transaction;

    }

    /**

     * Remove a Transaction.

     *

     * Controlled maintenance only.

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

            TransactionRepository

                .deleteTransaction(

                    transactionId

                );

        }

        return removed;

    }

    /**

     * Convert all Transactions to

     * plain objects.

     */

    toJSON() {

        return this.getAllTransactions()

            .map(

                transaction =>

                    transaction.toJSON()

            );

    }

    /**

     * Replace Manager contents from

     * serialized Transaction data.

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

        /*

         * Validate everything before

         * replacing the current registry.

         */

        const newTransactions =

            new Map();

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

                    const duplicate =

                        Array.from(

                            newTransactions.values()

                        ).find(

                            item =>

                                item.externalId ===

                                transaction.externalId

                        );

                    if (duplicate) {

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

         * Replace in-memory registry.

         */

        this.transactions =

            newTransactions;

        /*

         * Persist replacement.

         */

        TransactionRepository

            .saveTransactions(

                this.getAllTransactions()

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
