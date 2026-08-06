/*

Family Wealth AI OS V7

Advisor Agent

*/

import PortfolioEngine from "../../core/portfolio/portfolioEngine.js";

import RiskEngine from "../../core/risk/riskEngine.js";

import CashFlowEngine from "../../core/cashflow/cashFlowEngine.js";

import TaxEngine from "../../core/tax/taxEngine.js";

import RetirementEngine from "../../core/retirement/retirementEngine.js";

import WealthScoreEngine from "../../core/wealthScore/wealthScoreEngine.js";

const AdvisorAgent = {

    name:

    "Family Wealth Advisor V7",

    analyze(){

        return {

            portfolio:

            {

                value:

                PortfolioEngine.totalValue(),

                allocation:

                PortfolioEngine.allocation()

            },

            risk:

            RiskEngine.report(),

            cashFlow:

            CashFlowEngine.report(),

            tax:

            TaxEngine.report(),

            retirement:

            RetirementEngine.report(),

            wealthScore:

            WealthScoreEngine.report()

        };

    },

    summary(){

        const report =

        this.analyze();

        return {

            score:

            report.wealthScore.score,

            risk:

            report.risk.level,

            cashFlow:

            report.cashFlow.net,

            message:

            this.generateMessage(

                report

            )

        };

    },

    generateMessage(

        report

    ){

        const score =

        report.wealthScore.score;

        if(

            score >=80

        ){

            return (

                "Your wealth structure is healthy."

            );

        }

        if(

            score >=60

        ){

            return (

                "Your wealth structure is stable but can improve."

            );

        }

        return (

            "Your wealth structure needs attention."

        );

    }

};

export default AdvisorAgent;
