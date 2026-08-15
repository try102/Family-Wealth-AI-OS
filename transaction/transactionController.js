/**

 * Family Wealth AI OS V7

 * Transaction Controller

 *

 * Responsibility:

 * - Provide the application/API boundary for Transaction

 * - Receive requests from UI / API layer

 * - Delegate business operations to TransactionService

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

    constructor(transactionService) {

        if (!transactionService) {

            throw new Error(

                "TransactionService is required."

            );

        }

        this.transactionService =

            transactionService;

    }

    // =====================================================

    // Generic Transaction

    // =====================================================

    createTransaction(data = {}) {

        return this.transactionService

            .recordTransaction(data);

    }

    // =====================================================

    // Income

    // =====================================================

    createIncome(data = {}) {

        return this.transactionService

            .recordIncome(data);

    }

    // =====================================================

    // Expense

    // =====================================================

    createExpense(data = {}) {

        return this.transactionService

            .recordExpense(data);

    }

    // =====================================================

    // Transfer

    // =====================================================

    createTransfer(data = {}) {

        return this.transactionService

            .recordTransfer(data);

    }

    // =====================================================

    // Investment Buy

    // =====================================================

    createInvestmentBuy(data = {}) {

        return this.transactionService

            .recordInvestmentBuy(data);

    }

    // =====================================================

    // Investment Sell

    // =====================================================

    createInvestmentSell(data = {}) {

        return this.transactionService

            .recordInvestmentSell(data);

    }

    // =====================================================

    // Loan Payment

    // =====================================================

    createLoanPayment(data = {}) {

        return this.transactionService

            .recordLoanPayment(data);

    }

    // =====================================================

    // Dividend

    // =====================================================

    createDividend(data = {}) {

        return this.transactionService

            .recordDividend(data);

    }

    // =====================================================

    // Interest

    // =====================================================

    createInterest(data = {}) {

        return this.transactionService

            .recordInterest(data);

    }

    // =====================================================

    // Tax Payment

    // =====================================================

    createTaxPayment(data = {}) {

        return this.transactionService

            .recordTaxPayment(data);

    }

}

/*

 * CommonJS export.

 *

 * Keeps the Transaction root system

 * consistent with:

 *

 * - transaction.js

 * - transactionManager.js

 * - transactionService.js

 * - transactionRepository.js

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports =

        TransactionController;

}
