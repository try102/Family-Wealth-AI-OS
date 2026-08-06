/*

Family Wealth AI OS

Rule Engine Test

*/

import RuleEngine from "../ruleEngine.js";

// =====================

// Reset

// =====================

RuleEngine.clear();

// =====================

// Register Test

// =====================

const rule =

RuleEngine.register(

    "HIGH_STOCK_RISK",

    (data)=>{

        return data.stockRatio > 70;

    },

    (data)=>{

        return {

            warning:

            "Stock allocation too high",

            ratio:

            data.stockRatio

        };

    }

);

console.log(

    "Rule:",

    rule

);

if(

    rule !==

    "HIGH_STOCK_RISK"

){

    throw new Error(

        "Rule register failed"

    );

}

// =====================

// Evaluate Success Test

// =====================

const result =

RuleEngine.evaluate(

    "HIGH_STOCK_RISK",

    {

        stockRatio:

        80

    }

);

console.log(

    "Result:",

    result

);

if(

    !result

){

    throw new Error(

        "Rule evaluate failed"

    );

}

if(

    result.ratio !==80

){

    throw new Error(

        "Rule action failed"

    );

}

// =====================

// Evaluate False Test

// =====================

const safe =

RuleEngine.evaluate(

    "HIGH_STOCK_RISK",

    {

        stockRatio:

        40

    }

);

if(

    safe !== null

){

    throw new Error(

        "Rule false evaluation failed"

    );

}

// =====================

// List Test

// =====================

if(

    RuleEngine.list()

    .length !==1

){

    throw new Error(

        "Rule list failed"

    );

}

// =====================

// Remove Test

// =====================

RuleEngine.remove(

    "HIGH_STOCK_RISK"

);

if(

    RuleEngine.list()

    .length !==0

){

    throw new Error(

        "Rule remove failed"

    );

}

console.log(

    "Rule Engine Test Passed"

);
