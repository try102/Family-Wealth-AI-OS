/*

Family Wealth AI OS V7

Plugin Manager

*/

const PluginManager = {

    plugins:[],

    register(

        plugin

    ){

        if(

            !plugin.name

        ){

            throw new Error(

                "Plugin name required"

            );

        }

        this.plugins.push(

            plugin

        );

        if(

            plugin.init

        ){

            plugin.init();

        }

        return plugin;

    },

    list(){

        return this.plugins;

    },

    get(

        name

    ){

        return this.plugins.find(

            plugin =>

            plugin.name === name

        );

    },

    remove(

        name

    ){

        this.plugins =

        this.plugins.filter(

            plugin =>

            plugin.name !== name

        );

    },

    clear(){

        this.plugins=[];

    }

};

export default PluginManager;
