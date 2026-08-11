/*

Family Wealth AI OS V7

Liability Agent

家庭负债智能代理

*/

import LiabilityAPI

    from "../api/liabilityAPI.js";

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

    // Debt Status

    // ==================================================

    analyzeDebtStatus(){

        const summary =

            this.getLiabilitySummary();

        let level =

            "LOW";

        if(

            summary.totalLiability

            >

            500000

        ){

            level =

                "HIGH";

        }

        else if(

            summary.totalLiability

            >

            100000

        ){

            level =

                "MEDIUM";

        }

        return {

            totalLiability:

                summary.totalLiability,

            annualInterest:

                summary.annualInterest,

            monthlyInterest:

                summary.monthlyInterest,

            averageInterestRate:

                summary.averageInterestRate,

            monthlyPayment:

                summary.monthlyPayment,

            debtRiskScore:

                summary.debtRiskScore,

            debtLevel:

                level,

            count:

                summary.count

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

                "Review debt structure and interest cost"

        };

    }

};

export default LiabilityAgent;
