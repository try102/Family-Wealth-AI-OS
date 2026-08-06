/*

Family Wealth AI OS

API Manager Test

*/

import APIManager from "../apiManager.js";

// =====================

// Reset

// =====================

APIManager.clear();

// =====================

// Register Test

// =====================

const route =

APIManager.register(

    "GET_WEALTH_SCORE",

    (payload)=>{

        return {

            score:

            95,

            user:

            payload.user

        };

    }

);

console.log(

    "Registered API:",

    route

);

if(

    route !==

    "GET_WEALTH_SCORE"

){

    throw new Error(

        "API register failed"

    );

}

// =====================

// List Test

// =====================

const list =

APIManager.list();

console.log(

    "API List:",

    list

);

if(

    list.length !== 1

){

    throw new Error(

        "API list failed"

    );

}

// =====================

// Call Test

// =====================

const result =

APIManager.call(

    "GET_WEALTH_SCORE",

    {

        user:

        "owner"

    }

);

console.log(

    "API Result:",

    result

);

if(

    result.score !== 95

){

    throw new Error(

        "API call failed"

    );

}

// =====================

// Remove Test

// =====================

APIManager.remove(

    "GET_WEALTH_SCORE"

);

if(

    APIManager.list()

    .length !== 0

){

    throw new Error(

        "API remove failed"

    );

}

console.log(

    "API Manager Test Passed"

);
