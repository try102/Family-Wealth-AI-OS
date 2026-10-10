/*

Family Wealth AI OS V7

Cashflow Service

现金流业务服务层

负责：

1. 创建现金流

2. 查询现金流

3. 更新现金流

4. 删除现金流

5. 计算年度化收入

6. 计算年度化支出

7. 计算年度化净现金流

8. 提供驾驶舱使用的统一 Summary

*/

import cashflowRepository

    from "../repository/cashflowRepository.js?v=20261008ae";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js?v=20261009bp";

import LiabilityService

    from "../../liability/services/liabilityService.js?v=20261009bp";

import TransactionRepository

    from "../../../transaction/transactionRepository.js?v=20261008ae";

// ==================================================

//

// Annualization

//

// ==================================================

function annualize(

    amount,

    frequency

){

    const value =

        Number(

            amount || 0

        );

    switch(

        frequency

    ){

        case "MONTHLY":

            return value * 12;

        case "QUARTERLY":

            return value * 4;

        case "YEARLY":

            return value;

        case "ONE_TIME":

            return value;

        default:

            return value;

    }

}

// ==================================================

//

// Normalize Record

//

// ==================================================

function normalizeRecord(

    data = {}

){

    const amount =

        Number(

            data?.amount || 0

        );

    const frequency =

        data?.frequency ||

        "YEARLY";

    return {

        ...data,

        amount,

        frequency,

        annualizedAmount:

            annualize(

                amount,

                frequency

            )

    };

}

// ==================================================

//

// Cashflow Service

//

// ==================================================

const cashflowService = {

    name:

        "Cashflow Service V7",

    // ==================================================

    //

    // Create

    //

    // ==================================================

    create(

        data = {}

    ){

        const normalized =

            normalizeRecord(

                data

            );

        return cashflowRepository.create(

            normalized

        );

    },

    // ==================================================

    //

    // List

    //

    // ==================================================

    list(){

        return cashflowRepository.findAll();

    },

    // ==================================================

    //

    // Get

    //

    // ==================================================

    get(

        id

    ){

        return cashflowRepository.findById(

            id

        );

    },

    // ==================================================

    //

    // Update

    //

    // ==================================================

    update(

        id,

        data = {}

    ){

        const normalized =

            normalizeRecord(

                data

            );

        return cashflowRepository.update(

            id,

            normalized

        );

    },

    // ==================================================

    //

    // Delete

    //

    // ==================================================

    delete(

        id

    ){

        /*

         * Deleting a cash-flow entry that came from a

         * Transaction must revoke the Transaction

         * itself, not just this row: the Transaction

         * is what moved the account balance, so

         * removing only the row would leave the

         * account (and Dashboard) still deducted.

         * removeTransaction reverses the balance

         * effect and removes every entry of that

         * Transaction; a loan payment also restores

         * the liability side. Entries without a live

         * Transaction are removed directly.

         */

        let entry = null;

        try {

            entry =

                cashflowRepository.findById(

                    id

                );

        } catch (lookupError) {

        }

        const transactionId =

            entry

                ? entry.transactionId

                : null;

        if (transactionId){

            let transaction = null;

            try {

                transaction =

                    (

                        TransactionIntegration

                            .getAllTransactions() ||

                        []

                    ).find(

                        item =>

                            String(item.id) ===

                            String(transactionId)

                    ) || null;

            } catch (transactionError) {

            }

            if (transaction){

                TransactionIntegration

                    .removeTransaction(

                        transactionId

                    );

                if (

                    transaction.type ===

                    "LOAN_PAYMENT"

                ){

                    try {

                        LiabilityService

                            .handleLoanPaymentRemoved(

                                transaction

                            );

                    } catch (liabilityError) {

                    }

                }

                return true;

            }

        }

        return cashflowRepository.remove(

            id

        );

    },

    // Entry-only removal: used by internal cascades

    // where the Transaction is already being revoked

    // by TransactionIntegration (no re-entry).

    deleteEntry(

        id

    ){

        return cashflowRepository.remove(

            id

        );

    },

    // ==================================================

    //

    // Summary

    //

    // ==================================================

    summarizeEntries(list = []){

        let income = 0;

        let expense = 0;

        // Classified view: entries tagged

        // category "Investment" are security

        // buys (out) and sells (in); everything

        // else is daily income / expense.

        let investmentIn = 0;

        let investmentOut = 0;

        let regularIncome = 0;

        let regularExpense = 0;

        // Loan payments follow their own caliber:

        // the interest portion is an expense, the

        // principal portion is debt repayment —

        // real cash out (it is inside expense / net

        // below) but not a daily expense.

        let loanInterestOut = 0;

        let loanPrincipalOut = 0;

        const transactionById =

            new Map();

        try {

            (

                TransactionRepository

                    .getTransactions() ||

                []

            ).forEach(

                transaction =>

                    transactionById.set(

                        String(transaction.id),

                        transaction

                    )

            );

        } catch (transactionError) {

        }

        list.forEach(

            item => {

                const annualized =

                    Number(

                        item.annualizedAmount ??

                        annualize(

                            item.amount,

                            item.frequency

                        )

                    );

                if(

                    item.type ===

                    "INCOME"

                ){

                    income +=

                        annualized;

                    if(

                        item.category ===

                        "Investment"

                    ){

                        investmentIn +=

                            annualized;

                    } else {

                        regularIncome +=

                            annualized;

                    }

                }

                if(

                    item.type ===

                    "EXPENSE"

                ){

                    expense +=

                        annualized;

                    if(

                        item.category ===

                        "Investment"

                    ){

                        investmentOut +=

                            annualized;

                    } else {

                        let principalPart = 0;

                        const transaction =

                            item.transactionId

                                ? transactionById.get(

                                    String(

                                        item.transactionId

                                    )

                                )

                                : null;

                        if(

                            transaction &&

                            transaction.type ===

                                "LOAN_PAYMENT"

                        ){

                            const rawAmount =

                                Math.abs(

                                    Number(item.amount || 0)

                                );

                            const interestRaw =

                                Math.min(

                                    Math.max(

                                        Number(

                                            transaction

                                                .businessDetails

                                                ?.liability

                                                ?.interestPortion ||

                                            0

                                        ),

                                        0

                                    ),

                                    rawAmount

                                );

                            const ratio =

                                rawAmount > 0

                                    ? annualized /

                                        rawAmount

                                    : 0;

                            principalPart =

                                (

                                    rawAmount -

                                    interestRaw

                                ) * ratio;

                            loanPrincipalOut +=

                                principalPart;

                            loanInterestOut +=

                                interestRaw * ratio;

                        }

                        regularExpense +=

                            annualized -

                            principalPart;

                    }

                }

            }

        );

        return {

            income,

            expense,

            net:

                income -

                expense,

            investmentIn,

            investmentOut,

            investmentNet:

                investmentIn -

                investmentOut,

            regularIncome,

            regularExpense,

            regularNet:

                regularIncome -

                regularExpense,

            loanInterestOut,

            loanPrincipalOut

        };

    },

    summary(){

        return this.summarizeEntries(

            this.list()

        );

    },

    // ==================================================

    //

    // Monthly Cashflow

    //

    // ==================================================

    monthlyCashflow(){

        const list =

            this.list();

        let income = 0;

        let expense = 0;

        list.forEach(

            item => {

                const amount =

                    Number(

                        item.amount || 0

                    );

                if(

                    item.type ===

                    "INCOME"

                ){

                    if(

                        item.frequency ===

                        "MONTHLY"

                    ){

                        income += amount;

                    }

                    else if(

                        item.frequency ===

                        "QUARTERLY"

                    ){

                        income +=

                            amount / 3;

                    }

                    else if(

                        item.frequency ===

                        "YEARLY"

                    ){

                        income +=

                            amount / 12;

                    }

                    else if(

                        item.frequency ===

                        "ONE_TIME"

                    ){

                        income += amount;

                    }

                }

                if(

                    item.type ===

                    "EXPENSE"

                ){

                    if(

                        item.frequency ===

                        "MONTHLY"

                    ){

                        expense += amount;

                    }

                    else if(

                        item.frequency ===

                        "QUARTERLY"

                    ){

                        expense +=

                            amount / 3;

                    }

                    else if(

                        item.frequency ===

                        "YEARLY"

                    ){

                        expense +=

                            amount / 12;

                    }

                    else if(

                        item.frequency ===

                        "ONE_TIME"

                    ){

                        expense += amount;

                    }

                }

            }

        );

        return {

            income,

            expense,

            net:

                income -

                expense

        };

    }

};

export default cashflowService;
