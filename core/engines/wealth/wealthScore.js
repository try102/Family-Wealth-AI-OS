/*

Family Wealth AI OS

Wealth Score Model

*/

const WealthScore = {

    calculate({

        netWorth = 0,

        cashFlow = {},

        liquidityMonths = 0,

        allocation = {}

    }){

        let score = 0;

        /*

        1. 净资产评分

        */

        if(netWorth >= 1000000){

            score +=30;

        }

        else if(netWorth >=500000){

            score +=25;

        }

        else if(netWorth >=100000){

            score +=20;

        }

        else{

            score +=10;

        }

        /*

        2. 现金流评分

        */

        if(

            cashFlow.netCashFlow > 0

        ){

            score +=15;

        }

        if(

            cashFlow.savingsRate >=20

        ){

            score +=10;

        }

        else if(

            cashFlow.savingsRate >0

        ){

            score +=5;

        }

        /*

        3. 流动性评分

        */

        if(

            liquidityMonths >=12

        ){

            score +=20;

        }

        else if(

            liquidityMonths >=6

        ){

            score +=15;

        }

        else{

            score +=5;

        }

        /*

        4. 资产配置评分

        */

        const types =

        Object.keys(

            allocation

        ).length;

        if(types>=4){

            score +=15;

        }

        else if(types>=2){

            score +=10;

        }

        else{

            score +=5;

        }

        /*

        5. 风险控制

        */

        if(

            netWorth>0

        ){

            score +=10;

        }

        return score;

    }

};

export default WealthScore;
