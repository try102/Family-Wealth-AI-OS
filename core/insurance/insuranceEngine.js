/*

Family Wealth AI OS

Insurance Engine

*/

const InsuranceEngine = {

    policies:[],

    needs:{},

    addPolicy(

        policy

    ){

        this.policies.push(

            policy

        );

        return policy;

    },

    setNeed(

        type,

        amount

    ){

        this.needs[type]=amount;

        return amount;

    },

    totalCoverage(){

        return this.policies

        .reduce(

            (

                sum,

                item

            )=>

                sum +

                item.coverage,

            0

        );

    },

    gap(

        type

    ){

        const need =

        this.needs[type]

        ||0;

        return (

            need -

            this.totalCoverage()

        );

    },

    report(){

        return {

            coverage:

            this.totalCoverage(),

            needs:

            this.needs,

            policies:

            this.policies

        };

    },

    clear(){

        this.policies=[];

        this.needs={};

    }

};

export default InsuranceEngine;
