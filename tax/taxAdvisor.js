/*

 

Family Wealth AI OS V7.7

 

Tax Advisor

 

负责根据税务结果生成基础税务建议

 

*/

class TaxAdvisor {

    constructor(){

        this.name =

            "Tax Advisor V7.7";

    }

    // ==================================================

    // Analyze Tax Report

    // ==================================================

    analyze(

        report = {}

    ){

        const recommendations = [];

        const totalIncome =

            Number(

                report.totalIncome ||

                report.income ||

                0

            );

        const totalDeductions =

            Number(

                report.totalDeductions ||

                report.deductions ||

                0

            );

        const taxableIncome =

            Number(

                report.taxableIncome ||

                0

            );

        const estimatedTax =

            Number(

                report.estimatedTax ||

                0

            );

        const strategies =

            Array.isArray(

                report.strategies

            )

                ?

                report.strategies

                :

                [];

        // ==================================================

        // Tax Exists

        // ==================================================

        if(

            estimatedTax > 0

        ){

            recommendations.push(

                "Review tax optimization opportunities"

            );

        }

        // ==================================================

        // Deduction Analysis

        // ==================================================

        if(

            totalIncome > 0 &&

            totalDeductions <

            totalIncome * 0.10

        ){

            recommendations.push(

                "Consider increasing eligible deductions"

            );

        }

        // ==================================================

        // High Deduction Ratio

        // ==================================================

        if(

            totalIncome > 0 &&

            totalDeductions >=

            totalIncome * 0.30

        ){

            recommendations.push(

                "Review deduction documentation and eligibility"

            );

        }

        // ==================================================

        // Taxable Income

        // ==================================================

        if(

            taxableIncome >

            totalIncome

        ){

            recommendations.push(

                "Review taxable income calculation"

            );

        }

        // ==================================================

        // Existing Strategies

        // ==================================================

        if(

            strategies.length > 0

        ){

            recommendations.push(

                "Existing tax strategies detected"

            );

        }

        // ==================================================

        // No Tax

        // ==================================================

        if(

            estimatedTax === 0 &&

            totalIncome > 0

        ){

            recommendations.push(

                "Estimated tax is currently zero; verify deductions and tax assumptions"

            );

        }

        // ==================================================

        // No Income

        // ==================================================

        if(

            totalIncome === 0

        ){

            recommendations.push(

                "No tax income data is currently available"

            );

        }

        // ==================================================

        // Return Analysis

        // ==================================================

        return {

            taxYear:

                report.taxYear ||

                0,

            totalIncome:

                totalIncome,

            totalDeductions:

                totalDeductions,

            taxableIncome:

                taxableIncome,

            estimatedTax:

                estimatedTax,

            recommendationCount:

                recommendations.length,

            recommendations:

                recommendations

        };

    }

    // ==================================================

    // Generate Summary

    // ==================================================

    generateSummary(

        report = {}

    ){

        const analysis =

            this.analyze(

                report

            );

        if(

            analysis.recommendations.length ===

            0

        ){

            return {

                taxYear:

                    analysis.taxYear,

                summary:

                    "No immediate tax optimization opportunities identified",

                recommendations:

                    []

            };

        }

        return {

            taxYear:

                analysis.taxYear,

            summary:

                analysis.recommendations.join(

                    "; "

                ),

            recommendations:

                analysis.recommendations

        };

    }

}

export default TaxAdvisor;
