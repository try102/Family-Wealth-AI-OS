/*

Family Wealth AI OS

Transaction Service

*/

import TransactionRepository from "../repository/transactionRepository.js";

import EventBus from "../../../core/events/eventBus.js";

import EventTypes from "../../../core/events/eventTypes.js";

const TransactionService = {

    createTransaction(

        transaction

    ){

        const savedTransaction =

        TransactionRepository.save(

            transaction

        );

        EventBus.publish(

            EventTypes.TRANSACTION_CREATED,

            savedTransaction

        );

        return savedTransaction;

    },

    getTransactions(){

        return TransactionRepository.findAll();

    },

    getTransaction(

        id

    ){

        return TransactionRepository.findById(

            id

        );

    },

    updateTransaction(

        transaction

    ){

        const updated =

        TransactionRepository.save(

            transaction

        );

        EventBus.publish(

            EventTypes.TRANSACTION_UPDATED,

            updated

        );

        return updated;

    },

    deleteTransaction(

        id

    ){

        TransactionRepository.delete(

            id

        );

        EventBus.publish(

            EventTypes.TRANSACTION_DELETED,

            id

        );

    },

    getAccountTransactions(

        accountId

    ){

        return TransactionRepository

        .findByAccount(

            accountId

        );

    },

    getTotalIncome(){

        return this

        .getTransactions()

        .filter(

            transaction =>

            transaction.direction === "IN"

        )

        .reduce(

            (total, transaction)=>

            total +

            Number(

                transaction.amount || 0

            ),

            0

        );

    },

    getTotalExpense(){

        return this

        .getTransactions()

        .filter(

            transaction =>

            transaction.direction === "OUT"

        )

        .reduce(

            (total, transaction)=>

            total +

            Number(

                transaction.amount || 0

            ),

            0

        );

    }

};

export default TransactionService;
