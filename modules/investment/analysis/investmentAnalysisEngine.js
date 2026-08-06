/*

Family Wealth AI OS

Investment Analysis Engine

*/

const InvestmentAnalysisEngine = {

    calculateGainLoss(

        position

    ){

        return (

            Number(

                position.marketValue || 0

            )

            -

            Number(

                position.costBasis || 0

            )

        );

    },

    calculateReturnRate(

        position

    ){

        const cost =

        Number(

            position.costBasis || 0

        );

        if(cost===0){

            return 0;

        }

        return Number(

            (

            (

            position.marketValue

            -

            cost

            )

            /

            cost

            *

            100

            )

            .toFixed(2)

        );

    },

    portfolioPerformance(

        positions

    ){

        let cost = 0;

        let value = 0;

        positions.forEach(

            position=>{

                cost +=

                Number(

                    position.costBasis || 0

                );

                value +=

                Number(

                    position.marketValue || 0

                );

            }

        );

        const gain =

        value -

        cost;

        return {

            cost,

            value,

            gain,

            returnRate:

            cost===0

            ?

            0

            :

            Number(

            (

            gain

            /

            cost

            *

            100

            )

            .toFixed(2)

            )

        };

    }

};

export default InvestmentAnalysisEngine;
