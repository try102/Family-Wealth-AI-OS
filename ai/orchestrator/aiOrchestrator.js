/*

Family Wealth AI OS V7

AI Orchestrator Layer

*/

import TaxAdvisorAI from "../taxAI/taxAdvisorAI.js";

// =====================

// AI Orchestrator

// =====================

class AIOrchestrator {

    constructor(){

        this.name =

        "Family Wealth AI Orchestrator V7";

        this.taxAI =

        new TaxAdvisorAI();

    }

    process(

        request

    ){

        if(

            request.type ===

            "tax"

        ){

            return this.taxAI.analyze(

                request.question

            );

        }

        return {

            question:

            request.question,

            answer:

            "AI request processed."

        };

    }

}

export default AIOrchestrator;
