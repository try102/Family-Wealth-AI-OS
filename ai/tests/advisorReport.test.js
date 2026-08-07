/*

Family Wealth AI OS V7

Advisor Report Engine Test

*/

import AdvisorReport

from "../advisorReport.js";

// =====================

// Basic Test

// =====================

if(

    AdvisorReport.name !==

    "Advisor Report Engine V7"

){

    throw new Error(

        "Advisor Report name failed"

    );

}

if(

    AdvisorReport.version !==

    "7.0"

){

    throw new Error(

        "Advisor Report version failed"

    );

}

// =====================

// Generate Test

// =====================

const report =

AdvisorReport.generate(

    {

        assets:

        {

            totalAssets:

            1000000

        },

        income:

        {

            yearly:

            100000

        },

        liabilities:

        {

            debtRatio:

            20

        },

        cashflow:

        {

            net:

            50000

        },

        investment:

        {

            portfolio:

            "ETF"

        },

        tax:

        {

            status:

            "NORMAL"

        }

    }

);

// =====================

// Result Check

// =====================

if(

    !report.wealthHealth

){

    throw new Error(

        "Wealth health missing"

    );

}

if(

    !report.riskLevel

){

    throw new Error(

        "Risk level missing"

    );

}

if(

    !Array.isArray(

        report.recommendations

    )

){

    throw new Error(

        "Recommendations missing"

    );

}

if(

    !Array.isArray(

        report.alerts

    )

){

    throw new Error(

        "Alerts missing"

    );

}

// =====================

// Risk Logic Test

// =====================

const riskReport =

AdvisorReport.generate(

    {

        liabilities:

        {

            debtRatio:

            60

        },

        cashflow:

        {

            net:

            -1000

        }

    }

);

if(

    riskReport.riskLevel !==

    "HIGH"

){

    throw new Error(

        "Risk calculation failed"

    );

}

if(

    riskReport.wealthHealth !==

    "RISK"

){

    throw new Error(

        "Health calculation failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Advisor Report Engine V7 Test Passed"

);
