/*

Family Wealth AI OS V7

Liability API

负债模块统一接口层

*/

import LiabilityService from "../services/liabilityService.js";

const LiabilityAPI = {

    name:

    "Liability API V7",

    // =====================

    // Create

    // =====================

    createLiability(

        data

    ){

        return LiabilityService

        .createLiability(

            data

        );

    },

    // =====================

    // Get All

    // =====================

    getLiabilities(){

        return LiabilityService

        .getLiabilities();

    },

    // =====================

    // Get One

    // =====================

    getLiability(

        id

    ){

        return LiabilityService

        .getLiability(

            id

        );

    },

    // =====================

    // Update

    // =====================

    updateLiability(

        id,

        data

    ){

        return LiabilityService

        .updateLiability(

            id,

            data

        );

    },

    // =====================

    // Delete

    // =====================

    deleteLiability(

        id

    ){

        return LiabilityService

        .deleteLiability(

            id

        );

    },

    // =====================

    // Summary

    // =====================

    getSummary(){

        const list =

        this.getLiabilities();

        let total = 0;

        list.forEach(

            item=>{

                total +=

                Number(

                    item.currentBalance || 0

                );

            }

        );

        return {

            count:

            list.length,

            totalLiability:

            total

        };

    }

};

export default LiabilityAPI;
