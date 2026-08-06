/*

Family Wealth AI OS

Feature Manager Test

*/

import FeatureManager from "../featureManager.js";

// =====================

// Reset

// =====================

FeatureManager.clear();

// =====================

// Enable Test

// =====================

const enabled =

FeatureManager.enable(

    "AI_ADVISOR"

);

console.log(

    "Enable:",

    enabled

);

if(

    enabled !== true

){

    throw new Error(

        "Enable failed"

    );

}

if(

    FeatureManager.isEnabled(

        "AI_ADVISOR"

    )

    !== true

){

    throw new Error(

        "Feature status failed"

    );

}

// =====================

// Disable Test

// =====================

const disabled =

FeatureManager.disable(

    "AI_ADVISOR"

);

console.log(

    "Disable:",

    disabled

);

if(

    disabled !== false

){

    throw new Error(

        "Disable failed"

    );

}

if(

    FeatureManager.isEnabled(

        "AI_ADVISOR"

    )

){

    throw new Error(

        "Disable status failed"

    );

}

// =====================

// Set Test

// =====================

FeatureManager.set(

    "TAX_AGENT",

    true

);

if(

    !FeatureManager.isEnabled(

        "TAX_AGENT"

    )

){

    throw new Error(

        "Set feature failed"

    );

}

// =====================

// List Test

// =====================

const list =

FeatureManager.list();

console.log(

    "Features:",

    list

);

if(

    !list.TAX_AGENT

){

    throw new Error(

        "List failed"

    );

}

// =====================

// Clear Test

// =====================

FeatureManager.clear();

if(

    Object.keys(

        FeatureManager.list()

    )

    .length !==0

){

    throw new Error(

        "Clear failed"

    );

}

console.log(

    "Feature Manager Test Passed"

);
