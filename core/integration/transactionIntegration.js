/*

 *

 * Family Wealth AI OS V7

 *

 * Transaction Integration

 *

 * System-level integration boundary

 *

 * Responsibility:

 *

 * - Provide a stable integration boundary

 * - Connect business modules with Transaction

 * - Avoid direct dependency on Transaction internals

 *

 */

/*

 *

 * Transaction Integration Service

 *

 */

class TransactionIntegrationService {

    constructor(

        transactionFacade = null

    ) {

        this.facade =

            transactionFacade;

    }

    // =====================================================

    //

    // Configure Transaction Facade

    //

    // =====================================================

    setFacade(

        transactionFacade

    ) {

        if (!transactionFacade) {

            throw new Error(

                "TransactionFacade is required."

            );

        }

        this.facade =

            transactionFacade;

        return this.facade;

    }

    // =====================================================

    //

    // Internal Guard

    //

    // =====================================================

    requireFacade() {

        if (!this.facade) {

            throw new Error(

                "TransactionIntegration is not connected to TransactionFacade."

            );

        }

        return this.facade;

    }

    // =====================================================

    //

    // Generic Transaction

    //

    // =====================================================

    createTransaction(

        data = {}

    ) {

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

            .createTaxPayment(

                data

            );

    }

    // =====================================================

    //

    // Read

    //

    // =====================================================

    getTransaction(

        transactionId

    ) {

        return this

            .requireFacade()

            .getTransaction(

                transactionId

            );

    }

    getAllTransactions() {

        return this

            .requireFacade()

            .getAllTransactions();

    }

    getPostedTransactions() {

        return this

            .requireFacade()

            .getPostedTransactions();

    }

    getPendingTransactions() {

        return this

            .requireFacade()

            .getPendingTransactions();

    }

    getVoidedTransactions() {

        return this

            .requireFacade()

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

        return this

            .requireFacade()

            .getTransactionsByAccount(

                accountId

            );

    }

    getPostedTransactionsByAccount(

        accountId

    ) {

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

            .updateTransaction(

                transactionId,

                updates

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

        return this

            .requireFacade()

            .voidTransaction(

                transactionId

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

            .unpostTransaction(

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

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

        return this

            .requireFacade()

            .toJSON();

    }

}

/*

 *

 * Shared Integration Instance

 *

 */

const transactionIntegration =

    new TransactionIntegrationService();

/*

 *

 * ES Module Export

 *

 */

export default

    transactionIntegration;
