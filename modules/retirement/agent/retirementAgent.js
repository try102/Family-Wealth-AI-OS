/*

Family Wealth AI OS

Retirement Agent

*/

import RetirementAPI from "../api/retirementAPI.js";

const RetirementAgent = {

    name:

    "Retirement Agent",

    getRetirementStatus(){

        return RetirementAPI

        .getProjection();

    },

    generateRetirementReview(){

        const projection =

        this.getRetirementStatus();

        return {

            projection,

            summary:

            "Retirement review generated"

        };

    }

};

export default RetirementAgent;
