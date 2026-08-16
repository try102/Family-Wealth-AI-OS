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

// ==================================================

import AccountIntegration

    from "../integration/accountIntegration.js";

// ==================================================

//

// Transaction Module

//

// ==================================================

import TransactionModule

    from "../../transaction/transactionModule.js";

// ==================================================

//

// Transaction Integration

//

// ==================================================

import TransactionIntegration

    from "../integration/transactionIntegration.js";

// ==================================================

//

// Cashflow Integration

//

// Transaction → EventBus → Cashflow

//

// ==================================================

import CashflowIntegration

    from "../integration/cashflowIntegration.js";

// ==================================================

//

// Tax Instance

//

// ==================================================

const taxModule =

    new TaxFacade();

// ==================================================

//

// Transaction Instance

//

// ==================================================

const transactionModule =

    new TransactionModule();

// ==================================================

//

// System Bootstrap

//

// ==================================================

const SystemBootstrap = {

    initialize() {

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

        AccountIntegration.initialize();

        // ==================================================

        //

        // Transaction

        //

        // ==================================================

        /*

         *

         * Connect the real Transaction Facade

         * to the system-level Integration boundary.

         *

         */

        TransactionIntegration.setFacade(

            transactionModule.getFacade()

        );

        ModuleRegistry.register(

            "transaction",

            TransactionIntegration

        );

        TransactionIntegration.initialize();

        // ==================================================

        //

        // Cashflow Integration

        //

        // ==================================================

        CashflowIntegration.initialize();

        // ==================================================

        //

        // Synchronize Existing Transactions

        //

        // Transaction → Cashflow

        //

        // ==================================================

        const existingTransactions =

            transactionModule

                .getManager()

                .getAllTransactions();

        const cashflowSyncResult =

            CashflowIntegration

                .synchronizeTransactions(

                    existingTransactions

                );

        console.log(

            "Cashflow Transaction Sync:",

            cashflowSyncResult

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

                Advisor.name,

            cashflowSync:

                cashflowSyncResult

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
