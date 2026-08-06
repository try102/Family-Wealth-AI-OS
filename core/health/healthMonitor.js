/*

Family Wealth AI OS

Health Monitor

*/

import ModuleRegistry from "../registry/moduleRegistry.js";

import AgentRegistry from "../registry/agentRegistry.js";

import SystemManager from "../system/systemManager.js";

const HealthMonitor = {

    checkSystem(){

        return {

            status:

            "HEALTHY",

            initialized:

            SystemManager.initialized

        };

    },

    checkModules(){

        const modules =

        ModuleRegistry.list();

        return {

            status:

            modules.length > 0

            ?

            "HEALTHY"

            :

            "EMPTY",

            count:

            modules.length

        };

    },

    checkAgents(){

        const agents =

        AgentRegistry.list();

        return {

            status:

            agents.length > 0

            ?

            "HEALTHY"

            :

            "EMPTY",

            count:

            agents.length

        };

    },

    fullCheck(){

        return {

            system:

            this.checkSystem(),

            modules:

            this.checkModules(),

            agents:

            this.checkAgents()

        };

    }

};

export default HealthMonitor;
