/*

Family Wealth AI OS V7

Auth Test

*/

import Auth from "../auth.js";

// Reset

Auth.clear();

// =====================

// Register Test

// =====================

const user =

Auth.register({

    username:

    "admin",

    password:

    "123456",

    role:

    "OWNER"

});

if(

    user.username !== "admin"

){

    throw new Error(

        "Auth register failed"

    );

}

// =====================

// Login Success Test

// =====================

const login =

Auth.login(

    "admin",

    "123456"

);

if(

    login.success !== true

){

    throw new Error(

        "Auth login failed"

    );

}

if(

    login.user.role !== "OWNER"

){

    throw new Error(

        "Auth role failed"

    );

}

// =====================

// Login Failed Test

// =====================

const failed =

Auth.login(

    "admin",

    "wrong"

);

if(

    failed.success !== false

){

    throw new Error(

        "Auth invalid password failed"

    );

}

// =====================

// Clear Test

// =====================

Auth.clear();

if(

    Auth.users.length !==0

){

    throw new Error(

        "Auth clear failed"

    );

}

console.log(

    "Auth Test Passed"

);
