/*

Family Wealth AI OS V7

Retirement Module

退休规划模块

对外统一出口

*/

import RetirementSchema from "./schema/retirementSchema.js?v=20261008ae";

import RetirementRepository from "./repository/retirementRepository.js?v=20261008ae";

import RetirementService from "./services/retirementService.js?v=20261008ae";

import RetirementAPI from "./api/retirementAPI.js?v=20261008ae";

import RetirementAgent from "./agent/retirementAgent.js?v=20261008ae";

import RetirementView from "./ui/retirementView.js?v=20261008ae";

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
