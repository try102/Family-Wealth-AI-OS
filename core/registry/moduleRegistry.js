/*

Family Wealth AI OS

Module Registry

*/

const ModuleRegistry = {

    modules:{},

    register(

        name,

        module

    ){

        this.modules[name] = module;

    },

    get(

        name

    ){

        return this.modules[name];

    },

    list(){

        return Object.keys(

            this.modules

        );

    },

    remove(

        name

    ){

        delete this.modules[name];

    }

};

export default ModuleRegistry;
