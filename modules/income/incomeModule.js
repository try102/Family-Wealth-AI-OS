/*

    

Family Wealth AI OS V7

Income Module

家庭收入核心模块

统一模块入口

*/

import IncomeAgent

    from "./agent/incomeAgent.js?v=20261008ae";

import IncomeAPI

    from "./api/incomeAPI.js?v=20261008ae";

import IncomeAI

    from "./ai/incomeAI.js?v=20261008ae";

import IncomeAnalysisEngine

    from "./analysis/incomeAnalysisEngine.js?v=20261008ae";

import IncomeEvents

    from "./events/incomeEvents.js?v=20261008ae";

import IncomeRepository

    from "./repository/incomeRepository.js?v=20261008ae";

import IncomeSchema

    from "./schema/incomeSchema.js?v=20261008ae";

import IncomeService

    from "./services/incomeService.js?v=20261009bm";

import IncomeView

    from "./ui/incomeView.js?v=20261009bk";

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
