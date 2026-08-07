/*

Family Wealth AI OS V7

Liability Module Definition

负债模块注册信息

*/

import LiabilityAPI from "../../modules/liability/api/liabilityAPI.js";

import LiabilityAgent from "../../modules/liability/agent/liabilityAgent.js";

import LiabilityAI from "../../modules/liability/ai/liabilityAI.js";

import LiabilityView from "../../modules/liability/ui/liabilityView.js";

const LiabilityModule = {

    name:

    "Liability Module V7",

    version:

    "7.0",

    type:

    "WEALTH_MODULE",

    // =====================

    // API

    // =====================

    api:

    LiabilityAPI,

    // =====================

    // Agent

    // =====================

    agent:

    LiabilityAgent,

    // =====================

    // AI

    // =====================

    ai:

    LiabilityAI,

    // =====================

    // UI

    // =====================

    view:

    LiabilityView,

    status:

    "READY"

};

export default LiabilityModule;
