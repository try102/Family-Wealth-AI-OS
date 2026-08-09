/*

Family Wealth AI OS V7

Investment Module

家庭投资管理核心模块

*/

import investmentAgent

    from "../../modules/investment/agent/investmentAgent.js";

import investmentAI

    from "../../modules/investment/ai/investmentAI.js";

import investmentAPI

    from "../../modules/investment/api/investmentAPI.js";

import investmentAnalysisEngine

    from "../../modules/investment/analysis/investmentAnalysisEngine.js";

import investmentDecisionEngine

    from "../../modules/investment/decision/investmentDecisionEngine.js";

import investmentEvents

    from "../../modules/investment/events/investmentEvents.js";

import marketDataService

    from "../../modules/investment/data/marketDataService.js";

import portfolioEngine

    from "../../modules/investment/portfolio/portfolioEngine.js";

import investmentRepository

    from "../../modules/investment/repository/investmentRepository.js";

const InvestmentModule = {

    name:

        "Investment Module V7",

    version:

        "7.0",

    type:

        "WEALTH_MODULE",

    status:

        "READY",

    repository:

        investmentRepository,

    api:

        investmentAPI,

    agent:

        investmentAgent,

    ai:

        investmentAI,

    analysis:

        investmentAnalysisEngine,

    decision:

        investmentDecisionEngine,

    events:

        investmentEvents,

    marketData:

        marketDataService,

    portfolio:

        portfolioEngine

};

export default InvestmentModule;
