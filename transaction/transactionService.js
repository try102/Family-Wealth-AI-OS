/**

 * Family Wealth AI OS V7

 * Transaction Service

 *

 * Responsibility:

 * - Provide business-facing entry points

 * - Record Actual Transactions

 * - Convert business events into standard Transactions

 * - Keep business modules independent from

 *   TransactionManager implementation

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

 *        ↓

 * TransactionService

 *        ↓

 * TransactionManager

 *        ↓

 * TransactionRepository

 *        ↓

 * DataService

 */

const Transaction =

    require("./transaction");

const TransactionManager =

    require("./transactionManager");

class TransactionService {

    constructor(

        transactionManager = null

    ) {

        this.transactionManager =

            transactionManager ||

            new TransactionManager();

    }

    /**

     * Get the Transaction Manager.

     */

    getManager() {

        return this.transactionManager;

    }

    /**

     * Record a generic Actual Transaction.

     *

     * Business modules may provide

     * already-calculated businessDetails.

     *

     * TransactionService does not calculate them.

     */

    recordTransaction(

        data = {}

    ) {

        const transaction =

            data instanceof Transaction

                ? data

                : new Transaction(data);

        /*

         * If this method is called by a

         * business module, the default source

         * is BusinessModule.

         */

        if (

            !transaction.source ||

            transaction.source === "Manual"

        ) {

            transaction.source =

                data.source ||

                "BusinessModule";

        }

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

     */

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

    /**

     * Record an Expense Actual event.

     */

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

    /**

     * Record an Account-to-Account Transfer.

     *

     * One economic event.

     *

     * Two Financial Lines.

     */

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

    /**

     * Record an Investment Buy Actual event.

     *

     * Investment module calculates:

     *

     * - quantity

     * - price

     * - fees

     * - cost basis

     *

     * TransactionService only records

     * the resulting Actual event.

     */

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

    /**

     * Record an Investment Sell Actual event.

     *

     * Investment module calculates:

     *

     * - quantity

     * - proceeds

     * - cost basis

     * - capital gain

     * - holding period

     *

     * TransactionService only records

     * the resulting Actual event.

     */

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

    /**

     * Record a Loan Payment Actual event.

     *

     * Principal and interest must already

     * be calculated by the Liability / Loan module.

     *

     * TransactionService does NOT calculate them.

     */

    recordLoanPayment(

        data = {}

    ) {

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

            type:

                "LOAN_PAYMENT",

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

    /**

     * Record an Interest Actual event.

     */

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

    /**

     * Record a Tax Payment Actual event.

     */

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

    /**

     * Read all Transactions.

     */

    getTransactions() {

        return this.transactionManager

            .getAllTransactions();

    }

    /**

     * Read one Transaction.

     */

    getTransaction(

        transactionId

    ) {

        return this.transactionManager

            .getTransaction(

                transactionId

            );

    }

    /**

     * Get Posted Transactions.

     */

    getPostedTransactions() {

        return this.transactionManager

            .getPostedTransactions();

    }

    /**

     * Get Transactions by Account.

     */

    getTransactionsByAccount(

        accountId

    ) {

        return this.transactionManager

            .getTransactionsByAccount(

                accountId

            );

    }

    /**

     * Update Transaction.

     */

    updateTransaction(

        transactionId,

        updates = {}

    ) {

        return this.transactionManager

            .updateTransaction(

                transactionId,

                updates

            );

    }

    /**

     * Void Transaction.

     */

    voidTransaction(

        transactionId

    ) {

        return this.transactionManager

            .voidTransaction(

                transactionId

            );

    }

    /**

     * Post Transaction.

     */

    postTransaction(

        transactionId

    ) {

        return this.transactionManager

            .postTransaction(

                transactionId

            );

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
