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

 * - Synchronize existing Transactions on startup

 * - Convert Income / Expense Transactions

 *   into Cashflow records

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

    transactionManager:

        null,

    // ==================================================

    //

    // Initialize

    //

    // ==================================================

    initialize(

        transactionManager = null

    ){

        if(

            this.initialized

        ){

            return this.getStatus();

        }

        /*

         *

         * Keep reference to the real

         * Transaction Manager.

         *

         */

        this.transactionManager =

            transactionManager;

        /*

         *

         * Listen for future transactions.

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

         * Mark initialized before

         * historical synchronization.

         *

         */

        this.initialized =

            true;

        /*

         *

         * Synchronize transactions

         * that already existed before

         * system startup.

         *

         */

        this.syncExistingTransactions();

        return this.getStatus();

    },

    // ==================================================

    //

    // Synchronize Existing Transactions

    //

    // ==================================================

    syncExistingTransactions(){

        if(

            !this.transactionManager

        ){

            return {

                synced:

                    0,

                skipped:

                    0

            };

        }

        const transactions =

            this.transactionManager

                .getAllTransactions();

        let synced = 0;

        let skipped = 0;

        transactions.forEach(

            transaction => {

                const result =

                    this.handleTransactionCreated(

                        transaction

                    );

                if(

                    result

                ){

                    synced++;

                }

                else{

                    skipped++;

                }

            }

        );

        return {

            synced,

            skipped

        };

    },

    // ==================================================

    //

    // Handle Transaction Created

    //

    // ==================================================

    handleTransactionCreated(

        transaction

    ){

        if(

            !transaction ||

            typeof transaction !==

                "object"

        ){

            return null;

        }

        /*

         *

         * Only actual Income / Expense

         * transactions create Cashflow

         * records.

         *

         */

        if(

            transaction.type ===

            "INCOME"

        ){

            return this.recordIncome(

                transaction

            );

        }

        if(

            transaction.type ===

            "EXPENSE"

        ){

            return this.recordExpense(

                transaction

            );

        }

        return null;

    },

    // ==================================================

    //

    // Income

    //

    // ==================================================

    recordIncome(

        transaction

    ){

        /*

         *

         * Prevent duplicate Cashflow

         * records for the same Transaction.

         *

         */

        if(

            this.cashflowAlreadyExists(

                transaction.id

            )

        ){

            return null;

        }

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if(

            !line

        ){

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

    ){

        /*

         *

         * Prevent duplicate Cashflow

         * records for the same Transaction.

         *

         */

        if(

            this.cashflowAlreadyExists(

                transaction.id

            )

        ){

            return null;

        }

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if(

            !line

        ){

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

    // Check Existing Cashflow

    //

    // ==================================================

    cashflowAlreadyExists(

        transactionId

    ){

        if(

            !transactionId

        ){

            return false;

        }

        const cashflows =

            cashflowAPI

                .getCashflows();

        return cashflows.some(

            cashflow =>

                String(

                    cashflow.transactionId

                ) ===

                String(

                    transactionId

                )

        );

    },

    // ==================================================

    //

    // Get Primary Cash Line

    //

    // ==================================================

    getPrimaryCashLine(

        transaction

    ){

        if(

            !Array.isArray(

                transaction.lines

            )

        ){

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

        if(

            cashLines.length ===

            0

        ){

            return null;

        }

        return cashLines[0];

    },

    // ==================================================

    //

    // Status

    //

    // ==================================================

    getStatus(){

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

                this.initialized,

            transactionManagerConnected:

                !!this.transactionManager

        };

    },

    // ==================================================

    //

    // Shutdown

    //

    // ==================================================

    shutdown(){

        if(

            this.transactionListener

        ){

            EventBus.unsubscribe(

                EventTypes.TRANSACTION_CREATED,

                this.transactionListener

            );

        }

        this.transactionListener =

            null;

        this.transactionManager =

            null;

        this.initialized =

            false;

        return true;

    }

};

export default

    CashflowIntegration;
