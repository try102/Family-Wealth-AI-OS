/*

Family Wealth AI OS

Module Registry

*/

const modules = {};

const ModuleRegistry = {

    register(

        name,

        module

    ){

        modules[name] = module;

    },

    get(

        name

    ){

        return modules[name];

    },

    list(){

        return Object.keys(

            modules

        );

    },

    remove(

        name

    ){

        delete modules[name];

    }

};

export default ModuleRegistry;
