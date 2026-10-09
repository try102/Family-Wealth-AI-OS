/*

 *

 * Family Wealth AI OS V7

 *

 * System Bootstrap

 *

 */

import ModuleRegistry

    from "../registry/moduleRegistry.js?v=20261008ae";

import AgentRegistry

    from "../registry/agentRegistry.js?v=20261008ae";

// ==================================================

//

// Engine Registry

//

// ==================================================

import EngineRegistry

    from "../engines/engineRegistry.js?v=20261008ae";

import WealthEngine

    from "../engines/wealth/wealthEngine.js?v=20261008ae";

import CashFlowEngine

    from "../engines/cashflow/cashFlowEngine.js?v=20261008ae";

// ==================================================

//

// AI Registry

//

// ==================================================

import AIRegistry

    from "../../ai/aiRegistry.js?v=20261008ae";

import Advisor

    from "../../ai/advisor.js?v=20261008ae";

// ==================================================

//

// Agents

//

// ==================================================

import InvestmentAgent

    from "../../modules/investment/agent/investmentAgent.js?v=20261008ae";

// ==================================================

//

// Modules

//

// ==================================================

import TaxFacade

    from "../../tax/taxFacade.js?v=20261008ae";

import LiabilityModule

    from "../modules/liabilityModule.js?v=20261008ae";

import IncomeModule

    from "../modules/incomeModule.js?v=20261008ae";

import CashflowModule

    from "../modules/cashflowModule.js?v=20261008ae";

import AssetsModule

    from "../modules/assetsModule.js?v=20261008ae";

// ==================================================

//

// Account Module

//

// ==================================================

import AccountModule

    from "../../account/accountModule.js?v=20261008ae";

// ==================================================

//

// Account Integration

//

// ==================================================

import AccountIntegration

    from "../integration/accountIntegration.js?v=20261008ae";

// ==================================================

//

// Transaction Module

//

// ==================================================

import TransactionModule

    from "../../transaction/transactionModule.js?v=20261008ae";

// ==================================================

//

// Transaction Integration

//

// ==================================================

import TransactionIntegration

    from "../integration/transactionIntegration.js?v=20261008ae";

// ==================================================

//

// Cashflow Integration

//

// Transaction → EventBus → Cashflow

//

// ==================================================

import CashflowIntegration

    from "../integration/cashflowIntegration.js?v=20261008ae";

// ==================================================

//

// Tax Instance

//

// ==================================================

const taxModule =

    new TaxFacade();

// ==================================================

//

// Account Instance

//

// ==================================================

const accountModule =

    new AccountModule();

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

        /*

         *

         * Register the real Account Module.

         *

         */

        ModuleRegistry.register(

            "account",

            accountModule

        );

        /*

         *

         * Initialize the Account integration

         * boundary.

         *

         */

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

        // Transaction → Cashflow

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

        // Account Status

        //

        // ==================================================

        const accountStatus =

            accountModule

                .getStatus();

        console.log(

            "Account Status:",

            accountStatus

        );

        // ==================================================

        //

        // Transaction Status

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

            account:

                accountStatus,

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

export default SystemBootstrap;
