/*

Family Wealth AI OS V7

Liability Agent

家庭负债智能代理

*/

import LiabilityAPI from "../api/liabilityAPI.js";

const LiabilityAgent = {

    name:

    "Liability Agent V7",

    // =====================

    // Get Data

    // =====================

    getLiabilities(){

        return LiabilityAPI

        .getLiabilities();

    },

    // =====================

    // Summary

    // =====================

    getLiabilitySummary(){

        return LiabilityAPI

        .getSummary();

    },

    // =====================

    // Debt Status

    // =====================

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

            debtLevel:

            level,

            count:

            summary.count

        };

    },

    // =====================

    // Generate Review

    // =====================

    generateLiabilityReview(){

        return {

            summary:

            this.getLiabilitySummary(),

            analysis:

            this.analyzeDebtStatus(),

            recommendation:

            "Review debt structure and interest cost"

        };

    }

};

export default LiabilityAgent;
