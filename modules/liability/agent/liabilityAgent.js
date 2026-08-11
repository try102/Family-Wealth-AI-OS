/*

 

Family Wealth AI OS V7

Liability Agent

家庭负债智能代理

*/

import LiabilityAPI from "../api/liabilityAPI.js";

const LiabilityAgent = {

    name:

        "Liability Agent V7",

    // ==================================================

    // Get Data

    // ==================================================

    getLiabilities(){

        return LiabilityAPI

            .getLiabilities();

    },

    // ==================================================

    // Summary

    // ==================================================

    getLiabilitySummary(){

        return LiabilityAPI

            .getSummary();

    },

    // ==================================================

    // Annual Interest

    // ==================================================

    totalAnnualInterest(){

        const liabilities =

            this.getLiabilities();

        let total = 0;

        liabilities.forEach(

            item => {

                const balance =

                    Number(

                        item.currentBalance ||

                        item.balance ||

                        0

                    );

                const rate =

                    Number(

                        item.interestRate ||

                        item.rate ||

                        0

                    );

                total +=

                    balance *

                    rate /

                    100;

            }

        );

        return total;

    },

    // ==================================================

    // Monthly Interest

    // ==================================================

    totalMonthlyInterest(){

        return (

            this.totalAnnualInterest()

            /

            12

        );

    },

    // ==================================================

    // Average Interest Rate

    // ==================================================

    averageInterestRate(){

        const liabilities =

            this.getLiabilities();

        if(

            liabilities.length === 0

        ){

            return 0;

        }

        let weightedBalance = 0;

        let totalBalance = 0;

        liabilities.forEach(

            item => {

                const balance =

                    Number(

                        item.currentBalance ||

                        item.balance ||

                        0

                    );

                const rate =

                    Number(

                        item.interestRate ||

                        item.rate ||

                        0

                    );

                weightedBalance +=

                    balance * rate;

                totalBalance +=

                    balance;

            }

        );

        if(

            totalBalance === 0

        ){

            return 0;

        }

        return (

            weightedBalance /

            totalBalance

        );

    },

    // ==================================================

    // Debt Status

    // ==================================================

    analyzeDebtStatus(){

        const summary =

            this.getLiabilitySummary();

        let level =

            "LOW";

        if(

            summary.totalLiability >

            500000

        ){

            level =

                "HIGH";

        }

        else if(

            summary.totalLiability >

            100000

        ){

            level =

                "MEDIUM";

        }

        return {

            totalLiability:

                summary.totalLiability,

            debtLevel:

                level,

            count:

                summary.count,

            annualInterest:

                this.totalAnnualInterest(),

            monthlyInterest:

                this.totalMonthlyInterest(),

            averageInterestRate:

                this.averageInterestRate()

        };

    },

    // ==================================================

    // Generate Review

    // ==================================================

    generateLiabilityReview(){

        const summary =

            this.getLiabilitySummary();

        const analysis =

            this.analyzeDebtStatus();

        return {

            summary:

                summary,

            analysis:

                analysis,

            recommendation:

                analysis.annualInterest > 0

                ?

                "Review debt structure and interest cost"

                :

                "Debt interest cost is currently zero"

        };

    }

};

export default LiabilityAgent;
