/*

Family Wealth AI OS V7

Advisor AI

AI Wealth Orchestration Layer

*/

import ModuleRegistry

from "../core/registry/moduleRegistry.js";

import EngineRegistry

from "../core/engines/engineRegistry.js";

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

        return {

            profile:

            {

                modules:

                this.modules(),

                engines:

                this.engines()

            },

            recommendations:

            {

                asset:

                assets

                ?

                "Asset analysis available"

                :

                "Asset module unavailable",

                income:

                income

                ?

                "Income analysis available"

                :

                "Income module unavailable",

                liability:

                liability

                ?

                "Liability analysis available"

                :

                "Liability module unavailable",

                cashflow:

                cashflow

                ?

                "Cashflow analysis available"

                :

                "Cashflow module unavailable",

                investment:

                investment

                ?

                "Investment analysis available"

                :

                "Investment module unavailable",

                tax:

                tax

                ?

                "Tax analysis available"

                :

                "Tax module unavailable"

            }

        };

    },

    wealthReport(){

        const wealthEngine =

        EngineRegistry.get(

            "wealth"

        );

        return {

            engine:

            wealthEngine

            ?

            "Wealth Engine Connected"

            :

            "Wealth Engine Missing",

            advisor:

            this.name

        };

    }

};

export default Advisor;
