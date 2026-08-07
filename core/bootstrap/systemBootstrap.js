/*

Family Wealth AI OS

System Bootstrap V7

*/

import ModuleRegistry from "../registry/moduleRegistry.js";

import AgentRegistry from "../registry/agentRegistry.js";

// =====================

// Agents

// =====================

import InvestmentAgent 

from "../../modules/investment/agent/investmentAgent.js";

// =====================

// Tax Module

// =====================

import TaxFacade 

from "../../tax/taxFacade.js";

// =====================

// Liability Module

// =====================

import LiabilityModule 

from "../modules/liabilityModule.js";

// =====================

// Income Module

// =====================

import IncomeModule 

from "../modules/incomeModule.js";

// =====================

// Create Instances

// =====================

const taxModule =

    new TaxFacade();

// =====================

// System Bootstrap

// =====================

const SystemBootstrap = {

    initialize(){

        console.log(

            "Family Wealth AI OS Starting..."

        );

        // =====================

        // Register Agents

        // =====================

        AgentRegistry.register(

            "investment",

            InvestmentAgent

        );

        // =====================

        // Register Modules

        // =====================

        ModuleRegistry.register(

            "investment",

            {

                name:

                "Investment Center",

                status:

                "ACTIVE"

            }

        );

        ModuleRegistry.register(

            "tax",

            taxModule

        );

        ModuleRegistry.register(

            "liability",

            LiabilityModule

        );

        ModuleRegistry.register(

            "income",

            IncomeModule

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
