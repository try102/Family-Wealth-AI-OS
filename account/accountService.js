/**

 * Family Wealth AI OS V7

 * Account Service

 *

 * Responsibility:

 * - Provide a controlled business-facing entry point

 *   for Account operations

 * - Delegate Account operations to AccountManager

 * - Keep higher-level modules decoupled from

 *   AccountManager implementation

 *

 * AccountService does NOT perform:

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

 * Business Module

 *       ↓

 * AccountService

 *       ↓

 * AccountManager

 *       ↓

 * Account

 *

 * Account is referenced by accountId.

 */

class AccountService {

    constructor(

        accountManager

    ) {

        if (!accountManager) {

            throw new Error(

                "AccountManager is required."

            );

        }

        this.accountManager =

            accountManager;

    }

    // =====================================================

    //

    // Create

    //

    // =====================================================

    createAccount(

        data = {}

    ) {

        return this.accountManager

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

        return this.accountManager

            .getAccount(

                accountId

            );

    }

    getAllAccounts() {

        return this.accountManager

            .getAllAccounts();

    }

    getActiveAccounts() {

        return this.accountManager

            .getActiveAccounts();

    }

    getClosedAccounts() {

        return this.accountManager

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

        return this.accountManager

            .getAccountsByOwner(

                ownerMemberId

            );

    }

    getAccountsByType(

        accountType

    ) {

        return this.accountManager

            .getAccountsByType(

                accountType

            );

    }

    getAccountsByInstitution(

        institution

    ) {

        return this.accountManager

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

        return this.accountManager

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

        return this.accountManager

            .closeAccount(

                accountId

            );

    }

    reopenAccount(

        accountId

    ) {

        return this.accountManager

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

        return this.accountManager

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

        return this.accountManager

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

        return this.accountManager

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

export default AccountService;
