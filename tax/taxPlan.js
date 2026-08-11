/*

Family Wealth AI OS V7.7

Tax Planning Model

税务规划数据模型

*/

class TaxPlan {

    constructor({

        id,

        name,

        taxYear,

        income = 0,

        deductions = 0,

        taxableIncome,

        estimatedTax = 0

    } = {}){

        // ==================================================

        // Identity

        // ==================================================

        this.id =

            id ??

            Date.now();

        this.name =

            name ??

            "Tax Plan";

        // ==================================================

        // Tax Year

        // ==================================================

        this.taxYear =

            Number(

                taxYear ??

                new Date()

                    .getFullYear()

            );

        // ==================================================

        // Income

        // ==================================================

        this.income =

            Number(

                income || 0

            );

        // ==================================================

        // Deductions

        // ==================================================

        this.deductions =

            Number(

                deductions || 0

            );

        // ==================================================

        // Taxable Income

        //

        // If taxableIncome is not supplied,

        // calculate it automatically.

        // ==================================================

        if(

            taxableIncome ===

            undefined ||

            taxableIncome ===

            null

        ){

            this.taxableIncome =

                Math.max(

                    this.income -

                    this.deductions,

                    0

                );

        }

        else{

            this.taxableIncome =

                Math.max(

                    Number(

                        taxableIncome ||

                        0

                    ),

                    0

                );

        }

        // ==================================================

        // Estimated Tax

        // ==================================================

        this.estimatedTax =

            Math.max(

                Number(

                    estimatedTax ||

                    0

                ),

                0

            );

        // ==================================================

        // Metadata

        // ==================================================

        this.createdAt =

            new Date()

                .toISOString();

        this.updatedAt =

            this.createdAt;

    }

    // ==================================================

    // Recalculate Taxable Income

    // ==================================================

    calculateTaxableIncome(){

        this.taxableIncome =

            Math.max(

                this.income -

                this.deductions,

                0

            );

        this.updatedAt =

            new Date()

                .toISOString();

        return this.taxableIncome;

    }

    // ==================================================

    // Update Plan

    // ==================================================

    update(data = {}){

        if(

            typeof data !==

            "object"

        ){

            return this;

        }

        if(

            data.name !==

            undefined

        ){

            this.name =

                data.name;

        }

        if(

            data.taxYear !==

            undefined

        ){

            this.taxYear =

                Number(

                    data.taxYear

                );

        }

        if(

            data.income !==

            undefined

        ){

            this.income =

                Number(

                    data.income ||

                    0

                );

        }

        if(

            data.deductions !==

            undefined

        ){

            this.deductions =

                Number(

                    data.deductions ||

                    0

                );

        }

        if(

            data.taxableIncome !==

            undefined

        ){

            this.taxableIncome =

                Math.max(

                    Number(

                        data.taxableIncome ||

                        0

                    ),

                    0

                );

        }

        else if(

            data.income !==

            undefined ||

            data.deductions !==

            undefined

        ){

            this.calculateTaxableIncome();

        }

        if(

            data.estimatedTax !==

            undefined

        ){

            this.estimatedTax =

                Math.max(

                    Number(

                        data.estimatedTax ||

                        0

                    ),

                    0

                );

        }

        this.updatedAt =

            new Date()

                .toISOString();

        return this;

    }

    // ==================================================

    // Get Effective Tax Rate

    // ==================================================

    effectiveTaxRate(){

        if(

            this.income <= 0

        ){

            return 0;

        }

        return (

            this.estimatedTax /

            this.income

        );

    }

    // ==================================================

    // Get Deduction Rate

    // ==================================================

    deductionRate(){

        if(

            this.income <= 0

        ){

            return 0;

        }

        return (

            this.deductions /

            this.income

        );

    }

    // ==================================================

    // Convert To Plain Object

    // ==================================================

    toJSON(){

        return {

            id:

                this.id,

            name:

                this.name,

            taxYear:

                this.taxYear,

            income:

                this.income,

            deductions:

                this.deductions,

            taxableIncome:

                this.taxableIncome,

            estimatedTax:

                this.estimatedTax,

            effectiveTaxRate:

                this.effectiveTaxRate(),

            deductionRate:

                this.deductionRate(),

            createdAt:

                this.createdAt,

            updatedAt:

                this.updatedAt

        };

    }

}

export default TaxPlan;
