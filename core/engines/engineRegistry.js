/*

Family Wealth AI OS

Financial Engine Registry

*/

const EngineRegistry = {

    engines:{},

    register(

        name,

        engine

    ){

        this.engines[name] = engine;

    },

    get(

        name

    ){

        return this.engines[name];

    },

    list(){

        return Object.keys(

            this.engines

        );

    },

    remove(

        name

    ){

        delete this.engines[name];

    }

};

export default EngineRegistry;
