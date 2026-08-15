/**

 * Family Wealth AI OS V7

 * Transaction Controller

 *

 * Responsibility:

 * - Provide the application/API boundary for Transaction

 * - Receive requests from UI / API layer

 * - Delegate operations to TransactionService

 * - Keep Controller independent from persistence

 *

 * Controller does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Account balance calculations

 * - Cash Flow calculations

 *

 * Architecture:

 *

 * UI / API

 *    ↓

 * TransactionController

 *    ↓

 * TransactionService

 *    ↓

 * TransactionManager

 *    ↓

 * TransactionRepository

 *    ↓

 * DataService

 */

class TransactionController {

    constructor(

        transactionService

    ) {

        if (!transactionService) {

            throw new Error(

                "TransactionService is required."

            );

        }

        this.transactionService =

            transactionService;

        /*

         * TransactionManager is intentionally

         * accessed through the Service boundary.

         *

         * The Controller does not access

         * Repository or DataService directly.

         */

        this.transactionManager =

            transactionService.transactionManager;

    }

    // =====================================================

    // Generic Transaction

    // =====================================================

    createTransaction(

        data = {}

    ) {

        return this.transactionService

            .recordTransaction(

                data

            );

    }

    // =====================================================

    // Income

    // =====================================================

    createIncome(

        data = {}

    ) {

        return this.transactionService

            .recordIncome(

                data

            );

    }

    // =====================================================

    // Expense

    // =====================================================

    createExpense(

        data = {}

    ) {

        return this.transactionService

            .recordExpense(

                data

            );

    }

    // =====================================================

    // Transfer

    // =====================================================

    createTransfer(

        data = {}

    ) {

        return this.transactionService

            .recordTransfer(

                data

            );

    }

    // =====================================================

    // Investment Buy

    // =====================================================

    createInvestmentBuy(

        data = {}

    ) {

        return this.transactionService

            .recordInvestmentBuy(

                data

            );

    }

    // =====================================================

    // Investment Sell

    // =====================================================

    createInvestmentSell(

        data = {}

    ) {

        return this.transactionService

            .recordInvestmentSell(

                data

            );

    }

    // =====================================================

    // Loan Payment

    // =====================================================

    createLoanPayment(

        data = {}

    ) {

        return this.transactionService

            .recordLoanPayment(

                data

            );

    }

    // =====================================================

    // Dividend

    // =====================================================

    createDividend(

        data = {}

    ) {

        return this.transactionService

            .recordDividend(

                data

            );

    }

    // =====================================================

    // Interest

    // =====================================================

    createInterest(

        data = {}

    ) {

        return this.transactionService

            .recordInterest(

                data

            );

    }

    // =====================================================

    // Tax Payment

    // =====================================================

    createTaxPayment(

        data = {}

    ) {

        return this.transactionService

            .recordTaxPayment(

                data

            );

    }

    // =====================================================

    // Read - Single Transaction

    // =====================================================

    getTransaction(

        transactionId

    ) {

        return this.transactionManager

            .getTransaction(

                transactionId

            );

    }

    // =====================================================

    // Read - All Transactions

    // =====================================================

    getAllTransactions() {

        return this.transactionManager

            .getAllTransactions();

    }

    // =====================================================

    // Read - Posted

    // =====================================================

    getPostedTransactions() {

        return this.transactionManager

            .getPostedTransactions();

    }

    // =====================================================

    // Read - Pending

    // =====================================================

    getPendingTransactions() {

        return this.transactionManager

            .getPendingTransactions();

    }

    // =====================================================

    // Read - Voided

    // =====================================================

    getVoidedTransactions() {

        return this.transactionManager

            .getVoidedTransactions();

    }

    // =====================================================

    // Query - Account

    // =====================================================

    getTransactionsByAccount(

        accountId

    ) {

        return this.transactionManager

            .getTransactionsByAccount(

                accountId

            );

    }

    // =====================================================

    // Query - Posted Account Transactions

    // =====================================================

    getPostedTransactionsByAccount(

        accountId

    ) {

        return this.transactionManager

            .getPostedTransactionsByAccount(

                accountId

            );

    }

    // =====================================================

    // Query - Type

    // =====================================================

    getTransactionsByType(

        type

    ) {

        return this.transactionManager

            .getTransactionsByType(

                type

            );

    }

    // =====================================================

    // Query - Source

    // =====================================================

    getTransactionsBySource(

        source

    ) {

        return this.transactionManager

            .getTransactionsBySource(

                source

            );

    }

    // =====================================================

    // Query - External ID

    // =====================================================

    findByExternalId(

        externalId

    ) {

        return this.transactionManager

            .findByExternalId(

                externalId

            );

    }

    // =====================================================

    // Query - Date Range

    // =====================================================

    getTransactionsByDateRange(

        startDate,

        endDate

    ) {

        return this.transactionManager

            .getTransactionsByDateRange(

                startDate,

                endDate

            );

    }

    // =====================================================

    // Update

    // =====================================================

    updateTransaction(

        transactionId,

        updates = {}

    ) {

        return this.transactionManager

            .updateTransaction(

                transactionId,

                updates

            );

    }

    // =====================================================

    // Void

    // =====================================================

    voidTransaction(

        transactionId

    ) {

        return this.transactionManager

            .voidTransaction(

                transactionId

            );

    }

    // =====================================================

    // Post

    // =====================================================

    postTransaction(

        transactionId

    ) {

        return this.transactionManager

            .postTransaction(

                transactionId

            );

    }

    // =====================================================

    // Unpost

    // =====================================================

    unpostTransaction(

        transactionId

    ) {

        return this.transactionManager

            .unpostTransaction(

                transactionId

            );

    }

    // =====================================================

    // Controlled Maintenance

    // =====================================================

    removeTransaction(

        transactionId

    ) {

        return this.transactionManager

            .removeTransaction(

                transactionId

            );

    }

    // =====================================================

    // Serialization

    // =====================================================

    toJSON() {

        return this.transactionManager

            .toJSON();

    }

    // =====================================================

    // Load / Restore

    // =====================================================

    loadTransactions(

        transactionData = []

    ) {

        return this.transactionManager

            .loadTransactions(

                transactionData

            );

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

        TransactionController;

}
