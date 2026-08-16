/**

 * Family Wealth AI OS V7

 * Account Module

 *

 * Responsibility:

 * - Assemble the Account subsystem

 * - Create and expose the Account system entry point

 * - Keep dependency construction in one place

 *

 * Architecture:

 *

 * AccountModule

 *        ↓

 * AccountFacade

 *        ↓

 * AccountController

 *        ↓

 * AccountService

 *        ↓

 * AccountManager

 *        ↓

 * AccountRepository

 *        ↓

 * DataService

 *

 * AccountModule does NOT perform:

 * - Transaction calculations

 * - Cash Flow calculations

 * - Investment calculations

 * - Asset calculations

 * - Liability calculations

 * - Tax calculations

 * - Retirement calculations

 * - Advisor logic

 */

import AccountRepository

    from "./accountRepository.js";

import AccountManager

    from "./accountManager.js";

import AccountService

    from "./accountService.js";

import AccountController

    from "./accountController.js";

import AccountFacade

    from "./accountFacade.js";

class AccountModule {

    constructor(

        initialAccounts = null

    ) {

        /*

         *

         * Persistence layer

         *

         */

        this.repository =

            AccountRepository;

        /*

         *

         * Account management layer

         *

         */

        this.manager =

            new AccountManager(

                initialAccounts

            );

        /*

         *

         * Business-facing service layer

         *

         */

        this.service =

            new AccountService(

                this.manager

            );

        /*

         *

         * Application/API boundary

         *

         */

        this.controller =

            new AccountController(

                this.service

            );

        /*

         *

         * Stable system-level entry point

         *

         */

        this.facade =

            new AccountFacade(

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

    // Primarily used for:

    //

    // - System initialization

    // - Diagnostics

    // - Controlled integration

    //

    // Higher-level business modules should normally

    // use the facade.

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

        const accounts =

            this.manager

                .getAllAccounts();

        const activeAccounts =

            this.manager

                .getActiveAccounts();

        const closedAccounts =

            this.manager

                .getClosedAccounts();

        return {

            module:

                "Account",

            version:

                "V7",

            initialized:

                true,

            accountCount:

                accounts.length,

            activeCount:

                activeAccounts.length,

            closedCount:

                closedAccounts.length

        };

    }

}

/*

 *

 * ES Module Export

 *

 */

export default AccountModule;
