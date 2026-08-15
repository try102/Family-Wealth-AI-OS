/*

==================================================

Family Wealth AI OS V7

System Bootstrap

==================================================

Responsibility:

- Initialize the Family Wealth AI OS

- Register Agents

- Register Modules

- Register Engines

- Register AI

- Provide one system initialization boundary

IMPORTANT:

Account is NOT registered here yet.

Reason:

The current Account subsystem files use CommonJS

(require / module.exports), while the browser V7

application uses ES Modules.

Account will be connected after its browser-compatible

ES Module boundary is completed.

Tax V7 is preserved as the existing working Tax system.

==================================================

*/

import ModuleRegistry

    from "../registry/moduleRegistry.js";

import AgentRegistry

    from "../registry/agentRegistry.js";

import EngineRegistry

    from "../engines/engineRegistry.js";

import WealthEngine

    from "../engines/wealth/wealthEngine.js";

import CashFlowEngine

    from "../engines/cashflow/cashFlowEngine.js";

import AIRegistry

    from "../../ai/aiRegistry.js";

import Advisor

    from "../../ai/advisor.js";

import InvestmentAgent

    from "../../modules/investment/agent/investmentAgent.js";

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

/*

==================================================

Tax Instance

==================================================

*/

const taxModule = new TaxFacade();

/*

==================================================

System Bootstrap

==================================================

*/

const SystemBootstrap = {

    initialized: false,

    /*

    ----------------------------------------------

    Initialize System

    ----------------------------------------------

    */

    initialize() {

        /*

        ------------------------------------------

        Prevent duplicate initialization

        ------------------------------------------

        */

        if (this.initialized) {

            return {

                status:

                    "READY",

                advisor:

                    Advisor.name

            };

        }

        console.log(

            "Family Wealth AI OS V7 Starting..."

        );

        /*

        ==========================================

        Agents

        ==========================================

        */

        AgentRegistry.register(

            "investment",

            InvestmentAgent

        );

        /*

        ==========================================

        Modules

        ==========================================

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

        /*

        ==========================================

        Engines

        ==========================================

        */

        EngineRegistry.register(

            "wealth",

            WealthEngine

        );

        EngineRegistry.register(

            "cashflow",

            CashFlowEngine

        );

        /*

        ==========================================

        AI

        ==========================================

        */

        AIRegistry.register(

            "advisor",

            Advisor

        );

        /*

        ==========================================

        Mark Initialized

        ==========================================

        */

        this.initialized = true;

        /*

        ==========================================

        Logs

        ==========================================

        */

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

        console.log(

            "Family Wealth AI OS V7 READY"

        );

        /*

        ==========================================

        Return

        ==========================================

        */

        return {

            status:

                "READY",

            advisor:

                Advisor.name

        };

    }

};

export default SystemBootstrap;
