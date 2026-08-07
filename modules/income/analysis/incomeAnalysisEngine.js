/*

Family Wealth AI OS V7

Income Analysis Engine

家庭收入分析引擎

*/

import IncomeRepository from "../repository/incomeRepository.js";

const IncomeAnalysisEngine = {

    name:

    "Income Analysis Engine V7",

    // =====================

    // Total Income

    // =====================

    calculateTotalIncome(){

        const incomes =

        IncomeRepository.findAll();

        let total = 0;

        incomes.forEach(

            item => {

                total +=

                Number(

                    item.amount || 0

                );

            }

        );

        return total;

    },

    // =====================

    // Income Count

    // =====================

    calculateIncomeCount(){

        return IncomeRepository

        .findAll()

        .length;

    },

    // =====================

    // Category Analysis

    // =====================

    analyzeCategory(){

        const incomes =

        IncomeRepository.findAll();

        const categories = {};

        incomes.forEach(

            item => {

                const category =

                item.category || "其他";

                if(

                    !categories[category]

                ){

                    categories[category]=0;

                }

                categories[category] +=

                Number(

                    item.amount || 0

                );

            }

        );

        return categories;

    },

    // =====================

    // Stability Analysis

    // =====================

    analyzeStability(){

        const count =

        this.calculateIncomeCount();

        if(

            count === 0

        ){

            return {

                level:

                "NO_DATA"

            };

        }

        if(

            count === 1

        ){

            return {

                level:

                "LOW"

            };

        }

        return {

            level:

            "STABLE"

        };

    },

    // =====================

    // Full Report

    // =====================

   generateReport(){

        return {

            totalIncome:

            this.calculateTotalIncome(),

            incomeCount:

            this.calculateIncomeCount(),

            categories:

            this.analyzeCategory(),

            stability:

            this.analyzeStability()

        };

    }

};

export default IncomeAnalysisEngine;
