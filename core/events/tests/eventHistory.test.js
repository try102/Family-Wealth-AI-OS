/*

Family Wealth AI OS

Event History Test

*/

import EventStore from "../eventStore.js";

import EventHistory from "../eventHistory.js";

// =====================

// Reset

// =====================

EventStore.clear();

// =====================

// Create Test Events

// =====================

EventStore.save({

    type:"INVESTMENT",

    source:"InvestmentAgent",

    data:{

        symbol:"AAPL"

    }

});

EventStore.save({

    type:"ACCOUNT",

    source:"AccountAgent",

    data:{

        account:"Checking"

    }

});

EventStore.save({

    type:"INVESTMENT",

    source:"InvestmentAgent",

    data:{

        symbol:"VOO"

    }

});

// =====================

// Test All

// =====================

const all =

EventHistory.getAll();

console.log(

    "All Events:",

    all

);

if(all.length !== 3){

    throw new Error(

        "GetAll failed"

    );

}

// =====================

// Test By Type

// =====================

const investmentEvents =

EventHistory.getByType(

    "INVESTMENT"

);

console.log(

    "Investment Events:",

    investmentEvents

);

if(investmentEvents.length !== 2){

    throw new Error(

        "Type filter failed"

    );

}

// =====================

// Test By Source

// =====================

const investmentSource =

EventHistory.getBySource(

    "InvestmentAgent"

);

console.log(

    "Investment Source:",

    investmentSource

);

if(investmentSource.length !== 2){

    throw new Error(

        "Source filter failed"

    );

}

// =====================

// Test Latest

// =====================

const latest =

EventHistory.latest(2);

console.log(

    "Latest:",

    latest

);

if(latest.length !== 2){

    throw new Error(

        "Latest failed"

    );

}

console.log(

    "Event History Test Passed"

);
