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

        // Module

        // ==================================================

        this.module = null;

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

        // --------------------------------------------------

        // Create Tax Module

        // --------------------------------------------------

        if(

            !this.module

        ){

            this.module =

                new TaxModule();

        }

        // --------------------------------------------------

        // Register Tax Module

        // --------------------------------------------------

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

        // --------------------------------------------------

        // Initialize Tax State

        // --------------------------------------------------

        if(

            this.state &&

            typeof this.state.initialize ===

                "function"

        ){

            this.state.initialize();

        }

        // --------------------------------------------------

        // Update Status

        // --------------------------------------------------

        this.status =

            "initialized";

        // --------------------------------------------------

        // Return

        // --------------------------------------------------

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

        if(

            !this.module

        ){

            this.initialize();

        }

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

// ==================================================

// Export

// ==================================================

export default TaxKernel;
