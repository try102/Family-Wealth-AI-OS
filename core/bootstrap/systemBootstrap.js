/*

 *

 * Family Wealth AI OS V7

 *

 * System Bootstrap

 *

 */

import ModuleRegistry

    from "../registry/moduleRegistry.js";

import AgentRegistry

    from "../registry/agentRegistry.js";

// ==================================================

//

// Engine Registry

//

// ==================================================

import EngineRegistry

    from "../engines/engineRegistry.js";

import WealthEngine

    from "../engines/wealth/wealthEngine.js";

import CashFlowEngine

    from "../engines/cashflow/cashFlowEngine.js";

// ==================================================

//

// AI Registry

//

// ==================================================

import AIRegistry

    from "../../ai/aiRegistry.js";

import Advisor

    from "../../ai/advisor.js";

// ==================================================

//

// Agents

//

// ==================================================

import InvestmentAgent

    from "../../modules/investment/agent/investmentAgent.js";

// ==================================================

//

// Modules

//

// ==================================================

import TaxFacade

    from "../../tax/taxFacade.js";

import LiabilityModule

    from "../modules/liabilityModule.js";

import IncomeModule

    from "../modules/incomeModule.js";

import CashflowModule

    from "../modules/cashflowModule.js";

import AssetsModule

    from "../modules/assetsModule.js";

// ==================================================

//

// Account

//

// IMPORTANT:

// AccountIntegration uses NAMED EXPORT.

//

// ==================================================

import {

    AccountIntegration

}

from "../integration/accountIntegration.js";

// ==================================================

//

// Transaction

//

// IMPORTANT:

// TransactionIntegration uses NAMED EXPORT.

//

// ==================================================

import {

    TransactionIntegration

}

from "../integration/transactionIntegration.js";

// ==================================================

//

// Tax Instance

//

// ==================================================

const taxModule =

    new TaxFacade();

// ==================================================

//

// System Bootstrap

//

// ==================================================

const SystemBootstrap = {

    initialize(){

        console.log(

            "Family Wealth AI OS Starting..."

        );

        // ==================================================

        //

        // Agents

        //

        // ==================================================

        AgentRegistry.register(

            "investment",

            InvestmentAgent

        );

        // ==================================================

        //

        // Modules

        //

        // ==================================================

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

        ModuleRegistry.register(

            "assets",

            AssetsModule

        );

        // ==================================================

        //

        // Account

        //

        // ==================================================

        ModuleRegistry.register(

            "account",

            AccountIntegration

        );

        // ==================================================

        //

        // Transaction

        //

        // ==================================================

        ModuleRegistry.register(

            "transaction",

            TransactionIntegration

        );

        // ==================================================

        //

        // Engines

        //

        // ==================================================

        EngineRegistry.register(

            "wealth",

            WealthEngine

        );

        EngineRegistry.register(

            "cashflow",

            CashFlowEngine

        );

        // ==================================================

        //

        // AI

        //

        // ==================================================

        AIRegistry.register(

            "advisor",

            Advisor

        );

        // ==================================================

        //

        // Logs

        //

        // ==================================================

        console.log(

            "Registered Agents:",

            AgentRegistry.list()

        );

        console.log(

            "Registered Modules:",

            ModuleRegistry.list()

        );

        console.log(

            "Registered Engines:",

            EngineRegistry.list()

        );

        console.log(

            "Registered AI:",

            AIRegistry.list()

        );

        // ==================================================

        //

        // Ready

        //

        // ==================================================

        return {

            status:

                "READY",

            advisor:

                Advisor.name

        };

    }

};

// ==================================================

//

// Export

//

// ==================================================

export default

    SystemBootstrap;
