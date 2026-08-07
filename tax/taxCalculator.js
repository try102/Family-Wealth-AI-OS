/*

Family Wealth AI OS V7.7

Tax Calculator

负责基础税务计算能力

*/

class TaxCalculator {

    constructor(){

        this.name =

            "Tax Calculator";

    }

    // =====================

    // Calculate Taxable Income

    // =====================

    calculateTaxableIncome(

        income,

        deductions

    ){

        return (

            income -

            deductions

        );

    }

    // =====================

    // Estimate Tax

    // =====================

    calculateEstimatedTax(

        taxableIncome,

        taxRate = 0.2

    ){

        return (

            taxableIncome *

            taxRate

        );

    }

    // =====================

    // Generate Tax Result

    // =====================

    calculate(

        {

            income,

            deductions,

            taxRate = 0.2

        }

    ){

        const taxableIncome =

            this.calculateTaxableIncome(

                income,

                deductions

            );

        const estimatedTax =

            this.calculateEstimatedTax(

                taxableIncome,

                taxRate

            );

        return {

            income,

            deductions,

            taxableIncome,

            estimatedTax

        };

    }

}

export default TaxCalculator;
