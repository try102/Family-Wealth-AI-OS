/*

Family Wealth AI OS

Risk Engine

*/

const RiskEngine = {

    factors:{},

    register(

        name,

        score

    ){

        this.factors[name] = score;

        return score;

    },

    totalScore(){

        return Object.values(

            this.factors

        )

        .reduce(

            (

                sum,

                value

            )=>

                sum + value,

            0

        );

    },

    level(){

        const score =

        this.totalScore();

        if(

            score >=70

        ){

            return "HIGH";

        }

        if(

            score >=40

        ){

            return "MEDIUM";

        }

        return "LOW";

    },

    report(){

        return {

            score:

            this.totalScore(),

            level:

            this.level(),

            factors:

            this.factors

        };

    },

    clear(){

        this.factors={};

    }

};

export default RiskEngine;
