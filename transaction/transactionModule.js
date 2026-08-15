/**

 *

 * Family Wealth AI OS V7

 * Transaction Module

 *

 * Responsibility:

 *

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

 *

 */

/*

 *

 * Repository

 *

 */

import TransactionRepository

    from "./transactionRepository.js";

/*

 *

 * Manager

 *

 */

import TransactionManager

    from "./transactionManager.js";

/*

 *

 * Service

 *

 */

import TransactionService

    from "./transactionService.js";

/*

 *

 * Controller

 *

 */

import TransactionController

    from "./transactionController.js";

/*

 *

 * Facade

 *

 */

import TransactionFacade

    from "./transactionFacade.js";

/*

 *

 * Transaction Module

 *

 */

class TransactionModule {

    constructor() {

        /*

         *

         * Persistence layer

         *

         */

        this.repository =

            TransactionRepository;

        /*

         *

         * Transaction management layer

         *

         */

        this.manager =

            new TransactionManager();

        /*

         *

         * Business-facing service layer

         *

         */

        this.service =

            new TransactionService(

                this.manager

            );

        /*

         *

         * Application/API boundary

         *

         */

        this.controller =

            new TransactionController(

                this.service

            );

        /*

         *

         * Stable system-level entry point

         *

         */

        this.facade =

            new TransactionFacade(

                this.service

            );

    }

    // =====================================================

    //

    // System Entry Point

    //

    // =====================================================

    getFacade() {

        return this.facade;

    }

    // =====================================================

    //

    // Direct Access

    //

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

    //

    // System Status

    //

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

 *

 * ES Module export

 *

 */

export default

    TransactionModule;
