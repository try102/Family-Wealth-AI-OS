/*

Family Wealth AI OS

Account Service

*/

import AccountRepository from "../repository/accountRepository.js?v=20261008ae";

import AssetRepository from "../../asset/repository/assetRepository.js?v=20261008ae";

function mirrorKindOf(record) {
    const label =
        `${(record && record.name) || ""} ${(record && record.category) || ""} ${(record && record.accountType) || ""} ${(record && record.type) || ""}`.toLowerCase();
    if (label.includes("invest")) {
        return "investment";
    }
    if (label.includes("check")) {
        return "checking";
    }
    return "";
}

import EventBus from "../../../core/events/eventBus.js?v=20261008ae";

import EventTypes from "../../../core/events/eventTypes.js?v=20261008ae";

const AccountService = {

    createAccount(

        account

    ){

        // An opening balance typed by the user is

        // the account's baseline and is never

        // overwritten by calibration.

        if (

            account &&

            account.openingBalance === undefined

        ) {

            account.openingBalance =

                Number(account.balance || 0);

            account.openingSource = "user";

        }

        const savedAccount =

        AccountRepository.save(

            account

        );

        EventBus.publish(

            EventTypes.ACCOUNT_CREATED,

            savedAccount

        );

        return savedAccount;

    },

    getAccounts(){

        return AccountRepository.findAll();

    },

    getAccount(

        id

    ){

        return AccountRepository.findById(

            id

        );

    },

    updateAccount(

        account

    ){

        // A balance typed in the Account Center is

        // authoritative: mark it manual and mirror

        // it back to the linked asset record at once.

        if (

            account &&

            account.balance !== undefined

        ) {

            account.manualBalance = true;

            account.manualAt =

                new Date().toISOString();

        }

        const updated =

        AccountRepository.save(

            account

        );

        if (

            updated &&

            updated.manualBalance

        ) {

            try {

                const kind =

                    mirrorKindOf(updated);

                const owner =

                    updated.memberId ||

                    updated.ownerId ||

                    "";

                if (kind) {

                    const pair =

                        (

                            AssetRepository.findAll() ||

                            []

                        ).find(

                            asset =>

                                mirrorKindOf(asset) ===

                                    kind &&

                                String(

                                    asset.memberId ||

                                    asset.ownerId ||

                                    ""

                                ) === String(owner)

                        );

                    if (

                        pair &&

                        Number(pair.currentValue || 0) !==

                            Number(updated.balance || 0)

                    ) {

                        pair.currentValue =

                            Number(updated.balance || 0);

                        AssetRepository.save(

                            pair

                        );

                    }

                    if (pair) {

                        // The typed balance is now the

                        // asset's value too; the pair is

                        // back in sync, so the manual

                        // flag has done its job.

                        updated.manualBalance = false;

                        AccountRepository.save(

                            updated

                        );

                    }

                }

            } catch (mirrorError) {

            }

        }

        EventBus.publish(

            EventTypes.ACCOUNT_UPDATED,

            updated

        );

        return updated;

    },

    deleteAccount(

        id

    ){

        AccountRepository.delete(

            id

        );

        EventBus.publish(

            EventTypes.ACCOUNT_DELETED,

            id

        );

    },

    getTotalBalance(){

        const accounts =

        this.getAccounts();

        return accounts.reduce(

            (total, account)=>

            total +

            Number(

                account.balance || 0

            ),

            0

        );

    }

};

export default AccountService;
