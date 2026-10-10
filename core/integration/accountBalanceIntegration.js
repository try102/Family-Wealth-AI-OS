/*

Family Wealth AI OS V7

Account Balance Integration

现金资产随交易自动变动：

每笔新交易（TRANSACTION_CREATED）中带 cashEffect 的分录，

按方向调整对应账户余额（IN 增加、OUT 减少）。

只处理实时新建的交易；启动同步不会重复扣加历史交易。

*/

import EventBus from "../events/eventBus.js?v=20261008ae";

import EventTypes from "../events/eventTypes.js?v=20261008ae";

import AccountRepository from "../../modules/account/repository/accountRepository.js?v=20261008ae";

import InvestmentRepository from "../../modules/investment/repository/investmentRepository.js?v=20261010da";

import AssetRepository from "../../modules/asset/repository/assetRepository.js?v=20261008ae";

import cashflowAPI from "../../modules/cashflow/api/cashflowAPI.js?v=20261010da";

import MemberRepository from "../../modules/member/repository/memberRepository.js?v=20261008ae";

const AccountBalanceIntegration = {

    initialized:

        false,

    lastDiagnostic:

        "",

    /*

     * Transaction IDs already applied in

     * this session (guards against any

     * duplicate event delivery).

     */

    appliedTransactionIds:

        new Set(),

    /*

     * Startup sync + calibration:

     * - Any accountId still referenced by a live

     *   transaction, trade or asset but missing as

     *   an account record is created automatically

     *   (balance = its live transaction effects).

     * - Every account balance is derived as

     *   openingBalance + live transaction effects,

     *   so balances can never drift from the ledger.

     */

    syncAndCalibrate(

        transactions

    ) {

        try {

            const txs =

                Array.isArray(transactions)

                    ? transactions

                    : [];

            // Legacy transactions with a malformed

            // lines field must not abort the whole

            // calibration for every account.

            const safeTxs = txs.filter(

                transaction =>

                    transaction &&

                    (

                        transaction.lines === undefined ||

                        Array.isArray(transaction.lines)

                    )

            );

            const effects = new Map();

            const referenced = new Set();

            safeTxs.forEach(

                transaction => {

                    (

                        transaction.lines || []

                    ).forEach(

                        line => {

                            if (

                                !line ||

                                !line.accountId

                            ) {

                                return;

                            }

                            const accountKey =

                                String(line.accountId);

                            referenced.add(

                                accountKey

                            );

                            if (!line.cashEffect) {

                                return;

                            }

                            const amount =

                                Number(line.amount);

                            if (

                                !Number.isFinite(amount) ||

                                amount === 0

                            ) {

                                return;

                            }

                            const delta =

                                line.direction === "IN"

                                    ? amount

                                    : line.direction === "OUT"

                                        ? -amount

                                        : 0;

                            if (delta) {

                                effects.set(

                                    accountKey,

                                    (

                                        effects.get(accountKey) ||

                                        0

                                    ) + delta

                                );

                            }

                        }

                    );

                    // Investment trades recorded

                    // without an account settle in

                    // the member's Investment account

                    // so the investable cash balance

                    // reflects buys and sells.

                    if (

                        transaction &&

                        (

                            transaction.type ===

                                "INVESTMENT_BUY" ||

                            transaction.type ===

                                "INVESTMENT_SELL"

                        )

                    ) {

                        const cashLine =

                            (

                                transaction.lines || []

                            ).find(

                                line =>

                                    line &&

                                    line.cashEffect

                            );

                        if (cashLine) {

                            const target =

                                AccountBalanceIntegration

                                    .resolveInvestmentSettleAccount(

                                        transaction

                                    );

                            const amt =

                                Number(cashLine.amount);

                            if (

                                target &&

                                target !==

                                    String(

                                        cashLine.accountId ||

                                        ""

                                    ) &&

                                Number.isFinite(amt) &&

                                amt !== 0

                            ) {

                                const d =

                                    cashLine.direction ===

                                        "IN"

                                        ? amt

                                        : cashLine.direction ===

                                                "OUT"

                                            ? -amt

                                            : 0;

                                if (d) {

                                    effects.set(

                                        target,

                                        (

                                            effects.get(

                                                target

                                            ) || 0

                                        ) + d

                                    );

                                    referenced.add(

                                        target

                                    );

                                    if (cashLine.accountId) {

                                        // Undo the contribution

                                        // the lines loop put on

                                        // the wrong member's

                                        // account.

                                        effects.set(

                                            String(

                                                cashLine.accountId

                                            ),

                                            (

                                                effects.get(

                                                    String(

                                                        cashLine

                                                            .accountId

                                                    )

                                                ) || 0

                                            ) - d

                                        );

                                    }

                                }

                            }

                        }

                    }

                }

            );

            const tradeOwner = {};

            try {

                (

                    InvestmentRepository.getTrades() ||

                    []

                ).forEach(

                    trade => {

                        if (trade.accountId) {

                            referenced.add(

                                String(trade.accountId)

                            );

                            if (trade.memberId) {

                                tradeOwner[

                                    String(trade.accountId)

                                ] = trade.memberId;

                            }

                        }

                    }

                );

            } catch (tradeScanError) {

            }

            // Trades whose Transaction no longer

            // exists (deleted directly, or recorded

            // before the transaction bridge) still

            // settle: the trade record itself is the

            // evidence, attributed to its member's

            // Investment account (or its own picked

            // account when the owner matches).

            try {

                const settledTradeIds =

                    new Set();

                safeTxs.forEach(

                    transaction => {

                        if (

                            transaction &&

                            (

                                transaction.type ===

                                    "INVESTMENT_BUY" ||

                                transaction.type ===

                                    "INVESTMENT_SELL"

                            )

                        ) {

                            const detail =

                                (

                                    transaction

                                        .businessDetails ||

                                    {}

                                ).investment || {};

                            if (detail.tradeId) {

                                settledTradeIds.add(

                                    String(detail.tradeId)

                                );

                            }

                        }

                    }

                );

                const allAccounts =

                    AccountRepository.findAll() ||

                    [];

                // Accounts a trade points at may have

                // been deleted after the trade was

                // recorded. Materialize them now (the

                // later ghost pass skips existing ids)

                // so settlement can still land on the

                // account the trade names instead of

                // dropping the trade from every balance.

                const materializedIds = new Set();

                try {

                    const knownIds = new Set(

                        allAccounts.map(

                            account => String(account.id)

                        )

                    );

                    (

                        InvestmentRepository.getTrades() ||

                        []

                    ).forEach(

                        trade => {

                            if (

                                !trade ||

                                !trade.accountId ||

                                knownIds.has(

                                    String(trade.accountId)

                                )

                            ) {

                                return;

                            }

                            const ghostId =

                                String(trade.accountId);

                            const ghostMember =

                                trade.memberId ||

                                trade.ownerId ||

                                tradeOwner[ghostId] ||

                                "";

                            const ghost = {

                                id: ghostId,

                                name:

                                    /^\d{6,}_/.test(ghostId)

                                        ? "同步账户"

                                        : ghostId,

                                accountType: "Cash",

                                type: "Cash",

                                balance: 0,

                                openingBalance: 0,

                                memberId: ghostMember,

                                ownerId: ghostMember,

                                currency: "USD"

                            };

                            try {

                                AccountRepository.save(

                                    ghost

                                );

                                allAccounts.push(ghost);

                                knownIds.add(ghostId);

                                materializedIds.add(ghostId);

                            } catch (ghostError) {

                            }

                        }

                    );

                } catch (preGhostError) {

                }

                (

                    InvestmentRepository.getTrades() ||

                    []

                ).forEach(

                    trade => {

                        if (

                            !trade ||

                            !trade.id ||

                            settledTradeIds.has(

                                String(trade.id)

                            )

                        ) {

                            return;

                        }

                        const action =

                            String(

                                trade.action || ""

                            ).toUpperCase();

                        if (

                            action !== "BUY" &&

                            action !== "SELL"

                        ) {

                            return;

                        }

                        const amount =

                            Number(trade.amount || 0);

                        if (

                            !Number.isFinite(amount) ||

                            amount === 0

                        ) {

                            return;

                        }

                        let memberId =

                            trade.memberId ||

                            trade.ownerId ||

                            "";

                        let picked = null;

                        let pickedOwner = "";

                        if (trade.accountId) {

                            picked =

                                allAccounts.find(

                                    account =>

                                        String(account.id) ===

                                        String(trade.accountId)

                                ) || null;

                            if (picked) {

                                pickedOwner =

                                    String(

                                        picked.memberId ||

                                        picked.ownerId ||

                                        ""

                                    );

                                if (!memberId && pickedOwner) {

                                    memberId = pickedOwner;

                                }

                            }

                        }

                        let target = "";

                        // A real picked account whose

                        // owner matches wins; a

                        // materialized ghost never does

                        // (it exists only as a fallback).

                        if (

                            picked &&

                            !materializedIds.has(

                                String(picked.id)

                            ) &&

                            (

                                !memberId ||

                                !pickedOwner ||

                                AccountBalanceIntegration

                                    .sameMemberId(

                                        pickedOwner,

                                        memberId

                                    )

                            )

                        ) {

                            target = String(picked.id);

                        }

                        if (!target && memberId) {

                            const owned =

                                allAccounts.filter(

                                    account =>

                                        AccountBalanceIntegration

                                            .sameMemberId(

                                                account.memberId ||

                                                    account.ownerId ||

                                                    "",

                                                memberId

                                            )

                                );

                            const pick =

                                owned.find(

                                    account =>

                                        account.openingSource ===

                                            "asset" &&

                                        AccountBalanceIntegration

                                            .mirrorKindOfRecord(

                                                account

                                            ) === "investment"

                                ) ||

                                owned.find(

                                    account =>

                                        AccountBalanceIntegration

                                            .mirrorKindOfRecord(

                                                account

                                            ) === "investment"

                                );

                            if (pick) {

                                target = String(pick.id);

                            }

                        }

                        if (!target && picked) {

                            // The trade names this

                            // account; settling nowhere

                            // would silently drop the

                            // trade from every balance.

                            target = String(picked.id);

                        }

                        if (!target) {

                            return;

                        }

                        const d =

                            action === "BUY"

                                ? -amount

                                : amount;

                        effects.set(

                            target,

                            (

                                effects.get(target) ||

                                0

                            ) + d

                        );

                        referenced.add(target);

                    }

                );

            } catch (tradeSettleError) {

            }

            // Manual investment records (holdings

            // typed into the Investment Center with

            // no trades behind them) are buys paid

            // from the member's investable cash,

            // exactly like a recorded trade: the

            // quantity not already covered by that

            // member's trades settles against the

            // member's Investment account. Deleting

            // or editing the record re-derives at

            // the next calibration, like trades do.

            try {

                const manualRecords =

                    InvestmentRepository.getInvestments() ||

                    [];

                const accountsNow =

                    AccountRepository.findAll() ||

                    [];

                const canonicalMember = rawId => {

                    if (!rawId) {

                        return "";

                    }

                    const hit =

                        (

                            MemberRepository.getAll() || []

                        ).find(

                            member =>

                                AccountBalanceIntegration

                                    .sameMemberId(

                                        member.id,

                                        rawId

                                    )

                        );

                    return hit

                        ? String(hit.id)

                        : String(rawId);

                };

                const accountOwnerOf = accountId => {

                    if (!accountId) {

                        return "";

                    }

                    const found =

                        accountsNow.find(

                            account =>

                                String(account.id) ===

                                String(accountId)

                        );

                    return found

                        ? String(

                            found.memberId ||

                            found.ownerId ||

                            ""

                        )

                        : "";

                };

                const tradeQty = new Map();

                (

                    InvestmentRepository.getTrades() ||

                    []

                ).forEach(

                    trade => {

                        if (!trade) {

                            return;

                        }

                        const memberKey =

                            canonicalMember(

                                trade.memberId ||

                                    trade.ownerId ||

                                    accountOwnerOf(

                                        trade.accountId

                                    )

                            );

                        const symbolKey =

                            String(

                                trade.symbol ||

                                    trade.name ||

                                    ""

                            ).toUpperCase();

                        if (!memberKey || !symbolKey) {

                            return;

                        }

                        const action =

                            String(

                                trade.action || ""

                            ).toUpperCase();

                        const qty =

                            Number(trade.quantity || 0);

                        if (!Number.isFinite(qty)) {

                            return;

                        }

                        const key =

                            `${memberKey}::${symbolKey}`;

                        tradeQty.set(

                            key,

                            (tradeQty.get(key) || 0) +

                                (

                                    action === "SELL"

                                        ? -qty

                                        : qty

                                )

                        );

                    }

                );

                manualRecords.forEach(

                    record => {

                        if (!record) {

                            return;

                        }

                        const quantity =

                            Number(record.quantity || 0);

                        if (

                            !Number.isFinite(quantity) ||

                            quantity <= 0

                        ) {

                            return;

                        }

                        const costBasis =

                            Number(

                                record.costBasis ??

                                    record.totalCost ??

                                    record.currentValue ??

                                    record.marketValue ??

                                    0

                            );

                        const unitCost =

                            Number(record.averageCost || 0) ||

                            (

                                quantity > 0

                                    ? costBasis / quantity

                                    : 0

                            );

                        if (

                            !Number.isFinite(unitCost) ||

                            unitCost <= 0

                        ) {

                            return;

                        }

                        const memberRaw =

                            record.memberId ||

                            record.ownerId ||

                            accountOwnerOf(record.accountId) ||

                            "";

                        const memberKey =

                            canonicalMember(memberRaw);

                        const symbolKey =

                            String(

                                record.symbol ||

                                    record.name ||

                                    ""

                            ).toUpperCase();

                        if (!symbolKey) {

                            return;

                        }

                        const covered =

                            memberKey

                                ? tradeQty.get(

                                    `${memberKey}::${symbolKey}`

                                ) || 0

                                : 0;

                        const uncovered =

                            Math.max(0, quantity - covered);

                        if (uncovered <= 0) {

                            return;

                        }

                        const settleAmount =

                            uncovered * unitCost;

                        let target = "";

                        if (record.accountId) {

                            const picked =

                                accountsNow.find(

                                    account =>

                                        String(account.id) ===

                                        String(record.accountId)

                                );

                            if (picked) {

                                const pickedOwner =

                                    String(

                                        picked.memberId ||

                                        picked.ownerId ||

                                        ""

                                    );

                                if (

                                    !memberKey ||

                                    !pickedOwner ||

                                    AccountBalanceIntegration

                                        .sameMemberId(

                                            pickedOwner,

                                            memberRaw

                                        )

                                ) {

                                    target =

                                        String(picked.id);

                                }

                            }

                        }

                        if (!target && memberKey) {

                            const owned =

                                accountsNow.filter(

                                    account =>

                                        AccountBalanceIntegration

                                            .sameMemberId(

                                                account.memberId ||

                                                    account.ownerId ||

                                                    "",

                                                memberRaw

                                            )

                                );

                            const pick =

                                owned.find(

                                    account =>

                                        account.openingSource ===

                                            "asset" &&

                                        AccountBalanceIntegration

                                            .mirrorKindOfRecord(

                                                account

                                            ) === "investment"

                                ) ||

                                owned.find(

                                    account =>

                                        AccountBalanceIntegration

                                            .mirrorKindOfRecord(

                                                account

                                            ) === "investment"

                                );

                            if (pick) {

                                target = String(pick.id);

                            }

                        }

                        if (!target) {

                            return;

                        }

                        effects.set(

                            target,

                            (

                                effects.get(target) ||

                                0

                            ) - settleAmount

                        );

                        referenced.add(target);

                        if (record.accountId) {

                            referenced.add(

                                String(record.accountId)

                            );

                        }

                    }

                );

            } catch (manualSettleError) {

            }

            // Position records are the third holding

            // source. When trades and manual records

            // are gone but a position remains (e.g.

            // the trades were removed outside the

            // trade-delete path), its remaining cost

            // still came out of the member's

            // investable cash: settle the quantity

            // not covered by trades or records.

            try {

                const positions =

                    InvestmentRepository.getPositions() ||

                    [];

                const accountsNow =

                    AccountRepository.findAll() ||

                    [];

                const canonicalMember = rawId => {

                    if (!rawId) {

                        return "";

                    }

                    const hit =

                        (

                            MemberRepository.getAll() || []

                        ).find(

                            member =>

                                AccountBalanceIntegration

                                    .sameMemberId(

                                        member.id,

                                        rawId

                                    )

                        );

                    return hit

                        ? String(hit.id)

                        : String(rawId);

                };

                const accountOwnerOf = accountId => {

                    if (!accountId) {

                        return "";

                    }

                    const found =

                        accountsNow.find(

                            account =>

                                String(account.id) ===

                                String(accountId)

                        );

                    return found

                        ? String(

                            found.memberId ||

                            found.ownerId ||

                            ""

                        )

                        : "";

                };

                const coveredQty = new Map();

                const bumpCovered = (key, qty) => {

                    coveredQty.set(

                        key,

                        Math.max(

                            coveredQty.get(key) || 0,

                            qty

                        )

                    );

                };

                // Net trade quantity per member+symbol.

                const netTradeQty = new Map();

                (

                    InvestmentRepository.getTrades() ||

                    []

                ).forEach(

                    trade => {

                        if (!trade) {

                            return;

                        }

                        const memberKey =

                            canonicalMember(

                                trade.memberId ||

                                    trade.ownerId ||

                                    accountOwnerOf(

                                        trade.accountId

                                    )

                            );

                        const symbolKey =

                            String(

                                trade.symbol ||

                                    trade.name ||

                                    ""

                            ).toUpperCase();

                        if (!memberKey || !symbolKey) {

                            return;

                        }

                        const action =

                            String(

                                trade.action || ""

                            ).toUpperCase();

                        const qty =

                            Number(trade.quantity || 0);

                        if (!Number.isFinite(qty)) {

                            return;

                        }

                        const key =

                            `${memberKey}::${symbolKey}`;

                        netTradeQty.set(

                            key,

                            (netTradeQty.get(key) || 0) +

                                (

                                    action === "SELL"

                                        ? -qty

                                        : qty

                                )

                        );

                    }

                );

                netTradeQty.forEach(

                    (qty, key) => bumpCovered(key, qty)

                );

                (

                    InvestmentRepository.getInvestments() ||

                    []

                ).forEach(

                    record => {

                        if (!record) {

                            return;

                        }

                        const memberKey =

                            canonicalMember(

                                record.memberId ||

                                    record.ownerId ||

                                    accountOwnerOf(

                                        record.accountId

                                    )

                            );

                        const symbolKey =

                            String(

                                record.symbol ||

                                    record.name ||

                                    ""

                            ).toUpperCase();

                        const qty =

                            Number(record.quantity || 0);

                        if (

                            memberKey &&

                            symbolKey &&

                            Number.isFinite(qty)

                        ) {

                            bumpCovered(

                                `${memberKey}::${symbolKey}`,

                                qty

                            );

                        }

                    }

                );

                positions.forEach(

                    position => {

                        if (!position) {

                            return;

                        }

                        const quantity =

                            Number(position.quantity || 0);

                        const costBasis =

                            Number(position.costBasis || 0);

                        if (

                            !Number.isFinite(quantity) ||

                            quantity <= 0 ||

                            !Number.isFinite(costBasis) ||

                            costBasis <= 0

                        ) {

                            return;

                        }

                        const symbolKey =

                            String(

                                position.symbol ||

                                    position.name ||

                                    ""

                            ).toUpperCase();

                        if (!symbolKey) {

                            return;

                        }

                        const memberRaw =

                            position.memberId ||

                            position.ownerId ||

                            accountOwnerOf(

                                position.accountId

                            ) ||

                            "";

                        const memberKey =

                            canonicalMember(memberRaw);

                        const covered =

                            memberKey

                                ? coveredQty.get(

                                    `${memberKey}::${symbolKey}`

                                ) || 0

                                : 0;

                        const uncovered =

                            Math.max(0, quantity - covered);

                        if (uncovered <= 0) {

                            return;

                        }

                        const settleAmount =

                            uncovered *

                            (costBasis / quantity);

                        let target = "";

                        if (position.accountId) {

                            const picked =

                                accountsNow.find(

                                    account =>

                                        String(account.id) ===

                                        String(position.accountId)

                                );

                            if (picked) {

                                target = String(picked.id);

                            }

                        }

                        if (!target && memberKey) {

                            const owned =

                                accountsNow.filter(

                                    account =>

                                        AccountBalanceIntegration

                                            .sameMemberId(

                                                account.memberId ||

                                                    account.ownerId ||

                                                    "",

                                                memberRaw

                                            )

                                );

                            const pick =

                                owned.find(

                                    account =>

                                        account.openingSource ===

                                            "asset" &&

                                        AccountBalanceIntegration

                                            .mirrorKindOfRecord(

                                                account

                                            ) === "investment"

                                ) ||

                                owned.find(

                                    account =>

                                        AccountBalanceIntegration

                                            .mirrorKindOfRecord(

                                                account

                                            ) === "investment"

                                );

                            if (pick) {

                                target = String(pick.id);

                            }

                        }

                        if (!target) {

                            return;

                        }

                        effects.set(

                            target,

                            (

                                effects.get(target) ||

                                0

                            ) - settleAmount

                        );

                        referenced.add(target);

                    }

                );

            } catch (positionSettleError) {

            }

            try {

                (

                    AssetRepository.findAll() ||

                    []

                ).forEach(

                    asset => {

                        if (asset.accountId) {

                            referenced.add(

                                String(asset.accountId)

                            );

                        }

                    }

                );

            } catch (assetScanError) {

            }

            // Cash-flow entries survive even when

            // their transactions were deleted, so

            // they are a reference source too.

            const entryEffects = new Map();

            try {

                (

                    cashflowAPI.getCashflows() ||

                    []

                ).forEach(

                    entry => {

                        if (!entry.accountId) {

                            return;

                        }

                        const accountKey =

                            String(entry.accountId);

                        referenced.add(

                            accountKey

                        );

                        const amount =

                            Number(entry.amount || 0);

                        if (

                            !Number.isFinite(amount) ||

                            amount === 0

                        ) {

                            return;

                        }

                        const delta =

                            entry.type === "INCOME"

                                ? amount

                                : entry.type === "EXPENSE"

                                    ? -amount

                                    : 0;

                        if (delta) {

                            entryEffects.set(

                                accountKey,

                                (

                                    entryEffects.get(

                                        accountKey

                                    ) ||

                                    0

                                ) + delta

                            );

                        }

                    }

                );

            } catch (entryScanError) {

            }

            const byId = new Map();

            (

                AccountRepository.findAll() ||

                []

            ).forEach(

                account => {

                    byId.set(

                        String(account.id),

                        account

                    );

                }

            );

            referenced.forEach(

                accountKey => {

                    if (byId.has(accountKey)) {

                        return;

                    }

                    const ghost = {

                        id: accountKey,

                        name:

                            /^\d{6,}_/.test(accountKey)

                                ? "同步账户"

                                : accountKey,

                        accountType: "Cash",

                        type: "Cash",

                        balance:

                            effects.has(accountKey)

                                ? effects.get(accountKey)

                                : entryEffects.get(

                                    accountKey

                                ) ||

                                0,

                        openingBalance:

                            (

                                effects.has(accountKey)

                                    ? effects.get(accountKey)

                                    : entryEffects.get(

                                        accountKey

                                    ) ||

                                    0

                            ) -

                            (effects.get(accountKey) || 0),

                        memberId:

                            tradeOwner[accountKey] ||

                            "",

                        ownerId:

                            tradeOwner[accountKey] ||

                            "",

                        currency: "USD"

                    };

                    try {

                        AccountRepository.save(

                            ghost

                        );

                        byId.set(

                            accountKey,

                            ghost

                        );

                    } catch (ghostError) {

                    }

                }

            );

            // Mirror pairs: an asset record that IS

            // the account (deposit / Checking entered

            // in the Asset Center) and the matching

            // account share one balance. Asset value

            // wins unless the user typed a balance in

            // the Account Center more recently.

            const mirrorIds = new Set();

            const mirrorKindOf = record =>

                AccountBalanceIntegration

                    .mirrorKindOfRecord(record);

            try {

                const assetRecords =

                    AssetRepository.findAll() ||

                    [];

                byId.forEach(

                    (account, accountKey) => {

                        const kind =

                            mirrorKindOf(account);

                        if (!kind) {

                            return;

                        }

                        const owner =

                            account.memberId ||

                            account.ownerId ||

                            "";

                        const pair =

                            assetRecords.find(

                                asset =>

                                    mirrorKindOf(asset) ===

                                        kind &&

                                    (

                                        String(

                                            asset.memberId ||

                                            asset.ownerId ||

                                            ""

                                        ) === String(owner) ||

                                        AccountBalanceIntegration

                                            .sameMemberId(

                                                asset.memberId ||

                                                    asset.ownerId ||

                                                    "",

                                                owner

                                            )

                                    )

                            );

                        if (!pair) {

                            return;

                        }

                        mirrorIds.add(

                            accountKey

                        );

                        // One balance in two places.

                        // The current truth is whichever

                        // side the user touched last;

                        // the opening anchor is set so

                        // that opening + live transaction

                        // effects land exactly on it, and

                        // from then on transactions move

                        // both sides together.

                        const effect =

                            effects.get(accountKey) ||

                            0;

                        const manualWins =

                            account.manualBalance &&

                            account.manualAt &&

                            pair.updatedAt &&

                            String(account.manualAt) >

                                String(pair.updatedAt);

                        if (

                            !account.mirrorBasis &&

                            !manualWins

                        ) {

                            // First pairing: the value

                            // typed in the Asset Center

                            // is the OPENING balance; the

                            // live balance is opening +

                            // transaction effects (e.g.

                            // 200,000 minus stock buys),

                            // mirrored onto both sides.

                            account.openingBalance =

                                pair.basisValue !== undefined &&

                                pair.basisValue !== null

                                    ? Number(pair.basisValue)

                                    : Number(

                                        pair.currentValue || 0

                                    );

                            account.mirrorBasisValue =

                                account.openingBalance;

                            account.balance =

                                account.openingBalance +

                                effect;

                            account.openingSource =

                                "asset";

                            account.mirrorBasis =

                                "opening";

                            account.manualBalance =

                                false;

                            try {

                                AccountRepository.save(

                                    account

                                );

                            } catch (mirrorSaveError) {

                            }

                            if (

                                Number(

                                    pair.currentValue || 0

                                ) !== account.balance

                            ) {

                                pair.currentValue =

                                    account.balance;

                                try {

                                    AssetRepository.save(

                                        pair

                                    );

                                } catch (pairSaveError) {

                                }

                            }

                            account.mirrorAssetUpdatedAt =

                                pair.updatedAt || "";

                            account.mirrorAssetValue =

                                Number(

                                    pair.currentValue || 0

                                );

                            try {

                                AccountRepository.save(

                                    account

                                );

                            } catch (mirrorSaveError) {

                            }

                            return;

                        }

                        // Steady state: the balance is

                        // derived from the ledger

                        // (opening + live effects) and

                        // the asset mirrors it. Only a

                        // manual edit re-anchors: an

                        // account edit (manualWins) or

                        // an asset edit, detected by the

                        // asset's updatedAt moving past

                        // the timestamp last mirrored.

                        // Asset edits are detected by

                        // VALUE only: any save bumps the

                        // asset's updatedAt, and a

                        // timestamp-only change must never

                        // re-anchor (it would bake the

                        // live effects into the opening

                        // and pin the balance forever).

                        const assetEdited =

                            account.mirrorAssetValue !==

                                undefined &&

                            Number(pair.currentValue || 0) !==

                                Number(

                                    account.mirrorAssetValue

                                );

                        // A basis edit (the user re-typed

                        // the deposit / Checking amount in

                        // the Asset Center) re-anchors the

                        // OPENING basis: balance = basis +

                        // live effects. This also heals

                        // anchors frozen by older versions

                        // that baked trade effects into the

                        // opening and pinned the balance.

                        const basisNow =

                            pair.basisValue !== undefined &&

                            pair.basisValue !== null

                                ? Number(pair.basisValue)

                                : undefined;

                        const basisEdited =

                            basisNow !== undefined &&

                            Number(

                                account.mirrorBasisValue ?? NaN

                            ) !== basisNow;

                        if (basisEdited) {

                            account.openingBalance =

                                basisNow;

                            account.balance =

                                basisNow + effect;

                            // Remember the basis we just
                            // anchored to, so the next load
                            // does not re-anchor again and
                            // again (which would pin the
                            // balance and hide live effects).

                            account.mirrorBasisValue =

                                basisNow;

                            if (

                                Number(

                                    pair.currentValue || 0

                                ) !== account.balance

                            ) {

                                pair.currentValue =

                                    account.balance;

                                try {

                                    AssetRepository.save(

                                        pair

                                    );

                                } catch (pairSaveError) {

                                }

                            }

                        } else if (manualWins || assetEdited) {

                            // For account-like assets (those
                            // with a basisValue), the asset's
                            // currentValue must NEVER be
                            // trusted as manual truth — it is
                            // derived as basis + effects. A
                            // stale or wiped currentValue here
                            // (e.g. from an old save that
                            // overwrote it with the typed
                            // basis) would pin the balance and
                            // hide live transaction effects.
                            // Re-derive from basis + effect.

                            const pairBasis =

                                pair.basisValue !== undefined &&

                                pair.basisValue !== null

                                    ? Number(pair.basisValue)

                                    : undefined;

                            const truth =

                                manualWins

                                    ? Number(

                                        account.balance || 0

                                    )

                                    : pairBasis !== undefined

                                        ? pairBasis + effect

                                        : Number(

                                            pair.currentValue || 0

                                        );

                            account.openingBalance =

                                truth - effect;

                            account.balance =

                                truth;

                            if (

                                Number(

                                    pair.currentValue || 0

                                ) !== truth

                            ) {

                                pair.currentValue =

                                    truth;

                                try {

                                    AssetRepository.save(

                                        pair

                                    );

                                } catch (pairSaveError) {

                                }

                            }

                        } else {

                            if (

                                account.openingBalance ===

                                    undefined ||

                                account.openingBalance ===

                                    null

                            ) {

                                account.openingBalance =

                                    Number(

                                        pair.currentValue || 0

                                    );

                            }

                            account.balance =

                                Number(

                                    account.openingBalance

                                ) + effect;

                            if (

                                Number(

                                    pair.currentValue || 0

                                ) !== account.balance

                            ) {

                                pair.currentValue =

                                    account.balance;

                                try {

                                    AssetRepository.save(

                                        pair

                                    );

                                } catch (pairSaveError) {

                                }

                            }

                        }

                        account.mirrorBasis =

                            account.mirrorBasis ||

                            "opening";

                        account.openingSource =

                            "asset";

                        account.manualBalance =

                            false;

                        account.mirrorAssetUpdatedAt =

                            pair.updatedAt || "";

                        account.mirrorAssetValue =

                            Number(pair.currentValue || 0);

                        if (basisNow !== undefined) {

                            account.mirrorBasisValue =

                                basisNow;

                        }

                        try {

                            AccountRepository.save(

                                account

                            );

                        } catch (mirrorSaveError) {

                        }

                    }

                );

            } catch (mirrorSyncError) {

            }

            byId.forEach(

                (account, accountKey) => {

                    const effect =

                        effects.get(accountKey) ||

                        0;

                    const current =

                        Number(account.balance || 0);

                    // A balance typed in the Account

                    // Center is the new truth for EVERY

                    // account, paired or not: re-anchor

                    // the opening so the derivation

                    // below keeps it, and later

                    // transactions move from there.

                    if (account.manualBalance) {

                        account.openingBalance =

                            current - effect;

                        account.manualBalance =

                            false;

                        if (!account.openingSource) {

                            account.openingSource =

                                "user";

                        }

                        try {

                            AccountRepository.save(

                                account

                            );

                        } catch (manualAnchorError) {

                        }

                    }

                    // Household rule: legacy Investment /

                    // Checking accounts open at 200,000

                    // unless the user typed their own

                    // opening balance at creation.

                    const kindLabel =

                        `${account.name || ""} ${account.accountType || ""} ${account.type || ""}`.toLowerCase();

                    if (

                        !account.openingSource &&

                        (

                            kindLabel.includes("invest") ||

                            kindLabel.includes("check")

                        )

                    ) {

                        account.openingBalance = 200000;

                        account.openingSource = "rule";

                        account.balance =

                            200000 +

                            (

                                effects.has(accountKey)

                                    ? effect

                                    : entryEffects.get(

                                        accountKey

                                    ) ||

                                    0

                            );

                        try {

                            AccountRepository.save(

                                account

                            );

                        } catch (ruleError) {

                        }

                        return;

                    }

                    if (

                        account.openingBalance ===

                            undefined ||

                        account.openingBalance ===

                            null

                    ) {

                        account.openingBalance =

                            current - effect;

                        try {

                            AccountRepository.save(

                                account

                            );

                        } catch (anchorError) {

                        }

                    } else {

                        const correct =

                            Number(

                                account.openingBalance

                            ) + effect;

                        if (

                            Math.abs(

                                correct - current

                            ) > 0.005

                        ) {

                            account.balance = correct;

                            try {

                                AccountRepository.save(

                                    account

                                );

                            } catch (calibrateError) {

                            }

                        }

                    }

                }

            );

            // Read-only diagnostic snapshot for

            // support: what the calibration saw and

            // derived, per account and per holding.

            try {

                const diagLines = [];

                diagLines.push(

                    `counts tx=${txs.length} safeTx=${safeTxs.length} trades=${(InvestmentRepository.getTrades() || []).length} positions=${(InvestmentRepository.getPositions() || []).length} records=${(InvestmentRepository.getInvestments() || []).length} accounts=${byId.size}`

                );

                byId.forEach(

                    (account, accountKey) => {

                        diagLines.push(

                            `ACCT ${account.name || accountKey} | owner=${AccountBalanceIntegration.memberNameOf(account.memberId || account.ownerId || "") || (account.memberId || account.ownerId || "")} | kind=${AccountBalanceIntegration.mirrorKindOfRecord(account) || "-"} | src=${account.openingSource || "-"} | opening=${Number(account.openingBalance || 0)} | bal=${Number(account.balance || 0)} | fx=${effects.get(accountKey) || 0}`

                        );

                    }

                );

                (

                    InvestmentRepository.getTrades() ||

                    []

                ).forEach(

                    trade => {

                        diagLines.push(

                            `TRADE ${trade.symbol || ""} ${trade.action || ""} qty=${trade.quantity || 0} amt=${trade.amount || 0} member=${trade.memberId || trade.ownerId || ""} acct=${trade.accountId || ""}`

                        );

                    }

                );

                (

                    InvestmentRepository.getPositions() ||

                    []

                ).forEach(

                    position => {

                        diagLines.push(

                            `POS ${position.symbol || ""} qty=${position.quantity || 0} cost=${position.costBasis || 0} member=${position.memberId || position.ownerId || ""} acct=${position.accountId || ""}`

                        );

                    }

                );

                (

                    InvestmentRepository.getInvestments() ||

                    []

                ).forEach(

                    record => {

                        diagLines.push(

                            `REC ${record.symbol || ""} qty=${record.quantity || 0} cost=${record.costBasis ?? record.totalCost ?? record.currentValue ?? record.marketValue ?? 0} member=${record.memberId || record.ownerId || ""} acct=${record.accountId || ""}`

                        );

                    }

                );

                AccountBalanceIntegration.lastDiagnostic =

                    diagLines.join("\n");

                try {

                    localStorage.setItem(

                        "fw_last_diag",

                        AccountBalanceIntegration.lastDiagnostic

                    );

                } catch (diagStoreError) {

                }

            } catch (diagError) {

            }

        } catch (syncError) {

            try {

                AccountBalanceIntegration.lastDiagnostic =

                    `CALIBRATION ERROR: ${

                        syncError && syncError.message

                            ? syncError.message

                            : syncError

                    }`;

                localStorage.setItem(

                    "fw_last_diag",

                    AccountBalanceIntegration.lastDiagnostic

                );

            } catch (diagStoreError) {

            }

        }

    },

    initialize() {

        if (

            this.initialized

        ) {

            return true;

        }

        EventBus.subscribe(

            EventTypes.TRANSACTION_CREATED,

            transaction => {

                this.applyTransaction(

                    transaction

                );

            }

        );

        this.initialized =

            true;

        return true;

    },

        /*

     * Reverse the cash legs of one Transaction

     * (used when the transaction is deleted):

     * IN becomes OUT and OUT becomes IN.

     */

    reverseTransaction(

        transaction

    ) {

        if (

            !transaction ||

            !Array.isArray(

                transaction.lines

            )

        ) {

            return;

        }

        const flipped = {

            ...transaction,

            lines:

                transaction.lines.map(

                    line => ({

                        ...line,

                        direction:

                            line.direction === "IN"

                                ? "OUT"

                                : "IN"

                    })

                )

        };

        if (

            transaction.id

        ) {

            this.appliedTransactionIds

                .delete(

                    transaction.id

                );

        }

        this.applyTransaction(

            flipped

        );

    },

/*

     * Apply the cash legs of one Transaction

     * to Account balances.

     */

    mirrorKindOfRecord(record) {

        // Account-like kinds pair an asset record

        // with the same member's account of the

        // same kind: one balance in two places,

        // for every account, not just two names.

        const label =

            `${(record && record.name) || ""} ${(record && record.category) || ""} ${(record && record.accountType) || ""} ${(record && record.type) || ""}`.toLowerCase();

        if (label.includes("invest")) {

            return "investment";

        }

        if (label.includes("check")) {

            return "checking";

        }

        if (label.includes("saving")) {

            return "savings";

        }

        if (label.includes("broker")) {

            return "brokerage";

        }

        if (label.includes("cash")) {

            return "cash";

        }

        return "";

    },

    memberNameOf(memberId) {

        try {

            if (!memberId) {

                return "";

            }

            const member =

                (

                    MemberRepository.getAll() || []

                ).find(

                    item =>

                        String(item.id) === String(memberId)

                );

            return member

                ? String(member.name || "").trim()

                : "";

        } catch (nameError) {

            return "";

        }

    },

    // Two member ids are "the same member" when they are equal, or when

    // both resolve to member records with the same name (a member that

    // was deleted and recreated, or created twice, must not orphan the

    // trades recorded under the older id).

    sameMemberId(a, b) {

        if (!a || !b) {

            return false;

        }

        if (String(a) === String(b)) {

            return true;

        }

        const nameA = this.memberNameOf(a);

        const nameB = this.memberNameOf(b);

        if (!!nameA && nameA === nameB) {

            return true;

        }

        // A raw member NAME stored where an id

        // belongs still names the same member.

        if (nameB && String(a) === nameB) {

            return true;

        }

        if (nameA && String(b) === nameA) {

            return true;

        }

        return false;

    },

    resolveInvestmentSettleAccount(transaction) {

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

            if (!memberId) {

                return lineAccountId;

            }

            const owned =

                (

                    AccountRepository.findAll() ||

                    []

                ).filter(

                    account =>

                        this.sameMemberId(

                            account.memberId ||

                                account.ownerId ||

                                "",

                            memberId

                        )

                );

            const pick =

                owned.find(

                    account =>

                        account.openingSource ===

                            "asset" &&

                        this.mirrorKindOfRecord(

                            account

                        ) === "investment"

                ) ||

                owned.find(

                    account =>

                        this.mirrorKindOfRecord(

                            account

                        ) === "investment"

                );

            if (!pick) {

                return lineAccountId;

            }

            if (!lineAccountId) {

                return String(pick.id);

            }

            // The trade's member is authoritative

            // for investment settlement: a buy made

            // in Hu's name settles in Hu's own

            // Investment account even if another

            // member's account was picked by

            // mistake.

            const lineAccount =

                AccountRepository.findById(

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

                !this.sameMemberId(lineOwner, memberId)

            ) {

                return String(pick.id);

            }

            return lineAccountId;

        } catch (resolveError) {

            return "";

        }

    },

    findMirrorAsset(account) {

        try {

            const kind =

                this.mirrorKindOfRecord(account);

            if (!kind) {

                return null;

            }

            const owner =

                account.memberId ||

                account.ownerId ||

                "";

            return (

                AssetRepository.findAll() ||

                []

            ).find(

                asset =>

                    this.mirrorKindOfRecord(asset) ===

                        kind &&

                    (

                        String(

                            asset.memberId ||

                            asset.ownerId ||

                            ""

                        ) === String(owner) ||

                        this.sameMemberId(

                            asset.memberId ||

                                asset.ownerId ||

                                "",

                            owner

                        )

                    )

            ) || null;

        } catch (lookupError) {

            return null;

        }

    },

    syncAssetMirror(account) {

        const asset =

            this.findMirrorAsset(account);

        if (!asset) {

            return;

        }

        if (

            Number(asset.currentValue || 0) !==

                Number(account.balance || 0)

        ) {

            asset.currentValue =

                Number(account.balance || 0);

            AssetRepository.save(asset);

        }

        // Keep the mirrored-value watermark in

        // sync with every mirror write. Otherwise

        // the next calibration mistakes a

        // mirror-driven value change for a manual

        // asset edit and absorbs live trade

        // effects into the opening anchor, which

        // pins the balance and can drop trades

        // that have no transaction left.

        const mirroredValue =

            Number(account.balance || 0);

        if (

            Number(account.mirrorAssetValue || 0) !==

                mirroredValue ||

            String(account.mirrorAssetUpdatedAt || "") !==

                String(asset.updatedAt || "")

        ) {

            account.mirrorAssetValue = mirroredValue;

            account.mirrorAssetUpdatedAt =

                asset.updatedAt || "";

            try {

                AccountRepository.save(account);

            } catch (watermarkError) {

            }

        }

    },

    applyTransaction(

        transaction

    ) {

        if (

            !transaction ||

            !Array.isArray(

                transaction.lines

            )

        ) {

            return;

        }

        if (

            transaction.id &&

            this.appliedTransactionIds

                .has(

                    transaction.id

                )

        ) {

            return;

        }

        if (

            transaction.id

        ) {

            this.appliedTransactionIds

                .add(

                    transaction.id

                );

        }

        const deltas =

            new Map();

        transaction.lines.forEach(

            line => {

                if (

                    !line ||

                    !line.cashEffect ||

                    !line.accountId

                ) {

                    return;

                }

                const amount =

                    Number(

                        line.amount

                    );

                if (

                    !Number.isFinite(

                        amount

                    ) ||

                    amount === 0

                ) {

                    return;

                }

                let delta =

                    0;

                if (

                    line.direction ===

                    "IN"

                ) {

                    delta =

                        amount;

                }

                if (

                    line.direction ===

                    "OUT"

                ) {

                    delta =

                        -amount;

                }

                if (

                    delta === 0

                ) {

                    return;

                }

                deltas.set(

                    line.accountId,

                    (

                        deltas.get(

                            line.accountId

                        ) ||

                        0

                    ) +

                    delta

                );

            }

        );

        if (

            transaction.type ===

                "INVESTMENT_BUY" ||

            transaction.type ===

                "INVESTMENT_SELL"

        ) {

            const cashLine =

                (

                    transaction.lines || []

                ).find(

                    line =>

                        line &&

                        line.cashEffect

                );

            if (cashLine) {

                const target =

                    this.resolveInvestmentSettleAccount(

                        transaction

                    );

                const amt =

                    Number(cashLine.amount);

                if (

                    target &&

                    target !==

                        String(cashLine.accountId || "") &&

                    Number.isFinite(amt) &&

                    amt !== 0

                ) {

                    deltas.clear();

                    deltas.set(

                        target,

                        cashLine.direction === "IN"

                            ? amt

                            : -amt

                    );

                }

            }

        }

        deltas.forEach(

            (delta, accountId) => {

                try {

                    const account =

                        AccountRepository

                            .findById(

                                accountId

                            );

                    if (

                        !account

                    ) {

                        return;

                    }

                    account.balance =

                        Number(

                            account.balance ||

                            0

                        ) +

                        delta;

                    AccountRepository

                        .save(

                            account

                        );

                    // A mirrored account IS an asset

                    // record (deposit / Checking from

                    // the Asset Center): the same

                    // money in two places, so move the

                    // asset value by the same step.

                    if (

                        account.openingSource ===

                            "asset"

                    ) {

                        try {

                            this.syncAssetMirror(

                                account

                            );

                        } catch (mirrorWriteError) {

                        }

                    }

                } catch (balanceError) {

                    console.warn(

                        "Account balance not updated:",

                        balanceError.message

                    );

                }

            }

        );

    }

};

export default AccountBalanceIntegration;
