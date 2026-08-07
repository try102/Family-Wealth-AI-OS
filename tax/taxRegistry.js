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

            capabilities:[

                "taxPlanning",

                "taxCalculation",

                "taxOptimization",

                "taxReporting"

            ]

        };

    }

    // =====================

    // Get Module Info

    // =====================

    getModule(){

        return this.module;

    }

    // =====================

    // Check Capability

    // =====================

    hasCapability(capability){

        return this.module.capabilities.includes(

            capability

        );

    }

}

export default TaxRegistry;
