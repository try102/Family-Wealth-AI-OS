/*

Family Wealth AI OS

Retirement Engine

*/

const RetirementEngine = {

    data:{},

    set(

        key,

        value

    ){

        this.data[key] = value;

        return value;

    },

    calculateNeed(){

        const annualExpense =

        this.data.annualExpense || 0;

        const years =

        this.data.years || 0;

        return (

            annualExpense *

            years

        );

    },

    calculateGap(){

        const need =

        this.calculateNeed();

        const assets =

        this.data.assets || 0;

        return (

            need -

            assets

        );

    },

    report(){

        return {

            annualExpense:

            this.data.annualExpense || 0,

            years:

            this.data.years || 0,

            required:

            this.calculateNeed(),

            assets:

            this.data.assets || 0,

            gap:

            this.calculateGap()

        };

    },

    clear(){

        this.data={};

    }

};

export default RetirementEngine;
