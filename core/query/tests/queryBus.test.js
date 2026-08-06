/*

Family Wealth AI OS

Query Bus Test

*/

import QueryBus from "../queryBus.js";

// =====================

// Reset

// =====================

QueryBus.clear();

// =====================

// Register Test

// =====================

const query =

QueryBus.register(

    "GET_NET_WORTH",

    (params)=>{

        return {

            netWorth:

            params.assets -

            params.liabilities

        };

    }

);

console.log(

    "Query:",

    query

);

if(

    query !==

    "GET_NET_WORTH"

){

    throw new Error(

        "Query register failed"

    );

}

// =====================

// Execute Test

// =====================

const result =

QueryBus.execute(

    "GET_NET_WORTH",

    {

        assets:

        1500000,

        liabilities:

        500000

    }

);

console.log(

    "Query Result:",

    result

);

if(

    result.netWorth !==

    1000000

){

    throw new Error(

        "Query execute failed"

    );

}

// =====================

// List Test

// =====================

const list =

QueryBus.list();

if(

    list.length !==1

){

    throw new Error(

        "Query list failed"

    );

}

// =====================

// Remove Test

// =====================

QueryBus.remove(

    "GET_NET_WORTH"

);

if(

    QueryBus.list()

    .length !==0

){

    throw new Error(

        "Query remove failed"

    );

}

console.log(

    "Query Bus Test Passed"

);
