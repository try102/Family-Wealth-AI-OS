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

    // Generic Transaction

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

    // Income

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

    // Expense

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

    // Transfer

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

    // Investment Buy

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

    // Investment Sell

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

    // Loan Payment

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

    // Dividend

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

    // Interest

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

    // Tax Payment

    // =====================================================

    createTaxPayment(

        data = {}

    ) {

        return this.controller

            .createTaxPayment(

                data

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
