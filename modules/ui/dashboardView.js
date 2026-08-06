/*

Family Wealth AI OS V7

Dashboard View Adapter

*/

import DashboardController

from "../dashboard/dashboardController.js";

const DashboardView = {

    render(){

        const data =

        DashboardController.summary();

        return {

            wealthScore:

            data.score,

            level:

            data.level,

            cashFlow:

            data.cashFlow,

            message:

            data.message

        };

    },

    text(){

        const view =

        this.render();

        return `

财富评分:

${view.wealthScore}

等级:

${view.level}

现金流:

${view.cashFlow}

AI建议:

${view.message}

`;

    }

};

export default DashboardView;
