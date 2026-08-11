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

    // Dashboard 基础数据来自 TaxService

    //

    // Advisor 数据由 TaxController 统一生成

    // 避免 TaxService 与 TaxAdvisor 形成额外依赖

    // ==================================================

    dashboard(){

        const dashboard =

            this.taxService &&

            typeof this.taxService.dashboard ===

                "function"

                ?

                this.taxService.dashboard()

                :

                {

                    summary: {},

                    latestPlan: null,

                    analysis: null

                };

        const summary =

            dashboard?.summary ||

            {};

        const latestPlan =

            dashboard?.latestPlan ||

            null;

        const analysis =

            dashboard?.analysis ||

            null;

        // ==================================================

        // No Latest Plan

        // ==================================================

        if(

            !latestPlan

        ){

            return {

                summary,

                latestPlan:

                    null,

                analysis:

                    null

            };

        }

        // ==================================================

        // Generate Advisor Data

        // ==================================================

        let advice =

            null;

        if(

            this.taxAdvisor &&

            typeof this.taxAdvisor.analyze ===

                "function"

        ){

            if(

                analysis &&

                analysis.report

            ){

                advice =

                    this.taxAdvisor

                        .analyze(

                            analysis.report

                        );

            }

            else {

                advice =

                    this.taxAdvisor

                        .analyze(

                            latestPlan

                        );

            }

        }

        // ==================================================

        // Return Complete Dashboard

        // ==================================================

        return {

            summary,

            latestPlan,

            analysis: {

                ...(analysis || {}),

                advice

            }

        };

    }

}

// ==================================================

// Export

// ==================================================

export default TaxController;
