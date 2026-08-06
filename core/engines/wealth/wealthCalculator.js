/*

Family Wealth AI OS

Wealth Calculator

*/

const WealthCalculator = {

    calculateNetWorth(

        assets,

        liabilities

    ){

        const totalAssets =

        assets.reduce(

            (sum,a)=>

            sum +

            Number(

                a.value || 0

            ),

            0

        );

        const totalLiabilities =

        liabilities.reduce(

            (sum,l)=>

            sum +

            Number(

                l.value || 0

            ),

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

    calculateAssetAllocation(

        assets

    ){

        const total =

        assets.reduce(

            (sum,a)=>

            sum +

            Number(

                a.value || 0

            ),

            0

        );

        if(total===0){

            return {};

        }

        const result={};

        assets.forEach(

            asset=>{

                const type =

                asset.category ||

                "OTHER";

                if(!result[type]){

                    result[type]=0;

                }

                result[type]+=

                Number(

                    asset.value || 0

                );

            }

        );

        Object.keys(result)

        .forEach(

            key=>{

                result[key]={

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

    }

};

export default WealthCalculator;
