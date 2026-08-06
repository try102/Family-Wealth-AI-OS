/*

Family Wealth AI OS

Investment Decision Engine

*/

const InvestmentDecisionEngine = {

    rebalanceSuggestion(

        currentAllocation,

        targetAllocation

    ){

        const suggestions=[];

        Object.keys(

            targetAllocation

        )

        .forEach(

            type=>{

                const current =

                currentAllocation[type]

                ?

                currentAllocation[type].ratio

                :

                0;

                const target =

                targetAllocation[type];

                const difference =

                current -

                target;

                if(

                    difference >10

                ){

                    suggestions.push({

                        type,

                        action:

                        "REDUCE",

                        difference

                    });

                }

                if(

                    difference < -10

                ){

                    suggestions.push({

                        type,

                        action:

                        "INCREASE",

                        difference:

                        Math.abs(

                            difference

                        )

                    });

                }

            }

        );

        return suggestions;

    },

    concentrationAdvice(

        riskWarnings

    ){

        return riskWarnings.map(

            item=>({

                symbol:

                item.symbol,

                advice:

                "Review concentration risk"

            })

        );

    },

    generateReport(

        data

    ){

        return {

            allocationAdvice:

            data.rebalance || [],

            riskAdvice:

            data.risk || [],

            summary:

            "Investment decision analysis generated"

        };

    }

};

export default InvestmentDecisionEngine;
