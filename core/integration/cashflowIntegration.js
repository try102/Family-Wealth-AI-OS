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

 * - Provide synchronization diagnostics

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

    lastSyncResult:

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

        this.lastSyncResult =

            this.syncExistingTransactions();

        console.log(

            "Cashflow Integration Sync:",

            this.lastSyncResult

        );

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

            const result = {

                transactionCount:

                    0,

                incomeTransactions:

                    0,

                expenseTransactions:

                    0,

                synced:

                    0,

                skipped:

                    0,

                noManager:

                    true

            };

            console.log(

                "Cashflow Integration:",

                "Transaction Manager NOT connected."

            );

            return result;

        }

        const transactions =

            this.transactionManager

                .getAllTransactions();

        const safeTransactions =

            Array.isArray(

                transactions

            )

                ? transactions

                : [];

        let incomeTransactions =

            0;

        let expenseTransactions =

            0;

        let synced =

            0;

        let skipped =

            0;

        let noCashLine =

            0;

        let alreadyExists =

            0;

        let unsupported =

            0;

        safeTransactions.forEach(

            transaction => {

                if(

                    transaction?.type ===

                    "INCOME"

                ){

                    incomeTransactions++;

                }

                else if(

                    transaction?.type ===

                    "EXPENSE"

                ){

                    expenseTransactions++;

                }

            }

        );

        safeTransactions.forEach(

            transaction => {

                const result =

                    this.handleTransactionCreated(

                        transaction

                    );

                if(

                    result?.created

                ){

                    synced++;

                }

                else{

                    skipped++;

                }

                if(

                    result?.reason ===

                    "NO_CASH_LINE"

                ){

                    noCashLine++;

                }

                if(

                    result?.reason ===

                    "ALREADY_EXISTS"

                ){

                    alreadyExists++;

                }

                if(

                    result?.reason ===

                    "UNSUPPORTED_TYPE"

                ){

                    unsupported++;

                }

            }

        );

        const result = {

            transactionCount:

                safeTransactions.length,

            incomeTransactions,

            expenseTransactions,

            synced,

            skipped,

            noCashLine,

            alreadyExists,

            unsupported,

            noManager:

                false

        };

        console.log(

            "Cashflow Integration Diagnostic:",

            result

        );

        return result;

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

            return {

                created:

                    false,

                reason:

                    "INVALID_TRANSACTION"

            };

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

        return {

            created:

                false,

            reason:

                "UNSUPPORTED_TYPE"

        };

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

            return {

                created:

                    false,

                reason:

                    "ALREADY_EXISTS"

            };

        }

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if(

            !line

        ){

            console.warn(

                "Cashflow Integration:",

                "INCOME transaction has no valid cash line.",

                transaction

            );

            return {

                created:

                    false,

                reason:

                    "NO_CASH_LINE"

            };

        }

        const cashflow =

            cashflowAPI.createCashflow({

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

        if(

            cashflow

        ){

            return {

                created:

                    true,

                reason:

                    "CREATED",

                cashflow

            };

        }

        return {

            created:

                false,

            reason:

                "CREATE_FAILED"

        };

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

            return {

                created:

                    false,

                reason:

                    "ALREADY_EXISTS"

            };

        }

        const line =

            this.getPrimaryCashLine(

                transaction

            );

        if(

            !line

        ){

            console.warn(

                "Cashflow Integration:",

                "EXPENSE transaction has no valid cash line.",

                transaction

            );

            return {

                created:

                    false,

                reason:

                    "NO_CASH_LINE"

            };

        }

        const cashflow =

            cashflowAPI.createCashflow({

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

        if(

            cashflow

        ){

            return {

                created:

                    true,

                reason:

                    "CREATED",

                cashflow

            };

        }

        return {

            created:

                false,

            reason:

                "CREATE_FAILED"

        };

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

        if(

            !Array.isArray(

                cashflows

            )

        ){

            return false;

        }

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

    // Get Last Sync Result

    //

    // ==================================================

    getLastSyncResult(){

        return (

            this.lastSyncResult

            || {

                transactionCount:

                    0,

                incomeTransactions:

                    0,

                expenseTransactions:

                    0,

                synced:

                    0,

                skipped:

                    0

            }

        );

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

                !!this.transactionManager,

            lastSyncResult:

                this.getLastSyncResult()

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

        this.lastSyncResult =

            null;

        return true;

    }

};

export default

    CashflowIntegration;
