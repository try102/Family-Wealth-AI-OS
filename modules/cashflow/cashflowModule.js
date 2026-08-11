/*

Family Wealth AI OS V7

Cashflow Module Definition

现金流模块注册信息

*/

import cashflowAPI

    from "./api/cashflowAPI.js";

import cashflowAgent

    from "./agent/cashflowAgent.js";

import cashflowAI

    from "./ai/cashflowAI.js";

import cashflowView

    from "./ui/cashflowView.js";

const cashflowModule = {

    name:

        "Cashflow Module V7",

    version:

        "7.0",

    type:

        "WEALTH_MODULE",

    // ==================================================

    // API

    // ==================================================

    api:

        cashflowAPI,

    // ==================================================

    // Agent

    // ==================================================

    agent:

        cashflowAgent,

    // ==================================================

    // AI

    // ==================================================

    ai:

        cashflowAI,

    // ==================================================

    // UI

    // ==================================================

    view:

        cashflowView,

    status:

        "READY"

};

export default cashflowModule;
