/*

Family Wealth AI OS V7

System Bootstrap

*/

import ModuleRegistry

from "../registry/moduleRegistry.js";

import AgentRegistry

from "../registry/agentRegistry.js";

// =====================

// Agents

// =====================

import InvestmentAgent

from "../../modules/investment/agent/investmentAgent.js";

// =====================

// Tax

// =====================

import TaxFacade

from "../../tax/taxFacade.js";

// =====================

// Liability

// =====================

import LiabilityModule

from "../modules/liabilityModule.js";

// =====================

// Income

// =====================

import IncomeModule

from "../modules/incomeModule.js";

// =====================

// Cashflow

// =====================

import CashflowModule

from "../modules/cashflowModule.js";

// =====================

// Tax Instance

// =====================

const taxModule =

new TaxFacade();

// =====================

// Bootstrap

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

        ModuleRegistry.register(

            "cashflow",

            CashflowModule

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
