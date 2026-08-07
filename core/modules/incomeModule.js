/*

Family Wealth AI OS V7

Income Module

家庭收入核心模块

*/

import incomeAgent

from "../../modules/income/agent/incomeAgent.js";

import incomeAPI

from "../../modules/income/api/incomeAPI.js";

import incomeAI

from "../../modules/income/ai/incomeAI.js";

import incomeAnalysisEngine

from "../../modules/income/analysis/incomeAnalysisEngine.js";

import incomeEvents

from "../../modules/income/events/incomeEvents.js";

import incomeRepository

from "../../modules/income/repository/incomeRepository.js";

import incomeSchema

from "../../modules/income/schema/incomeSchema.js";

import incomeService

from "../../modules/income/services/incomeService.js";

import incomeView

from "../../modules/income/ui/incomeView.js";

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
