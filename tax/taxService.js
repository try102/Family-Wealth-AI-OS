/*

Family Wealth AI OS V7.7

Tax Service

Tax 模块服务层

负责统一调用 Tax Engine

*/

import TaxEngine from "./taxEngine.js";

import TaxOptimizer from "./taxOptimizer.js";

class TaxService {

    constructor(){

        this.taxEngine =

            new TaxEngine();

        this.taxOptimizer =

            new TaxOptimizer();

    }

    // =====================

    // Create Tax Report

    // =====================

    createReport(data){

        return this.taxEngine.generateReport(

            data

        );

    }

    // =====================

    // Analyze Tax Optimization

    // =====================

    analyzeOptimization(report){

        return this.taxOptimizer.optimize(

            report

        );

    }

    // =====================

    // Full Tax Analysis

    // =====================

    analyze(data){

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

}

export default TaxService;
