/*

Family Wealth AI OS

Portfolio Engine

*/

const PortfolioEngine = {

    calculateTotalValue(

        positions

    ){

        return positions.reduce(

            (sum,position)=>

            sum +

            Number(

                position.marketValue || 0

            ),

            0

        );

    },

    calculateAllocation(

        positions

    ){

        const total =

        this.calculateTotalValue(

            positions

        );

        if(total===0){

            return {};

        }

        const allocation={};

        positions.forEach(

            position=>{

                const type =

                position.type ||

                "OTHER";

                if(!allocation[type]){

                    allocation[type]=0;

                }

                allocation[type]+=

                Number(

                    position.marketValue || 0

                );

            }

        );

        Object.keys(allocation)

        .forEach(

            key=>{

                allocation[key] = {

                    value:

                    allocation[key],

                    ratio:

                    Number(

                    (

                    allocation[key]

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

        return allocation;

    },

    calculateConcentration(

        positions

    ){

        const total =

        this.calculateTotalValue(

            positions

        );

        if(total===0){

            return [];

        }

        return positions.map(

            position=>({

                symbol:

                position.symbol,

                ratio:

                Number(

                (

                position.marketValue

                /

                total

                *

                100

                )

                .toFixed(2)

                )

            })

        );

    }

};

export default PortfolioEngine;
