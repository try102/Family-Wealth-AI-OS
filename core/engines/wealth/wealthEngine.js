/*

Family Wealth AI OS

Wealth Engine

*/

import WealthCalculator from "./wealthCalculator.js";

import WealthScore from "./wealthScore.js";

const WealthEngine = {

    analyze(

        assets,

        liabilities,

        cashFlowData,

        liquidityMonths = 0

    ){

        const wealth =

        WealthCalculator

        .calculateNetWorth(

            assets,

            liabilities

        );

        const allocation =

        WealthCalculator

        .calculateAssetAllocation(

            assets

        );

        const score =

        WealthScore.calculate({

            netWorth:

            wealth.netWorth,

            cashFlow:

            cashFlowData.netCashFlow || 0,

            liquidityMonths,

            assetTypes:

            Object.keys(

                allocation

            ).length,

            debtRatio:

            wealth.totalAssets === 0

            ?

            100

            :

            (

            wealth.totalLiabilities

            /

            wealth.totalAssets

            *

            100

            )

        });

        return {

            totalAssets:

            wealth.totalAssets,

            totalLiabilities:

            wealth.totalLiabilities,

            netWorth:

            wealth.netWorth,

            allocation,

            cashFlow:

            cashFlowData,

            liquidityMonths,

            wealthScore:

            score

        };

    }

};

export default WealthEngine;
