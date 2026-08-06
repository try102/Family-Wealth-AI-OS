/*

Family Wealth AI OS

AI Advisor

*/

import AgentRegistry from "../core/registry/agentRegistry.js";

const Advisor = {

    name:

    "Family Wealth AI Advisor",

    ask(

        agentName,

        method,

        params=[]

    ){

        const agent =

        AgentRegistry.get(

            agentName

        );

        if(!agent){

            return {

                error:

                "Agent not found"

            };

        }

        if(

            typeof agent[method]

            !==

            "function"

        ){

            return {

                error:

                "Method not found"

            };

        }

        return agent[method](

            ...params

        );

    },

    listAgents(){

        return AgentRegistry.list();

    }

};

export default Advisor;
