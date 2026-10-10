/*

Family Wealth AI OS V7

Liability Service

负债业务服务层

*/

import LiabilityRepository from "../repository/liabilityRepository.js?v=20261008ae";

import LiabilitySchema from "../schema/liabilitySchema.js?v=20261009bo";

import TransactionIntegration from "../../../core/integration/transactionIntegration.js?v=20261008ak";

import ExpenseService from "../../expense/services/expenseService.js?v=20261009bo";

import {

    computeSchedule,

    summarizeSchedule,

    todayText

} from "./repaymentSchedule.js?v=20261009bo";

const LiabilityService = {

    name:

    "Liability Service V7",

    // =====================

    // Create

    // =====================

    createLiability(

        data

    ){

        const input = { ...(data || {}) };

        // One amount at creation: the borrowed amount

        // is both the original principal and the

        // starting balance.

        if (

            !(Number(input.principal) > 0) &&

            Number(input.currentBalance) > 0

        ){

            input.principal =

                Number(input.currentBalance);

        }

        if (

            !(Number(input.currentBalance) > 0) &&

            Number(input.principal) > 0

        ){

            input.currentBalance =

                Number(input.principal);

        }

        const liability =

        LiabilitySchema.create(

            input

        );

        const schedule =

            computeSchedule(liability);

        if (schedule.length){

            liability.monthlyPayment =

                schedule[0].payment;

            if (!liability.maturityDate){

                liability.maturityDate =

                    schedule[

                        schedule.length - 1

                    ].date;

            }

        }

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

        // The auto interest mirrors are derived data

        // and die with the liability; the payment

        // transactions themselves are real events

        // and stay (same policy as manual payments).

        ExpenseService

        .deleteLinkedExpensesByLiability(

            id

        );

        return LiabilityRepository

        .remove(

            id

        );

    },

    // =====================

    // Repayment Schedule

    // =====================

    getSchedule(

        liability,

        today = todayText()

    ){

        const installments =

            computeSchedule(

                liability || {}

            );

        if (!installments.length){

            return null;

        }

        return summarizeSchedule(

            installments,

            today,

            (liability || {}).paidPeriods || []

        );

    },

    /*

     * Record every installment whose repayment date

     * has arrived and that has not been recorded yet.

     * Each one goes through the same makePayment path

     * as a manual repayment (transaction → account

     * balance → Cash Flow), reduces the outstanding

     * balance by its principal portion, and mirrors

     * its interest portion into the Expense Center.

     * Recorded periods are remembered on the

     * liability itself, so re-running is a no-op and

     * a payment the user deleted by hand is never

     * silently recreated.

     */

    syncScheduledPayments(

        liability,

        today = todayText()

    ){

        if (!liability){

            return 0;

        }

        const installments =

            computeSchedule(liability);

        if (!installments.length){

            return 0;

        }

        const paidPeriods =

            [

                ...(

                    liability.paidPeriods || []

                )

            ];

        const paidSet =

            new Set(

                paidPeriods.map(

                    period => Number(period)

                )

            );

        let recorded = 0;

        installments.forEach(installment => {

            if (

                installment.date > today ||

                paidSet.has(installment.period)

            ){

                return;

            }

            this.makePayment(

                liability.id,

                {

                    amount:

                        installment.payment,

                    interestPortion:

                        installment.interestPortion,

                    date:

                        installment.date,

                    accountId:

                        liability.paymentAccountId ||

                        "",

                    description:

                        (

                            "Loan payment: " +

                            (

                                liability.name ||

                                "Liability"

                            )

                        ),

                    period:

                        installment.period

                }

            );

            if (installment.interestPortion > 0){

                ExpenseService.createLinkedExpense({

                    autoSource:

                        "LOAN_INTEREST",

                    liabilityId:

                        liability.id,

                    period:

                        installment.period,

                    name:

                        (

                            "贷款利息 " +

                            (

                                liability.name || ""

                            ) +

                            " 第" +

                            installment.period +

                            "期"

                        ),

                    category:

                        "贷款利息",

                    amount:

                        installment.interestPortion,

                    currency:

                        liability.currency ||

                        "USD",

                    date:

                        installment.date,

                    accountId:

                        liability.paymentAccountId ||

                        "",

                    memberId:

                        liability.memberId ||

                        ""

                });

            }

            paidSet.add(

                installment.period

            );

            paidPeriods.push(

                installment.period

            );

            recorded += 1;

        });

        if (recorded > 0){

            const summary =

                summarizeSchedule(

                    installments,

                    today,

                    paidPeriods

                );

            LiabilityRepository.update(

                liability.id,

                {

                    paidPeriods,

                    monthlyPayment:

                        summary.nextInstallment

                            ? summary

                                .nextInstallment

                                .payment

                            : 0

                }

            );

        }

        return recorded;

    },

    syncAllScheduledPayments(

        today = todayText()

    ){

        let recorded = 0;

        try {

            (

                this.getLiabilities() || []

            ).forEach(liability => {

                try {

                    recorded +=

                        this.syncScheduledPayments(

                            liability,

                            today

                        );

                } catch (liabilityError) {

                }

            });

        } catch (syncError) {

        }

        return recorded;

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

                            principalPortion,

                            ...(

                                data.period

                                    ? {

                                        period:

                                            Number(

                                                data.period

                                            ),

                                        autoPayment:

                                            true

                                    }

                                    : {}

                            )

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
