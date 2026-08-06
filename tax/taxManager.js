/*

========================================

Family Wealth AI OS V7.0

Tax Manager

管理 Tax Plan 数据

========================================

*/

const TaxPlan = require("./taxPlan");

class TaxManager {

    constructor(){

        this.taxPlans = [];

    }

    // 创建 Tax Plan

    createPlan(data){

        const plan = new TaxPlan(data);

        this.taxPlans.push(plan);

        return plan;

    }

    // 获取全部计划

    getAllPlans(){

        return this.taxPlans;

    }

    // 根据年份查找

    getPlanByYear(year){

        return this.taxPlans.find(

            plan => plan.year === year

        );

    }

    // 更新计划

    updatePlan(year, updates){

        const plan = this.getPlanByYear(year);

        if(!plan){

            return null;

        }

        Object.assign(

            plan,

            updates

        );

        return plan;

    }

    // 删除计划

    deletePlan(year){

        const index = this.taxPlans.findIndex(

            plan => plan.year === year

        );

        if(index === -1){

            return false;

        }

        this.taxPlans.splice(

            index,

            1

        );

        return true;

    }

    // 税务摘要

    getTaxSummary(year){

        const plan = this.getPlanByYear(year);

        if(!plan){

            return null;

        }

        return {

            year: plan.year,

            income: plan.income || 0,

            deductions: plan.deductions || 0,

            taxableIncome:

                (plan.income || 0)

                -

                (plan.deductions || 0)

        };

    }

}

module.exports = TaxManager;
