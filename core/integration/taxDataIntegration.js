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

import IncomeRepository from "../../modules/income/repository/incomeRepository.js";

import TransactionRepository from "../../transaction/transactionRepository.js";

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

        return {

            year:

                targetYear,

            wageIncome,

            dividendIncome,

            interestIncome,

            mortgageInterestPaid,

            capitalGains,

            taxPaid,

            totalIncome

        };

    }

};

export default TaxDataIntegration;
