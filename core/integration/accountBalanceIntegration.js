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

import InvestmentRepository from "../../modules/investment/repository/investmentRepository.js?v=20261008ae";

import AssetRepository from "../../modules/asset/repository/assetRepository.js?v=20261008ae";

const AccountBalanceIntegration = {

    initialized:

        false,

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

            const effects = new Map();

            const referenced = new Set();

            txs.forEach(

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

                        name: "同步账户",

                        accountType: "Cash",

                        type: "Cash",

                        balance:

                            effects.get(accountKey) ||

                            0,

                        openingBalance: 0,

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

            byId.forEach(

                (account, accountKey) => {

                    const effect =

                        effects.get(accountKey) ||

                        0;

                    const current =

                        Number(account.balance || 0);

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

        } catch (syncError) {

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
