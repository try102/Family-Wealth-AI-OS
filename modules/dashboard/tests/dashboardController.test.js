/*

Family Wealth AI OS V7

Dashboard Controller Test

*/

import DashboardController

from "../dashboardController.js";

import WealthScoreEngine

from "../../../core/wealthScore/wealthScoreEngine.js";

import CashFlowEngine

from "../../../core/cashflow/cashFlowEngine.js";

// =====================

// Prepare Data

// =====================

WealthScoreEngine.clear();

CashFlowEngine.clear();

// Wealth Score

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

// Cash Flow

CashFlowEngine.add(

    "INCOME",

    10000

);

CashFlowEngine.add(

    "EXPENSE",

    3000

);

// =====================

// Load Test

// =====================

const data =

DashboardController.load();

console.log(

    "Dashboard Data:",

    data

);

if(

    !data.wealth

){

    throw new Error(

        "Dashboard wealth data missing"

    );

}

if(

    !data.advice

){

    throw new Error(

        "Dashboard AI advice missing"

    );

}

// =====================

// Summary Test

// =====================

const summary =

DashboardController.summary();

console.log(

    "Dashboard Summary:",

    summary

);

if(

    summary.score !==80

){

    throw new Error(

        "Dashboard score failed"

    );

}

if(

    summary.cashFlow !==7000

){

    throw new Error(

        "Dashboard cash flow failed"

    );

}

if(

    !summary.message

){

    throw new Error(

        "Dashboard message failed"

    );

}

console.log(

    "Dashboard Controller Test Passed"

);
