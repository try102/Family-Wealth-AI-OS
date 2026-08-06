/*

Family Wealth AI OS

Account Service

*/

import AccountRepository from "../repository/accountRepository.js";

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

const AccountService = {

    createAccount(

        account

    ){

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

        const updated =

        AccountRepository.save(

            account

        );

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
