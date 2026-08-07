/*

Family Wealth AI OS V7

Cashflow Module

家庭现金流核心模块

*/

import cashflowAgent

from "../../modules/cashflow/agent/cashflowAgent.js";

import cashflowAI

from "../../modules/cashflow/ai/cashflowAI.js";

import cashflowAnalysisEngine

from "../../modules/cashflow/analysis/cashflowAnalysisEngine.js";

import cashflowAPI

from "../../modules/cashflow/api/cashflowAPI.js";

import cashflowEvents

from "../../modules/cashflow/events/cashflowEvents.js";

import cashflowRepository

from "../../modules/cashflow/repository/cashflowRepository.js";

import cashflowSchema

from "../../modules/cashflow/schema/cashflowSchema.js";

import cashflowService

from "../../modules/cashflow/services/cashflowService.js";

import cashflowView

from "../../modules/cashflow/ui/cashflowView.js";

const CashflowModule = {

    name:

    "Cashflow Module V7",

    version:

    "7.0",

    type:

    "WEALTH_MODULE",

    status:

    "READY",

    schema:

    cashflowSchema,

    repository:

    cashflowRepository,

    service:

    cashflowService,

    api:

    cashflowAPI,

    agent:

    cashflowAgent,

    ai:

    cashflowAI,

    analysis:

    cashflowAnalysisEngine,

    events:

    cashflowEvents,

    view:

    cashflowView

};

export default CashflowModule;
