/*

 

Family Wealth AI OS V7.7

 

Tax Kernel

 

Tax 子系统核心初始化入口

 

负责统一管理：

TaxModule

TaxRegistry

TaxState

 

*/

import TaxModule from "./taxModule.js";

import TaxRegistry from "./taxRegistry.js";

import TaxState from "./taxState.js";

class TaxKernel {

    constructor(){

        // ==================================================

        // Tax Module

        // ==================================================

        this.module =

            new TaxModule();

        // ==================================================

        // Tax Registry

        // ==================================================

        this.registry =

            new TaxRegistry();

        // ==================================================

        // Tax State

        // ==================================================

        this.state =

            new TaxState();

        // ==================================================

        // Kernel Status

        // ==================================================

        this.status =

            "created";

    }

    // ==================================================

    // Initialize Tax System

    // ==================================================

    initialize(){

        // ----------------------------------------------

        // Register Tax Module

        // ----------------------------------------------

        let registryResult =

            null;

        if(

            this.registry &&

            typeof this.registry.register ===

                "function"

        ){

            registryResult =

                this.registry.register(

                    this.module

                );

        }

        // ----------------------------------------------

        // Update Kernel Status

        // ----------------------------------------------

        this.status =

            "initialized";

        // ----------------------------------------------

        // Update Tax State

        // ----------------------------------------------

        if(

            this.state &&

            typeof this.state.initialize ===

                "function"

        ){

            this.state.initialize();

        }

        // ----------------------------------------------

        // Return Initialization Result

        // ----------------------------------------------

        return {

            status:

                this.status,

            module:

                this.module,

            registry:

                registryResult,

            state:

                this.getState()

        };

    }

    // ==================================================

    // Get Tax State

    // ==================================================

    getState(){

        if(

            this.state &&

            typeof this.state.getState ===

                "function"

        ){

            return this.state.getState();

        }

        return {

            status:

                this.status

        };

    }

    // ==================================================

    // Get Tax Module

    // ==================================================

    getModule(){

        return this.module;

    }

    // ==================================================

    // Get Tax Registry

    // ==================================================

    getRegistry(){

        return this.registry;

    }

    // ==================================================

    // Get Kernel Status

    // ==================================================

    getStatus(){

        return {

            status:

                this.status,

            initialized:

                this.status ===

                "initialized"

        };

    }

}

export default TaxKernel;
