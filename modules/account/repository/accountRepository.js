/*

Family Wealth AI OS

Account Repository

*/

import DataService from "../../../core/database/dataService.js";

import Helpers from "../../../core/utils/helpers.js";

const STORAGE_KEY =

"family_accounts";

const AccountRepository = {

    findAll(){

        return (

            DataService.load(

                STORAGE_KEY

            )

            ||

            []

        );

    },

    findById(

        id

    ){

        const accounts =

        this.findAll();

        return accounts.find(

            account =>

            account.id === id

        );

    },

    save(

        account

    ){

        let accounts =

        this.findAll();

        if(!account.id){

            account.id =

            Helpers.generateId();

            account.createdAt =

            new Date()

            .toISOString();

        }

        account.updatedAt =

        new Date()

        .toISOString();

        const index =

        accounts.findIndex(

            item =>

            item.id === account.id

        );

        if(index >= 0){

            accounts[index] = account;

        }

        else{

            accounts.push(account);

        }

        DataService.save(

            STORAGE_KEY,

            accounts

        );

        return account;

    },

    delete(

        id

    ){

        let accounts =

        this.findAll();

        accounts =

        accounts.filter(

            account =>

            account.id !== id

        );

        DataService.save(

            STORAGE_KEY,

            accounts

        );

    }

};

export default AccountRepository;
