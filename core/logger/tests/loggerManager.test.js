/*

Family Wealth AI OS

Logger Manager Test

*/

import LoggerManager from "../loggerManager.js";

// =====================

// Reset

// =====================

LoggerManager.clear();

// =====================

// Info Test

// =====================

const info =

LoggerManager.info(

    "System Started",

    {

        version:

        "7.0"

    }

);

console.log(

    "Info:",

    info

);

if(

    info.level !==

    "INFO"

){

    throw new Error(

        "Info log failed"

    );

}

// =====================

// Warn Test

// =====================

const warn =

LoggerManager.warn(

    "Portfolio Risk High"

);

if(

    warn.level !==

    "WARN"

){

    throw new Error(

        "Warn log failed"

    );

}

// =====================

// Error Test

// =====================

const error =

LoggerManager.error(

    "Database Error"

);

if(

    error.level !==

    "ERROR"

){

    throw new Error(

        "Error log failed"

    );

}

// =====================

// All Logs

// =====================

const logs =

LoggerManager.all();

console.log(

    "Logs:",

    logs

);

if(

    logs.length !== 3

){

    throw new Error(

        "Log count failed"

    );

}

// =====================

// Level Search

// =====================

const errors =

LoggerManager.findByLevel(

    "ERROR"

);

if(

    errors.length !== 1

){

    throw new Error(

        "Find level failed"

    );

}

// =====================

// Clear Test

// =====================

LoggerManager.clear();

if(

    LoggerManager.all()

    .length !==0

){

    throw new Error(

        "Clear logs failed"

    );

}

console.log(

    "Logger Manager Test Passed"

);
