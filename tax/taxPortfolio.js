/*

Family Wealth AI OS V7.7

Tax Portfolio

负责管理家庭税务规划集合

*/

class TaxPortfolio {

    constructor(){

        this.taxPlans = [];

        this.taxReports = [];

    }

    // =====================

    // Add Tax Plan

    // =====================

    addPlan(plan){

        this.taxPlans.push(

            plan

        );

        return plan;

    }

    // =====================

    // Add Tax Report

    // =====================

    addReport(report){

        this.taxReports.push(

            report

        );

        return report;

    }

    // =====================

    // Get Plans

    // =====================

    getPlans(){

        return this.taxPlans;

    }

    // =====================

    // Get Reports

    // =====================

    getReports(){

        return this.taxReports;

    }

    // =====================

    // Find Plan By Year

    // =====================

    getPlanByYear(taxYear){

        return this.taxPlans.find(

            plan =>

            plan.taxYear === taxYear

        );

    }

    // =====================

    // Summary

    // =====================

    getSummary(){

        return {

            plans:

                this.taxPlans.length,

            reports:

                this.taxReports.length

        };

    }

}

export default TaxPortfolio;
