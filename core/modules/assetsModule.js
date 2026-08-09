/*

Family Wealth AI OS V7

Assets Module

家庭资产管理核心模块

*/

import assetAgent

from "../../modules/asset/agent/assetAgent.js";

import assetAI

from "../../modules/asset/ai/assetAI.js";

import assetAPI

from "../../modules/asset/api/assetAPI.js";

import assetAnalysisEngine

from "../../modules/assets/engines/assetAnalysisEngine.js";

import assetEventHandler

from "../../modules/asset/events/assetEventHandler.js";

import assetRepository

from "../../modules/asset/repository/assetRepository.js";

import assetSchema

from "../../modules/asset/schema/assetSchema.js";

import assetService

from "../../modules/asset/services/assetService.js";

import assetView

from "../../modules/asset/ui/assetView.js";

const AssetsModule = {

    name:

    "Assets Module V7",

    version:

    "7.0",

    type:

    "WEALTH_MODULE",

    status:

    "READY",

    schema:

    assetSchema,

    repository:

    assetRepository,

    service:

    assetService,

    api:

    assetAPI,

    agent:

    assetAgent,

    ai:

    assetAI,

    analysis:

    assetAnalysisEngine,

    events:

    assetEventHandler,

    view:

    assetView

};

export default AssetsModule;
