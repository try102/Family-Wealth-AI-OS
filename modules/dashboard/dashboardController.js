/*

Family Wealth AI OS V7

Dashboard Controller

*/

import WealthAPI

from "../../api/wealthAPI.js";

import AdvisorAPI

from "../../api/advisorAPI.js";

const DashboardController = {

    load(){

        return {

            wealth:

            WealthAPI.dashboard(),

            advice:

            AdvisorAPI.ask(

                "我的财富情况怎么样？"

            )

        };

    },

    summary(){

        const data =

        this.load();

        return {

            score:

            data.wealth.wealthScore.score,

            level:

            data.wealth.wealthScore.level,

            cashFlow:

            data.wealth.cashFlow.net,

            message:

            data.advice.data.answer

        };

    }

};

export default DashboardController;
