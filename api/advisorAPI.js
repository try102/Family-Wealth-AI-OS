/*

Family Wealth AI OS V7

Advisor API

*/

import AIAdvisor

from "../ai/advisor.js";

const AdvisorAPI = {

    ask(

        question

    ){

        if(

            !question

        ){

            return {

                success:false,

                message:

                "Question required"

            };

        }

        const result =

        AIAdvisor.ask(

            question

        );

        return {

            success:true,

            data:

            result

        };

    },

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
