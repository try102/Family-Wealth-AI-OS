/*

Family Wealth AI OS

System Bootstrap

*/

import ModuleRegistry from "../registry/moduleRegistry.js";

import AgentRegistry from "../registry/agentRegistry.js";

// Modules

import InvestmentAgent from "../../modules/investment/agent/investmentAgent.js";

// Future:

// import AssetAgent from "../../modules/asset/agent/assetAgent.js";

// import AccountAgent from "../../modules/account/agent/accountAgent.js";

// import TransactionAgent from "../../modules/transaction/agent/transactionAgent.js";

const SystemBootstrap = {

    initialize(){

        console.log(

            "Family Wealth AI OS Starting..."

        );

        /*

        

        Register Agents

        

        */

        AgentRegistry.register(

            "investment",

            InvestmentAgent

        );

        /*

        

        Register Modules

        

        Future expansion

        

        */

        ModuleRegistry.register(

            "investment",

            {

                name:

                "Investment Center",

                status:

                "ACTIVE"

            }

        );

        console.log(

            "Registered Agents:",

            AgentRegistry.list()

        );

        console.log(

            "Registered Modules:",

            ModuleRegistry.list()

        );

        return {

            status:

            "READY"

        };

    }

};

export default SystemBootstrap;
