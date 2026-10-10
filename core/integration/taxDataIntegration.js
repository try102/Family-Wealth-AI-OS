/*

Family Wealth AI OS V7

Tax Data Integration

税务数据汇总：Tax 从基础数据层取数，替代手工重复输入。

- 工资 / 业务收入：Income 模块中 taxable 收入记录的 amount 合计
  （Income 记录以 annual 为口径，无可靠的单笔年份，故汇总全部记录）

- 股息 / 利息：Transaction 中 DIVIDEND / INTEREST 交易的现金流入行
  （按交易年份过滤）

- 房贷利息（已付）：LOAN_PAYMENT 交易
  businessDetails.liability.interestPortion（按交易年份过滤）

- 资本利得：ASSET_SALE 交易 businessDetails.asset.capitalGain
  （按交易年份过滤；长期 / 短期区分需要持有期数据，暂合并统计）

- 已缴税款：TAX_PAYMENT 交易的现金流出行（按交易年份过滤）

本文件只读汇总，不修改 Tax V7.7 引擎。

*/

import IncomeRepository from "../../modules/income/repository/incomeRepository.js?v=20261008ae";

import TransactionRepository from "../../transaction/transactionRepository.js?v=20261008ae";

import InvestmentRepository from "../../modules/investment/repository/investmentRepository.js?v=20261008ae";

// FIFO replay of all trades: for each SELL in the

// target year, match sold shares against the oldest

// open lots and split the realized gain by holding

// period (> 1 year = long-term). Display-only

// classification; the engine totals are unchanged.

function realizedGainSplit(targetYear) {

    let longTerm = 0;

    let shortTerm = 0;

    try {

        const trades =

            (

                InvestmentRepository.getTrades() || []

            ).slice().sort(

                (a, b) =>

                    String(a.tradeDate || a.date || "").localeCompare(

                        String(b.tradeDate || b.date || "")

                    )

            );

        const lotsBySymbol = {};

        trades.forEach(trade => {

            const symbol =

                String(trade.symbol || "").toUpperCase();

            if (!symbol) {

                return;

            }

            const quantity =

                Math.abs(Number(trade.quantity || 0));

            const amount =

                Math.abs(Number(trade.amount || 0));

            const when =

                trade.tradeDate || trade.date || "";

            if (!quantity) {

                return;

            }

            const unit =

                amount / quantity;

            const action =

                String(trade.action || "").toUpperCase();

            if (action === "BUY") {

                (

                    lotsBySymbol[symbol] =

                        lotsBySymbol[symbol] || []

                ).push({

                    quantity,

                    unitCost: unit,

                    date: when

                });

                return;

            }

            if (action !== "SELL") {

                return;

            }

            const inYear =

                Number(String(when).slice(0, 4)) ===

                targetYear;

            let remaining = quantity;

            const lots =

                lotsBySymbol[symbol] || [];

            while (remaining > 0 && lots.length) {

                const lot = lots[0];

                const take =

                    Math.min(remaining, lot.quantity);

                const gain =

                    take * (unit - lot.unitCost);

                if (inYear) {

                    const heldMs =

                        new Date(when).getTime() -

                        new Date(lot.date).getTime();

                    if (

                        Number.isFinite(heldMs) &&

                        heldMs > 365 * 24 * 3600 * 1000

                    ) {

                        longTerm += gain;

                    } else {

                        shortTerm += gain;

                    }

                }

                lot.quantity -= take;

                remaining -= take;

                if (lot.quantity <= 0) {

                    lots.shift();

                }

            }

        });

    } catch (splitError) {

    }

    return { longTerm, shortTerm };

}

function transactionYear(transaction) {

    const year =

        Number(

            String(

                transaction.date || ""

            ).slice(0, 4)

        );

    return (

        Number.isFinite(year) &&

        year > 1900

    )

        ? year

        : null;

}

function cashAmount(transaction, direction) {

    return (transaction.lines || [])

        .filter(line =>

            line.cashEffect &&

            line.direction === direction

        )

        .reduce(

            (sum, line) =>

                sum +

                Number(line.amount || 0),

            0

        );

}

const TaxDataIntegration = {

    /*

     * Aggregate the tax-relevant figures

     * from the base data layer.

     */

    getTaxDataSummary(

        year = new Date().getFullYear()

    ) {

        const targetYear =

            Number(year);

        let wageIncome = 0;

        try {

            (

                IncomeRepository.findAll() ||

                []

            ).forEach(income => {

                if (

                    income.taxable === false

                ) {

                    return;

                }

                // 自动生成的投资收入镜像（交易产生的资本

                // 利得 / 股息 / 利息记录）已在下方按交易

                // 单独统计，此处再计会重复计算，故排除。

                if (

                    income.autoSource

                ) {

                    return;

                }

                wageIncome +=

                    Number(

                        income.value ??

                        income.amount ??

                        0

                    );

            });

        } catch (incomeError) {

            console.warn(

                "Tax data: Income module unavailable:",

                incomeError.message

            );

        }

        let dividendIncome = 0;

        let interestIncome = 0;

        let mortgageInterestPaid = 0;

        let capitalGains = 0;

        let investmentGains = 0;

        let taxPaid = 0;

        try {

            (

                TransactionRepository

                    .getTransactions() ||

                []

            ).forEach(transaction => {

                if (

                    transactionYear(

                        transaction

                    ) !== targetYear

                ) {

                    return;

                }

                if (

                    transaction.type ===

                    "DIVIDEND"

                ) {

                    dividendIncome +=

                        cashAmount(

                            transaction,

                            "IN"

                        );

                }

                if (

                    transaction.type ===

                    "INTEREST"

                ) {

                    interestIncome +=

                        cashAmount(

                            transaction,

                            "IN"

                        );

                }

                if (

                    transaction.type ===

                    "LOAN_PAYMENT"

                ) {

                    mortgageInterestPaid +=

                        Number(

                            transaction

                                .businessDetails

                                ?.liability

                                ?.interestPortion ||

                            0

                        );

                }

                if (

                    transaction.type ===

                    "ASSET_SALE"

                ) {

                    capitalGains +=

                        Number(

                            transaction

                                .businessDetails

                                ?.asset

                                ?.capitalGain ||

                            0

                        );

                }

                if (

                    transaction.type ===

                    "INVESTMENT_SELL"

                ) {

                    const gain =

                        Number(

                            transaction

                                .businessDetails

                                ?.investment

                                ?.capitalGain ||

                            0

                        );

                    capitalGains +=

                        gain;

                    investmentGains +=

                        gain;

                }

                if (

                    transaction.type ===

                    "TAX_PAYMENT"

                ) {

                    taxPaid +=

                        cashAmount(

                            transaction,

                            "OUT"

                        );

                }

            });

        } catch (transactionError) {

            console.warn(

                "Tax data: Transaction store unavailable:",

                transactionError.message

            );

        }

        const totalIncome =

            wageIncome +

            dividendIncome +

            interestIncome +

            capitalGains;

        const gainSplit =

            realizedGainSplit(targetYear);

        // Scale the FIFO replay split so long-term +

        // short-term always equals the investment-sell

        // gains the transactions recorded; the residual

        // (asset sales and anything unclassified) stays

        // in capitalGainsOther and the three lines

        // always add up to capitalGains.

        const replayTotal =

            gainSplit.longTerm + gainSplit.shortTerm;

        const splitScale =

            replayTotal !== 0

                ? investmentGains / replayTotal

                : 0;

        const gainsLongTerm =

            gainSplit.longTerm * splitScale;

        const gainsShortTerm =

            gainSplit.shortTerm * splitScale;

        return {

            year:

                targetYear,

            wageIncome,

            dividendIncome,

            interestIncome,

            mortgageInterestPaid,

            capitalGains,

            capitalGainsLongTerm:

                gainsLongTerm,

            capitalGainsShortTerm:

                gainsShortTerm,

            capitalGainsOther:

                capitalGains -

                gainsLongTerm -

                gainsShortTerm,

            taxPaid,

            totalIncome

        };

    }

};

export default TaxDataIntegration;
