/*

 *

 * Family Wealth AI OS V7

 *

 * Cashflow Integration

 *

 * Responsibility:

 *

 * - Connect Transaction events to Cashflow

 * - Listen for actual Transaction creation

 * - Convert cash-impact Transactions

 *   into Cashflow records

 * - Synchronize existing Transactions

 *

 */

import EventBus

    from "../events/eventBus.js";

import EventTypes

    from "../events/eventTypes.js";

import cashflowAPI

    from "../../modules/cashflow/api/cashflowAPI.js";

const CashflowIntegration = {

    name:

        "Cashflow",

    version:

        "V7",

    status:

        "READY",

    initialized:

        false,

    transactionListener:

        null,

    // ==================================================

    //

    // Initialize

    //

    // ==================================================

    initialize() {

        if (

            this.initialized

        ) {

            return this.getStatus();

        }

        this.transactionListener =

            transaction => {

                this.handleTransactionCreated(

                    transaction

                );

            };

        EventBus.subscribe(

            EventTypes.TRANSACTION_CREATED,

            this.transactionListener

        );

        this.initialized =

            true;

        return this.getStatus();

    },

    // ==================================================

    //

    // Handle Transaction Created

    //

    // ==================================================

    handleTransactionCreated(

        transaction

    ) {

        if (

            !transaction ||

            typeof transaction !==

                "object"

        ) {

            return null;

        }

        /*

         *

         * Only actual cash-impact

         * transaction types are converted.

         *

         */

        switch (

            transaction.type

        ) {

            case "INCOME":

                return this.recordIncome(

                    transaction

                );

            case "EXPENSE":

                return this.recordExpense(

                    transaction

                );

            case "DIVIDEND":

                return this.recordIncome(

                    transaction,

                    "Dividend"

                );

            case "INTEREST":

                return this.recordIncome(

                    transaction,

                    "Interest"

                );

            case "INVESTMENT_BUY":

                return this.recordExpense(

                    transaction,

                    "Investment Purchase"

                );

            case "INVESTMENT_SELL":

                return this.recordIncome(

                    transaction,

                    "Investment Sale"

                );

            case "LOAN_PAYMENT":

                return this.recordExpense(

                    transaction,

                    "Loan Payment"

                );

            case "TAX_PAYMENT":

                return this.recordExpense(

                    transaction,

                    "Tax"

                );

            default:

                return null;

        }

    },

    // ==================================================

    //

    // Income

    //

    // ==================================================

    recordIncome(

        transaction,

        defaultCategory = "Income"

    ) {

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if (!line) {

            return null;

        }

        /*

         *

         * Prevent duplicate Cashflow

         * records for the same Transaction.

         *

         */

        const existing =

            this.findByTransactionId(

                transaction.id

            );

        if (existing) {

            return existing;

        }

        return cashflowAPI.createCashflow({

            transactionId:

                transaction.id,

            date:

                transaction.date,

            type:

                "INCOME",

            amount:

                line.amount,

            currency:

                transaction.currency,

            description:

                transaction.description,

            frequency:

                "ONE_TIME",

            source:

                "Transaction",

            accountId:

                line.accountId,

            category:

                line.category ||

                defaultCategory

        });

    },

    // ==================================================

    //

    // Expense

    //

    // ==================================================

    recordExpense(

        transaction,

        defaultCategory = "Expense"

    ) {

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if (!line) {

            return null;

        }

        /*

         *

         * Prevent duplicate Cashflow

         * records for the same Transaction.

         *

         */

        const existing =

            this.findByTransactionId(

                transaction.id

            );

        if (existing) {

            return existing;

        }

        return cashflowAPI.createCashflow({

            transactionId:

                transaction.id,

            date:

                transaction.date,

            type:

                "EXPENSE",

            amount:

                line.amount,

            currency:

                transaction.currency,

            description:

                transaction.description,

            frequency:

                "ONE_TIME",

            source:

                "Transaction",

            accountId:

                line.accountId,

            category:

                line.category ||

                defaultCategory

        });

    },

    // ==================================================

    //

    // Get Primary Cash Line

    //

    // ==================================================

    getPrimaryCashLine(

        transaction

    ) {

        if (

            !Array.isArray(

                transaction.lines

            )

        ) {

            return null;

        }

        const cashLines =

            transaction.lines.filter(

                line =>

                    line &&

                    line.cashEffect ===

                        true &&

                    typeof line.amount ===

                        "number" &&

                    Number.isFinite(

                        line.amount

                    )

            );

        if (

            cashLines.length === 0

        ) {

            return null;

        }

        /*

         *

         * For now the first cash-impact

         * line is the primary cash line.

         *

         */

        return cashLines[0];

    },

    // ==================================================

    //

    // Find Cashflow By Transaction ID

    //

    // ==================================================

    findByTransactionId(

        transactionId

    ) {

        if (!transactionId) {

            return null;

        }

        const cashflows =

            cashflowAPI.getCashflows();

        if (

            !Array.isArray(

                cashflows

            )

        ) {

            return null;

        }

        return (

            cashflows.find(

                item =>

                    String(

                        item.transactionId

                    ) ===

                    String(

                        transactionId

                    )

            ) || null

        );

    },

    // ==================================================

    //

    // Synchronize Existing Transactions

    //

    // ==================================================

    synchronizeTransactions(

        transactions = []

    ) {

        if (

            !Array.isArray(

                transactions

            )

        ) {

            return {

                processed:

                    0,

                created:

                    0,

                existing:

                    0

            };

        }

        let processed =

            0;

        let created =

            0;

        let existing =

            0;

        transactions.forEach(

            transaction => {

                if (

                    !transaction ||

                    typeof transaction !==

                        "object"

                ) {

                    return;

                }

                processed++;

                const before =

                    this.findByTransactionId(

                        transaction.id

                    );

                if (before) {

                    existing++;

                    return;

                }

                const result =

                    this.handleTransactionCreated(

                        transaction

                    );

                if (result) {

                    created++;

                }

            }

        );

        return {

            processed,

            created,

            existing

        };

    },

    // ==================================================

    //

    // Status

    //

    // ==================================================

    getStatus() {

        return {

            name:

                this.name,

            version:

                this.version,

            status:

                this.initialized

                    ? "READY"

                    : "NOT_INITIALIZED",

            initialized:

                this.initialized

        };

    },

    // ==================================================

    //

    // Shutdown

    //

    // ==================================================

    shutdown() {

        if (

            this.transactionListener

        ) {

            EventBus.unsubscribe(

                EventTypes.TRANSACTION_CREATED,

                this.transactionListener

            );

        }

        this.transactionListener =

            null;

        this.initialized =

            false;

        return true;

    }

};

export default

    CashflowIntegration;
