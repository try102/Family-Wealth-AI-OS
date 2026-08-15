/**

 * Family Wealth AI OS V7

 * Account Controller

 *

 * Responsibility:

 * - Provide the application/API boundary for Account

 * - Receive requests from UI / API layer

 * - Delegate operations to AccountService

 * - Keep Controller independent from AccountManager

 *   and persistence implementation

 *

 * AccountController does NOT perform:

 * - Transaction calculations

 * - Cash Flow calculations

 * - Investment calculations

 * - Asset calculations

 * - Liability calculations

 * - Tax calculations

 * - Retirement calculations

 * - Advisor logic

 *

 * Architecture:

 *

 * UI / API

 *    ↓

 * AccountController

 *    ↓

 * AccountService

 *    ↓

 * AccountManager

 *    ↓

 * Account

 */

class AccountController {

    constructor(accountService) {

        if (!accountService) {

            throw new Error(

                "AccountService is required."

            );

        }

        this.accountService =

            accountService;

    }

    // =====================================================

    // Create

    // =====================================================

    createAccount(data = {}) {

        return this.accountService

            .createAccount(data);

    }

    // =====================================================

    // Read

    // =====================================================

    getAccount(accountId) {

        return this.accountService

            .getAccount(accountId);

    }

    getAllAccounts() {

        return this.accountService

            .getAllAccounts();

    }

    getActiveAccounts() {

        return this.accountService

            .getActiveAccounts();

    }

    getClosedAccounts() {

        return this.accountService

            .getClosedAccounts();

    }

    // =====================================================

    // Query

    // =====================================================

    getAccountsByOwner(

        ownerMemberId

    ) {

        return this.accountService

            .getAccountsByOwner(

                ownerMemberId

            );

    }

    getAccountsByType(

        accountType

    ) {

        return this.accountService

            .getAccountsByType(

                accountType

            );

    }

    getAccountsByInstitution(

        institution

    ) {

        return this.accountService

            .getAccountsByInstitution(

                institution

            );

    }

    // =====================================================

    // Update

    // =====================================================

    updateAccount(

        accountId,

        updates = {}

    ) {

        return this.accountService

            .updateAccount(

                accountId,

                updates

            );

    }

    // =====================================================

    // Account Lifecycle

    // =====================================================

    closeAccount(

        accountId

    ) {

        return this.accountService

            .closeAccount(

                accountId

            );

    }

    reopenAccount(

        accountId

    ) {

        return this.accountService

            .reopenAccount(

                accountId

            );

    }

    // =====================================================

    // Controlled Removal

    // =====================================================

    removeAccount(

        accountId

    ) {

        return this.accountService

            .removeAccount(

                accountId

            );

    }

    // =====================================================

    // Serialization

    // =====================================================

    toJSON() {

        return this.accountService

            .toJSON();

    }

    // =====================================================

    // Load / Replace

    // =====================================================

    loadAccounts(

        accountData = []

    ) {

        return this.accountService

            .loadAccounts(

                accountData

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

        AccountController;

}
