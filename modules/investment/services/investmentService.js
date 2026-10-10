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

    from "../repository/investmentRepository.js?v=20261008ah";

import EventBus

    from "../../../core/events/eventBus.js?v=20261008ae";

import EventTypes

    from "../../../core/events/eventTypes.js?v=20261008ae";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js?v=20261010da";

import AccountRepository

    from "../../account/repository/accountRepository.js?v=20261008ae";

import PriceOverrideStore

    from "./priceOverrideStore.js?v=20261008ae";

import IncomeService from "../../income/services/incomeService.js?v=20261010dc";

import AccountBalanceIntegration

    from "../../../core/integration/accountBalanceIntegration.js?v=20261010df";

import cashflowAPI

    from "../../cashflow/api/cashflowAPI.js?v=20261010da";

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

/*

 * FIFO replay of one symbol's trades: buys form lots,

 * sells consume the oldest lots first. Returns the

 * remaining quantity/cost basis and each sell's

 * realized gain (proceeds minus FIFO lot cost).

 */

function replayFifoTrades(

    symbol,

    trades

) {

    const key =

        String(symbol || "")

            .toUpperCase();

    const lots = [];

    const gainByTradeId = {};

    let lastPrice = 0;

    let hasBuys = false;

    (trades || [])

        .filter(

            trade =>

                String(trade.symbol || "")

                    .toUpperCase() === key

        )

        .forEach(

            trade => {

                const action =

                    String(trade.action || "")

                        .toUpperCase();

                const quantity =

                    Number(trade.quantity || 0);

                const price =

                    Number(trade.price || 0);

                const amount =

                    Number(

                        trade.amount ||

                        quantity * price ||

                        0

                    );

                if (price > 0) {

                    lastPrice = price;

                }

                if (

                    action === "BUY" &&

                    quantity > 0

                ) {

                    hasBuys = true;

                    lots.push({

                        quantity,

                        unitCost:

                            amount > 0

                                ? amount / quantity

                                : price

                    });

                } else if (

                    action === "SELL" &&

                    quantity > 0

                ) {

                    let remaining =

                        quantity;

                    let consumedCost = 0;

                    while (

                        remaining > 0 &&

                        lots.length

                    ) {

                        const lot =

                            lots[0];

                        const take =

                            Math.min(

                                remaining,

                                lot.quantity

                            );

                        consumedCost +=

                            take * lot.unitCost;

                        lot.quantity -=

                            take;

                        remaining -=

                            take;

                        if (lot.quantity <= 0) {

                            lots.shift();

                        }

                    }

                    gainByTradeId[trade.id] =

                        amount - consumedCost;

                }

            }

        );

    const quantity =

        lots.reduce(

            (sum, lot) => sum + lot.quantity,

            0

        );

    const costBasis =

        lots.reduce(

            (sum, lot) =>

                sum + lot.quantity * lot.unitCost,

            0

        );

    return {

        quantity,

        costBasis,

        lastPrice,

        hasBuys,

        gainByTradeId

    };

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

        const record =

            this.getInvestments().find(

                item =>

                    item.id === id

            );

        const result =

            InvestmentRepository

            .deleteInvestment(

                id

            );

        // Removing an investment also removes

        // its holding and trade records, so the

        // Investment Center, Asset page and

        // Dashboard stop showing it. Historical

        // Transactions / Cash Flow / Tax records

        // are kept as the financial ledger.

        if (record && record.symbol) {

            InvestmentRepository

                .deletePosition(

                    record.symbol

                );

            InvestmentRepository

                .deleteTradesBySymbol(

                    record.symbol

                );

        }

        return result;

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

         * Keep the holding (Position) in

         * sync first: BUY increases the position,

         * SELL decreases it and computes the

         * realized capital gain, which the

         * Transaction payload below then carries.

         * No manual re-entry on the asset side.

         */

        this.applyTradeToPosition(

            result

        );

        if (

            result.realizedGainLoss !== undefined

        ) {

            InvestmentRepository

                .saveTrade(

                    result

                );

        }

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

        // Mirror realized gains, dividends and

        // interest into the Income Center (tagged

        // auto records; no second transaction).

        this.syncAutoIncome(

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

    // Mirror realized gains / dividends / interest

    // into the Income Center as tagged auto records.

    // The event's own transaction already moved the

    // account balance; these records never create a

    // second transaction.

    syncAutoIncome(

        trade

    ){

        try {

            if (!trade) {

                return;

            }

            const action =

                String(trade.action || "")

                    .toUpperCase();

            let spec = null;

            if (

                action === "SELL" &&

                Number(trade.realizedGainLoss || 0) > 0

            ) {

                spec = {

                    autoSource: "CAPITAL_GAIN",

                    category: "资本利得",

                    name:

                        `资本利得 ${trade.symbol || ""}`.trim(),

                    amount:

                        Number(trade.realizedGainLoss)

                };

            } else if (

                action === "DIVIDEND"

            ) {

                spec = {

                    autoSource: "DIVIDEND",

                    type: "OrdinaryDividend",

                    category: "股息",

                    name:

                        `股息 ${trade.symbol || ""}`.trim(),

                    amount:

                        Math.abs(Number(trade.amount || 0))

                };

            } else if (

                action === "INTEREST"

            ) {

                spec = {

                    autoSource: "INTEREST",

                    type: "OrdinaryInterest",

                    category: "利息",

                    name:

                        `利息 ${trade.symbol || ""}`.trim(),

                    amount:

                        Math.abs(Number(trade.amount || 0))

                };

            }

            if (!spec || !(spec.amount > 0)) {

                return;

            }

            IncomeService.createLinkedIncome({

                ...spec,

                tradeId: trade.id,

                memberId: trade.memberId || "",

                accountId: trade.accountId || "",

                date: trade.tradeDate || trade.date || "",

                currency: trade.currency || "USD"

            });

        } catch (autoIncomeError) {

        }

    },

    // Backfill / refresh the Income Center mirrors

    // for every existing trade (the live hook only

    // fires when a trade is recorded). Idempotent:

    // records are keyed by trade and only rewritten

    // when the amount changed.

    syncAllAutoIncome(){

        try {

            (

                this.getTrades() || []

            ).forEach(

                trade => {

                    const action =

                        String(trade.action || "")

                            .toUpperCase();

                    const relevant =

                        action === "SELL" ||

                        action === "DIVIDEND" ||

                        action === "INTEREST";

                    if (!relevant) {

                        return;

                    }

                    const expected =

                        action === "SELL"

                            ? Number(

                                trade.realizedGainLoss || 0

                            )

                            : Math.abs(

                                Number(trade.amount || 0)

                            );

                    const existing =

                        (

                            IncomeService.getAllIncome() || []

                        ).find(

                            record =>

                                record.autoSource &&

                                String(record.tradeId) ===

                                    String(trade.id)

                        );

                    if (

                        existing &&

                        Number(existing.amount || 0) ===

                            expected &&

                        expected > 0 &&

                        existing.type

                    ) {

                        return;

                    }

                    IncomeService.deleteLinkedIncome(

                        trade.id

                    );

                    if (expected > 0) {

                        this.syncAutoIncome(

                            trade

                        );

                    }

                }

            );

        } catch (syncError) {

        }

    },

    getTrades(){

        return InvestmentRepository

            .getTrades();

    },

    // =====================================================

    // Delete one trade: the holding is rebuilt from

    // the remaining trades, and the trade's linked

    // Transaction, cash-flow entry and account-balance

    // effect are revoked. (Deleting a Transaction

    // record alone never touches holdings.)

    // =====================================================

    deleteTrade(

        tradeId

    ){

        const trade =

            this.getTrades().find(

                item =>

                    String(item.id) ===

                    String(tradeId)

            );

        if (!trade) {

            return false;

        }

        const symbol =

            String(trade.symbol || "")

                .trim();

        InvestmentRepository

            .deleteTrade(

                trade.id

            );

        // The trade's auto income mirror goes with it.

        IncomeService.deleteLinkedIncome(

            trade.id

        );

        try {

            const transactions =

                TransactionIntegration

                    .getAllTransactions() || [];

            const linked =

                transactions.find(

                    transaction =>

                        transaction &&

                        transaction.businessDetails &&

                        transaction.businessDetails

                            .investment &&

                        String(

                            transaction.businessDetails

                                .investment.tradeId

                        ) === String(trade.id)

                );

            if (linked) {

                TransactionIntegration

                    .removeTransaction(

                        linked.id

                    );

            }

        } catch (transactionError) {

        }

        if (symbol) {

            this.recomputePositionFromTrades(

                symbol

            );

        }

        return true;

    },

    // =====================================================

    // Rebuild a holding from its remaining trades

    // (FIFO lots), keeping every surface consistent.

    // =====================================================

    recomputePositionFromTrades(

        symbol

    ){

        const key =

            String(symbol || "")

                .toUpperCase();

        const remaining =

            this.getTrades()

                .filter(

                    trade =>

                        String(trade.symbol || "")

                            .toUpperCase() === key &&

                        (

                            trade.action === "BUY" ||

                            trade.action === "SELL"

                        )

                );

        const record =

            this.getInvestments().find(

                item =>

                    String(

                        item.symbol ||

                            item.name ||

                            ""

                    ).toUpperCase() === key

            );

        if (!remaining.length) {

            if (record) {

                // The holding existed only through

                // its trades: remove it completely.

                this.deleteInvestment(

                    record.id

                );

            } else {

                InvestmentRepository

                    .deletePosition(

                        key

                    );

            }

            PriceOverrideStore.clear(

                key

            );

            return null;

        }

        const fifo =

            replayFifoTrades(

                key,

                this.getTrades()

            );

        // Refresh realized gains on remaining sells:

        // deleting an early buy changes later gains.

        remaining

            .filter(

                trade =>

                    trade.action === "SELL"

            )

            .forEach(

                trade => {

                    const gain =

                        fifo.gainByTradeId[trade.id];

                    if (

                        gain !== undefined &&

                        Number(trade.realizedGainLoss || 0) !==

                            gain

                    ) {

                        trade.realizedGainLoss =

                            gain;

                        InvestmentRepository

                            .saveTrade(

                                trade

                            );

                        // Keep the Income Center mirror

                        // in step with the new gain.

                        IncomeService.deleteLinkedIncome(

                            trade.id

                        );

                        this.syncAutoIncome(

                            trade

                        );

                    }

                }

            );

        const existing =

            this.getPositions().find(

                item =>

                    String(item.symbol || "")

                        .toUpperCase() === key

            );

        const lastTrade =

            remaining[remaining.length - 1];

        const overridePrice =

            PriceOverrideStore.get(

                key

            );

        const currentPrice =

            overridePrice > 0

                ? overridePrice

                : Number(

                    (existing && existing.currentPrice) ||

                    fifo.lastPrice ||

                    0

                );

        const position = {

            ...(existing || {}),

            symbol: key,

            name:

                (lastTrade && lastTrade.name) ||

                (existing && existing.name) ||

                key,

            quantity:

                fifo.quantity,

            costBasis:

                Math.max(

                    fifo.costBasis,

                    0

                ),

            averageCost:

                fifo.quantity > 0

                    ? Math.max(

                        fifo.costBasis,

                        0

                    ) / fifo.quantity

                    : 0,

            currentPrice,

            marketValue:

                fifo.quantity * currentPrice,

            memberId:

                (lastTrade && lastTrade.memberId) ||

                (existing && existing.memberId) ||

                "",

            accountId:

                (lastTrade && lastTrade.accountId) ||

                (existing && existing.accountId) ||

                ""

        };

        position.unrealizedGainLoss =

            position.marketValue -

            position.costBasis;

        const saved =

            this.updatePosition(

                position

            );

        if (record) {

            record.quantity =

                position.quantity;

            record.costBasis =

                position.costBasis;

            record.currentPrice =

                position.currentPrice;

            record.currentValue =

                position.marketValue;

            record.marketValue =

                position.marketValue;

            InvestmentRepository

                .saveInvestment(

                    record

                );

        }

        return saved;

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

                capitalGain:

                    Number(

                        trade.realizedGainLoss || 0

                    ),

                tradeId:

                    trade.id || "",

                memberId:

                    trade.memberId || "",

                action

            }

        };

        /*

         * A trade recorded for a member without

         * choosing an account settles in that

         * member's Investment account, so the

         * investable cash balance always moves

         * with buys and sells.

         */

        const pickedAccount =

            transactionData.accountId

                ? (

                    AccountRepository.findAll() ||

                    []

                ).find(

                    account =>

                        String(account.id) ===

                        String(transactionData.accountId)

                )

                : null;

        const pickedOwnerMismatch =

            pickedAccount &&

            trade.memberId &&

            String(

                pickedAccount.memberId ||

                pickedAccount.ownerId ||

                ""

            ) !== String(trade.memberId);

        if (

            trade.memberId &&

            (

                !transactionData.accountId ||

                pickedOwnerMismatch

            )

        ) {

            try {

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

                            ) === String(trade.memberId)

                    );

                const settle =

                    owned.find(

                        account =>

                            account.openingSource ===

                                "asset" &&

                            `${account.name || ""} ${account.accountType || ""} ${account.type || ""}`

                                .toLowerCase()

                                .includes("invest")

                    ) ||

                    owned.find(

                        account =>

                            `${account.name || ""} ${account.accountType || ""} ${account.type || ""}`

                                .toLowerCase()

                                .includes("invest")

                    );

                if (settle) {

                    transactionData.accountId =

                        String(settle.id);

                }

            } catch (settleError) {

            }

        }

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

            const buyOverridePrice =

                PriceOverrideStore.get(

                    symbol

                );

            position.currentPrice =

                buyOverridePrice > 0

                    ? buyOverridePrice

                    : price ||

                        position.currentPrice;

            position.marketValue =

                position.quantity *

                position.currentPrice;

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

            // Realized capital gain on this sale:

            // proceeds minus the FIFO (first-in,

            // first-out) cost of the shares sold.

            // Falls back to the record's average

            // cost when the holding came from a

            // manual record without buy trades.

            const fifo =

                replayFifoTrades(

                    symbol,

                    this.getTrades()

                );

            if (

                fifo.hasBuys &&

                fifo.gainByTradeId[trade.id] !==

                    undefined

            ) {

                trade.realizedGainLoss =

                    fifo.gainByTradeId[trade.id];

                position.quantity =

                    fifo.quantity;

                position.costBasis =

                    Math.max(

                        fifo.costBasis,

                        0

                    );

            } else {

                trade.realizedGainLoss =

                    amount -

                    averageCostHeld *

                        sellQuantity;

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

            }

            position.averageCost =

                position.quantity > 0

                ? position.costBasis /

                    position.quantity

                : 0;

            const sellOverridePrice =

                PriceOverrideStore.get(

                    symbol

                );

            position.currentPrice =

                sellOverridePrice > 0

                    ? sellOverridePrice

                    : price ||

                        position.currentPrice;

            position.marketValue =

                position.quantity *

                position.currentPrice;

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

    // Current Price (manual / imported)

    // =====================================================

    setCurrentPrice(

        symbol,

        price,

        source = "manual"

    ){

        const key =

            String(symbol || "")

                .trim()

                .toUpperCase();

        const value =

            Number(price || 0);

        if (!key || !(value > 0)) {

            return null;

        }

        PriceOverrideStore.set(

            key,

            value,

            source

        );

        let updatedPosition = null;

        const position =

            this.getPositions().find(

                item =>

                    String(item.symbol || "")

                        .toUpperCase() === key

            );

        if (position) {

            position.currentPrice =

                value;

            position.marketValue =

                Number(position.quantity || 0) *

                value;

            position.unrealizedGainLoss =

                position.marketValue -

                Number(position.costBasis || 0);

            updatedPosition =

                this.updatePosition(

                    position

                );

        }

        const record =

            this.getInvestments().find(

                item =>

                    String(

                        item.symbol ||

                            item.name ||

                            ""

                    ).toUpperCase() === key

            );

        if (record) {

            record.currentPrice =

                value;

            const recordQuantity =

                Number(record.quantity || 0);

            if (recordQuantity > 0) {

                record.currentValue =

                    recordQuantity * value;

                record.marketValue =

                    record.currentValue;

            }

            InvestmentRepository

                .saveInvestment(

                    record

                );

        }

        return {

            symbol: key,

            price: value,

            position: updatedPosition

        };

    },

    importPrices(

        priceMap,

        source = "import"

    ){

        const applied = [];

        Object.entries(priceMap || {})

            .forEach(

                ([symbol, price]) => {

                    const result =

                        this.setCurrentPrice(

                            symbol,

                            price,

                            source

                        );

                    if (result) {

                        applied.push(result);

                    }

                }

            );

        return applied;

    },

    getPriceOverrides(){

        return PriceOverrideStore.all();

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
