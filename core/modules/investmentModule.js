/*

Family Wealth AI OS V7

Investment Module

家庭投资管理核心模块

*/

import investmentAgent

    from "../../modules/investment/agent/investmentAgent.js?v=20261008ag";

import investmentAI

    from "../../modules/investment/ai/investmentAI.js?v=20261008ae";

import investmentAPI

    from "../../modules/investment/api/investmentAPI.js?v=20261008ag";

import investmentAnalysisEngine

    from "../../modules/investment/analysis/investmentAnalysisEngine.js?v=20261008ae";

import investmentDecisionEngine

    from "../../modules/investment/decision/investmentDecisionEngine.js?v=20261008ae";

import investmentEvents

    from "../../modules/investment/events/investmentEvents.js?v=20261008ae";

import marketDataService

    from "../../modules/investment/data/marketDataService.js?v=20261008ae";

import portfolioEngine

    from "../../modules/investment/portfolio/portfolioEngine.js?v=20261008ae";

import investmentRepository

    from "../../modules/investment/repository/investmentRepository.js?v=20261008ag";

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
