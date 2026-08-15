/**

 * Family Wealth AI OS V7

 * Transaction Facade

 *

 * Responsibility:

 * - Provide one stable system-level entry point

 *   for the Transaction subsystem.

 * - Hide internal Transaction architecture

 *   from higher-level modules.

 *

 * Architecture:

 *

 * Higher-Level Module

 *        ↓

 * TransactionFacade

 *        ↓

 * TransactionController

 *        ↓

 * TransactionService

 *        ↓

 * TransactionManager

 *        ↓

 * TransactionRepository

 *        ↓

 * DataService

 *

 * TransactionFacade does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Cash Flow calculations

 * - Account balance calculations

 */

const TransactionController =

    require("./transactionController");

class TransactionFacade {

    constructor(

        transactionService

    ) {

        if (!transactionService) {

            throw new Error(

                "TransactionService is required."

            );

        }

        this.controller =

            new TransactionController(

                transactionService

            );

    }

    // =====================================================

    // Create - Generic Transaction

    // =====================================================

    createTransaction(

        data = {}

    ) {

        return this.controller

            .createTransaction(

                data

            );

    }

    // =====================================================

    // Create - Income

    // =====================================================

    createIncome(

        data = {}

    ) {

        return this.controller

            .createIncome(

                data

            );

    }

    // =====================================================

    // Create - Expense

    // =====================================================

    createExpense(

        data = {}

    ) {

        return this.controller

            .createExpense(

                data

            );

    }

    // =====================================================

    // Create - Transfer

    // =====================================================

    createTransfer(

        data = {}

    ) {

        return this.controller

            .createTransfer(

                data

            );

    }

    // =====================================================

    // Create - Investment Buy

    // =====================================================

    createInvestmentBuy(

        data = {}

    ) {

        return this.controller

            .createInvestmentBuy(

                data

            );

    }

    // =====================================================

    // Create - Investment Sell

    // =====================================================

    createInvestmentSell(

        data = {}

    ) {

        return this.controller

            .createInvestmentSell(

                data

            );

    }

    // =====================================================

    // Create - Loan Payment

    // =====================================================

    createLoanPayment(

        data = {}

    ) {

        return this.controller

            .createLoanPayment(

                data

            );

    }

    // =====================================================

    // Create - Dividend

    // =====================================================

    createDividend(

        data = {}

    ) {

        return this.controller

            .createDividend(

                data

            );

    }

    // =====================================================

    // Create - Interest

    // =====================================================

    createInterest(

        data = {}

    ) {

        return this.controller

            .createInterest(

                data

            );

    }

    // =====================================================

    // Create - Tax Payment

    // =====================================================

    createTaxPayment(

        data = {}

    ) {

        return this.controller

            .createTaxPayment(

                data

            );

    }

    // =====================================================

    // Read - Single Transaction

    // =====================================================

    getTransaction(

        transactionId

    ) {

        return this.controller

            .getTransaction(

                transactionId

            );

    }

    // =====================================================

    // Read - All Transactions

    // =====================================================

    getAllTransactions() {

        return this.controller

            .getAllTransactions();

    }

    // =====================================================

    // Read - Posted Transactions

    // =====================================================

    getPostedTransactions() {

        return this.controller

            .getPostedTransactions();

    }

    // =====================================================

    // Read - Pending Transactions

    // =====================================================

    getPendingTransactions() {

        return this.controller

            .getPendingTransactions();

    }

    // =====================================================

    // Read - Voided Transactions

    // =====================================================

    getVoidedTransactions() {

        return this.controller

            .getVoidedTransactions();

    }

    // =====================================================

    // Query - Account

    // =====================================================

    getTransactionsByAccount(

        accountId

    ) {

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

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

        return this.controller

            .removeTransaction(

                transactionId

            );

    }

    // =====================================================

    // Serialization

    // =====================================================

    toJSON() {

        return this.controller

            .toJSON();

    }

    // =====================================================

    // Load / Restore

    // =====================================================

    loadTransactions(

        transactionData = []

    ) {

        return this.controller

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

        TransactionFacade;

}
