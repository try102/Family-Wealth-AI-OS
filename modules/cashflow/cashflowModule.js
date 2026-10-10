/*

Family Wealth AI OS V7

Cashflow Module Definition

现金流模块注册信息

*/

import cashflowAPI

    from "./api/cashflowAPI.js?v=20261009bp";

import cashflowAgent

    from "./agent/cashflowAgent.js?v=20261008ae";

import cashflowAI

    from "./ai/cashflowAI.js?v=20261008ae";

import cashflowView

    from "./ui/cashflowView.js?v=20261009bi";

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
