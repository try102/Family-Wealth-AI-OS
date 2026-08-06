/*

Family Wealth AI OS

Investment Center Test

*/

import PortfolioEngine from "../portfolio/portfolioEngine.js";

import InvestmentAnalysisEngine from "../analysis/investmentAnalysisEngine.js";

import RiskEngine from "../risk/riskEngine.js";

import InvestmentDecisionEngine from "../decision/investmentDecisionEngine.js";

// =====================

// Test Data

// =====================

const positions = [

    {

        symbol:"AAPL",

        type:"STOCK",

        costBasis:10000,

        marketValue:15000,

        allocationRatio:60

    },

    {

        symbol:"VOO",

        type:"ETF",

        costBasis:10000,

        marketValue:12000,

        allocationRatio:40

    }

];

// =====================

// Portfolio Test

// =====================

const total =

PortfolioEngine

.calculateTotalValue(

    positions

);

console.log(

    "Portfolio Value:",

    total

);

// =====================

// Allocation Test

// =====================

const allocation =

PortfolioEngine

.calculateAllocation(

    positions

);

console.log(

    "Allocation:",

    allocation

);

// =====================

// Performance Test

// =====================

const performance =

InvestmentAnalysisEngine

.portfolioPerformance(

    positions

);

console.log(

    "Performance:",

    performance

);

// =====================

// Risk Test

// =====================

const risk =

RiskEngine

.concentrationRisk(

    positions

);

console.log(

    "Risk:",

    risk

);

// =====================

// Decision Test

// =====================

const advice =

InvestmentDecisionEngine

.generateReport({

    risk,

    rebalance:[]

});

console.log(

    "Decision:",

    advice

);

// =====================

// Assertions

// =====================

if(total !== 27000){

    throw new Error(

        "Portfolio calculation failed"

    );

}

if(performance.gain !== 7000){

    throw new Error(

        "Performance calculation failed"

    );

}

console.log(

    "Investment Test Passed"

);
