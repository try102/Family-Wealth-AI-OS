/*

Family Wealth AI OS

Validation Manager Test

*/

import ValidationManager from "../validationManager.js";

// =====================

// Required Test

// =====================

if(

    ValidationManager.required(

        ""

    )

){

    throw new Error(

        "Required validation failed"

    );

}

if(

    !ValidationManager.required(

        "House"

    )

){

    throw new Error(

        "Required valid value failed"

    );

}

// =====================

// Number Test

// =====================

if(

    !ValidationManager.number(

        1000

    )

){

    throw new Error(

        "Number validation failed"

    );

}

if(

    ValidationManager.number(

        "1000"

    )

){

    throw new Error(

        "String number should fail"

    );

}

// =====================

// Positive Test

// =====================

if(

    !ValidationManager.positive(

        500

    )

){

    throw new Error(

        "Positive validation failed"

    );

}

if(

    ValidationManager.positive(

        -100

    )

){

    throw new Error(

        "Negative value should fail"

    );

}

// =====================

// Rules Validation

// =====================

const asset = {

    name:

    "House",

    value:

    500000

};

const result =

ValidationManager.validate(

    asset,

    {

        name:[

            ValidationManager.required

        ],

        value:[

            ValidationManager.positive

        ]

    }

);

console.log(

    "Validation Result:",

    result

);

if(

    result.valid !== true

){

    throw new Error(

        "Rule validation failed"

    );

}

console.log(

    "Validation Manager Test Passed"

);
