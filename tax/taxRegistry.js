/*

 

Family Wealth AI OS V7.7

 

Tax Registry

 

负责注册 Tax 模块信息

 

*/

class TaxRegistry {

    constructor(){

        this.module = {

            name:

                "Tax Module",

            version:

                "V7.7",

            status:

                "READY",

            capabilities: [

                "taxPlanning",

                "taxCalculation",

                "taxOptimization",

                "taxReporting",

                "taxAdvisory",

                "taxAnalysis"

            ]

        };

        this.registered = false;

        this.registeredModule = null;

    }

    // ==================================================

    // Register Tax Module

    // ==================================================

    register(

        module = null

    ){

        if(

            module &&

            typeof module ===

                "object"

        ){

            this.registeredModule =

                module;

            this.module = {

                ...this.module,

                name:

                    module.name ||

                    this.module.name,

                version:

                    module.version ||

                    this.module.version,

                status:

                    module.status ||

                    this.module.status

            };

        }

        this.registered = true;

        return {

            ...this.module,

            registered:

                this.registered

        };

    }

    // ==================================================

    // Get Module Info

    // ==================================================

    getModule(){

        return {

            ...this.module,

            registered:

                this.registered

        };

    }

    // ==================================================

    // Get Registered Module

    // ==================================================

    getRegisteredModule(){

        return this.registeredModule;

    }

    // ==================================================

    // Check Capability

    // ==================================================

    hasCapability(

        capability

    ){

        return this.module

            .capabilities

            .includes(

                capability

            );

    }

    // ==================================================

    // Get Capabilities

    // ==================================================

    getCapabilities(){

        return [

            ...this.module

                .capabilities

        ];

    }

    // ==================================================

    // Registry Status

    // ==================================================

    getStatus(){

        return {

            registered:

                this.registered,

            module:

                this.module.name,

            version:

                this.module.version,

            capabilities:

                this.getCapabilities()

        };

    }

}

export default TaxRegistry;
