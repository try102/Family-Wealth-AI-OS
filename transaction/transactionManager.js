/**

 * Family Wealth AI OS V7

 * Transaction Manager

 *

 * Responsibility:

 * - Manage Transaction lifecycle

 * - Create / Read / Update / Void Transactions

 * - Query Transactions

 * - Validate Transaction data

 * - Coordinate TransactionRepository persistence

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

        initialTransactions = null

    ) {

        /*

         * TransactionRepository is the

         * persistent source of Transaction data.

         */

        this.repository =

            TransactionRepository;

        /*

         * Load existing persisted Transactions

         * unless explicit initial data is supplied.

         */

        if (

            Array.isArray(

                initialTransactions

            )

        ) {

            this.loadTransactions(

                initialTransactions

            );

        } else {

            this.transactions =

                new Map();

            this.getAllTransactions();

        }

    }

    // =====================================================

    // Internal Registry Synchronization

    // =====================================================

    syncFromRepository() {

        const transactions =

            this.repository

                .getTransactions();

        this.transactions =

            new Map();

        transactions.forEach(

            transaction => {

                this.transactions.set(

                    transaction.id,

                    transaction

                );

            }

        );

        return this.transactions;

    }

    persistTransaction(

        transaction

    ) {

        const saved =

            this.repository

                .saveTransaction(

                    transaction

                );

        this.transactions.set(

            saved.id,

            saved

        );

        return saved;

    }

    // =====================================================

    // Create

    // =====================================================

    createTransaction(

        data = {}

    ) {

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

        /*

         * Refresh from persistent storage

         * before duplicate checking.

         */

        this.syncFromRepository();

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

        return this.persistTransaction(

            transaction

        );

    }

    // =====================================================

    // Read

    // =====================================================

    getTransaction(

        transactionId

    ) {

        if (!transactionId) {

            return null;

        }

        return this.repository

            .getTransaction(

                transactionId

            );

    }

    getAllTransactions() {

        this.syncFromRepository();

        return Array.from(

            this.transactions.values()

        );

    }

    // =====================================================

    // Status Queries

    // =====================================================

    getPostedTransactions() {

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Posted"

            );

    }

    getPendingTransactions() {

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Pending"

            );

    }

    getVoidedTransactions() {

        return this.getAllTransactions()

            .filter(

                transaction =>

                    transaction.status ===

                    "Voided"

            );

    }

    // =====================================================

    // Account Queries

    // =====================================================

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

    // =====================================================

    // Type Query

    // =====================================================

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

    // =====================================================

    // Source Query

    // =====================================================

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

    // =====================================================

    // External ID Query

    // =====================================================

    findByExternalId(

        externalId

    ) {

        if (!externalId) {

            return null;

        }

        return this.getAllTransactions()

            .find(

                transaction =>

                    transaction.externalId ===

                    externalId

            ) || null;

    }

    // =====================================================

    // Date Range Query

    // =====================================================

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

                        transactionTime >=

                            start &&

                        transactionTime <=

                            end

                    );

                }

            );

    }

    // =====================================================

    // Update

    // =====================================================

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

         * Voided Transactions are historical

         * records and cannot normally be edited.

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

                    Object.prototype

                        .hasOwnProperty

                        .call(

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

        return this.persistTransaction(

            transaction

        );

    }

    // =====================================================

    // Void

    // =====================================================

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

            new Date()

                .toISOString();

        return this.persistTransaction(

            transaction

        );

    }

    // =====================================================

    // Post

    // =====================================================

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

            new Date()

                .toISOString();

        return this.persistTransaction(

            transaction

        );

    }

    // =====================================================

    // Unpost

    // =====================================================

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

            new Date()

                .toISOString();

        return this.persistTransaction(

            transaction

        );

    }

    // =====================================================

    // Controlled Removal

    // =====================================================

    removeTransaction(

        transactionId

    ) {

        if (!transactionId) {

            return false;

        }

        const removed =

            this.repository

                .deleteTransaction(

                    transactionId

                );

        if (removed) {

            this.transactions.delete(

                transactionId

            );

        }

        return removed;

    }

    // =====================================================

    // Serialization

    // =====================================================

    toJSON() {

        return this.getAllTransactions()

            .map(

                transaction =>

                    transaction.toJSON()

            );

    }

    // =====================================================

    // Load / Restore

    // =====================================================

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

        const normalizedTransactions =

            [];

        const ids =

            new Set();

        const externalIds =

            new Set();

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

                    ids.has(

                        transaction.id

                    )

                ) {

                    throw new Error(

                        `Duplicate Transaction ID "${transaction.id}".`

                    );

                }

                ids.add(

                    transaction.id

                );

                if (

                    transaction.externalId

                ) {

                    if (

                        externalIds.has(

                            transaction.externalId

                        )

                    ) {

                        throw new Error(

                            `Duplicate external Transaction ID "${transaction.externalId}".`

                        );

                    }

                    externalIds.add(

                        transaction.externalId

                    );

                }

                normalizedTransactions.push(

                    transaction

                );

            }

        );

        /*

         * Replace persistent storage only after

         * the entire input has passed validation.

         */

        const saved =

            this.repository

                .replaceTransactions(

                    normalizedTransactions

                );

        this.transactions =

            new Map();

        saved.forEach(

            transaction => {

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
