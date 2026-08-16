/**

 * Family Wealth AI OS V7

 * Account Repository

 *

 * Responsibility:

 * - Persist Account data

 * - Load Account data

 * - Provide storage boundary for Account system

 *

 * Architecture:

 *

 * AccountManager

 *      ↓

 * AccountRepository

 *      ↓

 * DataService

 */

import DataService

    from "../core/database/dataService.js";

import Account

    from "./account.js";

const ACCOUNT_KEY =

    "family_accounts";

const AccountRepository = {

    // =====================================================

    // Load All Accounts

    // =====================================================

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

    // =====================================================

    // Get One Account

    // =====================================================

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

    // =====================================================

    // Save One Account

    // =====================================================

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

    // =====================================================

    // Save Multiple Accounts

    // =====================================================

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

    // =====================================================

    // Delete One Account

    // =====================================================

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

    // =====================================================

    // Replace All Accounts

    // =====================================================

    replaceAccounts(

        accounts = []

    ) {

        return this.saveAccounts(

            accounts

        );

    },

    // =====================================================

    // Clear

    // =====================================================

    clearAccounts() {

        DataService.save(

            ACCOUNT_KEY,

            []

        );

        return true;

    }

};

// =====================================================

// ES Module Export

// =====================================================

export default AccountRepository;
