/*

Family Wealth AI OS V7

Retirement Module

退休规划模块

对外统一出口

*/

import RetirementSchema from "./schema/retirementSchema.js";

import RetirementRepository from "./repository/retirementRepository.js";

import RetirementService from "./services/retirementService.js";

import RetirementAPI from "./api/retirementAPI.js";

import RetirementAgent from "./agent/retirementAgent.js";

import RetirementView from "./ui/retirementView.js";

const RetirementModule = {

    name:

    "Retirement Module V7",

    schema:

    RetirementSchema,

    repository:

    RetirementRepository,

    service:

    RetirementService,

    api:

    RetirementAPI,

    agent:

    RetirementAgent,

    view:

    RetirementView

};

export default RetirementModule;
