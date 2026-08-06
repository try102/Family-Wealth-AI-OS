/*

Family Wealth AI OS V7

Wealth API Test

*/

import WealthAPI from "../wealthAPI.js";

import WealthScoreEngine

from "../../core/wealthScore/wealthScoreEngine.js";

import CashFlowEngine

from "../../core/cashflow/cashFlowEngine.js";

import RetirementEngine

from "../../core/retirement/retirementEngine.js";

import TaxEngine

from "../../core/tax/taxEngine.js";

// =====================

// Prepare Data

// =====================

WealthScoreEngine.clear();

CashFlowEngine.clear();

RetirementEngine.clear();

TaxEngine.clear();

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

// Retirement

RetirementEngine.set(

    "annualExpense",

    60000

);

RetirementEngine.set(

    "years",

    20

);

RetirementEngine.set(

    "assets",

    1500000

);

// Tax

TaxEngine.add(

    "INCOME",

    120000

);

// =====================

// Dashboard Test

// =====================

const dashboard =

WealthAPI.dashboard();

console.log(

    "Dashboard:",

    dashboard

);

if(

    !dashboard.wealthScore

){

    throw new Error(

        "Dashboard score missing"

    );

}

if(

    !dashboard.cashFlow

){

    throw new Error(

        "Dashboard cashflow missing"

    );

}

// =====================

// Score Test

// =====================

const score =

WealthAPI.score();

if(

    score.score !==80

){

    throw new Error(

        "Wealth score API failed"

    );

}

// =====================

// Cash Flow Test

// =====================

const cashFlow =

WealthAPI.cashFlow();

if(

    cashFlow.net !==7000

){

    throw new Error(

        "Cash flow API failed"

    );

}

// =====================

// Retirement Test

// =====================

const retirement =

WealthAPI.retirement();

if(

    retirement.required !==1200000

){

    throw new Error(

        "Retirement API failed"

    );

}

// =====================

// Tax Test

// =====================

const tax =

WealthAPI.tax();

if(

    tax.totalIncome !==120000

){

    throw new Error(

        "Tax API failed"

    );

}

console.log(

    "Wealth API Test Passed"

);
