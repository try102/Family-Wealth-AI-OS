/*

Family Wealth AI OS V7.7

Tax Manager

负责管理家庭税务规划方案

*/

class TaxManager {

    constructor(){

        this.taxPlans = [];

    }

    // =====================

    // Add Tax Plan

    // =====================

    addPlan(taxPlan){

        this.taxPlans.push(

            taxPlan

        );

        return taxPlan;

    }

    // =====================

    // Get All Tax Plans

    // =====================

    getPlans(){

        return this.taxPlans;

    }

    // =====================

    // Get Plan By Year

    // =====================

    getPlanByYear(taxYear){

        return this.taxPlans.find(

            plan =>

            plan.taxYear === taxYear

        );

    }

    // =====================

    // Remove Plan

    // =====================

    removePlan(id){

        this.taxPlans =

            this.taxPlans.filter(

                plan =>

                plan.id !== id

            );

    }

    // =====================

    // Count Plans

    // =====================

    count(){

        return this.taxPlans.length;

    }

}

export default TaxManager;
