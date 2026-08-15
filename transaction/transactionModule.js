/**

 * Family Wealth AI OS V7

 * Transaction Module

 *

 * Responsibility:

 * - Assemble the Transaction subsystem

 * - Create and expose the Transaction system entry point

 * - Keep dependency construction in one place

 *

 * Architecture:

 *

 * TransactionModule

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

 * TransactionModule does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Loan calculations

 * - Cash Flow calculations

 * - Account balance calculations

 */

const TransactionRepository =

    require("./transactionRepository");

const TransactionManager =

    require("./transactionManager");

const TransactionService =

    require("./transactionService");

const TransactionController =

    require("./transactionController");

const TransactionFacade =

    require("./transactionFacade");

class TransactionModule {

    constructor() {

        /*

         * Persistence layer

         */

        this.repository =

            TransactionRepository;

        /*

         * Transaction management layer

         */

        this.manager =

            new TransactionManager();

        /*

         * Business-facing service layer

         */

        this.service =

            new TransactionService(

                this.manager

            );

        /*

         * Application/API boundary

         */

        this.controller =

            new TransactionController(

                this.service

            );

        /*

         * Stable system-level entry point

         */

        this.facade =

            new TransactionFacade(

                this.service

            );

    }

    // =====================================================

    // System Entry Point

    // =====================================================

    getFacade() {

        return this.facade;

    }

    // =====================================================

    // Direct Access

    //

    // These are exposed primarily for

    // system initialization / diagnostics.

    //

    // Higher-level business modules should

    // normally use facade.

    // =====================================================

    getRepository() {

        return this.repository;

    }

    getManager() {

        return this.manager;

    }

    getService() {

        return this.service;

    }

    getController() {

        return this.controller;

    }

    // =====================================================

    // System Status

    // =====================================================

    getStatus() {

        const transactions =

            this.manager

                .getAllTransactions();

        return {

            module:

                "Transaction",

            version:

                "V7",

            initialized:

                true,

            transactionCount:

                transactions.length,

            postedCount:

                this.manager

                    .getPostedTransactions()

                    .length,

            pendingCount:

                this.manager

                    .getPendingTransactions()

                    .length,

            voidedCount:

                this.manager

                    .getVoidedTransactions()

                    .length

        };

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

        TransactionModule;

}
