/*

Family Wealth AI OS V7

Advisor AI

AI Wealth Orchestration Layer

*/

import ModuleRegistry

from "../core/registry/moduleRegistry.js";

import EngineRegistry

from "../core/engines/engineRegistry.js";

import AdvisorReport

from "./advisorReport.js";

const Advisor = {

    name:

    "Family Wealth Advisor AI V7",

    version:

    "7.0",

    status:

    "READY",

    modules(){

        return ModuleRegistry.list();

    },

    engines(){

        return EngineRegistry.list();

    },

    analyze(){

        const assets =

        ModuleRegistry.get(

            "assets"

        );

        const income =

        ModuleRegistry.get(

            "income"

        );

        const liability =

        ModuleRegistry.get(

            "liability"

        );

        const cashflow =

        ModuleRegistry.get(

            "cashflow"

        );

        const investment =

        ModuleRegistry.get(

            "investment"

        );

        const tax =

        ModuleRegistry.get(

            "tax"

        );

        return AdvisorReport.generate(

            {

                assets,

                income,

                liabilities:

                liability,

                cashflow,

                investment,

                tax

            }

        );

    },

    wealthReport(){

        const wealthEngine =

        EngineRegistry.get(

            "wealth"

        );

        const cashflowEngine =

        EngineRegistry.get(

            "cashflow"

        );

        return {

            advisor:

            this.name,

            wealthEngine:

            wealthEngine

            ?

            "CONNECTED"

            :

            "MISSING",

            cashflowEngine:

            cashflowEngine

            ?

            "CONNECTED"

            :

            "MISSING"

        };

    }

};

export default Advisor;
