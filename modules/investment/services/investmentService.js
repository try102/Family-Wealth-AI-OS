/*

 * Family Wealth AI OS

 *

 * Investment Service

 *

 * Responsibility:

 * - Manage Investment records

 * - Manage Position records

 * - Record Investment Trades

 * - Connect actual Investment events

 *   to the system Transaction layer

 *

 * Investment remains an independent

 * business system.

 *

 * Transaction remains the system-level

 * Actual Event registry.

 */

import InvestmentRepository

    from "../repository/investmentRepository.js";

import EventBus

    from "../../../core/events/eventBus.js";

import EventTypes

    from "../../../core/events/eventTypes.js";

/*

 * Transaction Service

 *

 * Transaction is located at the

 * root-level transaction directory.

 *

 * Because this Investment module is

 * ES Module based while Transaction

 * currently uses CommonJS, use the

 * browser/global integration boundary

 * rather than changing the Transaction

 * architecture here.

 */

let TransactionService = null;

/*

 * Resolve TransactionService when available.

 *

 * This keeps Investment independent

 * from the Transaction implementation.

 */

function getTransactionService() {

    if (TransactionService) {

        return TransactionService;

    }

    /*

     * Future application bootstrap may

     * inject TransactionService here.

     */

    if (

        typeof window !== "undefined" &&

        window.FamilyWealthAI &&

        window.FamilyWealthAI

            .TransactionService

    ) {

        TransactionService =

            window.FamilyWealthAI

                .TransactionService;

        return TransactionService;

    }

    return null;

}

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

        /*

         * Investment creation itself does

         * not automatically create a

         * Transaction.

         *

         * Creating an Investment record

         * is not necessarily an economic

         * event.

         */

        if (

            EventTypes.INVESTMENT_CREATED

        ) {

            EventBus.publish(

                EventTypes.INVESTMENT_CREATED,

                result

            );

        }

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

        EventBus.publish(

            EventTypes.PORTFOLIO_CHANGED,

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

         * Save the Investment Trade first.

         *

         * The Investment system remains

         * responsible for its own trade

         * records.

         */

        const result =

            InvestmentRepository

                .saveTrade(

                    trade

                );

        /*

         * Record the corresponding Actual

         * economic event in Transaction.

         *

         * A missing TransactionService

         * must NOT destroy the Investment

         * trade record.

         */

        this.recordTradeTransaction(

            result

        );

        /*

         * Investment event.

         */

        EventBus.publish(

            EventTypes.TRADE_CREATED,

            result

        );

        /*

         * System-level trade event.

         */

        if (

            EventTypes.TRADE_EXECUTED

        ) {

            EventBus.publish(

                EventTypes.TRADE_EXECUTED,

                result

            );

        }

        return result;

    },

    getTrades(){

        return InvestmentRepository

            .getTrades();

    },

    // =====================================================

    // Investment → Transaction

    // =====================================================

    recordTradeTransaction(

        trade

    ){

        if (!trade) {

            return null;

        }

        const service =

            getTransactionService();

        /*

         * Transaction integration is

         * intentionally optional until

         * the application bootstrap

         * registers TransactionService.

         */

        if (!service) {

            return null;

        }

        /*

         * Do not create a Transaction for

         * unknown or incomplete actions.

         */

        if (!trade.action) {

            return null;

        }

        const action =

            String(

                trade.action

            )

                .trim()

                .toUpperCase();

        const transactionData = {

            date:

                trade.tradeDate ||

                new Date()

                    .toISOString(),

            accountId:

                trade.accountId || "",

            amount:

                Number(

                    trade.amount || 0

                ),

            currency:

                trade.currency ||

                "USD",

            description:

                trade.name ||

                trade.symbol ||

                "Investment transaction",

            investment: {

                investmentId:

                    trade.investmentId ||

                    "",

                symbol:

                    trade.symbol ||

                    "",

                name:

                    trade.name ||

                    "",

                quantity:

                    Number(

                        trade.quantity || 0

                    ),

                price:

                    Number(

                        trade.price || 0

                    ),

                commission:

                    Number(

                        trade.commission || 0

                    ),

                tax:

                    Number(

                        trade.tax || 0

                    ),

                tradeId:

                    trade.id || "",

                action

            }

        };

        /*

         * BUY

         */

        if (

            action === "BUY"

        ) {

            return service

                .recordInvestmentBuy(

                    transactionData

                );

        }

        /*

         * SELL

         */

        if (

            action === "SELL"

        ) {

            return service

                .recordInvestmentSell(

                    transactionData

                );

        }

        /*

         * DIVIDEND

         */

        if (

            action === "DIVIDEND"

        ) {

            return service

                .recordDividend(

                    transactionData

                );

        }

        /*

         * INTEREST

         */

        if (

            action === "INTEREST"

        ) {

            return service

                .recordInterest(

                    transactionData

                );

        }

        /*

         * Other Investment Trade actions

         * are intentionally not converted

         * automatically into Transactions.

         */

        return null;

    },

    // =====================================================

    // Portfolio Value

    // =====================================================

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

                        position.marketValue ||

                        0

                    ),

                0

            );

    }

};

export default InvestmentService;
