/*

Family Wealth AI OS

Dependency Manager Test

*/

import DependencyManager from "../dependencyManager.js";

// =====================

// Reset

// =====================

DependencyManager.clear();

// =====================

// Register Test

// =====================

const deps =

DependencyManager.register(

    "ADVISOR_AGENT",

    [

        "WEALTH_ENGINE",

        "INVESTMENT_AGENT"

    ]

);

console.log(

    "Dependencies:",

    deps

);

if(

    deps.length !== 2

){

    throw new Error(

        "Dependency register failed"

    );

}

// =====================

// Get Test

// =====================

const advisorDeps =

DependencyManager.get(

    "ADVISOR_AGENT"

);

if(

    advisorDeps[0] !==

    "WEALTH_ENGINE"

){

    throw new Error(

        "Dependency get failed"

    );

}

// =====================

// Check Success Test

// =====================

const valid =

DependencyManager.check(

    "ADVISOR_AGENT",

    [

        "WEALTH_ENGINE",

        "INVESTMENT_AGENT",

        "TAX_AGENT"

    ]

);

console.log(

    "Check:",

    valid

);

if(

    valid !== true

){

    throw new Error(

        "Dependency check failed"

    );

}

// =====================

// Check Fail Test

// =====================

const invalid =

DependencyManager.check(

    "ADVISOR_AGENT",

    [

        "WEALTH_ENGINE"

    ]

);

if(

    invalid !== false

){

    throw new Error(

        "Dependency fail check failed"

    );

}

// =====================

// Graph Test

// =====================

const graph =

DependencyManager.graph();

console.log(

    "Graph:",

    graph

);

if(

    !graph.ADVISOR_AGENT

){

    throw new Error(

        "Dependency graph failed"

    );

}

// =====================

// Remove Test

// =====================

DependencyManager.remove(

    "ADVISOR_AGENT"

);

if(

    DependencyManager.get(

        "ADVISOR_AGENT"

    )

    .length !== 0

){

    throw new Error(

        "Dependency remove failed"

    );

}

console.log(

    "Dependency Manager Test Passed"

);
