/*

Family Wealth AI OS

Investment Risk Engine

*/

const RiskEngine = {

    concentrationRisk(

        positions

    ){

        const warnings=[];

        positions.forEach(

            position=>{

                const ratio =

                Number(

                    position.allocationRatio || 0

                );

                if(

                    ratio >=30

                ){

                    warnings.push({

                        symbol:

                        position.symbol,

                        ratio,

                        level:

                        "HIGH"

                    });

                }

            }

        );

        return warnings;

    },

    assetTypeRisk(

        allocation

    ){

        let stockRatio = 0;

        Object.keys(allocation)

        .forEach(

            key=>{

                if(

                key==="STOCK"

                ||

                key==="ETF"

                ){

                    stockRatio +=

                    allocation[key].ratio;

                }

            }

        );

        if(

            stockRatio >=80

        ){

            return {

                level:"HIGH",

                message:

                "Equity concentration is high"

            };

        }

        if(

            stockRatio >=60

        ){

            return {

                level:"MEDIUM",

                message:

                "Moderate equity exposure"

            };

        }

        return {

            level:"LOW",

            message:

            "Balanced allocation"

        };

    },

    calculateRiskScore(

        riskData

    ){

        let score = 100;

        if(

            riskData.highConcentration

        ){

            score -=30;

        }

        if(

            riskData.highEquity

        ){

            score -=20;

        }

        return Math.max(

            score,

            0

        );

    }

};

export default RiskEngine;
