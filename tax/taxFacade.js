/*

 

Family Wealth AI OS V7.7

 

Tax Facade

 

Tax 模块外部统一访问入口

 

负责：

1. Tax 初始化

2. Tax 分析

3. Tax 报告

4. Tax 优化

5. Tax Advisor

6. Tax 完整审查

7. Tax 状态

8. Tax Registry

 

*/

import TaxKernel from "./taxKernel.js";

class TaxFacade {

    constructor(){

        this.kernel =

            new TaxKernel();

        this.initialized =

            false;

    }

    // ==================================================

    // Initialize

    // ==================================================

    initialize(){

        const result =

            this.kernel.initialize();

        this.initialized =

            true;

        return result;

    }

    // ==================================================

    // Ensure Initialized

    // ==================================================

    ensureInitialized(){

        if(

            !this.initialized

        ){

            this.initialize();

        }

        return true;

    }

    // ==================================================

    // Get Controller

    // ==================================================

    getController(){

        this.ensureInitialized();

        return this.kernel

            .getModule()

            .controller;

    }

    // ==================================================

    // Tax Analysis

    // ==================================================

    analyze(

        data = {}

    ){

        this.ensureInitialized();

        return this.kernel

            .getModule()

            .analyze(

                data

            );

    }

    // ==================================================

    // Generate Report

    // ==================================================

    generateReport(

        data = {}

    ){

        this.ensureInitialized();

        return this.kernel

            .getModule()

            .generateReport(

                data

            );

    }

    // ==================================================

    // Optimization

    // ==================================================

    optimizeTax(

        report = {}

    ){

        this.ensureInitialized();

        return this.kernel

            .getModule()

            .optimizeTax(

                report

            );

    }

    // ==================================================

    // Tax Advisor

    // ==================================================

    adviseTax(

        report = {}

    ){

        this.ensureInitialized();

        return this.kernel

            .getModule()

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

        this.ensureInitialized();

        return this.kernel

            .getModule()

            .fullReview(

                data

            );

    }

    // ==================================================

    // Get Status

    // ==================================================

    getStatus(){

        return {

            initialized:

                this.initialized,

            state:

                this.kernel

                    .getState()

        };

    }

    // ==================================================

    // Get Registry

    // ==================================================

    getRegistry(){

        this.ensureInitialized();

        return this.kernel

            .registry

            .getModule();

    }

}

export default TaxFacade;
