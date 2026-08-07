/*

Family Wealth AI OS V7.7

Tax Facade

Tax 模块外部统一访问入口

*/

import TaxKernel from "./taxKernel.js";

class TaxFacade {

    constructor(){

        this.kernel =

            new TaxKernel();

        this.initialized =

            false;

    }

    // =====================

    // Initialize

    // =====================

    initialize(){

        const result =

            this.kernel.initialize();

        this.initialized = true;

        return result;

    }

    // =====================

    // Tax Analysis

    // =====================

    analyze(data){

        if(

            !this.initialized

        ){

            this.initialize();

        }

        return this.kernel

            .getModule()

            .analyze(data);

    }

    // =====================

    // Get Status

    // =====================

    getStatus(){

        return {

            initialized:

                this.initialized,

            state:

                this.kernel.getState()

        };

    }

    // =====================

    // Get Registry

    // =====================

    getRegistry(){

        return this.kernel

            .registry

            .getModule();

    }

}

export default TaxFacade;
