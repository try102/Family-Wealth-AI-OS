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

         * Synchronize EXISTING Transactions.

         *

         * This is important because Transactions

         * may already exist before CashflowIntegration

         * is initialized.

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

        /*

         *

         * Find the active Transaction system

         * through the system registry.

         *

         * Cashflow Integration must not construct

         * another Transaction system.

         *

         */

        let transactions = [];

        try {

            /*

             *

             * Access ModuleRegistry dynamically

             * to avoid creating a circular dependency

             * during system bootstrap.

             *

             */

            const moduleRegistryModule =

                window.__FAMILY_WEALTH_MODULE_REGISTRY__;

            if (

                moduleRegistryModule &&

                typeof moduleRegistryModule

                    .get ===

                    "function"

            ) {

                const transactionModule =

                    moduleRegistryModule.get(

                        "transaction"

                    );

                if (

                    transactionModule &&

                    typeof transactionModule

                        .getAllTransactions ===

                        "function"

                ) {

                    transactions =

                        transactionModule

                            .getAllTransactions();

                }

            }

        }

        catch (error) {

            console.warn(

                "Cashflow Integration: existing Transaction synchronization unavailable.",

                error

            );

        }

        /*

         *

         * If the global registry bridge is unavailable,

         * simply return.

         *

         *

         * New Transaction events will still work.

         *

         */

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

                 * Prevent duplicate Cashflow records.

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

         * Voided Transactions must never

         * become active Cashflow records.

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

         * Only actual cash-flow-producing

         * Income / Expense Transactions

         * are processed here.

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

         * Transfer, Investment Buy,

         * Investment Sell, etc. are not

         * treated as ordinary income / expense

         * by this integration.

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

        /*

         *

         * Prevent duplicate creation.

         *

         */

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

        /*

         *

         * Prevent duplicate creation.

         *

         */

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
