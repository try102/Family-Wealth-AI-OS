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

 * - Synchronize existing Transactions into Cashflow

 * - Convert Income / Expense Transactions

 *   into Cashflow records

 * - Prevent duplicate Cashflow records

 *

 */

import EventBus

    from "../events/eventBus.js";

import EventTypes

    from "../events/eventTypes.js";

import ModuleRegistry

    from "../registry/moduleRegistry.js";

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

        /*

         *

         * Listen for NEW Transactions.

         *

         */

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

        /*

         *

         * Synchronize Transactions that

         * already exist in the system.

         *

         */

        this.syncExistingTransactions();

        this.initialized =

            true;

        return this.getStatus();

    },

    // ==================================================

    //

    // Synchronize Existing Transactions

    //

    // ==================================================

    syncExistingTransactions() {

        const transactionIntegration =

            ModuleRegistry.get(

                "transaction"

            );

        /*

         *

         * Transaction module may not yet be

         * registered during some initialization

         * scenarios.

         *

         */

        if (

            !transactionIntegration

        ) {

            console.warn(

                "Cashflow Integration: Transaction module is not registered."

            );

            return [];

        }

        let transactions = [];

        /*

         *

         * Preferred system-level interface:

         *

         * TransactionIntegration.getAllTransactions()

         *

         */

        if (

            typeof transactionIntegration

                .getAllTransactions ===

                "function"

        ) {

            transactions =

                transactionIntegration

                    .getAllTransactions();

        }

        /*

         *

         * Compatibility with an object exposing

         * the Transaction Facade.

         *

         */

        else if (

            transactionIntegration.facade &&

            typeof transactionIntegration

                .facade

                .getAllTransactions ===

                "function"

        ) {

            transactions =

                transactionIntegration

                    .facade

                    .getAllTransactions();

        }

        if (

            !Array.isArray(

                transactions

            )

        ) {

            return [];

        }

        const results = [];

        transactions.forEach(

            transaction => {

                if (

                    !transaction ||

                    transaction.status ===

                        "Voided"

                ) {

                    return;

                }

                /*

                 *

                 * Prevent duplicate Cashflow

                 * records.

                 *

                 */

                if (

                    this.cashflowAlreadyExists(

                        transaction.id

                    )

                ) {

                    return;

                }

                const result =

                    this.handleTransactionCreated(

                        transaction

                    );

                if (result) {

                    results.push(

                        result

                    );

                }

            }

        );

        return results;

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

         * Voided Transactions do not

         * create Cashflow records.

         *

         */

        if (

            transaction.status ===

                "Voided"

        ) {

            return null;

        }

        /*

         *

         * Income

         *

         */

        if (

            transaction.type ===

                "INCOME"

        ) {

            return this.recordIncome(

                transaction

            );

        }

        /*

         *

         * Expense

         *

         */

        if (

            transaction.type ===

                "EXPENSE"

        ) {

            return this.recordExpense(

                transaction

            );

        }

        /*

         *

         * Other Transaction types are

         * intentionally ignored here.

         *

         * Examples:

         *

         * TRANSFER

         * INVESTMENT_BUY

         * INVESTMENT_SELL

         * DIVIDEND

         * INTEREST

         * LOAN_PAYMENT

         * TAX_PAYMENT

         *

         */

        return null;

    },

    // ==================================================

    //

    // Check Existing Cashflow

    //

    // ==================================================

    cashflowAlreadyExists(

        transactionId

    ) {

        if (!transactionId) {

            return false;

        }

        const cashflows =

            cashflowAPI

                .getCashflows();

        if (

            !Array.isArray(

                cashflows

            )

        ) {

            return false;

        }

        return cashflows.some(

            cashflow =>

                cashflow &&

                cashflow.transactionId ===

                    transactionId

        );

    },

    // ==================================================

    //

    // Income

    //

    // ==================================================

    recordIncome(

        transaction

    ) {

        if (

            this.cashflowAlreadyExists(

                transaction.id

            )

        ) {

            return null;

        }

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if (!line) {

            return null;

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

                "Income"

        });

    },

    // ==================================================

    //

    // Expense

    //

    // ==================================================

    recordExpense(

        transaction

    ) {

        if (

            this.cashflowAlreadyExists(

                transaction.id

            )

        ) {

            return null;

        }

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if (!line) {

            return null;

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

                "Expense"

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

            cashLines.length ===

                0

        ) {

            return null;

        }

        return cashLines[0];

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
