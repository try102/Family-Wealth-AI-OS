/*

 * Family Wealth AI OS V7

 *

 * Investment Service

 *

 * Responsibility:

 *

 * - Manage Investment business records

 * - Manage Position records

 * - Manage Trade records

 * - Connect actual Investment events to Transaction

 *

 * Architecture:

 *

 * Investment

 *      ↓

 * InvestmentService

 *      ↓

 * TransactionService

 *      ↓

 * Transaction

 *      ↓

 * Financial Lines

 *      ↓

 * Account

 *

 * IMPORTANT:

 *

 * Investment remains an independent business system.

 *

 * Transaction is the system-level Actual Event registry.

 *

 * InvestmentService does NOT:

 *

 * - calculate tax

 * - calculate capital gain

 * - calculate account balance

 * - calculate portfolio allocation

 *

 */

import InvestmentRepository

    from "../repository/investmentRepository.js";

import EventBus

    from "../../../core/events/eventBus.js";

import EventTypes

    from "../../../core/events/eventTypes.js";

import Transaction

    from "../../../transaction/transaction.js";

import TransactionManager

    from "../../../transaction/transactionManager.js";

import TransactionService

    from "../../../transaction/transactionService.js";

/*

 * Transaction infrastructure

 *

 * InvestmentService uses TransactionService as

 * the controlled gateway into the Transaction system.

 *

 * TransactionManager remains the owner of the

 * Transaction registry.

 */

const transactionManager =

    new TransactionManager();

const transactionService =

    new TransactionService(

        transactionManager

    );

const InvestmentService = {

    // =====================================================

    // Investment

    // =====================================================

    createInvestment(

        investment

    ){

        const result =

            InvestmentRepository

                .saveInvestment(

                    investment

                );

        return result;

    },

    getInvestments(){

        return InvestmentRepository

            .getInvestments();

    },

    deleteInvestment(

        id

    ){

        return InvestmentRepository

            .deleteInvestment(

                id

            );

    },

    // =====================================================

    // Position

    // =====================================================

    updatePosition(

        position

    ){

        const result =

            InvestmentRepository

                .savePosition(

                    position

                );

        EventBus.publish(

            EventTypes.POSITION_UPDATED,

            result

        );

        return result;

    },

    getPositions(){

        return InvestmentRepository

            .getPositions();

    },

    // =====================================================

    // Trade

    // =====================================================

    recordTrade(

        trade

    ){

        /*

         * -----------------------------------------------

         * 1. Save the Investment Trade

         * -----------------------------------------------

         */

        const result =

            InvestmentRepository

                .saveTrade(

                    trade

                );

        /*

         * -----------------------------------------------

         * 2. Determine whether this Trade represents

         *    an actual financial event.

         *

         * BUY

         * SELL

         * DIVIDEND

         *

         * These events can create Transactions.

         *

         * Other future investment events can be

         * handled separately.

         * -----------------------------------------------

         */

        if (

            !result.transactionId &&

            (

                result.action === "BUY" ||

                result.action === "SELL" ||

                result.action === "DIVIDEND"

            )

        ){

            let transaction = null;

            /*

             * -------------------------------------------

             * BUY

             * -------------------------------------------

             */

            if (

                result.action === "BUY"

            ){

                transaction =

                    transactionService

                        .recordInvestmentBuy({

                            date:

                                result.tradeDate,

                            accountId:

                                result.accountId,

                            amount:

                                Number(

                                    result.amount || 0

                                ),

                            currency:

                                result.currency ||

                                "USD",

                            description:

                                result.name

                                    ? `Investment Buy: ${result.name}`

                                    : "Investment Buy",

                            investment: {

                                investmentId:

                                    result.investmentId ||

                                    "",

                                symbol:

                                    result.symbol ||

                                    "",

                                name:

                                    result.name ||

                                    "",

                                quantity:

                                    Number(

                                        result.quantity || 0

                                    ),

                                price:

                                    Number(

                                        result.price || 0

                                    ),

                                commission:

                                    Number(

                                        result.commission || 0

                                    ),

                                tax:

                                    Number(

                                        result.tax || 0

                                    ),

                                /*

                                 * Investment business

                                 * information can be

                                 * extended here.

                                 */

                                tradeId:

                                    result.id,

                                transactionAction:

                                    "BUY"

                            }

                        });

            }

            /*

             * -------------------------------------------

             * SELL

             * -------------------------------------------

             */

            if (

                result.action === "SELL"

            ){

                transaction =

                    transactionService

                        .recordInvestmentSell({

                            date:

                                result.tradeDate,

                            accountId:

                                result.accountId,

                            amount:

                                Number(

                                    result.amount || 0

                                ),

                            currency:

                                result.currency ||

                                "USD",

                            description:

                                result.name

                                    ? `Investment Sell: ${result.name}`

                                    : "Investment Sell",

                            investment: {

                                investmentId:

                                    result.investmentId ||

                                    "",

                                symbol:

                                    result.symbol ||

                                    "",

                                name:

                                    result.name ||

                                    "",

                                quantity:

                                    Number(

                                        result.quantity || 0

                                    ),

                                price:

                                    Number(

                                        result.price || 0

                                    ),

                                commission:

                                    Number(

                                        result.commission || 0

                                    ),

                                tax:

                                    Number(

                                        result.tax || 0

                                    ),

                                /*

                                 * These fields may be

                                 * supplied by the

                                 * Investment business

                                 * engine when available.

                                 */

                                costBasis:

                                    result.costBasis,

                                capitalGain:

                                    result.capitalGain,

                                holdingPeriod:

                                    result.holdingPeriod,

                                holdingPeriodType:

                                    result.holdingPeriodType,

                                tradeId:

                                    result.id,

                                transactionAction:

                                    "SELL"

                            }

                        });

            }

            /*

             * -------------------------------------------

             * DIVIDEND

             * -------------------------------------------

             */

            if (

                result.action === "DIVIDEND"

            ){

                transaction =

                    transactionService

                        .recordDividend({

                            date:

                                result.tradeDate,

                            accountId:

                                result.accountId,

                            amount:

                                Number(

                                    result.amount || 0

                                ),

                            currency:

                                result.currency ||

                                "USD",

                            description:

                                result.name

                                    ? `Dividend: ${result.name}`

                                    : "Dividend",

                            investment: {

                                investmentId:

                                    result.investmentId ||

                                    "",

                                symbol:

                                    result.symbol ||

                                    "",

                                name:

                                    result.name ||

                                    "",

                                quantity:

                                    Number(

                                        result.quantity || 0

                                    ),

                                tradeId:

                                    result.id,

                                transactionAction:

                                    "DIVIDEND"

                            }

                        });

            }

            /*

             * -------------------------------------------

             * 3. Link Trade → Transaction

             * -------------------------------------------

             */

            if (transaction){

                result.transactionId =

                    transaction.id;

                /*

                 * Save the Trade again so the

                 * relationship is permanent.

                 */

                InvestmentRepository

                    .saveTrade(

                        result

                    );

            }

        }

        /*

         * -----------------------------------------------

         * 4. Publish Investment event

         * -----------------------------------------------

         */

        EventBus.publish(

            EventTypes.TRADE_CREATED,

            result

        );

        /*

         * -----------------------------------------------

         * 5. Return the Investment Trade

         * -----------------------------------------------

         */

        return result;

    },

    getTrades(){

        return InvestmentRepository

            .getTrades();

    },

    // =====================================================

    // Portfolio Value

    // =====================================================

    getPortfolioValue(){

        return this

            .getPositions()

            .reduce(

                (sum, position) =>

                    sum +

                    Number(

                        position.marketValue || 0

                    ),

                0

            );

    },

    // =====================================================

    // Transaction Access

    // =====================================================

    /*

     * InvestmentService does not become the owner

     * of Transactions.

     *

     * This method only provides access to Transactions

     * created by Investment events.

     */

    getTransactions(){

        return transactionManager

            .getAllTransactions();

    },

    getTransaction(

        transactionId

    ){

        return transactionManager

            .getTransaction(

                transactionId

            );

    }

};

export default InvestmentService;
