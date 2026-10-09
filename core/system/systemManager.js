/*

Family Wealth AI OS

System Manager

*/

import SystemBootstrap from "../bootstrap/systemBootstrap.js?v=20261008ae";

import ModuleRegistry from "../registry/moduleRegistry.js?v=20261008ae";

import AgentRegistry from "../registry/agentRegistry.js?v=20261008ae";

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
