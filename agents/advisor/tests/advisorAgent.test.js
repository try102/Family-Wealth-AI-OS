/*

Family Wealth AI OS V7

Advisor Agent Test

*/

import AdvisorAgent from "../advisorAgent.js";

import PortfolioEngine 

from "../../../core/portfolio/portfolioEngine.js";

import RiskEngine 

from "../../../core/risk/riskEngine.js";

import CashFlowEngine 

from "../../../core/cashflow/cashFlowEngine.js";

import TaxEngine 

from "../../../core/tax/taxEngine.js";

import RetirementEngine 

from "../../../core/retirement/retirementEngine.js";

import WealthScoreEngine 

from "../../../core/wealthScore/wealthScoreEngine.js";

// =====================

// Prepare Data

// =====================

PortfolioEngine.clear();

RiskEngine.clear();

CashFlowEngine.clear();

TaxEngine.clear();

RetirementEngine.clear();

WealthScoreEngine.clear();

// Portfolio

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

// Risk

RiskEngine.register(

    "MARKET",

    20

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

// Tax

TaxEngine.add(

    "INCOME",

    120000

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

// =====================

// Analyze Test

// =====================

const report =

AdvisorAgent.analyze();

console.log(

    "Advisor Report:",

    report

);

if(

    report.portfolio.value !==100000

){

    throw new Error(

        "Advisor portfolio failed"

    );

}

if(

    report.cashFlow.net !==7000

){

    throw new Error(

        "Advisor cash flow failed"

    );

}

// =====================

// Summary Test

// =====================

const summary =

AdvisorAgent.summary();

console.log(

    "Summary:",

    summary

);

if(

    summary.score !==80

){

    throw new Error(

        "Advisor score failed"

    );

}

if(

    summary.risk !=="LOW"

){

    throw new Error(

        "Advisor risk failed"

    );

}

if(

    !summary.message

){

    throw new Error(

        "Advisor message failed"

    );

}

console.log(

    "Advisor Agent Test Passed"

);
