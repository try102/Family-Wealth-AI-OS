/*

Family Wealth AI OS

Schema Manager Test

*/

import SchemaManager from "../schemaManager.js";

// =====================

// Reset

// =====================

SchemaManager.clear();

// =====================

// Register Test

// =====================

const schema =

SchemaManager.register(

    "ASSET",

    "V7.0",

    {

        name:

        "string",

        value:

        "number",

        category:

        "string"

    }

);

console.log(

    "Schema:",

    schema

);

if(

    schema.name !==

    "ASSET"

){

    throw new Error(

        "Schema register failed"

    );

}

// =====================

// Get Test

// =====================

const current =

SchemaManager.get(

    "ASSET"

);

if(

    current.version !==

    "V7.0"

){

    throw new Error(

        "Schema get failed"

    );

}

// =====================

// Update Version Test

// =====================

const updated =

SchemaManager.updateVersion(

    "ASSET",

    "V7.1"

);

if(

    updated.version !==

    "V7.1"

){

    throw new Error(

        "Schema update version failed"

    );

}

// =====================

// List Test

// =====================

const list =

SchemaManager.list();

if(

    !list.ASSET

){

    throw new Error(

        "Schema list failed"

    );

}

// =====================

// Remove Test

// =====================

SchemaManager.remove(

    "ASSET"

);

if(

    SchemaManager.get(

        "ASSET"

    )

){

    throw new Error(

        "Schema remove failed"

    );

}

console.log(

    "Schema Manager Test Passed"

);
