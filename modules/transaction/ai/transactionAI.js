/*

Family Wealth AI OS

Transaction AI Layer

*/

import TransactionAgent from "../agent/transactionAgent.js?v=20261008ae";

const TransactionAI = {

    analyze(){

        return TransactionAgent

        .getCashFlowSummary();

    },

    generateAdvice(

        question

    ){

        const result =

        TransactionAgent.answer(

            question

        );

        return {

            type:

            "TRANSACTION_ANALYSIS",

            data:

            result

        };

    }

};

export default TransactionAI;
