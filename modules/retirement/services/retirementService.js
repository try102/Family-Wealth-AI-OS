/*

Family Wealth AI OS V7

Retirement Service

退休测算：

当前净资产从基础数据层汇总（账户 + 投资 + 资产 − 负债），

退休需求与缺口由 core RetirementEngine 计算（need = 年支出 × 退休年数），

退休时点资产按当前净资产与每年储蓄的复利终值投影。

*/

import RetirementRepository from "../repository/retirementRepository.js?v=20261008ae";

import RetirementEngine from "../../../core/retirement/retirementEngine.js?v=20261008ae";

import AccountAPI from "../../account/api/accountAPI.js?v=20261008ae";

import AssetAPI from "../../asset/api/assetAPI.js?v=20261008ae";

import InvestmentAPI from "../../investment/api/investmentAPI.js?v=20261008ag";

import LiabilityAPI from "../../liability/api/liabilityAPI.js?v=20261008ae";

import ExpenseRepository from "../../expense/repository/expenseRepository.js?v=20261008ae";

function safeTotal(fn, fallback = 0) {

    try {

        const value =

            fn();

        return Number.isFinite(

            Number(value)

        )

            ? Number(value)

            : fallback;

    } catch (error) {

        return fallback;

    }

}

const RetirementService = {

    getProfile(){

        return RetirementRepository

            .getProfile();

    },

    saveProfile(

        profile

    ){

        return RetirementRepository

            .saveProfile(

                profile

            );

    },

    /*

     * 最近 12 个月的支出合计（Expense 模块带日期的记录），

     * 用作退休年支出的默认值参考。

     */

    getRecentAnnualExpense(){

        try {

            const now =

                Date.now();

            const yearMs =

                365 *

                24 *

                3600 *

                1000;

            return (

                ExpenseRepository

                    .findAll() ||

                []

            ).reduce(

                (sum, expense) => {

                    const time =

                        Date.parse(

                            expense.date || ""

                        );

                    if (

                        !Number.isFinite(time) ||

                        now - time > yearMs ||

                        time > now

                    ) {

                        return sum;

                    }

                    return (

                        sum +

                        Number(

                            expense.amount || 0

                        )

                    );

                },

                0

            );

        } catch (error) {

            return 0;

        }

    },

    getProjection(){

        const profile =

            this.getProfile();

        const accountsTotal =

            safeTotal(() =>

                (

                    AccountAPI.getAll() ||

                    []

                ).reduce(

                    (sum, account) =>

                        sum +

                        Number(

                            account.balance || 0

                        ),

                    0

                )

            );

        const investmentsTotal =

            safeTotal(() =>

                InvestmentAPI

                    .getPortfolioSummary()

                    ?.totalValue

            );

        const assetsTotal =

            safeTotal(() =>

                AssetAPI.getTotalValue()

            );

        const liabilitiesTotal =

            safeTotal(() =>

                LiabilityAPI

                    .getSummary()

                    .totalLiability

            );

        const netWorth =

            accountsTotal +

            investmentsTotal +

            assetsTotal -

            liabilitiesTotal;

        const recentAnnualExpense =

            this.getRecentAnnualExpense();

        const yearsToRetirement =

            Math.max(

                profile.retirementAge -

                profile.currentAge,

                0

            );

        const yearsInRetirement =

            Math.max(

                profile.lifeExpectancy -

                profile.retirementAge,

                0

            );

        const annualExpense =

            profile.annualExpense > 0

            ? profile.annualExpense

            : recentAnnualExpense;

        /*

         * 退休时点资产投影：

         * 当前净资产复利 + 每年储蓄的年金终值。

         */

        const rate =

            Number(

                profile.expectedReturn || 0

            ) /

            100;

        let projectedAssets;

        if (

            rate > 0 &&

            yearsToRetirement > 0

        ) {

            const factor =

                Math.pow(

                    1 + rate,

                    yearsToRetirement

                );

            projectedAssets =

                netWorth *

                factor +

                profile.annualSavings *

                (

                    (

                        factor - 1

                    ) /

                    rate

                );

        } else {

            projectedAssets =

                netWorth +

                profile.annualSavings *

                yearsToRetirement;

        }

        /*

         * 需求与缺口：现有 RetirementEngine。

         */

        RetirementEngine.set(

            "annualExpense",

            annualExpense

        );

        RetirementEngine.set(

            "years",

            yearsInRetirement

        );

        RetirementEngine.set(

            "assets",

            projectedAssets

        );

        const report =

            RetirementEngine.report();

        RetirementEngine.clear();

        const fundedRatio =

            report.required > 0

            ? projectedAssets /

                report.required

            : 0;

        return {

            profile,

            accountsTotal,

            investmentsTotal,

            assetsTotal,

            liabilitiesTotal,

            netWorth,

            recentAnnualExpense,

            annualExpenseUsed:

                annualExpense,

            yearsToRetirement,

            yearsInRetirement,

            projectedAssets,

            required:

                report.required,

            gap:

                report.gap,

            fundedRatio

        };

    }

};

export default RetirementService;
