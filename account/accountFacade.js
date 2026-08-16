/**

 * Family Wealth AI OS V7

 * Account Facade

 *

 * Responsibility:

 * - Provide one stable system-level entry point

 *   for the Account subsystem

 * - Hide internal Account architecture

 *   from higher-level modules

 *

 * Architecture:

 *

 * Higher-Level Module

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

 * AccountFacade does NOT perform:

 * - Transaction calculations

 * - Cash Flow calculations

 * - Investment calculations

 * - Asset calculations

 * - Liability calculations

 * - Tax calculations

 * - Retirement calculations

 * - Advisor logic

 */

import AccountController

    from "./accountController.js";

class AccountFacade {

    constructor(

        accountService

    ) {

        if (!accountService) {

            throw new Error(

                "AccountService is required."

            );

        }

        this.controller =

            new AccountController(

                accountService

            );

    }

    // =====================================================

    //

    // Create

    //

    // =====================================================

    createAccount(

        data = {}

    ) {

        return this.controller

            .createAccount(

                data

            );

    }

    // =====================================================

    //

    // Read

    //

    // =====================================================

    getAccount(

        accountId

    ) {

        return this.controller

            .getAccount(

                accountId

            );

    }

    getAllAccounts() {

        return this.controller

            .getAllAccounts();

    }

    getActiveAccounts() {

        return this.controller

            .getActiveAccounts();

    }

    getClosedAccounts() {

        return this.controller

            .getClosedAccounts();

    }

    // =====================================================

    //

    // Query

    //

    // =====================================================

    getAccountsByOwner(

        ownerMemberId

    ) {

        return this.controller

            .getAccountsByOwner(

                ownerMemberId

            );

    }

    getAccountsByType(

        accountType

    ) {

        return this.controller

            .getAccountsByType(

                accountType

            );

    }

    getAccountsByInstitution(

        institution

    ) {

        return this.controller

            .getAccountsByInstitution(

                institution

            );

    }

    // =====================================================

    //

    // Update

    //

    // =====================================================

    updateAccount(

        accountId,

        updates = {}

    ) {

        return this.controller

            .updateAccount(

                accountId,

                updates

            );

    }

    // =====================================================

    //

    // Account Lifecycle

    //

    // =====================================================

    closeAccount(

        accountId

    ) {

        return this.controller

            .closeAccount(

                accountId

            );

    }

    reopenAccount(

        accountId

    ) {

        return this.controller

            .reopenAccount(

                accountId

            );

    }

    // =====================================================

    //

    // Controlled Removal

    //

    // =====================================================

    removeAccount(

        accountId

    ) {

        return this.controller

            .removeAccount(

                accountId

            );

    }

    // =====================================================

    //

    // Serialization

    //

    // =====================================================

    toJSON() {

        return this.controller

            .toJSON();

    }

    // =====================================================

    //

    // Load / Replace

    //

    // =====================================================

    loadAccounts(

        accountData = []

    ) {

        return this.controller

            .loadAccounts(

                accountData

            );

    }

}

/*

 *

 * ES Module Export

 *

 */

export default AccountFacade;
