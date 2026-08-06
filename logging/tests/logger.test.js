/*

Family Wealth AI OS V7

Logger Test

*/

import Logger from "../logger.js";

// =====================

// Reset

// =====================

Logger.clear();

// =====================

// INFO Test

// =====================

const info =

Logger.info(

    "System Started"

);

if(

    info.level !== "INFO"

){

    throw new Error(

        "Logger INFO failed"

    );

}

if(

    info.message !== "System Started"

){

    throw new Error(

        "Logger message failed"

    );

}

// =====================

// WARN Test

// =====================

const warn =

Logger.warn(

    "Low Memory"

);

if(

    warn.level !== "WARN"

){

    throw new Error(

        "Logger WARN failed"

    );

}

// =====================

// ERROR Test

// =====================

const error =

Logger.error(

    "Database Error"

);

if(

    error.level !== "ERROR"

){

    throw new Error(

        "Logger ERROR failed"

    );

}

// =====================

// DEBUG Test

// =====================

const debug =

Logger.debug(

    "API Request"

);

if(

    debug.level !== "DEBUG"

){

    throw new Error(

        "Logger DEBUG failed"

    );

}

// =====================

// List Test

// =====================

const logs =

Logger.list();

if(

    logs.length !==4

){

    throw new Error(

        "Logger list failed"

    );

}

// =====================

// Clear Test

// =====================

Logger.clear();

if(

    Logger.list().length !==0

){

    throw new Error(

        "Logger clear failed"

    );

}

console.log(

    "Logger Test Passed"

);
