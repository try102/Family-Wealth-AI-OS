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

class TransactionIntegrationService {

    constructor(

        transactionFacade = null

    ) {

        this.facade =

            transactionFacade;

        this.initialized =

            false;

    }

    // =====================================================

    //

    // Initialize

    //

    // =====================================================

    initialize() {

        this.initialized =

            true;

        return {

            module:

                "Transaction Integration",

            version:

                "V7",

            initialized:

                true

        };

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

    // Read - Single Transaction

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

    // =====================================================

    //

    // Read - All Transactions

    //

    // =====================================================

    getAllTransactions() {

        return this

            .requireFacade()

            .getAllTransactions();

    }

    // =====================================================

    //

    // Read - Posted Transactions

    //

    // =====================================================

    getPostedTransactions() {

        return this

            .requireFacade()

            .getPostedTransactions();

    }

    // =====================================================

    //

    // Read - Pending Transactions

    //

    // =====================================================

    getPendingTransactions() {

        return this

            .requireFacade()

            .getPendingTransactions();

    }

    // =====================================================

    //

    // Read - Voided Transactions

    //

    // =====================================================

    getVoidedTransactions() {

        return this

            .requireFacade()

            .getVoidedTransactions();

    }

    // =====================================================

    //

    // Query - Account

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

    // =====================================================

    //

    // Query - Posted Account Transactions

    //

    // =====================================================

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

    // Query - Type

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

    // Query - Source

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

    // Query - External ID

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

    // Query - Date Range

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

 * Shared Transaction Integration Instance

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
