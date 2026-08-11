/*

 

Family Wealth AI OS V7.7

 

Tax Controller

 

Tax 模块对外控制层

 

负责统一协调：

 

TaxService

TaxAdvisor

TaxEngine

TaxOptimizer

 

*/

import TaxService from "./taxService.js";

import TaxAdvisor from "./taxAdvisor.js";

class TaxController {

    constructor(){

        // ==================================================

        // Tax Service

        // ==================================================

        this.taxService =

            new TaxService();

        // ==================================================

        // Tax Advisor

        // ==================================================

        this.taxAdvisor =

            new TaxAdvisor();

    }

    // ==================================================

    // Create Tax Analysis

    // ==================================================

    createTaxAnalysis(

        data = {}

    ){

        const result =

            this.taxService

                .analyze(

                    data

                );

        const advice =

            this.taxAdvisor

                .analyze(

                    result.report

                );

        return {

            ...result,

            advice

        };

    }

    // ==================================================

    // Generate Report

    // ==================================================

    generateReport(

        data = {}

    ){

        return this.taxService

            .createReport(

                data

            );

    }

    // ==================================================

    // Optimization Analysis

    // ==================================================

    optimizeTax(

        report = {}

    ){

        return this.taxService

            .analyzeOptimization(

                report

            );

    }

    // ==================================================

    // Advisor Analysis

    // ==================================================

    adviseTax(

        report = {}

    ){

        return this.taxAdvisor

            .analyze(

                report

            );

    }

    // ==================================================

    // Full Tax Review

    // ==================================================

    fullReview(

        data = {}

    ){

        const analysis =

            this.taxService

                .analyze(

                    data

                );

        const advice =

            this.taxAdvisor

                .analyze(

                    analysis.report

                );

        return {

            report:

                analysis.report,

            optimization:

                analysis.optimization,

            advice:

                advice

        };

    }

    // ==================================================

    // Tax Dashboard

    //

    // View 通过 Controller 访问 Dashboard

    // Controller 再交给 TaxService

    // ==================================================

    dashboard(){

        if(

            this.taxService &&

            typeof this.taxService.dashboard ===

                "function"

        ){

            return this.taxService.dashboard();

        }

        return {

            summary: {},

            latestPlan: null,

            analysis: null

        };

    }

}

// ==================================================

// Export

// ==================================================

export default TaxController;
