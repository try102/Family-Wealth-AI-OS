/**

 *

 * Family Wealth AI OS V7

 * Transaction Service

 *

 * Responsibility:

 *

 * - Provide business-facing entry points for Actual Transactions

 * - Convert business events into standard Transactions

 * - Keep business modules decoupled from Transaction Manager

 * - Publish system Transaction events

 *

 * Architecture:

 *

 * Business Module

 *      ↓

 * TransactionService

 *      ↓

 * TransactionManager

 *      ↓

 * Transaction

 *      ↓

 * EventBus

 *

 * IMPORTANT:

 *

 * TransactionService records Actual events only.

 *

 */

/*

 *

 * Transaction Model

 *

 */

import Transaction

    from "./transaction.js?v=20261008ae";

/*

 *

 * Event Bus

 *

 */

import EventBus

    from "../core/events/eventBus.js?v=20261008ae";

/*

 *

 * Event Types

 *

 */

import EventTypes

    from "../core/events/eventTypes.js?v=20261008ae";

class TransactionService {

    constructor(

        transactionManager

    ) {

        if (!transactionManager) {

            throw new Error(

                "TransactionManager is required."

            );

        }

        this.transactionManager =

            transactionManager;

    }

    // =====================================================

    // Generic Transaction

    // =====================================================

    recordTransaction(

        data = {}

    ) {

        const transaction =

            data instanceof Transaction

                ? data

                : new Transaction(data);

        transaction.normalize();

        const validation =

            transaction.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        const result =

            this.transactionManager

                .createTransaction(

                    transaction

                );

        /*

         * TRANSACTION_CREATED is published

         * once by TransactionManager

         * .createTransaction (Step 2 fix).

         * Do not publish again here, or

         * subscribers would process every

         * Transaction twice.

         */

        return result;

    }

    // =====================================================

    // Income

    // =====================================================

    recordIncome(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            income = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "INCOME",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "INCOME",

                    amount,

                    direction:

                        "IN",

                    cashEffect:

                        true,

                    category:

                        income.category ||

                        "Income",

                    description

                }

            ],

            businessDetails: {

                income: {

                    ...income,

                    amount

                }

            }

        });

    }

    // =====================================================

    // Expense

    // =====================================================

    recordExpense(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            expense = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "EXPENSE",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "EXPENSE",

                    amount,

                    direction:

                        "OUT",

                    cashEffect:

                        true,

                    category:

                        expense.category ||

                        "Expense",

                    description

                }

            ],

            businessDetails: {

                expense: {

                    ...expense,

                    amount

                }

            }

        });

    }

    // =====================================================

    // Account Transfer

    // =====================================================

    recordTransfer(

        data = {}

    ) {

        const {

            date,

            fromAccountId,

            toAccountId,

            amount,

            currency = "USD",

            description = "",

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "TRANSFER",

            currency,

            description,

            source,

            lines: [

                {

                    accountId:

                        fromAccountId,

                    type:

                        "TRANSFER",

                    amount,

                    direction:

                        "OUT",

                    cashEffect:

                        true,

                    category:

                        "Transfer",

                    description

                },

                {

                    accountId:

                        toAccountId,

                    type:

                        "TRANSFER",

                    amount,

                    direction:

                        "IN",

                    cashEffect:

                        true,

                    category:

                        "Transfer",

                    description

                }

            ],

            businessDetails: {}

        });

    }

    // =====================================================

    // Investment Buy

    // =====================================================

    recordInvestmentBuy(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            investment = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "INVESTMENT_BUY",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "EXPENSE",

                    amount,

                    direction:

                        "OUT",

                    cashEffect:

                        true,

                    category:

                        "Investment Purchase",

                    description

                }

            ],

            businessDetails: {

                investment: {

                    ...investment,

                    transactionAction:

                        "BUY"

                }

            }

        });

    }

    // =====================================================

    // Investment Sell

    // =====================================================

    recordInvestmentSell(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            investment = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "INVESTMENT_SELL",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "PROCEEDS",

                    amount,

                    direction:

                        "IN",

                    cashEffect:

                        true,

                    category:

                        "Investment Sale",

                    description

                }

            ],

            businessDetails: {

                investment: {

                    ...investment,

                    transactionAction:

                        "SELL"

                }

            }

        });

    }

    // =====================================================

    // Loan Payment

    // =====================================================

    recordLoanPayment(

        data = {}

    ) {

        const {

            date,

            accountId,

            accountSplits,

            amount,

            currency = "USD",

            description = "",

            liability = {},

            source = "BusinessModule"

        } = data;

        // A repayment may be split across two
        // accounts (half each); every share is its
        // own cash line so each account balance
        // moves by exactly its share.

        const splitLines =

            Array.isArray(accountSplits)

                ? accountSplits

                    .filter(

                        split =>

                            split &&

                            Number(split.amount) > 0

                    )

                    .map(split => ({

                        accountId:

                            split.accountId || "",

                        type:

                            "EXPENSE",

                        amount:

                            Number(split.amount),

                        direction:

                            "OUT",

                        cashEffect:

                            true,

                        category:

                            "Loan Payment",

                        description

                    }))

                : [];

        return this.recordTransaction({

            date,

            type:

                "LOAN_PAYMENT",

            currency,

            description,

            source,

            lines:

                splitLines.length

                    ? splitLines

                    : [

                        {

                            accountId,

                            type:

                                "EXPENSE",

                            amount,

                            direction:

                                "OUT",

                            cashEffect:

                                true,

                            category:

                                "Loan Payment",

                            description

                        }

                    ],

            businessDetails: {

                liability: {

                    ...liability,

                    paymentAmount:

                        amount

                }

            }

        });

    }

    // =====================================================

    // Asset Purchase

    // =====================================================

    recordAssetPurchase(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            asset = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "ASSET_PURCHASE",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "EXPENSE",

                    amount,

                    direction:

                        "OUT",

                    cashEffect:

                        true,

                    category:

                        "Asset Purchase",

                    description

                }

            ],

            businessDetails: {

                asset: {

                    ...asset,

                    purchaseAmount:

                        amount

                }

            }

        });

    }

    // =====================================================

    // Asset Sale

    // =====================================================

    recordAssetSale(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            asset = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "ASSET_SALE",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "INCOME",

                    amount,

                    direction:

                        "IN",

                    cashEffect:

                        true,

                    category:

                        "Asset Sale",

                    description

                }

            ],

            businessDetails: {

                asset: {

                    ...asset,

                    saleAmount:

                        amount

                }

            }

        });

    }

    // =====================================================

    // Dividend

    // =====================================================

    recordDividend(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            investment = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "DIVIDEND",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "INCOME",

                    amount,

                    direction:

                        "IN",

                    cashEffect:

                        true,

                    category:

                        "Dividend",

                    description

                }

            ],

            businessDetails: {

                investment: {

                    ...investment,

                    transactionAction:

                        "DIVIDEND"

                }

            }

        });

    }

    // =====================================================

    // Interest

    // =====================================================

    recordInterest(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            investment = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "INTEREST",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "INCOME",

                    amount,

                    direction:

                        "IN",

                    cashEffect:

                        true,

                    category:

                        "Interest",

                    description

                }

            ],

            businessDetails: {

                investment: {

                    ...investment,

                    transactionAction:

                        "INTEREST"

                }

            }

        });

    }

    // =====================================================

    // Tax Payment

    // =====================================================

    recordTaxPayment(

        data = {}

    ) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            tax = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type:

                "TAX_PAYMENT",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type:

                        "TAX",

                    amount,

                    direction:

                        "OUT",

                    cashEffect:

                        true,

                    category:

                        "Tax",

                    description

                }

            ],

            businessDetails: {

                tax: {

                    ...tax,

                    paymentAmount:

                        amount

                }

            }

        });

    }

}

/*

 *

 * ES Module Export

 *

 */

export default

    TransactionService;
