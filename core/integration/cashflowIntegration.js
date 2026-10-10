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

    from "../events/eventBus.js?v=20261008ae";

import EventTypes

    from "../events/eventTypes.js?v=20261008ae";

import cashflowAPI

    from "../../modules/cashflow/api/cashflowAPI.js?v=20261009bq";

import AccountRepository

    from "../../modules/account/repository/accountRepository.js?v=20261008ae";

import InvestmentRepository

    from "../../modules/investment/repository/investmentRepository.js?v=20261008ae";

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

    isMirroredAccount(

        accountId

    ){

        if(

            !accountId

        ){

            return false;

        }

        try {

            const account =

                AccountRepository.findById(

                    accountId

                );

            return !!account &&

                account.openingSource ===

                    "asset";

        } catch (lookupError) {

            return false;

        }

    },

    resolveInvestmentAccountId(

        transaction

    ){

        try {

            const detail =

                (

                    transaction &&

                    transaction.businessDetails

                )

                    ? transaction.businessDetails

                        .investment || {}

                    : {};

            let memberId =

                detail.memberId || "";

            if (!memberId && detail.tradeId) {

                const trade =

                    (

                        InvestmentRepository

                            .getTrades() ||

                        []

                    ).find(

                        item =>

                            String(item.id) ===

                            String(detail.tradeId)

                    );

                memberId =

                    (

                        trade &&

                        (

                            trade.memberId ||

                            trade.ownerId

                        )

                    ) || "";

            }

            if (!memberId) {

                return "";

            }

            const kindOf =

                account =>

                    `${account.name || ""} ${account.accountType || ""} ${account.type || ""}`

                        .toLowerCase()

                        .includes("invest");

            const owned =

                (

                    AccountRepository.findAll() ||

                    []

                ).filter(

                    account =>

                        String(

                            account.memberId ||

                            account.ownerId ||

                            ""

                        ) === String(memberId)

                );

            const pick =

                owned.find(

                    account =>

                        account.openingSource ===

                            "asset" &&

                        kindOf(account)

                ) ||

                owned.find(kindOf);

            if (!pick) {

                return "";

            }

            // Member-authoritative settlement,

            // mirroring the balance integration:

            // the member's own Investment account

            // wins over another member's account.

            const cashLine =

                (

                    (transaction && transaction.lines) ||

                    []

                ).find(

                    line =>

                        line &&

                        line.cashEffect

                );

            const lineAccountId =

                cashLine && cashLine.accountId

                    ? String(cashLine.accountId)

                    : "";

            if (!lineAccountId) {

                return String(pick.id);

            }

            const lineAccount =

                (

                    AccountRepository.findAll() ||

                    []

                ).find(

                    account =>

                        String(account.id) ===

                        lineAccountId

                );

            const lineOwner =

                lineAccount

                    ? String(

                        lineAccount.memberId ||

                        lineAccount.ownerId ||

                        ""

                    )

                    : "";

            if (

                lineOwner &&

                lineOwner !== String(memberId)

            ) {

                return String(pick.id);

            }

            return lineAccountId;

        } catch (resolveError) {

            return "";

        }

    },

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

        /*

         * Loan payments are real cash out:

         * count them as Cashflow expense.

         */

        if(

            transaction.type ===

            "LOAN_PAYMENT"

        ){

            return this.recordExpense(

                transaction

            );

        }

        /*

         * Investment trades are real cash

         * movement: BUY is cash out,

         * SELL is cash in (becomes cash).

         */

        if(

            transaction.type ===

            "INVESTMENT_BUY" ||

            transaction.type ===

            "INVESTMENT_SELL"

        ){

            /*

             * Investment buys and sells ARE cash

             * movements and belong in Cash Flow on

             * every account, mirrored or not: a buy

             * moves cash out of the account, a sell

             * brings proceeds back in. They are

             * tagged category "Investment" so the

             * Cash Flow page and summaries can show

             * them apart from daily income/expense,

             * and only the realized gain (not the

             * full proceeds) is treated as income

             * on the Tax side.

             */

            return transaction.type ===

                "INVESTMENT_BUY"

                ? this.recordExpense(

                    transaction,

                    "Investment"

                )

                : this.recordIncome(

                    transaction,

                    "Investment"

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

        transaction,

        categoryOverride = ""

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

                    this.sumCashLines(

                        transaction,

                        line

                    ),

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

                    categoryOverride ||

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

        transaction,

        categoryOverride = ""

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

                    this.sumCashLines(

                        transaction,

                        line

                    ),

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

                    categoryOverride ||

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

    sumCashLines(

        transaction,

        primaryLine

    ){

        const lines =

            (

                transaction &&

                Array.isArray(transaction.lines)

                    ? transaction.lines

                    : []

            ).filter(

                line =>

                    line &&

                    line.cashEffect === true &&

                    Number.isFinite(

                        Number(line.amount)

                    )

            );

        if (!lines.length){

            return primaryLine

                ? Number(primaryLine.amount || 0)

                : 0;

        }

        const direction =

            primaryLine

                ? primaryLine.direction

                : lines[0].direction;

        return Math.round(

            lines

                .filter(

                    line =>

                        line.direction === direction

                )

                .reduce(

                    (sum, line) =>

                        sum + Number(line.amount || 0),

                    0

                ) * 100

        ) / 100;

    },

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
