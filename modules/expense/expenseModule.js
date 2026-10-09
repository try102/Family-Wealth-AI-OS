/*

Family Wealth AI OS V7

Expense Module

家庭支出核心模块

统一模块入口

*/

import ExpenseAgent

    from "./agent/expenseAgent.js?v=20261008ae";

import ExpenseAPI

    from "./api/expenseAPI.js?v=20261008ae";

import ExpenseRepository

    from "./repository/expenseRepository.js?v=20261008ae";

import ExpenseSchema

    from "./schema/expenseSchema.js?v=20261008ae";

import ExpenseService

    from "./services/expenseService.js?v=20261008ai";

import ExpenseView

    from "./ui/expenseView.js?v=20261008ae";

const ExpenseModule = {

    // ==========================================

    // Module Information

    // ==========================================

    name:

        "Expense Module V7",

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

        ExpenseSchema,

    repository:

        ExpenseRepository,

    service:

        ExpenseService,

    api:

        ExpenseAPI,

    agent:

        ExpenseAgent,

    view:

        ExpenseView

};

export default ExpenseModule;
