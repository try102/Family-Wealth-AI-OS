/*

 * Family Wealth AI OS V7

 *

 * Application Bootstrap

 *

 */

import AIAdvisor from "../ai/advisor.js?v=20261008ae";

import AdvisorAgent from "../agents/advisor/advisorAgent.js?v=20261008ae";

import TransactionModule from "../transaction/transactionModule.js?v=20261008ae";

const AppBootstrap = {

    version:

        "V7.0",

    status:

        "INITIALIZING",

    transactionModule:

        null,

    start(){

        console.log(

            "Starting Family Wealth AI OS",

            this.version

        );

        this.initializeCore();

        this.initializeTransaction();

        this.initializeAgents();

        this.initializeAI();

        this.status =

            "READY";

        console.log(

            "System Ready"

        );

        return this.status;

    },

    initializeCore(){

        console.log(

            "Core Layer Loaded"

        );

    },

    initializeTransaction(){

        try{

            this.transactionModule =

                new TransactionModule();

            console.log(

                "Transaction Module Loaded"

            );

            console.log(

                "Transaction Status:",

                this.transactionModule

                    .getStatus()

            );

        }

        catch(error){

            console.error(

                "Transaction Module Failed:",

                error

            );

            throw error;

        }

    },

    initializeAgents(){

        console.log(

            "Advisor Agent Loaded:",

            AdvisorAgent.name

        );

    },

    initializeAI(){

        console.log(

            "AI Advisor Loaded:",

            AIAdvisor.name

        );

    }

};

export default AppBootstrap;
