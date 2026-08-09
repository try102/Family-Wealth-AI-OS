/*

Family Wealth AI OS

Asset Analysis Engine

*/

const AssetAnalysisEngine = {

    // 总资产价值

    calculateTotalValue(

        assets

    ){

        return assets.reduce(

            (total, asset) =>

            total +

            Number(

                asset.currentValue || 0

            ),

            0

        );

    },

    // 按类别分析

    allocationAnalysis(

        assets

    ){

        const total =

        this.calculateTotalValue(

            assets

        );

        if(total === 0){

            return {};

        }

        const result = {};

        assets.forEach(

            asset => {

                const category =

                    asset.category ||

                    "Other";

                if(!result[category]){

                    result[category] = 0;

                }

                result[category] +=

                    Number(

                        asset.currentValue || 0

                    );

            }

        );

        Object.keys(result)

        .forEach(

            key => {

                result[key] = {

                    value:

                        result[key],

                    ratio:

                        Number(

                            (

                                result[key]

                                /

                                total

                                *

                                100

                            )

                            .toFixed(2)

                        )

                };

            }

        );

        return result;

    },

    // 流动性分析

    liquidityAnalysis(

        assets

    ){

        let liquid = 0;

        let total =

            this.calculateTotalValue(

                assets

            );

        assets.forEach(

            asset => {

                if(

                    asset.liquidity ===

                    "High"

                ){

                    liquid +=

                        Number(

                            asset.currentValue || 0

                        );

                }

            }

        );

        return {

            liquidValue:

                liquid,

            liquidRatio:

                total

                ?

                Number(

                    (

                        liquid

                        /

                        total

                        *

                        100

                    )

                    .toFixed(2)

                )

                :

                0

        };

    }

};

export default AssetAnalysisEngine;
