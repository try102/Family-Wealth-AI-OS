/*

Family Wealth AI OS

Account Agent

*/

import AccountAPI from "../api/accountAPI.js?v=20261008ae";

import AccountAnalysisEngine from "../engines/accountAnalysisEngine.js?v=20261008ae";

const AccountAgent = {

    getAccountSummary(){

        const accounts =

        AccountAPI.getAll();

        const total =

        AccountAnalysisEngine

        .calculateTotalBalance(

            accounts

        );

        const category =

        AccountAnalysisEngine

        .categoryAnalysis(

            accounts

        );

        const institutions =

        AccountAnalysisEngine

        .institutionAnalysis(

            accounts

        );

        return {

            totalBalance: total,

            category,

            institutions

        };

    },

    answer(

        question

    ){

        const summary =

        this.getAccountSummary();

        return {

            question,

            context: summary,

            message:

            "Account analysis generated"

        };

    }

};

export default AccountAgent;
