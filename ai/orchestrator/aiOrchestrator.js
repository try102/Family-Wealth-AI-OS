/*

Family Wealth AI OS V7

AI Orchestrator Layer

*/

import TaxAdvisorAI from "../taxAI/taxAdvisorAI.js";

import InvestmentAI from "../../modules/investment/ai/investmentAI.js";

// =====================

// AI Orchestrator

// =====================

class AIOrchestrator {

    constructor(){

        this.name =

        "Family Wealth AI Orchestrator V7";

        this.taxAI =

        new TaxAdvisorAI();

        this.investmentAI =

        InvestmentAI;

    }

    process(

        request

    ){

        // =====================

        // Tax Request

        // =====================

        if(

            request.type ===

            "tax"

        ){

            return this.taxAI.analyze(

                request.question

            );

        }

        // =====================

        // Investment Request

        // =====================

        if(

            request.type ===

            "investment"

        ){

            return this.investmentAI

            .generateAdvice(

                request.question

            );

        }

        // =====================

        // Default

        // =====================

        return {

            question:

            request.question,

            answer:

            "AI request processed."

        };

    }

}

export default AIOrchestrator;
