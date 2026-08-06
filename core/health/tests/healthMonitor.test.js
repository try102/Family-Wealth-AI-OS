/*

Family Wealth AI OS

Health Monitor Test

*/

import HealthMonitor from "../healthMonitor.js";

// =====================

// System Check

// =====================

const system =

HealthMonitor.checkSystem();

console.log(

    "System Health:",

    system

);

if(

    !system

){

    throw new Error(

        "System health failed"

    );

}

// =====================

// Module Check

// =====================

const modules =

HealthMonitor.checkModules();

console.log(

    "Module Health:",

    modules

);

if(

    typeof modules.count

    !==

    "number"

){

    throw new Error(

        "Module check failed"

    );

}

// =====================

// Agent Check

// =====================

const agents =

HealthMonitor.checkAgents();

console.log(

    "Agent Health:",

    agents

);

if(

    typeof agents.count

    !==

    "number"

){

    throw new Error(

        "Agent check failed"

    );

}

// =====================

// Full Check

// =====================

const full =

HealthMonitor.fullCheck();

console.log(

    "Full Health:",

    full

);

if(

    !full.system

    ||

    !full.modules

    ||

    !full.agents

){

    throw new Error(

        "Full health check failed"

    );

}

console.log(

    "Health Monitor Test Passed"

);
