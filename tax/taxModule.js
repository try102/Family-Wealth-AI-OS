/*

Family Wealth AI OS V7.7

Tax Module

Tax 模块统一入口

*/

import TaxController from "./taxController.js";

class TaxModule {

    constructor(){

        this.controller =

            new TaxController();

        this.name =

            "Tax Module";

    }

    // =====================

    // Tax Analysis

    // =====================

    analyze(data){

        return this.controller.createTaxAnalysis(

            data

        );

    }

    // =====================

    // Report Generation

    // =====================

    report(data){

        return this.controller.generateReport(

            data

        );

    }

    // =====================

    // Optimization

    // =====================

    optimize(report){

        return this.controller.optimizeTax(

            report

        );

    }

}

export default TaxModule;
