/*

Family Wealth AI OS V7

Liability Service

负债业务服务层

*/

import LiabilityRepository from "../repository/liabilityRepository.js?v=20261008ae";

import LiabilitySchema from "../schema/liabilitySchema.js?v=20261009bp";

import TransactionIntegration from "../../../core/integration/transactionIntegration.js?v=20261009bp";

import ExpenseService from "../../expense/services/expenseService.js?v=20261009bp";

import {

    computeSchedule,

    summarizeSchedule,

    todayText

} from "./repaymentSchedule.js?v=20261009bp";

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

        // Deleting a liability revokes everything it

        // caused: every loan-payment transaction is

        // removed through the choke point (account

        // balance restored, cash-flow entries gone),

        // the auto interest mirrors are deleted, and

        // only then the liability record itself.

        try {

            (

                TransactionIntegration

                    .getAllTransactions() || []

            )

                .filter(

                    transaction =>

                        transaction &&

                        transaction.type ===

                            "LOAN_PAYMENT" &&

                        transaction.businessDetails &&

                        transaction.businessDetails

                            .liability &&

                        String(

                            transaction.businessDetails

                                .liability.liabilityId

                        ) === String(id)

                )

                .forEach(transaction => {

                    try {

                        TransactionIntegration

                            .removeTransaction(

                                transaction.id

                            );

                    } catch (removeError) {

                    }

                });

        } catch (cascadeError) {

        }

        ExpenseService

        .deleteLinkedExpensesByLiability(

            id

        );

        return LiabilityRepository

        .remove(

            id

        );

    },

    /*

     * A loan payment was removed somewhere else

     * (e.g. its row was deleted in the Cash Flow

     * center): put the liability side back — the

     * principal portion returns to the outstanding

     * balance, the period is no longer counted as

     * paid, and its interest mirror is deleted.

     */

    handleLoanPaymentRemoved(

        transaction

    ){

        try {

            const details =

                (

                    transaction &&

                    transaction.businessDetails &&

                    transaction.businessDetails.liability

                ) || {};

            const liabilityId =

                details.liabilityId;

            if (!liabilityId){

                return;

            }

            const liability =

                LiabilityRepository.findById(

                    liabilityId

                );

            if (!liability){

                return;

            }

            const updates = {

                currentBalance:

                    Number(

                        liability.currentBalance || 0

                    ) +

                    Number(

                        details.principalPortion || 0

                    )

            };

            if (details.period){

                updates.paidPeriods =

                    (

                        liability.paidPeriods || []

                    ).filter(

                        period =>

                            Number(period) !==

                            Number(details.period)

                    );

                // The user deleted this payment on

                // purpose: never auto-record it again.

                updates.voidedPeriods =

                    [

                        ...(

                            liability.voidedPeriods ||

                            []

                        ),

                        Number(details.period)

                    ];

            }

            LiabilityRepository.update(

                liabilityId,

                updates

            );

            if (details.period){

                ExpenseService.deleteLinkedExpense(

                    liabilityId,

                    details.period

                );

            }

        } catch (restoreError) {

        }

    },

    /*

     * Loan payments whose liability no longer

     * exists (deleted before delete cascading

     * existed) are orphans: revoke them so the

     * account money comes back. Runs at startup.

     */

    cleanupOrphanPayments(){

        let revoked = 0;

        try {

            const liabilityIds =

                new Set(

                    (

                        this.getLiabilities() || []

                    ).map(

                        liability =>

                            String(liability.id)

                    )

                );

            (

                TransactionIntegration

                    .getAllTransactions() || []

            )

                .filter(

                    transaction =>

                        transaction &&

                        transaction.type ===

                            "LOAN_PAYMENT" &&

                        transaction.businessDetails &&

                        transaction.businessDetails

                            .liability &&

                        transaction.businessDetails

                            .liability.liabilityId &&

                        !liabilityIds.has(

                            String(

                                transaction

                                    .businessDetails

                                    .liability

                                    .liabilityId

                            )

                        )

                )

                .forEach(transaction => {

                    try {

                        TransactionIntegration

                            .removeTransaction(

                                transaction.id

                            );

                        revoked += 1;

                    } catch (removeError) {

                    }

                });

        } catch (cleanupError) {

        }

        return revoked;

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

        const summary = summarizeSchedule(

            installments,

            today,

            (liability || {}).paidPeriods || [],

            (liability || {}).voidedPeriods || []

        );

        /*
         * Book truth wins over plan math: installments
         * that were actually recorded keep the splits
         * they were booked with (even if the rate,
         * term or method was edited afterwards), and
         * the summary totals come from the recorded
         * payments and the real outstanding balance.
         */

        const bookedByPeriod = new Map();

        let bookedPrincipal = 0;

        let bookedInterest = 0;

        let hasBookings = false;

        try {

            (

                TransactionIntegration

                    .getAllTransactions() || []

            ).forEach(transaction => {

                const detail =

                    transaction &&

                    transaction.type ===

                        "LOAN_PAYMENT"

                        ? (transaction.businessDetails || {})

                            .liability

                        : null;

                if (

                    !detail ||

                    String(detail.liabilityId) !==

                        String(liability.id)

                ){

                    return;

                }

                hasBookings = true;

                bookedPrincipal =

                    Math.round(

                        (

                            bookedPrincipal +

                            Number(

                                detail.principalPortion ||

                                0

                            )

                        ) * 100

                    ) / 100;

                bookedInterest =

                    Math.round(

                        (

                            bookedInterest +

                            Number(

                                detail.interestPortion ||

                                0

                            )

                        ) * 100

                    ) / 100;

                if (detail.period){

                    bookedByPeriod.set(

                        Number(detail.period),

                        {

                            payment:

                                Number(

                                    transaction.amount ||

                                    0

                                ) ||

                                Math.round(

                                    (

                                        Number(

                                            detail

                                                .principalPortion ||

                                            0

                                        ) +

                                        Number(

                                            detail

                                                .interestPortion ||

                                            0

                                        )

                                    ) * 100

                                ) / 100,

                            principalPortion:

                                Number(

                                    detail.principalPortion ||

                                    0

                                ),

                            interestPortion:

                                Number(

                                    detail.interestPortion ||

                                    0

                                )

                        }

                    );

                }

            });

        } catch (bookError) {

        }

        const paidSet = new Set(

            (liability.paidPeriods || []).map(

                period => Number(period)

            )

        );

        const voidedSet = new Set(

            (liability.voidedPeriods || []).map(

                period => Number(period)

            )

        );

        let paidCount = 0;

        let cumulativePrincipal = 0;

        let nextInstallment = null;

        summary.installments.forEach(installment => {

            const booked =

                bookedByPeriod.get(

                    installment.period

                );

            if (booked){

                installment.payment =

                    booked.payment;

                installment.principalPortion =

                    booked.principalPortion;

                installment.interestPortion =

                    booked.interestPortion;

            }

            installment.paid =

                !voidedSet.has(installment.period) &&

                (

                    paidSet.has(installment.period) ||

                    bookedByPeriod.has(

                        installment.period

                    )

                );

            if (installment.paid){

                paidCount += 1;

            } else if (!nextInstallment){

                nextInstallment = installment;

            }

            if (installment.paid){

                cumulativePrincipal =

                    Math.round(

                        (

                            cumulativePrincipal +

                            installment

                                .principalPortion

                        ) * 100

                    ) / 100;

                installment.balanceAfter =

                    Math.max(

                        Math.round(

                            (

                                Number(

                                    liability.principal ||

                                    0

                                ) -

                                cumulativePrincipal

                            ) * 100

                        ) / 100,

                        0

                    );

            }

        });

        summary.paidCount = paidCount;

        summary.nextInstallment = nextInstallment;

        if (hasBookings){

            summary.paidPrincipal = bookedPrincipal;

            summary.paidInterest = bookedInterest;

        }

        summary.remainingBalance =

            Math.round(

                Number(liability.currentBalance || 0) *

                100

            ) / 100;

        return summary;

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

        const voidedSet =

            new Set(

                (

                    liability.voidedPeriods || []

                ).map(

                    period => Number(period)

                )

            );

        let recorded = 0;

        installments.forEach(installment => {

            if (

                installment.date > today ||

                paidSet.has(installment.period) ||

                voidedSet.has(installment.period)

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

                    paidPeriods,

                    liability.voidedPeriods || []

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

        const update = {

            currentBalance:

                newBalance

        };

        /*
         * A manual repayment on a scheduled loan
         * settles the earliest unpaid installments
         * its principal covers: those periods are
         * remembered exactly like auto-recorded
         * ones (the schedule sync will not book
         * them a second time), and the interest
         * portion gets its Expense Center mirror.
         * Auto-recorded installments (data.period)
         * are handled by syncScheduledPayments.
         */

        if (!data.period && amount > 0){

            try {

                const installments =

                    computeSchedule(liability);

                if (installments.length){

                    const paidSet = new Set(

                        (liability.paidPeriods || []).map(

                            period => Number(period)

                        )

                    );

                    const voidedSet = new Set(

                        (liability.voidedPeriods || []).map(

                            period => Number(period)

                        )

                    );

                    let remainingPrincipal =

                        principalPortion;

                    const settled = [];

                    for (

                        const installment of

                        installments

                    ){

                        if (

                            paidSet.has(

                                installment.period

                            ) ||

                            voidedSet.has(

                                installment.period

                            )

                        ){

                            continue;

                        }

                        if (

                            remainingPrincipal +

                                0.01 <

                            installment

                                .principalPortion

                        ){

                            break;

                        }

                        settled.push(

                            installment.period

                        );

                        remainingPrincipal =

                            Math.round(

                                (

                                    remainingPrincipal -

                                    installment

                                        .principalPortion

                                ) * 100

                            ) / 100;

                    }

                    if (settled.length){

                        update.paidPeriods = [

                            ...(

                                liability.paidPeriods ||

                                []

                            ),

                            ...settled

                        ];

                        const next =

                            installments.find(

                                installment =>

                                    !paidSet.has(

                                        installment.period

                                    ) &&

                                    !voidedSet.has(

                                        installment.period

                                    ) &&

                                    !settled.includes(

                                        installment.period

                                    )

                            );

                        update.monthlyPayment =

                            next ? next.payment : 0;

                        if (interestPortion > 0){

                            ExpenseService

                                .createLinkedExpense({

                                    autoSource:

                                        "LOAN_INTEREST",

                                    liabilityId:

                                        liability.id,

                                    period:

                                        settled[0],

                                    name:

                                        (

                                            "贷款利息 " +

                                            (

                                                liability

                                                    .name ||

                                                ""

                                            ) +

                                            " 第" +

                                            settled[0] +

                                            "期"

                                        ),

                                    category:

                                        "贷款利息",

                                    amount:

                                        interestPortion,

                                    currency:

                                        liability

                                            .currency ||

                                        "USD",

                                    date:

                                        data.date ||

                                        todayText(),

                                    accountId:

                                        data.accountId ||

                                        liability

                                            .paymentAccountId ||

                                        "",

                                    memberId:

                                        liability

                                            .memberId ||

                                        ""

                                });

                        }

                    }

                }

            } catch (settleError) {

            }

        }

        return LiabilityRepository.update(

            id,

            update

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
