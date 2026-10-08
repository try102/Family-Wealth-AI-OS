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

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js";

/*

 * Resolve the Transaction integration

 * when available.

 *

 * The application bridge registers the

 * Transaction facade on

 * TransactionIntegration (same mechanism

 * as Income / Expense). When no facade

 * is registered, Investment trades are

 * kept as Investment records only.

 */

function getTransactionService() {

    try {

        TransactionIntegration

            .requireFacade();

        return TransactionIntegration;

    } catch (serviceError) {

        return null;

    }

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

        try {

            this.recordTradeTransaction(

                result

            );

        } catch (transactionError) {

            console.warn(

                "Investment transaction not recorded:",

                transactionError.message

            );

        }

        /*

         * Keep the holding (Position) in

         * sync: BUY increases the position,

         * SELL decreases it. No manual

         * re-entry on the asset side.

         */

        this.applyTradeToPosition(

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

        /*

         * A Transaction requires a real

         * Account. Never create a fake

         * Account ID (same policy as

         * Income / Expense).

         */

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

    // Trade -> Position Sync

    // =====================================================

    applyTradeToPosition(

        trade

    ){

        if (!trade) {

            return null;

        }

        const action =

            String(

                trade.action || ""

            )

                .trim()

                .toUpperCase();

        if (

            action !== "BUY" &&

            action !== "SELL"

        ) {

            return null;

        }

        const symbol =

            String(

                trade.symbol || ""

            )

                .trim();

        if (!symbol) {

            return null;

        }

        const quantity =

            Number(

                trade.quantity || 0

            );

        const price =

            Number(

                trade.price || 0

            );

        const amount =

            Number(

                trade.amount ||

                quantity * price ||

                0

            );

        if (

            quantity <= 0 ||

            amount <= 0

        ) {

            return null;

        }

        const positions =

            this.getPositions();

        let position =

            positions.find(

                item =>

                    String(

                        item.symbol || ""

                    )

                        .toUpperCase() ===

                    symbol.toUpperCase()

            );

        if (action === "BUY") {

            if (!position) {

                position = {

                    symbol,

                    name:

                        trade.name ||

                        symbol,

                    quantity:

                        0,

                    averageCost:

                        0,

                    costBasis:

                        0,

                    currentPrice:

                        price,

                    marketValue:

                        0,

                    unrealizedGainLoss:

                        0,

                    accountId:

                        trade.accountId ||

                        "",

                    currency:

                        trade.currency ||

                        "USD"

                };

            }

            position.quantity =

                Number(

                    position.quantity || 0

                ) +

                quantity;

            position.costBasis =

                Number(

                    position.costBasis || 0

                ) +

                amount;

            position.averageCost =

                position.quantity > 0

                ? position.costBasis /

                    position.quantity

                : 0;

            position.currentPrice =

                price;

            position.marketValue =

                position.quantity *

                price;

            if (trade.name) {

                position.name =

                    trade.name;

            }

            if (trade.accountId) {

                position.accountId =

                    trade.accountId;

            }

        } else {

            if (!position) {

                // No trade-derived position yet. The holding may

                // exist only as a manually added Investments

                // record (the Dashboard reads those records), so

                // bootstrap from it instead of dropping the sale.

                const manualRecord =

                    this.getInvestments().find(

                        item =>

                            String(

                                item.symbol || ""

                            )

                                .toUpperCase() ===

                            symbol.toUpperCase()

                    );

                if (!manualRecord) {

                    return null;

                }

                const recordQuantity =

                    Number(manualRecord.quantity || 0);

                if (recordQuantity <= 0) {

                    // Value-only manual record: reduce its

                    // value by the sale amount so the

                    // Dashboard reflects the sale immediately.

                    const remainingValue =

                        Math.max(

                            Number(manualRecord.currentValue || 0) -

                                amount,

                            0

                        );

                    manualRecord.currentValue =

                        remainingValue;

                    manualRecord.marketValue =

                        remainingValue;

                    InvestmentRepository

                        .saveInvestment(

                            manualRecord

                        );

                    return null;

                }

                position = {

                    symbol,

                    name:

                        manualRecord.name ||

                        symbol,

                    quantity:

                        recordQuantity,

                    averageCost:

                        recordQuantity > 0

                            ? Number(

                                manualRecord.costBasis ??

                                manualRecord.currentValue ??

                                0

                            ) / recordQuantity

                            : 0,

                    costBasis:

                        Number(

                            manualRecord.costBasis ??

                            manualRecord.currentValue ??

                            0

                        ),

                    currentPrice:

                        price ||

                        Number(manualRecord.currentPrice || 0),

                    marketValue:

                        Number(manualRecord.currentValue || 0),

                    unrealizedGainLoss:

                        0,

                    accountId:

                        manualRecord.accountId ||

                        trade.accountId ||

                        "",

                    currency:

                        manualRecord.currency ||

                        trade.currency ||

                        "USD"

                };

            }

            const held =

                Number(

                    position.quantity || 0

                );

            const sellQuantity =

                Math.min(

                    quantity,

                    held

                );

            if (sellQuantity <= 0) {

                return null;

            }

            const averageCostHeld =

                held > 0

                ? Number(

                    position.costBasis || 0

                ) /

                    held

                : 0;

            position.quantity =

                held -

                sellQuantity;

            position.costBasis =

                Math.max(

                    Number(

                        position.costBasis || 0

                    ) -

                    averageCostHeld *

                        sellQuantity,

                    0

                );

            position.averageCost =

                position.quantity > 0

                ? position.costBasis /

                    position.quantity

                : 0;

            position.currentPrice =

                price;

            position.marketValue =

                position.quantity *

                price;

        }

        position.unrealizedGainLoss =

            Number(

                position.marketValue || 0

            ) -

            Number(

                position.costBasis || 0

            );

        position.updatedAt =

            new Date()

                .toISOString();

        if (trade.memberId) {

            position.memberId =

                trade.memberId;

        }

        const savedPosition =

            this.updatePosition(

                position

            );

        /*

         * Mirror the holding into the

         * Investments list, so Dashboard /

         * Advisor (which read Investment

         * records) stay in sync with trades

         * without manual re-entry.

         */

        const investments =

            this.getInvestments();

        const existing =

            investments.find(

                item =>

                    String(

                        item.symbol || ""

                    )

                        .toUpperCase() ===

                    symbol.toUpperCase()

            );

        const record = {

            ...(

                existing ||

                {}

            ),

            name:

                position.name ||

                symbol,

            symbol,

            quantity:

                position.quantity,

            costBasis:

                position.costBasis,

            currentPrice:

                position.currentPrice,

            marketValue:

                position.marketValue,

            currentValue:

                position.marketValue,

            accountId:

                position.accountId ||

                (

                    existing

                    ? existing.accountId

                    : ""

                ) ||

                "",

            memberId:

                position.memberId ||

                (

                    existing

                    ? existing.memberId

                    : ""

                ) ||

                "",

            currency:

                position.currency ||

                "USD"

        };

        if (

            !existing

        ) {

            record.type =

                "STOCK";

        }

        InvestmentRepository

            .saveInvestment(

                record

            );

        return savedPosition;

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
