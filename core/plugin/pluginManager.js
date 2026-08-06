/*

Family Wealth AI OS

Plugin Manager

*/

const PluginManager = {

    plugins:{},

    register(

        name,

        plugin

    ){

        this.plugins[name] = {

            plugin,

            enabled:

            false

        };

        return name;

    },

    enable(

        name

    ){

        if(

            this.plugins[name]

        ){

            this.plugins[name]

            .enabled = true;

            return true;

        }

        return false;

    },

    disable(

        name

    ){

        if(

            this.plugins[name]

        ){

            this.plugins[name]

            .enabled = false;

            return true;

        }

        return false;

    },

    get(

        name

    ){

        return this.plugins[name];

    },

    list(){

        return this.plugins;

    },

    remove(

        name

    ){

        delete this.plugins[name];

    },

    clear(){

        this.plugins={};

    }

};

export default PluginManager;
