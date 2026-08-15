/**

 * Family Wealth AI OS V7

 * Account Manager

 *

 * Responsibility:

 * - Create accounts

 * - Read accounts

 * - Update accounts

 * - Close accounts

 * - Reopen accounts

 * - Archive accounts

 * - Validate account data

 * - Coordinate Account persistence

 *

 * AccountManager does NOT handle:

 * - Transactions

 * - Cash Flow

 * - Investment decisions

 * - Asset calculations

 * - Liability calculations

 * - Tax calculations

 * - Retirement calculations

 * - Advisor logic

 *

 * Architecture:

 *

 * Account

 *    ↓

 * AccountManager

 *    ↓

 * AccountRepository

 *    ↓

 * DataService

 *

 * Account is the system account registry.

 *

 * Business modules reference Account by account.id.

 */

const Account =

    require("./account");

const AccountRepository =

    require("./accountRepository");

class AccountManager {

    constructor(

        initialAccounts = null

    ) {

        this.accounts =

            new Map();

        /*

         * Load existing persisted Accounts

         * unless explicit initial data is supplied.

         */

        let accountsToLoad;

        if (

            Array.isArray(

                initialAccounts

            )

        ) {

            accountsToLoad =

                initialAccounts;

        } else {

            accountsToLoad =

                AccountRepository

                    .getAccounts();

        }

        this.loadAccounts(

            accountsToLoad

        );

    }

    // =====================================================

    // Create

    // =====================================================

    createAccount(

        data = {}

    ) {

        const account =

            data instanceof Account

                ? data

                : new Account(

                    data

                );

        account.normalize();

        const validation =

            account.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        if (

            this.accounts.has(

                account.id

            )

        ) {

            throw new Error(

                `Account with ID "${account.id}" already exists.`

            );

        }

        this.accounts.set(

            account.id,

            account

        );

        /*

         * Persist immediately.

         */

        AccountRepository

            .saveAccount(

                account

            );

        return account;

    }

    // =====================================================

    // Read

    // =====================================================

    getAccount(

        accountId

    ) {

        if (!accountId) {

            return null;

        }

        return (

            this.accounts.get(

                accountId

            ) || null

        );

    }

    // =====================================================

    // Get All

    // =====================================================

    getAllAccounts() {

        return Array.from(

            this.accounts.values()

        );

    }

    // =====================================================

    // Active Accounts

    // =====================================================

    getActiveAccounts() {

        return this.getAllAccounts()

            .filter(

                account =>

                    account.status ===

                    "Active"

            );

    }

    // =====================================================

    // Closed Accounts

    // =====================================================

    getClosedAccounts() {

        return this.getAllAccounts()

            .filter(

                account =>

                    account.status ===

                    "Closed"

            );

    }

    // =====================================================

    // Owner

    // =====================================================

    getAccountsByOwner(

        ownerMemberId

    ) {

        if (!ownerMemberId) {

            return [];

        }

        return this.getAllAccounts()

            .filter(

                account =>

                    account.ownerMemberId ===

                    ownerMemberId

            );

    }

    // =====================================================

    // Type

    // =====================================================

    getAccountsByType(

        accountType

    ) {

        if (!accountType) {

            return [];

        }

        return this.getAllAccounts()

            .filter(

                account =>

                    account.accountType ===

                    accountType

            );

    }

    // =====================================================

    // Institution

    // =====================================================

    getAccountsByInstitution(

        institution

    ) {

        if (!institution) {

            return [];

        }

        const normalizedInstitution =

            institution

                .toString()

                .trim()

                .toLowerCase();

        return this.getAllAccounts()

            .filter(

                account =>

                    account.institution

                        .toLowerCase()

                        .includes(

                            normalizedInstitution

                        )

            );

    }

    // =====================================================

    // Update

    // =====================================================

    updateAccount(

        accountId,

        updates = {}

    ) {

        const account =

            this.getAccount(

                accountId

            );

        if (!account) {

            throw new Error(

                `Account "${accountId}" not found.`

            );

        }

        /*

         * Only Account model fields

         * may be modified here.

         */

        const allowedFields = [

            "name",

            "accountType",

            "institution",

            "ownerMemberId",

            "currency",

            "status",

            "dataSource",

            "taxTreatment",

            "description"

        ];

        allowedFields.forEach(

            field => {

                if (

                    Object.prototype

                        .hasOwnProperty.call(

                            updates,

                            field

                        )

                ) {

                    account[field] =

                        updates[field];

                }

            }

        );

        account.normalize();

        const validation =

            account.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        /*

         * Persist update.

         */

        AccountRepository

            .saveAccount(

                account

            );

        return account;

    }

    // =====================================================

    // Close

    // =====================================================

    closeAccount(

        accountId

    ) {

        const account =

            this.getAccount(

                accountId

            );

        if (!account) {

            throw new Error(

                `Account "${accountId}" not found.`

            );

        }

        account.status =

            "Closed";

        account.updatedAt =

            new Date().toISOString();

        AccountRepository

            .saveAccount(

                account

            );

        return account;

    }

    // =====================================================

    // Reopen

    // =====================================================

    reopenAccount(

        accountId

    ) {

        const account =

            this.getAccount(

                accountId

            );

        if (!account) {

            throw new Error(

                `Account "${accountId}" not found.`

            );

        }

        account.status =

            "Active";

        account.updatedAt =

            new Date().toISOString();

        AccountRepository

            .saveAccount(

                account

            );

        return account;

    }

    // =====================================================

    // Remove

    // =====================================================

    removeAccount(

        accountId

    ) {

        if (

            !this.accounts.has(

                accountId

            )

        ) {

            return false;

        }

        /*

         * Remove from memory.

         */

        this.accounts.delete(

            accountId

        );

        /*

         * Remove from persistent storage.

         */

        AccountRepository

            .deleteAccount(

                accountId

            );

        return true;

    }

    // =====================================================

    // Reload

    // =====================================================

    reloadAccounts() {

        const accounts =

            AccountRepository

                .getAccounts();

        return this.loadAccounts(

            accounts

        );

    }

    // =====================================================

    // JSON

    // =====================================================

    toJSON() {

        return this.getAllAccounts()

            .map(

                account =>

                    account.toJSON()

            );

    }

    // =====================================================

    // Load Accounts

    // =====================================================

    loadAccounts(

        accountData = []

    ) {

        if (!Array.isArray(

            accountData

        )) {

            throw new Error(

                "Account data must be an array."

            );

        }

        this.accounts.clear();

        accountData.forEach(

            data => {

                const account =

                    data instanceof Account

                        ? data

                        : new Account(

                            data

                        );

                account.normalize();

                const validation =

                    account.validate();

                if (!validation.valid) {

                    throw new Error(

                        validation.errors.join(" ")

                    );

                }

                if (

                    this.accounts.has(

                        account.id

                    )

                ) {

                    throw new Error(

                        `Duplicate Account ID "${account.id}".`

                    );

                }

                this.accounts.set(

                    account.id,

                    account

                );

            }

        );

        return this.getAllAccounts();

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

        AccountManager;

}
