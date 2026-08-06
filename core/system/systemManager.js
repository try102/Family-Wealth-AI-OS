/*

Family Wealth AI OS

System Manager

*/

import SystemBootstrap from "../bootstrap/systemBootstrap.js";

import ModuleRegistry from "../registry/moduleRegistry.js";

import AgentRegistry from "../registry/agentRegistry.js";

const SystemManager = {

    initialized:false,

    start(){

        const result =

        SystemBootstrap.initialize();

        this.initialized =

        true;

        return result;

    },

    status(){

        return {

            initialized:

            this.initialized,

            modules:

            ModuleRegistry.list(),

            agents:

            AgentRegistry.list()

        };

    },

    getModules(){

        return ModuleRegistry.list();

    },

    getAgents(){

        return AgentRegistry.list();

    }

};

export default SystemManager;
