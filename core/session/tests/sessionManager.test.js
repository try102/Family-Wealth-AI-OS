/*

Family Wealth AI OS

Session Manager Test

*/

import SessionManager from "../sessionManager.js";

// =====================

// Reset

// =====================

SessionManager.clear();

// =====================

// Create Test

// =====================

const session =

SessionManager.create(

    "session_001",

    {

        user:

        "OWNER",

        module:

        "INVESTMENT"

    }

);

console.log(

    "Session:",

    session

);

if(

    session.id !==

    "session_001"

){

    throw new Error(

        "Session create failed"

    );

}

// =====================

// Get Test

// =====================

const current =

SessionManager.get(

    "session_001"

);

if(

    current.data.user !==

    "OWNER"

){

    throw new Error(

        "Session get failed"

    );

}

// =====================

// Update Test

// =====================

const updated =

SessionManager.update(

    "session_001",

    {

        module:

        "ADVISOR"

    }

);

console.log(

    "Updated:",

    updated

);

if(

    updated.data.module !==

    "ADVISOR"

){

    throw new Error(

        "Session update failed"

    );

}

// =====================

// List Test

// =====================

const list =

SessionManager.list();

if(

    list.length !==1

){

    throw new Error(

        "Session list failed"

    );

}

// =====================

// Remove Test

// =====================

SessionManager.remove(

    "session_001"

);

if(

    SessionManager.get(

        "session_001"

    )

){

    throw new Error(

        "Session remove failed"

    );

}

// =====================

// Clear Test

// =====================

SessionManager.create(

    "test"

);

SessionManager.clear();

if(

    SessionManager.list()

    .length !==0

){

    throw new Error(

        "Session clear failed"

    );

}

console.log(

    "Session Manager Test Passed"

);
