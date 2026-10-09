/*

Family Wealth AI OS V7

Cashflow Module Definition

现金流模块注册信息

*/

import cashflowAPI

    from "../../modules/cashflow/api/cashflowAPI.js?v=20261008ae";

import cashflowAgent

    from "../../modules/cashflow/agent/cashflowAgent.js?v=20261008ae";

import cashflowAI

    from "../../modules/cashflow/ai/cashflowAI.js?v=20261008ae";

import cashflowView

    from "../../modules/cashflow/ui/cashflowView.js?v=20261009be";

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
