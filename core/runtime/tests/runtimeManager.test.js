/*

Family Wealth AI OS

Runtime Manager Test

*/

import RuntimeManager from "../runtimeManager.js";

// =====================

// Reset

// =====================

RuntimeManager.reset();

// =====================

// Initial Status Test

// =====================

const initial =

RuntimeManager.getStatus();

console.log(

    "Initial:",

    initial

);

if(

    initial.status !==

    "CREATED"

){

    throw new Error(

        "Initial status failed"

    );

}

// =====================

// Start Test

// =====================

const started =

RuntimeManager.start();

console.log(

    "Started:",

    started

);

if(

    started !==

    "RUNNING"

){

    throw new Error(

        "Runtime start failed"

    );

}

const running =

RuntimeManager.getStatus();

if(

    !running.startedAt

){

    throw new Error(

        "Start time missing"

    );

}

// =====================

// Uptime Test

// =====================

const uptime =

RuntimeManager.uptime();

console.log(

    "Uptime:",

    uptime

);

if(

    uptime < 0

){

    throw new Error(

        "Uptime failed"

    );

}

// =====================

// Stop Test

// =====================

const stopped =

RuntimeManager.stop();

if(

    stopped !==

    "STOPPED"

){

    throw new Error(

        "Runtime stop failed"

    );

}

// =====================

// Restart Test

// =====================

const restarted =

RuntimeManager.restart();

if(

    restarted !==

    "RUNNING"

){

    throw new Error(

        "Runtime restart failed"

    );

}

// =====================

// Reset Test

// =====================

RuntimeManager.reset();

if(

    RuntimeManager.getStatus()

    .status !==

    "CREATED"

){

    throw new Error(

        "Runtime reset failed"

    );

}

console.log(

    "Runtime Manager Test Passed"

);
