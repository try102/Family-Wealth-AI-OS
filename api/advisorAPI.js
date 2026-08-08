/*

Family Wealth AI OS V7

Advisor API

*/

import AIAdvisor from "../ai/advisor.js";

const AdvisorAPI = {

    // =====================

    // Ask

    // =====================

    ask(

        question

    ){

        if(

            !question

        ){

            return {

                success:

                false,

                message:

                "Question required"

            };

        }

        const analysis =

        AIAdvisor.analyze();

        return {

            success:

            true,

            data: {

                answer:

                analysis,

                question:

                question

            }

        };

    },

    // =====================

    // Health

    // =====================

    health(){

        return {

            service:

            "Advisor API",

            status:

            "OK",

            version:

            "V7.0"

        };

    }

};

export default AdvisorAPI;
