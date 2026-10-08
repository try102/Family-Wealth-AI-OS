/*

Family Wealth AI OS V7

Expense Module

家庭支出核心模块

统一模块入口

*/

import ExpenseAgent

    from "./agent/expenseAgent.js";

import ExpenseAPI

    from "./api/expenseAPI.js";

import ExpenseRepository

    from "./repository/expenseRepository.js";

import ExpenseSchema

    from "./schema/expenseSchema.js";

import ExpenseService

    from "./services/expenseService.js";

import ExpenseView

    from "./ui/expenseView.js";

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
