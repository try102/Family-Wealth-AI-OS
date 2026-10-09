/*

Family Wealth AI OS V7

Liability Service

负债业务服务层

*/

import LiabilityRepository from "../repository/liabilityRepository.js?v=20261008ae";

import LiabilitySchema from "../schema/liabilitySchema.js?v=20261008ae";

import TransactionIntegration from "../../../core/integration/transactionIntegration.js?v=20261008ak";

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

    // Record Payment

    // =====================

    makePayment(

        id,

        data = {}

    ){

        const liability =

            LiabilityRepository.findById(

                id

            );

        if (!liability) {

            return null;

        }

        const amount =

            Number(

                data.amount || 0

            );

        const interestPortion =

            Number(

                data.interestPortion || 0

            );

        const principalPortion =

            Math.max(

                amount -

                interestPortion,

                0

            );

        /*

         * Record the Actual cash event in

         * Transaction when a real Account

         * is selected (same policy as

         * Income / Expense / Investment).

         * Never create a fake Account ID.

         */

        if (

            amount > 0

        ){

            try {

                TransactionIntegration

                    .recordLoanPayment({

                        date:

                            data.date ||

                            undefined,

                        accountId:

                            data.accountId,

                        amount,

                        currency:

                            liability.currency ||

                            "USD",

                        description:

                            data.description ||

                            (

                                "Loan payment: " +

                                (

                                    liability.name ||

                                    "Liability"

                                )

                            ),

                        liability: {

                            liabilityId:

                                liability.id,

                            name:

                                liability.name ||

                                "",

                            category:

                                liability.category ||

                                "",

                            interestPortion,

                            principalPortion

                        },

                        source:

                            "BusinessModule"

                    });

            } catch (paymentError) {

                console.warn(

                    "Loan payment transaction not recorded:",

                    paymentError.message

                );

            }

        }

        /*

         * Reduce the outstanding balance by

         * the principal portion.

         */

        const newBalance =

            Math.max(

                Number(

                    liability.currentBalance ||

                    0

                ) -

                principalPortion,

                0

            );

        return LiabilityRepository.update(

            id,

            {

                currentBalance:

                    newBalance

            }

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
