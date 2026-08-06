/*

Family Wealth AI OS

Plugin Manager Test

*/

import PluginManager from "../pluginManager.js";

// =====================

// Reset

// =====================

PluginManager.clear();

// =====================

// Register Test

// =====================

const plugin =

PluginManager.register(

    "TAX_PLUGIN",

    {

        name:

        "Tax Analysis",

        version:

        "1.0"

    }

);

console.log(

    "Plugin:",

    plugin

);

if(

    plugin !==

    "TAX_PLUGIN"

){

    throw new Error(

        "Plugin register failed"

    );

}

// =====================

// Get Test

// =====================

const taxPlugin =

PluginManager.get(

    "TAX_PLUGIN"

);

if(

    taxPlugin.plugin.name !==

    "Tax Analysis"

){

    throw new Error(

        "Plugin get failed"

    );

}

// =====================

// Enable Test

// =====================

const enabled =

PluginManager.enable(

    "TAX_PLUGIN"

);

if(

    enabled !== true

){

    throw new Error(

        "Plugin enable failed"

    );

}

if(

    PluginManager.get(

        "TAX_PLUGIN"

    )

    .enabled !== true

){

    throw new Error(

        "Plugin status failed"

    );

}

// =====================

// Disable Test

// =====================

PluginManager.disable(

    "TAX_PLUGIN"

);

if(

    PluginManager.get(

        "TAX_PLUGIN"

    )

    .enabled !== false

){

    throw new Error(

        "Plugin disable failed"

    );

}

// =====================

// Remove Test

// =====================

PluginManager.remove(

    "TAX_PLUGIN"

);

if(

    PluginManager.get(

        "TAX_PLUGIN"

    )

){

    throw new Error(

        "Plugin remove failed"

    );

}

console.log(

    "Plugin Manager Test Passed"

);
