/*

Family Wealth AI OS

Transaction Repository

*/

import DataService from "../../../core/database/dataService.js";

import Helpers from "../../../core/utils/helpers.js";

const STORAGE_KEY =

"family_transactions";

const TransactionRepository = {

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

        const transactions =

        this.findAll();

        return transactions.find(

            transaction =>

            transaction.id === id

        );

    },

    save(

        transaction

    ){

        let transactions =

        this.findAll();

        if(!transaction.id){

            transaction.id =

            Helpers.generateId();

            transaction.createdAt =

            new Date()

            .toISOString();

        }

        transaction.updatedAt =

        new Date()

        .toISOString();

        const index =

        transactions.findIndex(

            item =>

            item.id === transaction.id

        );

        if(index >=0){

            transactions[index] =

            transaction;

        }

        else{

            transactions.push(

                transaction

            );

        }

        DataService.save(

            STORAGE_KEY,

            transactions

        );

        return transaction;

    },

    delete(

        id

    ){

        let transactions =

        this.findAll();

        transactions =

        transactions.filter(

            transaction =>

            transaction.id !== id

        );

        DataService.save(

            STORAGE_KEY,

            transactions

        );

    },

    findByAccount(

        accountId

    ){

        return this.findAll()

        .filter(

            transaction =>

            transaction.accountId === accountId

        );

    }

};

export default TransactionRepository;
