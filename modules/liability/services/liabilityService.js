/*

Family Wealth AI OS V7

Liability Service

负债业务服务层

*/

import LiabilityRepository from "../repository/liabilityRepository.js";

import LiabilitySchema from "../schema/liabilitySchema.js";

const LiabilityService = {

    name:

    "Liability Service V7",

    // =====================

    // Create

    // =====================

    createLiability(

        data

    ){

        const liability =

        LiabilitySchema.create(

            data

        );

        return LiabilityRepository.save(

            liability

        );

    },

    // =====================

    // Get All

    // =====================

    getLiabilities(){

        return LiabilityRepository

        .findAll();

    },

    // =====================

    // Get One

    // =====================

    getLiability(

        id

    ){

        return LiabilityRepository

        .findById(

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

        return LiabilityRepository

        .update(

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

        return LiabilityRepository

        .remove(

            id

        );

    },

    // =====================

    // Count

    // =====================

    count(){

        return this.getLiabilities()

        .length;

    }

};

export default LiabilityService;
