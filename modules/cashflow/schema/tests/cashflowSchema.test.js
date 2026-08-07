/*

Family Wealth AI OS V7

Cashflow Schema Test

*/

import cashflowSchema from "../cashflowSchema.js";

// =====================

// Basic Information

// =====================

if(

    cashflowSchema.name !==

    "Cashflow Schema V7"

){

    throw new Error(

        "Cashflow schema name failed"

    );

}

if(

    cashflowSchema.version !==

    "7.0"

){

    throw new Error(

        "Cashflow schema version failed"

    );

}

// =====================

// Field Check

// =====================

const fields =

cashflowSchema.fields;

if(

    !fields.id

){

    throw new Error(

        "id field missing"

    );

}

if(

    !fields.type

){

    throw new Error(

        "type field missing"

    );

}

if(

    !fields.amount

){

    throw new Error(

        "amount field missing"

    );

}

if(

    !fields.createdAt

){

    throw new Error(

        "createdAt field missing"

    );

}

// =====================

// Type Validation

// =====================

if(

    fields.type.type !==

    "string"

){

    throw new Error(

        "type field invalid"

    );

}

if(

    !fields.type.values.includes(

        "INCOME"

    )

){

    throw new Error(

        "INCOME type missing"

    );

}

if(

    !fields.type.values.includes(

        "EXPENSE"

    )

){

    throw new Error(

        "EXPENSE type missing"

    );

}

// =====================

// Amount Validation

// =====================

if(

    fields.amount.type !==

    "number"

){

    throw new Error(

        "amount field invalid"

    );

}

// =====================

// Final

// =====================

console.log(

    "Cashflow Schema V7 Test Passed"

);
