/*

Family Wealth AI OS V7

Dashboard View Test

*/

import DashboardView

from "../dashboardView.js";

import WealthScoreEngine

from "../../../core/wealthScore/wealthScoreEngine.js";

import CashFlowEngine

from "../../../core/cashflow/cashFlowEngine.js";

// =====================

// Prepare Data

// =====================

WealthScoreEngine.clear();

CashFlowEngine.clear();

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

CashFlowEngine.add(

    "INCOME",

    10000

);

CashFlowEngine.add(

    "EXPENSE",

    3000

);

// =====================

// Render Test

// =====================

const view =

DashboardView.render();

console.log(

    "Dashboard View:",

    view

);

if(

    view.wealthScore !==80

){

    throw new Error(

        "Dashboard score render failed"

    );

}

if(

    view.cashFlow !==7000

){

    throw new Error(

        "Dashboard cashflow render failed"

    );

}

if(

    !view.message

){

    throw new Error(

        "Dashboard message render failed"

    );

}

// =====================

// Text Test

// =====================

const text =

DashboardView.text();

console.log(

    text

);

if(

    !text.includes(

        "财富评分"

    )

){

    throw new Error(

        "Dashboard text failed"

    );

}

if(

    !text.includes(

        "AI建议"

    )

){

    throw new Error(

        "Dashboard AI text failed"

    );

}

console.log(

    "Dashboard View Test Passed"

);
