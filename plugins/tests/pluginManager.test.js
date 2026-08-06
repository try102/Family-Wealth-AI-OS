/*

Family Wealth AI OS V7

Plugin Manager Test

*/

import PluginManager from "../pluginManager.js";

// =====================

// Reset

// =====================

PluginManager.clear();

let initialized = false;

// =====================

// Register Test

// =====================

const plugin = PluginManager.register({

    name: "Tax Optimizer",

    version: "1.0.0",

    init(){

        initialized = true;

    }

});

if(plugin.name !== "Tax Optimizer"){

    throw new Error("Plugin register failed");

}

if(initialized !== true){

    throw new Error("Plugin init failed");

}

// =====================

// List Test

// =====================

const plugins = PluginManager.list();

if(plugins.length !== 1){

    throw new Error("Plugin list failed");

}

// =====================

// Get Test

// =====================

const found = PluginManager.get("Tax Optimizer");

if(!found){

    throw new Error("Plugin get failed");

}

if(found.version !== "1.0.0"){

    throw new Error("Plugin version failed");

}

// =====================

// Remove Test

// =====================

PluginManager.remove("Tax Optimizer");

if(PluginManager.list().length !== 0){

    throw new Error("Plugin remove failed");

}

// =====================

// Clear Test

// =====================

PluginManager.register({

    name:"Demo Plugin"

});

PluginManager.clear();

if(PluginManager.list().length !== 0){

    throw new Error("Plugin clear failed");

}

// =====================

// Invalid Plugin Test

// =====================

try{

    PluginManager.register({});

    throw new Error("Plugin validation failed");

}

catch(error){

    // expected

}

console.log("Plugin Manager Test Passed");
