/**

 * Family Wealth AI OS V7

 * Transaction Service

 *

 * Responsibility:

 * - Provide a controlled business-facing entry point

 *   for creating Actual Transactions.

 * - Convert business event data into the standard

 *   Transaction structure.

 * - Keep business modules decoupled from the

 *   Transaction Manager implementation.

 *

 * TransactionService does NOT perform:

 * - Tax calculations

 * - Investment calculations

 * - Cost basis calculations

 * - Capital gain calculations

 * - Loan calculations

 * - Interest calculations

 * - Account balance calculations

 * - Forecast calculations

 * - Simulation calculations

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

 *

 * Account is referenced through accountId.

 *

 * IMPORTANT:

 *

 * TransactionService records Actual events.

 *

 * Planning / Forecast / Simulation data must not

 * automatically become Actual Transactions.

 */

const Transaction =

    require("./transaction");

class TransactionService {

    constructor(transactionManager) {

        if (!transactionManager) {

            throw new Error(

                "TransactionManager is required."

            );

        }

        this.transactionManager =

            transactionManager;

    }

    /**

     * Record a generic Actual Transaction.

     *

     * Business modules may provide the already

     * calculated businessDetails.

     *

     * TransactionService does not calculate them.

     */

    recordTransaction(data = {}) {

        const transaction =

            data instanceof Transaction

                ? data

                : new Transaction(data);

        transaction.source =

            data.source ||

            transaction.source ||

            "BusinessModule";

        transaction.normalize();

        const validation =

            transaction.validate();

        if (!validation.valid) {

            throw new Error(

                validation.errors.join(" ")

            );

        }

        return this.transactionManager

            .createTransaction(

                transaction

            );

    }

    /**

     * Record an Income Actual event.

     *

     * Income calculations remain inside the

     * Income business module.

     *

     * This method only records the result.

     */

    recordIncome(data = {}) {

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

            type: "INCOME",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "INCOME",

                    amount,

                    direction: "IN",

                    cashEffect: true,

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

    /**

     * Record an Expense Actual event.

     */

    recordExpense(data = {}) {

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

            type: "EXPENSE",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "EXPENSE",

                    amount,

                    direction: "OUT",

                    cashEffect: true,

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

    /**

     * Record an Account-to-Account Transfer.

     *

     * One economic event.

     *

     * Two Financial Lines.

     */

    recordTransfer(data = {}) {

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

            type: "TRANSFER",

            currency,

            description,

            source,

            lines: [

                {

                    accountId:

                        fromAccountId,

                    type: "TRANSFER",

                    amount,

                    direction: "OUT",

                    cashEffect: true,

                    category:

                        "Transfer",

                    description

                },

                {

                    accountId:

                        toAccountId,

                    type: "TRANSFER",

                    amount,

                    direction: "IN",

                    cashEffect: true,

                    category:

                        "Transfer",

                    description

                }

            ],

            businessDetails: {}

        });

    }

    /**

     * Record an Investment Buy Actual event.

     *

     * Investment module calculates:

     * - quantity

     * - price

     * - fees

     * - cost basis

     *

     * TransactionService only records the event.

     */

    recordInvestmentBuy(data = {}) {

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

            type: "INVESTMENT_BUY",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "EXPENSE",

                    amount,

                    direction: "OUT",

                    cashEffect: true,

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

    /**

     * Record an Investment Sell Actual event.

     *

     * Investment module calculates:

     * - quantity

     * - proceeds

     * - cost basis

     * - capital gain

     * - holding period

     *

     * TransactionService records the resulting

     * business details and cash movement.

     */

    recordInvestmentSell(data = {}) {

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

            type: "INVESTMENT_SELL",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "PROCEEDS",

                    amount,

                    direction: "IN",

                    cashEffect: true,

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

    /**

     * Record a Loan Payment Actual event.

     *

     * IMPORTANT:

     *

     * Principal and interest must already be

     * calculated by the Liability / Loan module.

     *

     * TransactionService does NOT calculate them.

     *

     * One cash payment may therefore contain:

     *

     * Principal = 4,500

     * Interest  =   500

     * Total     = 5,000

     */

    recordLoanPayment(data = {}) {

        const {

            date,

            accountId,

            amount,

            currency = "USD",

            description = "",

            liability = {},

            source = "BusinessModule"

        } = data;

        return this.recordTransaction({

            date,

            type: "LOAN_PAYMENT",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "EXPENSE",

                    amount,

                    direction: "OUT",

                    cashEffect: true,

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

    /**

     * Record a Dividend Actual event.

     */

    recordDividend(data = {}) {

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

            type: "DIVIDEND",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "INCOME",

                    amount,

                    direction: "IN",

                    cashEffect: true,

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

    /**

     * Record an Interest Actual event.

     */

    recordInterest(data = {}) {

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

            type: "INTEREST",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "INCOME",

                    amount,

                    direction: "IN",

                    cashEffect: true,

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

    /**

     * Record a Tax Payment Actual event.

     */

    recordTaxPayment(data = {}) {

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

            type: "TAX_PAYMENT",

            currency,

            description,

            source,

            lines: [

                {

                    accountId,

                    type: "TAX",

                    amount,

                    direction: "OUT",

                    cashEffect: true,

                    category:

                        "Tax",

                    description

                }

            ],

            businessDetails: {

                ...tax

            }

        });

    }

}

/*

 * CommonJS export.

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports =

        TransactionService;

}
