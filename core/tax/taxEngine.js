/*

Family Wealth AI OS

Tax Engine

*/

const TaxEngine = {

    records:[],

    add(

        type,

        amount,

        data={}

    ){

        const record = {

            type,

            amount,

            data,

            createdAt:

            new Date()

            .toISOString()

        };

        this.records.push(

            record

        );

        return record;

    },

    total(

        type

    ){

        return this.records

        .filter(

            item =>

            item.type === type

        )

        .reduce(

            (

                sum,

                item

            )=>

                sum +

                item.amount,

            0

        );

    },

    estimate(

        rate=0.2

    ){

        const taxable =

        this.records

        .reduce(

            (

                sum,

                item

            )=>

                sum +

                item.amount,

            0

        );

        return taxable * rate;

    },

    report(){

        return {

            totalIncome:

            this.total(

                "INCOME"

            ),

            capitalGain:

            this.total(

                "CAPITAL_GAIN"

            ),

            estimatedTax:

            this.estimate()

        };

    },

    list(){

        return this.records;

    },

    clear(){

        this.records=[];

    }

};

export default TaxEngine;
