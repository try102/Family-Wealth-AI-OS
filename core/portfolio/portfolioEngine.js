/*

Family Wealth AI OS

Portfolio Engine

*/

const PortfolioEngine = {

    holdings:[],

    add(

        asset

    ){

        this.holdings.push(

            asset

        );

        return asset;

    },

    totalValue(){

        return this.holdings

        .reduce(

            (

                sum,

                item

            )=>

                sum +

                item.value,

            0

        );

    },

    allocation(){

        const total =

        this.totalValue();

        if(

            total ===0

        ){

            return {};

        }

        const result={};

        this.holdings

        .forEach(

            item=>{

                if(

                    !result[item.type]

                ){

                    result[item.type]=0;

                }

                result[item.type]

                +=

                item.value;

            }

        );

        Object.keys(

            result

        )

        .forEach(

            key=>{

                result[key] =

                (

                    result[key]

                    /

                    total

                )

                *

                100;

            }

        );

        return result;

    },

    list(){

        return this.holdings;

    },

    clear(){

        this.holdings=[];

    }

};

export default PortfolioEngine;
