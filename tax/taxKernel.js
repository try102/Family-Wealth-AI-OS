/*

Family Wealth AI OS V7.7

Tax Kernel

Tax 子系统核心初始化入口

*/

import TaxModule from "./taxModule.js";

import TaxRegistry from "./taxRegistry.js";

import TaxState from "./taxState.js";

class TaxKernel {

    constructor(){

        this.module =

            new TaxModule();

        this.registry =

            new TaxRegistry();

        this.state =

            new TaxState();

        this.status =

            "created";

    }

    // =====================

    // Initialize Tax System

    // =====================

    initialize(){

        this.status =

            "initialized";

        return {

            status:

                this.status,

            module:

                this.registry.getModule()

        };

    }

    // =====================

    // Get Tax State

    // =====================

    getState(){

        return this.state.getState();

    }

    // =====================

    // Get Module

    // =====================

    getModule(){

        return this.module;

    }

}

export default TaxKernel;
