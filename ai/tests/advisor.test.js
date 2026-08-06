/*

Family Wealth AI OS V7

AI Advisor Test

*/

import AIAdvisor from "../advisor.js";

import WealthScoreEngine

from "../../core/wealthScore/wealthScoreEngine.js";

import PortfolioEngine

from "../../core/portfolio/portfolioEngine.js";

// =====================

// Prepare Data

// =====================

WealthScoreEngine.clear();

PortfolioEngine.clear();

WealthScoreEngine.set(

    "NET_WORTH",

    90

);

WealthScoreEngine.set(

    "CASH_FLOW",

    80

);

WealthScoreEngine.set(

    "INVESTMENT",

    70

);

PortfolioEngine.add(

    {

        name:

        "VOO",

        type:

        "STOCK",

        value:

        100000

    }

);

// =====================

// Basic Ask Test

// =====================

const result =

AIAdvisor.ask(

    "我的财富情况怎么样？"

);

console.log(

    "AI Result:",

    result

);

if(

    !result.analysis

){

    throw new Error(

        "AI analysis failed"

    );

}

if(

    !result.answer

){

    throw new Error(

        "AI answer failed"

    );

}

// =====================

// Retirement Question Test

// =====================

const retirement =

AIAdvisor.ask(

    "我的退休准备够吗？"

);

console.log(

    retirement.answer

);

if(

    !retirement.answer.includes(

        "退休分析"

    )

){

    throw new Error(

        "AI retirement routing failed"

    );

}

// =====================

// Investment Question Test

// =====================

const investment =

AIAdvisor.ask(

    "我的投资组合怎么样？"

);

if(

    !investment.answer.includes(

        "投资分析"

    )

){

    throw new Error(

        "AI investment routing failed"

    );

}

// =====================

// Tax Question Test

// =====================

const tax =

AIAdvisor.ask(

    "如何优化税务？"

);

if(

    !tax.answer.includes(

        "税务分析"

    )

){

    throw new Error(

        "AI tax routing failed"

    );

}

console.log(

    "AI Advisor Test Passed"

);
