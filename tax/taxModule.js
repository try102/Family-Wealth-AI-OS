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

 

注意：

 

TaxModule 不依赖 TaxFacade / TaxKernel。

 

避免：

 

TaxModule

 ↓

TaxView

 ↓

TaxFacade

 ↓

TaxKernel

 ↓

TaxModule

 

形成循环依赖。

 

*/

import TaxController from "./taxController.js";

import TaxView from "./ui/taxView.js";

class TaxModule {

    constructor(){

        // ==================================================

        // Controller

        // ==================================================

        this.controller =

            new TaxController();

        // ==================================================

        // View

        //

        // TaxView 需要 Controller

        // ==================================================

        this.view =

            new TaxView(

                this.controller

            );

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

    // Generate Report

    // Compatibility Alias

    // ==================================================

    generateReport(

        data = {}

    ){

        return this.report(

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

    // Compatibility Alias

    // ==================================================

    optimizeTax(

        report = {}

    ){

        return this.optimize(

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

    // Compatibility Alias

    // ==================================================

    adviseTax(

        report = {}

    ){

        return this.advise(

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

    // Dashboard

    // ==================================================

    dashboard(){

        const service =

            this.controller

                .taxService;

        if(

            service &&

            typeof service.dashboard ===

                "function"

        ){

            return service.dashboard();

        }

        return {

            summary: {},

            latestPlan: null,

            analysis: null

        };

    }

    // ==================================================

    // Module Status

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
