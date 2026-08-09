/*

Family Wealth AI OS

Wealth Calculator V7

统一资产 / 负债金额字段

*/

const WealthCalculator = {

    // ==================================================

    // Net Worth

    // ==================================================

    calculateNetWorth(

        assets,

        liabilities

    ){

        const totalAssets =

            assets.reduce(

                (sum, asset) => {

                    const value =

                        Number(

                            asset.currentValue ??

                            asset.value ??

                            0

                        );

                    return sum + value;

                },

                0

            );

        const totalLiabilities =

            liabilities.reduce(

                (sum, liability) => {

                    const value =

                        Number(

                            liability.currentBalance ??

                            liability.value ??

                            0

                        );

                    return sum + value;

                },

                0

            );

        return {

            totalAssets,

            totalLiabilities,

            netWorth:

                totalAssets -

                totalLiabilities

        };

    },

    // ==================================================

    // Asset Allocation

    // ==================================================

    calculateAssetAllocation(

        assets

    ){

        const total =

            assets.reduce(

                (sum, asset) => {

                    const value =

                        Number(

                            asset.currentValue ??

                            asset.value ??

                            0

                        );

                    return sum + value;

                },

                0

            );

        if(total === 0){

            return {};

        }

        const result = {};

        assets.forEach(

            asset => {

                const type =

                    asset.category ||

                    "OTHER";

                const value =

                    Number(

                        asset.currentValue ??

                        asset.value ??

                        0

                    );

                if(!result[type]){

                    result[type] = 0;

                }

                result[type] += value;

            }

        );

        Object.keys(

            result

        ).forEach(

            key => {

                result[key] = {

                    value:

                        result[key],

                    ratio:

                        Number(

                            (

                                result[key] /

                                total *

                                100

                            ).toFixed(2)

                        )

                };

            }

        );

        return result;

    }

};

export default WealthCalculator;
