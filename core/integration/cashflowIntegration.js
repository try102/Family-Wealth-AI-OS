/*

 * Family Wealth AI OS V7

 *

 * Cashflow Integration

 *

 * Responsibility:

 *

 * - Connect Transaction events to Cashflow

 * - Listen for actual Transaction creation

 * - Convert Income / Expense Transactions

 *   into Cashflow records

 * - Keep Cashflow implementation isolated

 *

 */

import EventBus

    from "../events/eventBus.js";

import EventTypes

    from "../events/eventTypes.js";

import cashflowAPI

    from "../modules/cashflow/api/cashflowAPI.js";

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

    // =====================================================

    // Initialize

    // =====================================================

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

        return {

            name:

                this.name,

            version:

                this.version,

            status:

                "READY",

            initialized:

                true

        };

    },

    // =====================================================

    // Handle Transaction Created

    // =====================================================

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

        return null;

    },

    // =====================================================

    // Income

    // =====================================================

    recordIncome(

        transaction

    ) {

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

    // =====================================================

    // Expense

    // =====================================================

    recordExpense(

        transaction

    ) {

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

    // =====================================================

    // Get Primary Cash Line

    // =====================================================

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

                    line.cashEffect === true &&

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

        return cashLines[0];

    },

    // =====================================================

    // Status

    // =====================================================

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

    // =====================================================

    // Shutdown

    // =====================================================

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

export default CashflowIntegration;
