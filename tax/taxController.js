/*

Family Wealth AI OS V7.7

Tax Controller

Tax 模块对外控制层

*/

import TaxService from "./taxService.js";

class TaxController {

    constructor(){

        this.taxService =

            new TaxService();

    }

    // =====================

    // Create Tax Analysis

    // =====================

    createTaxAnalysis(data){

        return this.taxService.analyze(

            data

        );

    }

    // =====================

    // Generate Report

    // =====================

    generateReport(data){

        return this.taxService.createReport(

            data

        );

    }

    // =====================

    // Optimization Analysis

    // =====================

    optimizeTax(report){

        return this.taxService.analyzeOptimization(

            report

        );

    }

}

export default TaxController;
