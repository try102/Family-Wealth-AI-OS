/*

Family Wealth AI OS

Account AI Layer

*/

import AccountAgent from "../agent/accountAgent.js?v=20261008ae";

const AccountAI = {

    analyze(){

        return AccountAgent

        .getAccountSummary();

    },

    generateAdvice(

        question

    ){

        const result =

        AccountAgent.answer(

            question

        );

        return {

            type:

            "ACCOUNT_ANALYSIS",

            data:

            result

        };

    }

};

export default AccountAI;
