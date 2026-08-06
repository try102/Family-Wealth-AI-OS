/*

Family Wealth AI OS

Transaction API

Public Interface

*/

import TransactionService from "../services/transactionService.js";

const TransactionAPI = {

    create(

        transaction

    ){

        return TransactionService

        .createTransaction(

            transaction

        );

    },

    getAll(){

        return TransactionService

        .getTransactions();

    },

    getById(

        id

    ){

        return TransactionService

        .getTransaction(

            id

        );

    },

    update(

        transaction

    ){

        return TransactionService

        .updateTransaction(

            transaction

        );

    },

    remove(

        id

    ){

        return TransactionService

        .deleteTransaction(

            id

        );

    },

    getByAccount(

        accountId

    ){

        return TransactionService

        .getAccountTransactions(

            accountId

        );

    },

    getIncome(){

        return TransactionService

        .getTotalIncome();

    },

    getExpense(){

        return TransactionService

        .getTotalExpense();

    }

};

export default TransactionAPI;
