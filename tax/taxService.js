/*

 

Family Wealth AI OS V7.7

 

Tax Service

 

Tax 模块服务层

 

负责统一管理：

 

TaxPlan

TaxManager

TaxEngine

TaxOptimizer

 

*/

import TaxEngine from "./taxEngine.js";

import TaxOptimizer from "./taxOptimizer.js";

import TaxManager from "./taxManager.js";

import TaxPlan from "./taxPlan.js";

class TaxService {

    constructor(){

        // ==================================================

        // Tax Engine

        // ==================================================

        this.taxEngine =

            new TaxEngine();

        // ==================================================

        // Tax Optimizer

        // ==================================================

        this.taxOptimizer =

            new TaxOptimizer();

        // ==================================================

        // Tax Plan Manager

        // ==================================================

        this.taxManager =

            new TaxManager();

        // ==================================================

        // Initialize Manager

        // ==================================================

        if(

            this.taxManager &&

            typeof this.taxManager.init ===

                "function"

        ){

            this.taxManager.init();

        }

    }

    // ==================================================

    // Create Tax Plan

    // ==================================================

    createPlan(

        data = {}

    ){

        const taxPlan =

            new TaxPlan(

                data

            );

        return this.taxManager

            .addPlan(

                taxPlan

            );

    }

    // ==================================================

    // Get All Tax Plans

    // ==================================================

    getPlans(){

        return this.taxManager

            .getPlans();

    }

    // ==================================================

    // Get Tax Plan By ID

    // ==================================================

    getPlanById(

        id

    ){

        return this.taxManager

            .getPlanById(

                id

            );

    }

    // ==================================================

    // Get Tax Plan By Year

    // ==================================================

    getPlanByYear(

        taxYear

    ){

        return this.taxManager

            .getPlanByYear(

                taxYear

            );

    }

    // ==================================================

    // Update Tax Plan

    // ==================================================

    updatePlan(

        id,

        data = {}

    ){

        return this.taxManager

            .updatePlan(

                id,

                data

            );

    }

    // ==================================================

    // Delete Tax Plan

    // ==================================================

    deletePlan(

        id

    ){

        return this.taxManager

            .removePlan(

                id

            );

    }

    // ==================================================

    // Count Tax Plans

    // ==================================================

    countPlans(){

        return this.taxManager

            .count();

    }

    // ==================================================

    // Create Tax Report

    // ==================================================

    createReport(

        data = {}

    ){

        return this.taxEngine

            .generateReport(

                data

            );

    }

    // ==================================================

    // Analyze Tax Optimization

    // ==================================================

    analyzeOptimization(

        report

    ){

        if(

            !report

        ){

            return null;

        }

        return this.taxOptimizer

            .optimize(

                report

            );

    }

    // ==================================================

    // Full Tax Analysis

    // ==================================================

    analyze(

        data = {}

    ){

        const report =

            this.createReport(

                data

            );

        const optimization =

            this.analyzeOptimization(

                report

            );

        return {

            report,

            optimization

        };

    }

    // ==================================================

    // Analyze Tax Plan

    // ==================================================

    analyzePlan(

        id

    ){

        const plan =

            this.getPlanById(

                id

            );

        if(

            !plan

        ){

            return null;

        }

        // ==================================================

        // Determine Tax Rate

        // ==================================================

        const taxRate =

            plan.taxRate !==

                undefined

                ?

                Number(

                    plan.taxRate

                )

                :

                0.20;

        // ==================================================

        // Tax Engine Input

        // ==================================================

        const data = {

            id:

                plan.id,

            name:

                plan.name,

            income:

                Number(

                    plan.income || 0

                ),

            deductions:

                Number(

                    plan.deductions || 0

                ),

            taxYear:

                Number(

                    plan.taxYear || 0

                ),

            taxRate:

                taxRate,

            strategies:

                Array.isArray(

                    plan.strategies

                )

                    ?

                    plan.strategies

                    :

                    []

        };

        // ==================================================

        // Run Tax Engine

        // ==================================================

        const analysis =

            this.analyze(

                data

            );

        // ==================================================

        // Return Plan + Fresh Analysis

        // ==================================================

        return {

            plan,

            ...analysis

        };

    }

    // ==================================================

    // Analyze Current Tax Year

    // ==================================================

    analyzeYear(

        taxYear

    ){

        const plan =

            this.getPlanByYear(

                taxYear

            );

        if(

            !plan

        ){

            return null;

        }

        return this.analyzePlan(

            plan.id

        );

    }

    // ==================================================

    // Tax Summary

    //

    // Summary uses fresh TaxEngine calculations.

    // This prevents old estimatedTax values from

    // remaining visible in the Dashboard.

    // ==================================================

    summary(){

        const plans =

            this.getPlans();

        let totalIncome = 0;

        let totalDeductions = 0;

        let totalTaxableIncome = 0;

        let totalEstimatedTax = 0;

        // ==================================================

        // Calculate Each Plan

        // ==================================================

        plans.forEach(

            plan => {

                const income =

                    Number(

                        plan.income || 0

                    );

                const deductions =

                    Number(

                        plan.deductions || 0

                    );

                const taxRate =

                    plan.taxRate !==

                        undefined

                        ?

                        Number(

                            plan.taxRate

                        )

                        :

                        0.20;

                const report =

                    this.createReport({

                        id:

                            plan.id,

                        name:

                            plan.name,

                        taxYear:

                            plan.taxYear,

                        income,

                        deductions,

                        taxRate,

                        strategies:

                            Array.isArray(

                                plan.strategies

                            )

                                ?

                                plan.strategies

                                :

                                []

                    });

                totalIncome +=

                    Number(

                        report.totalIncome || 0

                    );

                totalDeductions +=

                    Number(

                        report.totalDeductions || 0

                    );

                totalTaxableIncome +=

                    Number(

                        report.taxableIncome || 0

                    );

                totalEstimatedTax +=

                    Number(

                        report.estimatedTax || 0

                    );

            }

        );

        // ==================================================

        // Return Summary

        // ==================================================

        return {

            count:

                plans.length,

            totalIncome,

            totalDeductions,

            totalTaxableIncome,

            totalEstimatedTax,

            averageEffectiveTaxRate:

                totalIncome > 0

                    ?

                    totalEstimatedTax /

                    totalIncome

                    :

                    0,

            latestPlan:

                this.taxManager

                    .getLatestPlan()

        };

    }

    // ==================================================

    // Tax Dashboard

    // ==================================================

    dashboard(){

        const summary =

            this.summary();

        const latestPlan =

            this.taxManager

                .getLatestPlan();

        let analysis =

            null;

        if(

            latestPlan

        ){

            analysis =

                this.analyzePlan(

                    latestPlan.id

                );

        }

        return {

            summary,

            latestPlan,

            analysis

        };

    }

}

// ==================================================

// Export Class

// ==================================================

export default TaxService;
