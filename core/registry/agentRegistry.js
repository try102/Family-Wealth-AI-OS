/*

Family Wealth AI OS

Agent Registry

*/

const AgentRegistry = {

    agents:{},

    register(

        name,

        agent

    ){

        this.agents[name] = agent;

    },

    get(

        name

    ){

        return this.agents[name];

    },

    list(){

        return Object.keys(

            this.agents

        );

    },

    remove(

        name

    ){

        delete this.agents[name];

    }

};

export default AgentRegistry;
