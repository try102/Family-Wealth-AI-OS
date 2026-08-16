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

        // IMPORTANT:

        //

        // CashflowIntegration MUST receive

        // the REAL TransactionManager.

        //

        // Otherwise existing Transactions

        // cannot be synchronized into Cashflow.

        //

        // ==================================================

        const transactionManager =

            transactionModule.getManager();

        console.log(

            "Transaction Manager:",

            transactionManager

        );

        const existingTransactions =

            transactionManager

                .getAllTransactions();

        console.log(

            "Existing Transactions:",

            existingTransactions

        );

        console.log(

            "Existing Transaction Count:",

            existingTransactions.length

        );

        const cashflowStatus =

            CashflowIntegration.initialize(

                transactionManager

            );

        console.log(

            "Cashflow Integration:",

            cashflowStatus

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

        // Final Transaction Status

        //

        // ==================================================

        const transactionStatus =

            transactionModule

                .getStatus();

        console.log(

            "Transaction Status:",

            transactionStatus

        );

        // ==================================================

        //

        // Final Cashflow Status

        //

        // ==================================================

        const finalCashflowStatus =

            CashflowIntegration

                .getStatus();

        console.log(

            "Cashflow Status:",

            finalCashflowStatus

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

            transaction:

                transactionStatus,

            cashflow:

                finalCashflowStatus

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
