/**

 * Family Wealth AI OS V7

 * Account Manager

 *

 * Responsibility:

 * - Create accounts

 * - Read accounts

 * - Update accounts

 * - Close accounts

 * - Archive accounts

 * - Validate account data

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

 * Account is the system account registry.

 * Business modules should reference Account by account.id.

 */

const Account = require("./account");

class AccountManager {

    constructor(initialAccounts = []) {

        this.accounts = new Map();

        if (Array.isArray(initialAccounts)) {

            initialAccounts.forEach(accountData => {

                const account =

                    accountData instanceof Account

                        ? accountData

                        : new Account(accountData);

                const validation =

                    account.validate();

                if (!validation.valid) {

                    throw new Error(

                        validation.errors.join(" ")

                    );

                }

                account.normalize();

                this.accounts.set(

                    account.id,

                    account

                );

            });

        }

    }

    /**

     * Create a new Account.

     */

    createAccount(data = {}) {

        const account =

            data instanceof Account

                ? data

                : new Account(data);

        account.normalize();

        const validation =

            account.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        if (this.accounts.has(account.id)) {

            throw new Error(

                `Account with ID "${account.id}" already exists.`

            );

        }

        this.accounts.set(

            account.id,

            account

        );

        return account;

    }

    /**

     * Get an Account by ID.

     */

    getAccount(accountId) {

        if (!accountId) {

            return null;

        }

        return this.accounts.get(accountId) || null;

    }

    /**

     * Get all Accounts.

     */

    getAllAccounts() {

        return Array.from(

            this.accounts.values()

        );

    }

    /**

     * Get only active Accounts.

     */

    getActiveAccounts() {

        return this.getAllAccounts()

            .filter(

                account =>

                    account.status === "Active"

            );

    }

    /**

     * Get closed Accounts.

     */

    getClosedAccounts() {

        return this.getAllAccounts()

            .filter(

                account =>

                    account.status === "Closed"

            );

    }

    /**

     * Find Accounts by owner member.

     *

     * This references Family Member ID.

     * AccountManager does not manage Family Members.

     */

    getAccountsByOwner(ownerMemberId) {

        if (!ownerMemberId) {

            return [];

        }

        return this.getAllAccounts()

            .filter(

                account =>

                    account.ownerMemberId === ownerMemberId

            );

    }

    /**

     * Find Accounts by type.

     */

    getAccountsByType(accountType) {

        if (!accountType) {

            return [];

        }

        return this.getAllAccounts()

            .filter(

                account =>

                    account.accountType === accountType

            );

    }

    /**

     * Find Accounts by institution.

     */

    getAccountsByInstitution(institution) {

        if (!institution) {

            return [];

        }

        const normalizedInstitution =

            institution

                .toString()

                .trim()

                .toLowerCase();

        return this.getAllAccounts()

            .filter(account =>

                account.institution

                    .toLowerCase()

                    .includes(normalizedInstitution)

            );

    }

    /**

     * Update an existing Account.

     *

     * Only fields belonging to the Account model

     * are accepted here.

     */

    updateAccount(accountId, updates = {}) {

        const account =

            this.getAccount(accountId);

        if (!account) {

            throw new Error(

                `Account "${accountId}" not found.`

            );

        }

        /*

         * Prevent accidental replacement of

         * system identity fields.

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

        allowedFields.forEach(field => {

            if (

                Object.prototype.hasOwnProperty.call(

                    updates,

                    field

                )

            ) {

                account[field] =

                    updates[field];

            }

        });

        account.normalize();

        const validation =

            account.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        return account;

    }

    /**

     * Close an Account.

     *

     * We do not immediately destroy historical

     * account information.

     *

     * This is important because future Transactions

     * may still reference this Account.

     */

    closeAccount(accountId) {

        const account =

            this.getAccount(accountId);

        if (!account) {

            throw new Error(

                `Account "${accountId}" not found.`

            );

        }

        account.status = "Closed";

        account.updatedAt =

            new Date().toISOString();

        return account;

    }

    /**

     * Reopen a previously closed Account.

     */

    reopenAccount(accountId) {

        const account =

            this.getAccount(accountId);

        if (!account) {

            throw new Error(

                `Account "${accountId}" not found.`

            );

        }

        account.status = "Active";

        account.updatedAt =

            new Date().toISOString();

        return account;

    }

    /**

     * Remove an Account from the manager registry.

     *

     * IMPORTANT:

     *

     * This method does not delete external Transaction,

     * Investment, Tax, or other business data.

     *

     * Higher-level application logic should decide whether

     * permanent deletion is safe.

     */

    removeAccount(accountId) {

        if (!this.accounts.has(accountId)) {

            return false;

        }

        return this.accounts.delete(

            accountId

        );

    }

    /**

     * Convert all Accounts into plain objects.

     *

     * Useful for future persistence / import / export.

     */

    toJSON() {

        return this.getAllAccounts()

            .map(account =>

                account.toJSON()

            );

    }

    /**

     * Replace the manager contents from

     * serialized Account data.

     *

     * This creates a clean boundary for future:

     * - Manual Input

     * - CSV Import

     * - Bank Import

     * - Brokerage Import

     * - External Sync

     */

    loadAccounts(accountData = []) {

        if (!Array.isArray(accountData)) {

            throw new Error(

                "Account data must be an array."

            );

        }

        this.accounts.clear();

        accountData.forEach(data => {

            const account =

                data instanceof Account

                    ? data

                    : new Account(data);

            account.normalize();

            const validation =

                account.validate();

            if (!validation.valid) {

                throw new Error(

                    validation.errors.join(" ")

                );

            }

            if (this.accounts.has(account.id)) {

                throw new Error(

                    `Duplicate Account ID "${account.id}".`

                );

            }

            this.accounts.set(

                account.id,

                account

            );

        });

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

    module.exports = AccountManager;

}
