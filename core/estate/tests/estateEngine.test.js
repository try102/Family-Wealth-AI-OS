/*

Family Wealth AI OS

Estate Engine Test

*/

import EstateEngine from "../estateEngine.js";

// =====================

// Reset

// =====================

EstateEngine.clear();

// =====================

// Add Asset Test

// =====================

const house =

EstateEngine.addAsset(

    {

        name:

        "House",

        value:

        800000

    }

);

console.log(

    "Estate Asset:",

    house

);

if(

    house.value !==800000

){

    throw new Error(

        "Estate add asset failed"

    );

}

EstateEngine.addAsset(

    {

        name:

        "Investment",

        value:

        200000

    }

);

// =====================

// Add Beneficiary Test

// =====================

const child1 =

EstateEngine.addBeneficiary(

    {

        name:

        "Child A",

        percent:

        50

    }

);

console.log(

    "Beneficiary:",

    child1

);

if(

    child1.percent !==50

){

    throw new Error(

        "Estate beneficiary add failed"

    );

}

EstateEngine.addBeneficiary(

    {

        name:

        "Child B",

        percent:

        50

    }

);

// =====================

// Total Value Test

// =====================

const total =

EstateEngine.totalValue();

console.log(

    "Estate Value:",

    total

);

if(

    total !==1000000

){

    throw new Error(

        "Estate total value failed"

    );

}

// =====================

// Distribution Test

// =====================

const distribution =

EstateEngine.distribution();

if(

    distribution[0].share !==500000

){

    throw new Error(

        "Estate distribution failed"

    );

}

if(

    distribution[1].share !==500000

){

    throw new Error(

        "Estate second distribution failed"

    );

}

// =====================

// Report Test

// =====================

const report =

EstateEngine.report();

if(

    report.estateValue !==1000000

){

    throw new Error(

        "Estate report failed"

    );

}

// =====================

// Clear Test

// =====================

EstateEngine.clear();

if(

    EstateEngine.assets.length !==0

){

    throw new Error(

        "Estate clear assets failed"

    );

}

if(

    EstateEngine.beneficiaries.length !==0

){

    throw new Error(

        "Estate clear beneficiaries failed"

    );

}

console.log(

    "Estate Engine Test Passed"

);
