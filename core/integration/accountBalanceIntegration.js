/*

Family Wealth AI OS V7

Account Balance Integration

现金资产随交易自动变动：

每笔新交易（TRANSACTION_CREATED）中带 cashEffect 的分录，

按方向调整对应账户余额（IN 增加、OUT 减少）。

只处理实时新建的交易；启动同步不会重复扣加历史交易。

*/

import EventBus from "../events/eventBus.js";

import EventTypes from "../events/eventTypes.js";

import AccountRepository from "../../modules/account/repository/accountRepository.js";

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
