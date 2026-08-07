/*

Family Wealth AI OS V7.7

Tax Adapter

负责将 Tax 模块输出转换为 OS 标准数据格式

*/

class TaxAdapter {

    constructor(){

        this.name =

            "Tax Adapter";

    }

    // =====================

    // Adapt Tax Analysis

    // =====================

    adapt(analysis){

        return {

            module:

                "tax",

            type:

                "taxAnalysis",

            taxYear:

                analysis.report.taxYear,

            estimatedTax:

                analysis.report.estimatedTax,

            taxableIncome:

                analysis.report.taxableIncome,

            recommendations:

                analysis.optimization.opportunities

        };

    }

    // =====================

    // Create Summary

    // =====================

    summary(analysis){

        return {

            taxYear:

                analysis.report.taxYear,

            taxAmount:

                analysis.report.estimatedTax,

            opportunityCount:

                analysis.optimization.opportunities.length

        };

    }

}

export default TaxAdapter;
