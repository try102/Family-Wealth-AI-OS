/*

 * Family Wealth AI OS V7

 *

 * Investment Service

 *

 *

 * Responsibility:

 *

 * - Investment business service

 * - Investment CRUD

 * - Trade recording

 * - Position updating

 * - Portfolio value access

 * - Connect Actual Investment events

 *   to TransactionService

 *

 *

 * Architecture:

 *

 * Investment Module

 *        ↓

 * InvestmentService

 *        ↓

 * ┌───────────────┬──────────────────┐

 * ↓               ↓                  ↓

 * Repository   TransactionService   EventBus

 * ↓               ↓

 * Investment      Transaction

 * Trade           ↓

 * Position      Account

 *

 *

 * IMPORTANT:

 *

 * InvestmentService owns Investment business

 * operations.

 *

 * TransactionService owns the recording of

 * system-level Actual Transactions.

 *

 * InvestmentService does NOT:

 *

 * - calculate tax

 * - calculate capital gain

 * - calculate cost basis

 * - calculate holding period

 * - calculate loan interest

 *

 * Those calculations belong to the appropriate

 * business / calculation modules.

 */

import InvestmentRepository

    from "../repository/investmentRepository.js";

import EventBus

    from "../../../core/events/eventBus.js";

import EventTypes

    from "../../../core/events/eventTypes.js";

/*

 * TransactionService is injected by the

 * application/system layer.

 *

 * This prevents InvestmentService from

 * creating its own TransactionManager.

 *

 * Example later:

 *

 * InvestmentService.setTransactionService(

 *     transactionService

 * );

 */

let TransactionService = null;

/*

 * InvestmentService

 */

const InvestmentService = {

    // =====================================================

    // Transaction Service Connection

    // =====================================================

    /**

     * Connect the system TransactionService.

     *

     * This is normally called during application

     * initialization.

     *

     * InvestmentService does not create the

     * TransactionManager itself.

     */

    setTransactionService(

        transactionService

    ){

        if(

            !transactionService

        ){

            throw new Error(

                "TransactionService is required."

            );

        }

        TransactionService =

            transactionService;

        return TransactionService;

    },

    /**

     * Get the currently connected

     * TransactionService.

     */

    getTransactionService(){

        return TransactionService;

    },

    // =====================================================

    // Investment

    // =====================================================

    /**

     * Create Investment.

     *

     * This stores the Investment business record.

     *

     * It does not automatically create a

     * Transaction because creating an Investment

     * record is not necessarily an economic event.

     */

    createInvestment(

        investment

    ){

        const result =

            InvestmentRepository

                .saveInvestment(

                    investment

                );

        /*

         * Publish Investment Created event

         * if the event definition exists.

         */

        if(

            EventTypes.INVESTMENT_CREATED

        ){

            EventBus.publish(

                EventTypes.INVESTMENT_CREATED,

                result

            );

        }

        return result;

    },

    /**

     * Get Investments.

     */

    getInvestments(){

        return

            InvestmentRepository

                .getInvestments();

    },

    /**

     * Delete Investment.

     *

     * Historical Transactions are NOT deleted

     * here.

     */

    deleteInvestment(

        id

    ){

        return

            InvestmentRepository

                .deleteInvestment(

                    id

                );

    },

    // =====================================================

    // Position

    // =====================================================

    /**

     * Update Position.

     *

     * Position represents current holdings.

     *

     * Position is NOT the historical Transaction

     * registry.

     */

    updatePosition(

        position

    ){

        const result =

            InvestmentRepository

                .savePosition(

                    position

                );

        /*

         * Keep the existing Investment event.

         */

        if(

            EventTypes.POSITION_UPDATED

        ){

            EventBus.publish(

                EventTypes.POSITION_UPDATED,

                result

            );

        }

        return result;

    },

    /**

     * Get Positions.

     */

    getPositions(){

        return

            InvestmentRepository

                .getPositions();

    },

    // =====================================================

    // Trade

    // =====================================================

    /**

     * Record an Investment Trade.

     *

     *

     * IMPORTANT:

     *

     * Trade is the Investment business record.

     *

     * Transaction is the system Actual-event record.

     *

     *

     * Therefore:

     *

     * BUY:

     *

     * Trade

     *   ↓

     * TransactionService.recordInvestmentBuy()

     *

     *

     * SELL:

     *

     * Trade

     *   ↓

     * TransactionService.recordInvestmentSell()

     *

     *

     * DIVIDEND:

     *

     * Trade

     *   ↓

     * TransactionService.recordDividend()

     *

     *

     * INTEREST:

     *

     * Trade

     *   ↓

     * TransactionService.recordInterest()

     *

     *

     * TransactionService does not calculate

     * investment business values.

     */

    recordTrade(

        trade

    ){

        if(

            !trade ||

            typeof trade !== "object"

        ){

            throw new Error(

                "Trade data is required."

            );

        }

        /*

         * First save the Investment Trade.

         *

         * This preserves the existing Investment

         * repository structure.

         */

        const result =

            InvestmentRepository

                .saveTrade(

                    trade

                );

        /*

         * Create the corresponding Actual

         * Transaction.

         *

         * This only happens when the trade

         * represents an Actual completed event.

         */

        this.createTransactionForTrade(

            result

        );

        /*

         * Preserve the existing Investment

         * Trade event.

         */

        if(

            EventTypes.TRADE_CREATED

        ){

            EventBus.publish(

                EventTypes.TRADE_CREATED,

                result

            );

        }

        return result;

    },

    /**

     * Create a system Transaction from an

     * Investment Trade.

     *

     * This method does NOT calculate:

     *

     * - cost basis

     * - capital gain

     * - holding period

     * - tax

     *

     * Those values must already be supplied

     * by the Investment business logic.

     */

    createTransactionForTrade(

        trade

    ){

        /*

         * No TransactionService connected.

         *

         * During staged development this allows

         * the Investment repository to continue

         * working without breaking the application.

         *

         * Once the system initializes the

         * TransactionService, Actual Trades will

         * automatically flow into Transaction.

         */

        if(

            !TransactionService

        ){

            return null;

        }

        /*

         * Only completed Actual trades should

         * automatically create Actual Transactions.

         */

        if(

            trade.status &&

            trade.status !== "COMPLETED"

        ){

            return null;

        }

        const action =

            String(

                trade.action || ""

            )

            .trim()

            .toUpperCase();

        /*

         * Common Transaction information.

         */

        const commonData = {

            date:

                trade.tradeDate ||

                new Date().toISOString(),

            accountId:

                trade.accountId || "",

            currency:

                trade.currency ||

                "USD",

            description:

                trade.name

                    ? `${action} ${trade.name}`

                    : `${action} ${trade.symbol || ""}`,

            investment: {

                investmentId:

                    trade.investmentId || "",

                symbol:

                    trade.symbol || "",

                name:

                    trade.name || "",

                quantity:

                    Number(

                        trade.quantity || 0

                    ),

                price:

                    Number(

                        trade.price || 0

                    ),

                amount:

                    Number(

                        trade.amount || 0

                    ),

                commission:

                    Number(

                        trade.commission || 0

                    ),

                tax:

                    Number(

                        trade.tax || 0

                    ),

                netAmount:

                    Number(

                        trade.netAmount || 0

                    ),

                transactionId:

                    trade.transactionId || "",

                tradeId:

                    trade.id || "",

                /*

                 * These fields are optional.

                 *

                 * If Investment calculation modules

                 * already provide them, they will be

                 * preserved.

                 */

                costBasis:

                    trade.costBasis,

                capitalGain:

                    trade.capitalGain,

                holdingPeriod:

                    trade.holdingPeriod,

                termType:

                    trade.termType

            }

        };

        let transaction = null;

        // =================================================

        // BUY

        // =================================================

        if(

            action === "BUY"

        ){

            transaction =

                TransactionService

                    .recordInvestmentBuy({

                        ...commonData,

                        amount:

                            Number(

                                trade.netAmount ||

                                trade.amount ||

                                0

                            ),

                        investment:

                            commonData.investment

                    });

        }

        // =================================================

        // SELL

        // =================================================

        else if(

            action === "SELL"

        ){

            transaction =

                TransactionService

                    .recordInvestmentSell({

                        ...commonData,

                        amount:

                            Number(

                                trade.netAmount ||

                                trade.amount ||

                                0

                            ),

                        investment:

                            commonData.investment

                    });

        }

        // =================================================

        // DIVIDEND

        // =================================================

        else if(

            action === "DIVIDEND"

        ){

            transaction =

                TransactionService

                    .recordDividend({

                        ...commonData,

                        amount:

                            Number(

                                trade.netAmount ||

                                trade.amount ||

                                0

                            ),

                        investment:

                            commonData.investment

                    });

        }

        // =================================================

        // INTEREST

        // =================================================

        else if(

            action === "INTEREST"

        ){

            transaction =

                TransactionService

                    .recordInterest({

                        ...commonData,

                        amount:

                            Number(

                                trade.netAmount ||

                                trade.amount ||

                                0

                            ),

                        investment:

                            commonData.investment

                    });

        }

        /*

         * Unknown action.

         *

         * Do not create a Transaction because

         * TransactionService does not know what

         * economic event occurred.

         */

        else{

            return null;

        }

        /*

         * Save the generated Transaction ID back

         * into the Investment Trade.

         *

         * This creates the explicit relationship:

         *

         * Trade

         *   ↓

         * transactionId

         *   ↓

         * Transaction

         */

        if(

            transaction &&

            transaction.id

        ){

            trade.transactionId =

                transaction.id;

            /*

             * Update the existing Trade record

             * without creating a second Trade.

             */

            InvestmentRepository

                .saveTrade(

                    trade

                );

        }

        /*

         * Publish specialized Investment event.

         */

        if(

            transaction

        ){

            if(

                action === "BUY" &&

                EventTypes.BUY_EXECUTED

            ){

                EventBus.publish(

                    EventTypes.BUY_EXECUTED,

                    transaction

                );

            }

            if(

                action === "SELL" &&

                EventTypes.SELL_EXECUTED

            ){

                EventBus.publish(

                    EventTypes.SELL_EXECUTED,

                    transaction

                );

            }

            if(

                action === "DIVIDEND" &&

                EventTypes.DIVIDEND_RECEIVED

            ){

                EventBus.publish(

                    EventTypes.DIVIDEND_RECEIVED,

                    transaction

                );

            }

        }

        return transaction;

    },

    /**

     * Get Trades.

     */

    getTrades(){

        return

            InvestmentRepository

                .getTrades();

    },

    // =====================================================

    // Portfolio Value

    // =====================================================

    /**

     * Calculate total current Portfolio Value.

     *

     * This uses Position data.

     *

     * It does NOT read Transaction data because

     * Transaction represents historical Actual events,

     * while Position represents current holdings.

     */

    getPortfolioValue(){

        return this

            .getPositions()

            .reduce(

                (

                    sum,

                    position

                ) =>

                    sum +

                    Number(

                        position.marketValue || 0

                    ),

                0

            );

    }

};

/*

 * ES Module export.

 */

export default InvestmentService;
