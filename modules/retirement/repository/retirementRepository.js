/*

Family Wealth AI OS V7

Retirement Repository

退休规划参数持久化（单条家庭档案）

*/

import DataService from "../../../core/database/dataService.js?v=20261008ae";

import RetirementSchema from "../schema/retirementSchema.js?v=20261008ae";

const RETIREMENT_KEY =

    "family_retirement_profile";

const RetirementRepository = {

    getProfile(){

        const saved =

            DataService.load(

                RETIREMENT_KEY

            );

        return RetirementSchema.create(

            saved || {}

        );

    },

    saveProfile(

        profile

    ){

        const normalized =

            RetirementSchema.create(

                profile || {}

            );

        DataService.save(

            RETIREMENT_KEY,

            normalized

        );

        return normalized;

    }

};

export default RetirementRepository;
