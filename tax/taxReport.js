/*

 

Family Wealth AI OS V7.7

 

Tax Report Model

 

税务报告数据模型

 

*/

class TaxReport {

    constructor({

        id,

        taxYear,

        totalIncome = 0,

        totalDeductions = 0,

        taxableIncome = 0,

        estimatedTax = 0,

        strategies = [],

        createdAt = null,

        updatedAt = null

    } = {}){

        // ==================================================

        // Identity

        // ==================================================

        this.id =

            id ??

            Date.now();

        this.taxYear =

            Number(

                taxYear || 0

            );

        // ==================================================

        // Income

        // ==================================================

        this.totalIncome =

            Number(

                totalIncome || 0

            );

        // ==================================================

        // Deductions

        // ==================================================

        this.totalDeductions =

            Number(

                totalDeductions || 0

            );

        // ==================================================

        // Taxable Income

        // ==================================================

        this.taxableIncome =

            Number(

                taxableIncome || 0

            );

        // ==================================================

        // Estimated Tax

        // ==================================================

        this.estimatedTax =

            Number(

                estimatedTax || 0

            );

        // ==================================================

        // Strategies

        // ==================================================

        this.strategies =

            Array.isArray(

                strategies

            )

                ?

                strategies

                :

                [];

        // ==================================================

        // Derived Values

        // ==================================================

        this.deductionRatio =

            this.totalIncome > 0

                ?

                this.totalDeductions /

                this.totalIncome

                :

                0;

        this.effectiveTaxRate =

            this.totalIncome > 0

                ?

                this.estimatedTax /

                this.totalIncome

                :

                0;

        this.taxableIncomeRatio =

            this.totalIncome > 0

                ?

                this.taxableIncome /

                this.totalIncome

                :

                0;

        // ==================================================

        // Metadata

        // ==================================================

        this.createdAt =

            createdAt ??

            new Date()

                .toISOString();

        this.updatedAt =

            updatedAt ??

            new Date()

                .toISOString();

    }

    // ==================================================

    // Update

    // ==================================================

    update(

        data = {}

    ){

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

            data.totalIncome !==

            undefined

        ){

            this.totalIncome =

                Number(

                    data.totalIncome

                );

        }

        if(

            data.totalDeductions !==

            undefined

        ){

            this.totalDeductions =

                Number(

                    data.totalDeductions

                );

        }

        if(

            data.taxableIncome !==

            undefined

        ){

            this.taxableIncome =

                Number(

                    data.taxableIncome

                );

        }

        if(

            data.estimatedTax !==

            undefined

        ){

            this.estimatedTax =

                Number(

                    data.estimatedTax

                );

        }

        if(

            data.strategies !==

            undefined

        ){

            this.strategies =

                Array.isArray(

                    data.strategies

                )

                    ?

                    data.strategies

                    :

                    [];

        }

        this.recalculate();

        this.updatedAt =

            new Date()

                .toISOString();

        return this;

    }

    // ==================================================

    // Recalculate Derived Values

    // ==================================================

    recalculate(){

        this.deductionRatio =

            this.totalIncome > 0

                ?

                this.totalDeductions /

                this.totalIncome

                :

                0;

        this.effectiveTaxRate =

            this.totalIncome > 0

                ?

                this.estimatedTax /

                this.totalIncome

                :

                0;

        this.taxableIncomeRatio =

            this.totalIncome > 0

                ?

                this.taxableIncome /

                this.totalIncome

                :

                0;

        return this;

    }

    // ==================================================

    // Convert To Plain Object

    // ==================================================

    toJSON(){

        return {

            id:

                this.id,

            taxYear:

                this.taxYear,

            totalIncome:

                this.totalIncome,

            totalDeductions:

                this.totalDeductions,

            taxableIncome:

                this.taxableIncome,

            estimatedTax:

                this.estimatedTax,

            strategies:

                this.strategies,

            deductionRatio:

                this.deductionRatio,

            effectiveTaxRate:

                this.effectiveTaxRate,

            taxableIncomeRatio:

                this.taxableIncomeRatio,

            createdAt:

                this.createdAt,

            updatedAt:

                this.updatedAt

        };

    }

}

export default TaxReport;
