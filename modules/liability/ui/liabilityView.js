/*

Family Wealth AI OS V7

Liability View

负债展示层

*/

import LiabilityAPI from "../api/liabilityAPI.js";

import LiabilityAgent from "../agent/liabilityAgent.js";

const LiabilityView = {

    name:

    "Liability View V7",

    // =====================

    // List View

    // =====================

    getListView(){

        return {

            title:

            "Liability Center",

            liabilities:

            LiabilityAPI

            .getLiabilities()

        };

    },

    // =====================

    // Dashboard View

    // =====================

    getDashboard(){

        return {

            title:

            "Debt Dashboard",

            summary:

            LiabilityAPI

            .getSummary(),

            analysis:

            LiabilityAgent

            .analyzeDebtStatus()

        };

    },

    // =====================

    // Table Data

    // =====================

    getTableData(){

        const list =

        LiabilityAPI

        .getLiabilities();

        return list.map(

            item=>({

                id:

                item.id,

                name:

                item.name,

                category:

                item.category,

                balance:

                item.currentBalance,

                rate:

                item.interestRate,

                status:

                item.status

            })

        );

    }

};

export default LiabilityView;
