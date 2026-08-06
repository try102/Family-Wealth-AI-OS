/*

Family Wealth AI OS

Transaction Manager

*/

const TransactionManager = {

    transactions:[],

    create(

        type,

        data={}

    ){

        const transaction = {

            id:

            Date.now(),

            type,

            data,

            createdAt:

            new Date()

            .toISOString()

        };

        this.transactions.push(

            transaction

        );

        return transaction;

    },

    all(){

        return this.transactions;

    },

    findByType(

        type

    ){

        return this.transactions

        .filter(

            item =>

            item.type === type

        );

    },

    get(

        id

    ){

        return this.transactions

        .find(

            item =>

            item.id === id

        );

    },

    remove(

        id

    ){

        this.transactions =

        this.transactions.filter(

            item =>

            item.id !== id

        );

    },

    clear(){

        this.transactions=[];

    }

};

export default TransactionManager;
