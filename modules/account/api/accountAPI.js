/*

Family Wealth AI OS

Account API

Public Interface

*/

import AccountService from "../services/accountService.js?v=20261008aq";

const AccountAPI = {

    create(

        account

    ){

        return AccountService.createAccount(

            account

        );

    },

    getAll(){

        return AccountService.getAccounts();

    },

    getById(

        id

    ){

        return AccountService.getAccount(

            id

        );

    },

    update(

        account

    ){

        return AccountService.updateAccount(

            account

        );

    },

    remove(

        id

    ){

        return AccountService.deleteAccount(

            id

        );

    },

    getTotalBalance(){

        return AccountService.getTotalBalance();

    }

};

export default AccountAPI;
