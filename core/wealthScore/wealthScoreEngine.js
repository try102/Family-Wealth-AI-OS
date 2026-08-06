/*

Family Wealth AI OS

Wealth Score Engine

*/

const WealthScoreEngine = {

    factors:{},

    set(

        name,

        score

    ){

        this.factors[name]=score;

        return score;

    },

    total(){

        const values =

        Object.values(

            this.factors

        );

        if(

            values.length===0

        ){

            return 0;

        }

        const sum =

        values.reduce(

            (

                a,

                b

            )=>

                a+b,

            0

        );

        return Math.round(

            sum /

            values.length

        );

    },

    level(){

        const score =

        this.total();

        if(

            score >=80

        ){

            return "EXCELLENT";

        }

        if(

            score >=60

        ){

            return "GOOD";

        }

        if(

            score >=40

        ){

            return "FAIR";

        }

        return "POOR";

    },

    report(){

        return {

            score:

            this.total(),

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

export default WealthScoreEngine;
