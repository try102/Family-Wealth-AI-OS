/*

Family Wealth AI OS V7

Income Module

家庭收入核心模块

*/

import incomeAgent

from "../../modules/income/agent/incomeAgent.js?v=20261008ae";

import incomeAPI

from "../../modules/income/api/incomeAPI.js?v=20261008ae";

import incomeAI

from "../../modules/income/ai/incomeAI.js?v=20261008ae";

import incomeAnalysisEngine

from "../../modules/income/analysis/incomeAnalysisEngine.js?v=20261008ae";

import incomeEvents

from "../../modules/income/events/incomeEvents.js?v=20261008ae";

import incomeRepository

from "../../modules/income/repository/incomeRepository.js?v=20261008ae";

import incomeSchema

from "../../modules/income/schema/incomeSchema.js?v=20261008ae";

import incomeService

from "../../modules/income/services/incomeService.js?v=20261009bk";

import incomeView

from "../../modules/income/ui/incomeView.js?v=20261009bk";

const IncomeModule = {

    name:

    "Income Module V7",

    version:

    "7.0",

    type:

    "WEALTH_MODULE",

    status:

    "READY",

    schema:

    incomeSchema,

    repository:

    incomeRepository,

    service:

    incomeService,

    api:

    incomeAPI,

    agent:

    incomeAgent,

    ai:

    incomeAI,

    analysis:

    incomeAnalysisEngine,

    events:

    incomeEvents,

    view:

    incomeView

};

export default IncomeModule;
