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

 * Account

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

const AccountManager =

    require("./accountManager");

const AccountService =

    require("./accountService");

const AccountController =

    require("./accountController");

const AccountFacade =

    require("./accountFacade");

class AccountModule {

    constructor(

        initialAccounts = []

    ) {

        /*

         * Account management layer

         */

        this.manager =

            new AccountManager(

                initialAccounts

            );

        /*

         * Business-facing service layer

         */

        this.service =

            new AccountService(

                this.manager

            );

        /*

         * Application/API boundary

         */

        this.controller =

            new AccountController(

                this.service

            );

        /*

         * Stable system-level entry point

         */

        this.facade =

            new AccountFacade(

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

    // These are exposed primarily for:

    // - System initialization

    // - Diagnostics

    // - Controlled integration

    //

    // Higher-level business modules should normally

    // use the facade.

    // =====================================================

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

 * CommonJS export.

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports =

        AccountModule;

}
