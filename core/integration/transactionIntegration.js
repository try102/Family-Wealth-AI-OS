/*

 *

 * Family Wealth AI OS V7

 *

 * Transaction Integration

 *

 * System-level integration layer

 *

 * Responsibility:

 *

 * - Connect business modules to Transaction system

 * - Convert business events into Actual Transactions

 * - Provide a stable integration boundary

 *

 * This file belongs to:

 *

 * core/integration/

 *

 * It does NOT belong to:

 *

 * modules/income/

 * modules/cashflow/

 * modules/investment/

 *

 *

 * Architecture:

 *

 * Business Module

 *       ↓

 * TransactionIntegration

 *       ↓

 * TransactionFacade

 *       ↓

 * TransactionController

 *       ↓

 * TransactionService

 *       ↓

 * TransactionManager

 *       ↓

 * TransactionRepository

 *

 *

 * Transaction remains the

 * system-level Actual Event record.

 *

 */

/*

 *

 * Transaction Module

 *

 */

import TransactionModule

    from "../../transaction/transactionModule.js";

class TransactionIntegration {

    constructor() {

        /*

         *

         * Create one Transaction system

         * entry point.

         *

         */

        this.transactionModule =

            new TransactionModule();

        this.facade =

            this.transactionModule

                .getFacade();

    }

    // =====================================================

    //

    // Generic Transaction

    //

    // =====================================================

    createTransaction(

        data = {}

    ) {

        return this.facade

            .createTransaction(

                data

            );

    }

    // =====================================================

    //

    // Income

    //

    // =====================================================

    recordIncome(

        data = {}

    ) {

        return this.facade

            .createIncome(

                data

            );

    }

    // =====================================================

    //

    // Expense

    //

    // =====================================================

    recordExpense(

        data = {}

    ) {

        return this.facade

            .createExpense(

                data

            );

    }

    // =====================================================

    //

    // Transfer

    //

    // =====================================================

    recordTransfer(

        data = {}

    ) {

        return this.facade

            .createTransfer(

                data

            );

    }

    // =====================================================

    //

    // Investment Buy

    //

    // =====================================================

    recordInvestmentBuy(

        data = {}

    ) {

        return this.facade

            .createInvestmentBuy(

                data

            );

    }

    // =====================================================

    //

    // Investment Sell

    //

    // =====================================================

    recordInvestmentSell(

        data = {}

    ) {

        return this.facade

            .createInvestmentSell(

                data

            );

    }

    // =====================================================

    //

    // Loan Payment

    //

    // =====================================================

    recordLoanPayment(

        data = {}

    ) {

        return this.facade

            .createLoanPayment(

                data

            );

    }

    // =====================================================

    //

    // Dividend

    //

    // =====================================================

    recordDividend(

        data = {}

    ) {

        return this.facade

            .createDividend(

                data

            );

    }

    // =====================================================

    //

    // Interest

    //

    // =====================================================

    recordInterest(

        data = {}

    ) {

        return this.facade

            .createInterest(

                data

            );

    }

    // =====================================================

    //

    // Tax Payment

    //

    // =====================================================

    recordTaxPayment(

        data = {}

    ) {

        return this.facade

            .createTaxPayment(

                data

            );

    }

    // =====================================================

    //

    // Read Transactions

    //

    // =====================================================

    getTransaction(

        transactionId

    ) {

        return this.facade

            .getTransaction(

                transactionId

            );

    }

    getAllTransactions() {

        return this.facade

            .getAllTransactions();

    }

    getPostedTransactions() {

        return this.facade

            .getPostedTransactions();

    }

    getPendingTransactions() {

        return this.facade

            .getPendingTransactions();

    }

    getVoidedTransactions() {

        return this.facade

            .getVoidedTransactions();

    }

    // =====================================================

    //

    // Account Queries

    //

    // =====================================================

    getTransactionsByAccount(

        accountId

    ) {

        return this.facade

            .getTransactionsByAccount(

                accountId

            );

    }

    getPostedTransactionsByAccount(

        accountId

    ) {

        return this.facade

            .getPostedTransactionsByAccount(

                accountId

            );

    }

    // =====================================================

    //

    // Type Query

    //

    // =====================================================

    getTransactionsByType(

        type

    ) {

        return this.facade

            .getTransactionsByType(

                type

            );

    }

    // =====================================================

    //

    // Source Query

    //

    // =====================================================

    getTransactionsBySource(

        source

    ) {

        return this.facade

            .getTransactionsBySource(

                source

            );

    }

    // =====================================================

    //

    // External ID

    //

    // =====================================================

    findByExternalId(

        externalId

    ) {

        return this.facade

            .findByExternalId(

                externalId

            );

    }

    // =====================================================

    //

    // Date Range

    //

    // =====================================================

    getTransactionsByDateRange(

        startDate,

        endDate

    ) {

        return this.facade

            .getTransactionsByDateRange(

                startDate,

                endDate

            );

    }

    // =====================================================

    //

    // Update

    //

    // =====================================================

    updateTransaction(

        transactionId,

        updates = {}

    ) {

        return this.facade

            .updateTransaction(

                transactionId,

                updates

            );

    }

    // =====================================================

    //

    // Post

    //

    // =====================================================

    postTransaction(

        transactionId

    ) {

        return this.facade

            .postTransaction(

                transactionId

            );

    }

    // =====================================================

    //

    // Unpost

    //

    // =====================================================

    unpostTransaction(

        transactionId

    ) {

        return this.facade

            .unpostTransaction(

                transactionId

            );

    }

    // =====================================================

    //

    // Void

    //

    // =====================================================

    voidTransaction(

        transactionId

    ) {

        return this.facade

            .voidTransaction(

                transactionId

            );

    }

    // =====================================================

    //

    // Controlled Removal

    //

    // =====================================================

    removeTransaction(

        transactionId

    ) {

        return this.facade

            .removeTransaction(

                transactionId

            );

    }

    // =====================================================

    //

    // Load / Restore

    //

    // =====================================================

    loadTransactions(

        transactionData = []

    ) {

        return this.facade

            .loadTransactions(

                transactionData

            );

    }

    // =====================================================

    //

    // Serialization

    //

    // =====================================================

    toJSON() {

        return this.facade

            .toJSON();

    }

    // =====================================================

    //

    // Status

    //

    // =====================================================

    getStatus() {

        return this.transactionModule

            .getStatus();

    }

}

/*

 *

 * Singleton Integration Instance

 *

 * Higher-level modules can use:

 *

 * TransactionIntegration.recordIncome(...)

 *

 */

const transactionIntegration =

    new TransactionIntegration();

/*

 *

 * ES Module Export

 *

 */

export default

    transactionIntegration;
