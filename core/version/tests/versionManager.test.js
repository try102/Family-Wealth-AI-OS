/*

Family Wealth AI OS

Version Manager Test

*/

import VersionManager from "../versionManager.js";

// =====================

// Current Version

// =====================

const current =

VersionManager.getCurrent();

console.log(

    "Current Version:",

    current

);

if(

    current !==

    "7.0.0"

){

    throw new Error(

        "Current version failed"

    );

}

// =====================

// History

// =====================

const history =

VersionManager.getHistory();

console.log(

    "Version History:",

    history

);

if(

    history.length === 0

){

    throw new Error(

        "Version history failed"

    );

}

// =====================

// Compare

// =====================

const compare =

VersionManager.compare(

    "7.0.0"

);

console.log(

    "Compare:",

    compare

);

if(

    compare.same !== true

){

    throw new Error(

        "Version compare failed"

    );

}

// =====================

// Set Version

// =====================

VersionManager.setVersion(

    "7.1.0"

);

if(

    VersionManager.getCurrent()

    !==

    "7.1.0"

){

    throw new Error(

        "Version update failed"

    );

}

console.log(

    "Version Manager Test Passed"

);
