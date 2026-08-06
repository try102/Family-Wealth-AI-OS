/*

Family Wealth AI OS

Estate Engine

*/

const EstateEngine = {

    assets:[],

    beneficiaries:[],

    addAsset(

        asset

    ){

        this.assets.push(

            asset

        );

        return asset;

    },

    addBeneficiary(

        person

    ){

        this.beneficiaries.push(

            person

        );

        return person;

    },

    totalValue(){

        return this.assets

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

    distribution(){

        const total =

        this.totalValue();

        return this.beneficiaries

        .map(

            person=>({

                name:

                person.name,

                share:

                total *

                person.percent

                /

                100

            })

        );

    },

    report(){

        return {

            estateValue:

            this.totalValue(),

            beneficiaries:

            this.distribution()

        };

    },

    clear(){

        this.assets=[];

        this.beneficiaries=[];

    }

};

export default EstateEngine;
