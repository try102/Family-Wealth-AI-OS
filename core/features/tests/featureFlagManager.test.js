/*

Family Wealth AI OS

Feature Flag Manager Test

*/

import FeatureFlagManager from "../featureFlagManager.js";

// =====================

// Reset

// =====================

FeatureFlagManager.clear();

// =====================

// Create Test

// =====================

const feature =

FeatureFlagManager.create(

    "AI_ADVISOR_V2",

    false

);

console.log(

    "Feature:",

    feature

);

if(

    feature.name !==

    "AI_ADVISOR_V2"

){

    throw new Error(

        "Feature create failed"

    );

}

// =====================

// Initial Status Test

// =====================

if(

    FeatureFlagManager

    .isEnabled(

        "AI_ADVISOR_V2"

    )

){

    throw new Error(

        "Initial feature status failed"

    );

}

// =====================

// Enable Test

// =====================

const enabled =

FeatureFlagManager.enable(

    "AI_ADVISOR_V2"

);

if(

    enabled !== true

){

    throw new Error(

        "Feature enable failed"

    );

}

if(

    !FeatureFlagManager

    .isEnabled(

        "AI_ADVISOR_V2"

    )

){

    throw new Error(

        "Feature status enable failed"

    );

}

// =====================

// Disable Test

// =====================

FeatureFlagManager.disable(

    "AI_ADVISOR_V2"

);

if(

    FeatureFlagManager

    .isEnabled(

        "AI_ADVISOR_V2"

    )

){

    throw new Error(

        "Feature disable failed"

    );

}

// =====================

// Remove Test

// =====================

FeatureFlagManager.remove(

    "AI_ADVISOR_V2"

);

if(

    FeatureFlagManager.list()

    .AI_ADVISOR_V2

){

    throw new Error(

        "Feature remove failed"

    );

}

console.log(

    "Feature Flag Manager Test Passed"

);
