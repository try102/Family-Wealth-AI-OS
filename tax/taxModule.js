/*

Family Wealth AI OS V7.7

Tax Module

Tax 模块统一入口

负责统一连接：

TaxController

TaxService

TaxOptimizer

TaxAdvisor

TaxView

*/

import TaxController from "./taxController.js";

import taxView from "./ui/taxView.js";

class TaxModule {

    constructor(){

        // ==================================================

        // Controller

        // ==================================================

        this.controller =

            new TaxController();

        // ==================================================

        // View

        // ==================================================

        this.view =

            taxView;

        // ==================================================

        // Module Information

        // ==================================================

        this.name =

            "Tax Module V7.7";

        this.version =

            "7.7";

        this.status =

            "READY";

    }

    // ==================================================

    // Tax Analysis

    // ==================================================

    analyze(

        data = {}

    ){

        return this.controller

            .createTaxAnalysis(

                data

            );

    }

    // ==================================================

    // Report Generation

    // ==================================================

    report(

        data = {}

    ){

        return this.controller

            .generateReport(

                data

            );

    }

    // ==================================================

    // Tax Optimization

    // ==================================================

    optimize(

        report = {}

    ){

        return this.controller

            .optimizeTax(

                report

            );

    }

    // ==================================================

    // Tax Advisor

    // ==================================================

    advise(

        report = {}

    ){

        return this.controller

            .adviseTax(

                report

            );

    }

    // ==================================================

    // Full Tax Review

    // ==================================================

    fullReview(

        data = {}

    ){

        return this.controller

            .fullReview(

                data

            );

    }

    // ==================================================

    // Generate Report

    // ==================================================

    generateReport(

        data = {}

    ){

        return this.controller

            .generateReport(

                data

            );

    }

    // ==================================================

    // Optimize Tax

    // ==================================================

    optimizeTax(

        report = {}

    ){

        return this.controller

            .optimizeTax(

                report

            );

    }

    // ==================================================

    // Advise Tax

    // ==================================================

    adviseTax(

        report = {}

    ){

        return this.controller

            .adviseTax(

                report

            );

    }

    // ==================================================

    // Get Status

    // ==================================================

    getStatus(){

        return {

            name:

                this.name,

            version:

                this.version,

            status:

                this.status

        };

    }

}

// ==================================================

// Singleton Module

// ==================================================

const taxModule =

    new TaxModule();

// ==================================================

// Export

// ==================================================

export default taxModule;
