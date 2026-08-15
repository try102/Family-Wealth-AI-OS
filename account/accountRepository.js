/**

 * Family Wealth AI OS V7

 * Account Repository

 *

 * Responsibility:

 * - Persist Account data

 * - Load Account data

 * - Provide storage boundary for Account system

 *

 * AccountRepository does NOT perform:

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

 * AccountService

 *        ↓

 * AccountManager

 *        ↓

 * AccountRepository

 *        ↓

 * DataService

 *

 * AccountRepository is the persistence boundary.

 */

const DataService =

    require("../core/database/dataService");

const Account =

    require("./account");

const ACCOUNT_KEY =

    "family_accounts";

const AccountRepository = {

    /**

     * Load all Accounts.

     *

     * Stored plain objects are converted back

     * into Account objects.

     */

    getAccounts() {

        const data =

            DataService.load(

                ACCOUNT_KEY

            ) || [];

        if (!Array.isArray(data)) {

            return [];

        }

        return data.map(

            accountData =>

                accountData instanceof Account

                    ? accountData

                    : new Account(

                        accountData

                    )

        );

    },

    /**

     * Get one Account by ID.

     */

    getAccount(

        accountId

    ) {

        if (!accountId) {

            return null;

        }

        return (

            this.getAccounts()

                .find(

                    account =>

                        account.id ===

                        accountId

                ) || null

        );

    },

    /**

     * Save one Account.

     *

     * Existing Account:

     *   Update

     *

     * New Account:

     *   Insert

     */

    saveAccount(

        account

    ) {

        if (!account) {

            throw new Error(

                "Account is required."

            );

        }

        const normalizedAccount =

            account instanceof Account

                ? account

                : new Account(

                    account

                );

        normalizedAccount.normalize();

        const validation =

            normalizedAccount.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        let data =

            this.getAccounts();

        const index =

            data.findIndex(

                item =>

                    item.id ===

                    normalizedAccount.id

            );

        if (index >= 0) {

            data[index] =

                normalizedAccount;

        } else {

            data.push(

                normalizedAccount

            );

        }

        DataService.save(

            ACCOUNT_KEY,

            data.map(

                item =>

                    item.toJSON()

            )

        );

        return normalizedAccount;

    },

    /**

     * Save multiple Accounts.

     */

    saveAccounts(

        accounts = []

    ) {

        if (!Array.isArray(accounts)) {

            throw new Error(

                "Accounts must be an array."

            );

        }

        const normalizedAccounts =

            accounts.map(

                account => {

                    const item =

                        account instanceof Account

                            ? account

                            : new Account(

                                account

                            );

                    item.normalize();

                    const validation =

                        item.validate();

                    if (!validation.valid) {

                        throw new Error(

                            validation.errors.join(" ")

                        );

                    }

                    return item;

                }

            );

        DataService.save(

            ACCOUNT_KEY,

            normalizedAccounts.map(

                account =>

                    account.toJSON()

            )

        );

        return normalizedAccounts;

    },

    /**

     * Delete one Account.

     *

     * Normally Accounts should be closed rather

     * than deleted because Transactions may

     * continue to reference the Account ID.

     *

     * This method exists only for controlled

     * data maintenance.

     */

    deleteAccount(

        accountId

    ) {

        if (!accountId) {

            return false;

        }

        const data =

            this.getAccounts();

        const filtered =

            data.filter(

                account =>

                    account.id !==

                    accountId

            );

        if (

            filtered.length ===

            data.length

        ) {

            return false;

        }

        DataService.save(

            ACCOUNT_KEY,

            filtered.map(

                account =>

                    account.toJSON()

            )

        );

        return true;

    },

    /**

     * Replace all stored Accounts.

     *

     * Used for:

     * - Import

     * - Migration

     * - Restore

     * - Controlled synchronization

     */

    replaceAccounts(

        accounts = []

    ) {

        return this.saveAccounts(

            accounts

        );

    },

    /**

     * Clear all Account data.

     *

     * Intended only for controlled

     * development / maintenance operations.

     */

    clearAccounts() {

        DataService.save(

            ACCOUNT_KEY,

            []

        );

        return true;

    }

};

/*

 * CommonJS export.

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports =

        AccountRepository;

}
