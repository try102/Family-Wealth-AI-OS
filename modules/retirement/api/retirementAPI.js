/*

Family Wealth AI OS V7

Retirement API

退休模块统一接口层

*/

import RetirementService from "../services/retirementService.js";

const RetirementAPI = {

    name:

    "Retirement API V7",

    getProfile(){

        return RetirementService

        .getProfile();

    },

    saveProfile(

        profile

    ){

        return RetirementService

        .saveProfile(

            profile

        );

    },

    getProjection(){

        return RetirementService

        .getProjection();

    }

};

export default RetirementAPI;
