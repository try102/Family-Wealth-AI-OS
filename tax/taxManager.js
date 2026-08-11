/*

 

Family Wealth AI OS V7.7

 

Tax Manager

 

负责管理家庭税务规划方案

 

*/

class TaxManager {

    constructor(){

        this.taxPlans = [];

    }

    // ==================================================

    // Initialize

    // ==================================================

    init(){

        if(

            !Array.isArray(

                this.taxPlans

            )

        ){

            this.taxPlans = [];

        }

        return true;

    }

    // ==================================================

    // Add Tax Plan

    // ==================================================

    addPlan(

        taxPlan

    ){

        this.init();

        if(

            !taxPlan ||

            typeof taxPlan !==

            "object"

        ){

            return null;

        }

        const plan = {

            ...taxPlan,

            id:

                taxPlan.id ??

                Date.now(),

            createdAt:

                taxPlan.createdAt ??

                new Date()

                    .toISOString(),

            updatedAt:

                new Date()

                    .toISOString()

        };

        this.taxPlans.push(

            plan

        );

        return plan;

    }

    // ==================================================

    // Get All Tax Plans

    // ==================================================

    getPlans(){

        this.init();

        return [

            ...this.taxPlans

        ];

    }

    // ==================================================

    // Get Plan By ID

    // ==================================================

    getPlanById(

        id

    ){

        this.init();

        return (

            this.taxPlans.find(

                plan =>

                    String(

                        plan.id

                    ) ===

                    String(

                        id

                    )

            )

            ||

            null

        );

    }

    // ==================================================

    // Get Plan By Year

    // ==================================================

    getPlanByYear(

        taxYear

    ){

        this.init();

        return (

            this.taxPlans.find(

                plan =>

                    Number(

                        plan.taxYear

                    ) ===

                    Number(

                        taxYear

                    )

            )

            ||

            null

        );

    }

    // ==================================================

    // Update Tax Plan

    // ==================================================

    updatePlan(

        id,

        data = {}

    ){

        this.init();

        const index =

            this.taxPlans.findIndex(

                plan =>

                    String(

                        plan.id

                    ) ===

                    String(

                        id

                    )

            );

        if(

            index === -1

        ){

            return null;

        }

        this.taxPlans[index] = {

            ...this.taxPlans[index],

            ...data,

            id:

                this.taxPlans[index].id,

            updatedAt:

                new Date()

                    .toISOString()

        };

        return this.taxPlans[index];

    }

    // ==================================================

    // Remove Tax Plan

    // ==================================================

    removePlan(

        id

    ){

        this.init();

        const index =

            this.taxPlans.findIndex(

                plan =>

                    String(

                        plan.id

                    ) ===

                    String(

                        id

                    )

            );

        if(

            index === -1

        ){

            return false;

        }

        this.taxPlans.splice(

            index,

            1

        );

        return true;

    }

    // ==================================================

    // Clear All Tax Plans

    // ==================================================

    clear(){

        this.taxPlans = [];

        return true;

    }

    // ==================================================

    // Count Plans

    // ==================================================

    count(){

        this.init();

        return this.taxPlans.length;

    }

    // ==================================================

    // Check Plan Exists

    // ==================================================

    hasPlan(

        id

    ){

        return (

            this.getPlanById(

                id

            ) !== null

        );

    }

    // ==================================================

    // Check Tax Year Exists

    // ==================================================

    hasYear(

        taxYear

    ){

        return (

            this.getPlanByYear(

                taxYear

            ) !== null

        );

    }

    // ==================================================

    // Get Latest Tax Plan

    // ==================================================

    getLatestPlan(){

        this.init();

        if(

            this.taxPlans.length === 0

        ){

            return null;

        }

        return (

            this.taxPlans

                .slice()

                .sort(

                    (

                        a,

                        b

                    ) => {

                        const dateA =

                            new Date(

                                a.updatedAt ||

                                a.createdAt ||

                                0

                            ).getTime();

                        const dateB =

                            new Date(

                                b.updatedAt ||

                                b.createdAt ||

                                0

                            ).getTime();

                        return (

                            dateB -

                            dateA

                        );

                    }

                )[0]

        );

    }

    // ==================================================

    // Get Latest Tax Year

    // ==================================================

    getLatestTaxYear(){

        const plan =

            this.getLatestPlan();

        if(

            !plan

        ){

            return null;

        }

        return (

            Number(

                plan.taxYear

            ) || null

        );

    }

    // ==================================================

    // Get Plans By Year

    // ==================================================

    getPlansByYear(

        taxYear

    ){

        this.init();

        return (

            this.taxPlans.filter(

                plan =>

                    Number(

                        plan.taxYear

                    ) ===

                    Number(

                        taxYear

                    )

            )

        );

    }

    // ==================================================

    // Get Plans Count By Year

    // ==================================================

    countByYear(

        taxYear

    ){

        return this.getPlansByYear(

            taxYear

        ).length;

    }

    // ==================================================

    // Replace All Plans

    // ==================================================

    setPlans(

        plans = []

    ){

        if(

            !Array.isArray(

                plans

            )

        ){

            return false;

        }

        this.taxPlans = [

            ...plans

        ];

        return true;

    }

    // ==================================================

    // Export Plans

    // ==================================================

    export(){

        this.init();

        return JSON.parse(

            JSON.stringify(

                this.taxPlans

            )

        );

    }

    // ==================================================

    // Import Plans

    // ==================================================

    import(

        plans = []

    ){

        if(

            !Array.isArray(

                plans

            )

        ){

            return false;

        }

        this.taxPlans = [

            ...plans

        ];

        return true;

    }

    // ==================================================

    // Manager Status

    // ==================================================

    getStatus(){

        this.init();

        return {

            name:

                "Tax Manager",

            version:

                "V7.7",

            count:

                this.taxPlans.length,

            latestTaxYear:

                this.getLatestTaxYear(),

            status:

                "READY"

        };

    }

}

// ==================================================

// Export

// ==================================================

export default TaxManager;
