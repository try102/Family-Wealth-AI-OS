/*

    

Family Wealth AI OS V7

Income Module

家庭收入核心模块

统一模块入口

*/

import IncomeAgent

    from "./agent/incomeAgent.js";

import IncomeAPI

    from "./api/incomeAPI.js";

import IncomeAI

    from "./ai/incomeAI.js";

import IncomeAnalysisEngine

    from "./analysis/incomeAnalysisEngine.js";

import IncomeEvents

    from "./events/incomeEvents.js";

import IncomeRepository

    from "./repository/incomeRepository.js";

import IncomeSchema

    from "./schema/incomeSchema.js";

import IncomeService

    from "./services/incomeService.js";

import IncomeView

    from "./ui/incomeView.js";

const IncomeModule = {

    // ==========================================

    // Module Information

    // ==========================================

    name:

        "Income Module V7",

    version:

        "7.0",

    type:

        "WEALTH_MODULE",

    status:

        "READY",

    // ==========================================

    // Core Components

    // ==========================================

    schema:

        IncomeSchema,

    repository:

        IncomeRepository,

    service:

        IncomeService,

    api:

        IncomeAPI,

    agent:

        IncomeAgent,

    ai:

        IncomeAI,

    analysis:

        IncomeAnalysisEngine,

    events:

        IncomeEvents,

    view:

        IncomeView

};

export default IncomeModule;
