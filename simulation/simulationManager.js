/*

Family Wealth AI OS V7.4

Simulation Manager

*/

import Simulation from "./simulation.js";

const SimulationManager = {

    simulations: [],

    add(

        simulation

    ){

        if(

            !(simulation instanceof Simulation)

        ){

            throw new Error(

                "Invalid simulation"

            );

        }

        this.simulations.push(

            simulation

        );

        return simulation;

    },

    list(){

        return this.simulations;

    },

    get(

        id

    ){

        return this.simulations.find(

            simulation =>

            simulation.id === id

        );

    },

    update(

        id,

        data

    ){

        const simulation =

        this.get(

            id

        );

        if(

            !simulation

        ){

            return null;

        }

        Object.assign(

            simulation,

            data

        );

        return simulation;

    },

    remove(

        id

    ){

        this.simulations =

        this.simulations.filter(

            simulation =>

            simulation.id !== id

        );

    },

    clear(){

        this.simulations=[];

    }

};

export default SimulationManager;
