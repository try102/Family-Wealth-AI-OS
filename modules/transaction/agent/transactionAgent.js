/*

Family Wealth AI OS

Transaction Agent

*/

import TransactionAPI from "../api/transactionAPI.js";

import TransactionAnalysisEngine from "../engines/transactionAnalysisEngine.js";

const TransactionAgent = {

    getCashFlowSummary(){

        const transactions =

        TransactionAPI.getAll();

        const cashFlow =

        TransactionAnalysisEngine

        .cashFlow(

            transactions

        );

        const savingsRate =

        TransactionAnalysisEngine

        .savingsRate(

            transactions

        );

        const expenseCategory =

        TransactionAnalysisEngine

        .expenseByCategory(

            transactions

        );

        return {

            cashFlow,

            savingsRate,

            expenseCategory

        };

    },

    answer(

        question

    ){

        const summary =

        this.getCashFlowSummary();

        return {

            question,

            context:

            summary,

            message:

            "Transaction analysis generated"

        };

    }

};

export default TransactionAgent;
