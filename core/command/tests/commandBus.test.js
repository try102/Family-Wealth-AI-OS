/*

Family Wealth AI OS

Command Bus Test

*/

import CommandBus from "../commandBus.js";

// =====================

// Reset

// =====================

CommandBus.clear();

// =====================

// Register Test

// =====================

const command =

CommandBus.register(

    "ADD_ASSET",

    (payload)=>{

        return {

            success:

            true,

            asset:

            payload.name

        };

    }

);

console.log(

    "Command:",

    command

);

if(

    command !==

    "ADD_ASSET"

){

    throw new Error(

        "Command register failed"

    );

}

// =====================

// Execute Test

// =====================

const result =

CommandBus.execute(

    "ADD_ASSET",

    {

        name:

        "House"

    }

);

console.log(

    "Result:",

    result

);

if(

    result.success !== true

){

    throw new Error(

        "Command execute failed"

    );

}

if(

    result.asset !==

    "House"

){

    throw new Error(

        "Command payload failed"

    );

}

// =====================

// List Test

// =====================

const list =

CommandBus.list();

if(

    list.length !==1

){

    throw new Error(

        "Command list failed"

    );

}

// =====================

// Remove Test

// =====================

CommandBus.remove(

    "ADD_ASSET"

);

if(

    CommandBus.list()

    .length !==0

){

    throw new Error(

        "Command remove failed"

    );

}

console.log(

    "Command Bus Test Passed"

);
