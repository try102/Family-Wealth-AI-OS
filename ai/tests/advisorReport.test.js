/*

Family Wealth AI OS V7

Advisor Report Engine Test

*/

import AdvisorReport

from "../advisorReport.js";

// =====================

// Basic Information

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

// Healthy Wealth Test

// =====================

const healthyReport =

AdvisorReport.generate(

    {

        wealth:

        {

            netWorth:

            800000,

            wealthScore:

            80,

            liquidityMonths:

            6,

            cashFlow:

            {

                netCashFlow:

                50000

            }

        },

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

// Healthy Result

// =====================

if(

    healthyReport.wealthHealth !==

    "GOOD"

){

    throw new Error(

        "Healthy wealth assessment failed"

    );

}

if(

    healthyReport.riskLevel !==

    "LOW"

){

    throw new Error(

        "Healthy risk assessment failed"

    );

}

if(

    healthyReport.metrics.netWorth !==

    800000

){

    throw new Error(

        "Net worth metric failed"

    );

}

if(

    healthyReport.metrics.wealthScore !==

    80

){

    throw new Error(

        "Wealth score metric failed"

    );

}

if(

    healthyReport.metrics.liquidityMonths !==

    6

){

    throw new Error(

        "Liquidity metric failed"

    );

}

if(

    healthyReport.metrics.netCashFlow !==

    50000

){

    throw new Error(

        "Net cash flow metric failed"

    );

}

if(

    !Array.isArray(

        healthyReport.recommendations

    )

){

    throw new Error(

        "Healthy recommendations failed"

    );

}

if(

    !Array.isArray(

        healthyReport.alerts

    )

){

    throw new Error(

        "Healthy alerts failed"

    );

}

// =====================

// High Risk Test

// =====================

const riskReport =

AdvisorReport.generate(

    {

        wealth:

        {

            netWorth:

            300000,

            wealthScore:

            35,

            liquidityMonths:

            1,

            cashFlow:

            {

                netCashFlow:

                -20000

            }

        },

        liabilities:

        {

            debtRatio:

            65

        },

        cashflow:

        {

            net:

            -20000

        },

        tax:

        {

            status:

            "NORMAL"

        }

    }

);

// =====================

// Risk Result

// =====================

if(

    riskReport.wealthHealth !==

    "RISK"

){

    throw new Error(

        "High risk wealth assessment failed"

    );

}

if(

    riskReport.riskLevel !==

    "HIGH"

){

    throw new Error(

        "High risk level failed"

    );

}

if(

    riskReport.recommendations.length < 3

){

    throw new Error(

        "Risk recommendations failed"

    );

}

if(

    riskReport.alerts.length < 3

){

    throw new Error(

        "Risk alerts failed"

    );

}

// =====================

// Negative Cash Flow Test

// =====================

const cashFlowReport =

AdvisorReport.generate(

    {

        wealth:

        {

            netWorth:

            700000,

            wealthScore:

            75,

            liquidityMonths:

            6,

            cashFlow:

            {

                netCashFlow:

                -5000

            }

        },

        liabilities:

        {

            debtRatio:

            20

        },

        cashflow:

        {

            net:

            -5000

        },

        tax:

        {

            status:

            "NORMAL"

        }

    }

);

// =====================

// Cash Flow Result

// =====================

if(

    cashFlowReport.wealthHealth !==

    "WARNING"

){

    throw new Error(

        "Negative cash flow health assessment failed"

    );

}

if(

    !cashFlowReport.recommendations.includes(

        "Increase positive cash flow"

    )

){

    throw new Error(

        "Cash flow recommendation failed"

    );

}

if(

    !cashFlowReport.alerts.includes(

        "Negative net cash flow"

    )

){

    throw new Error(

        "Cash flow alert failed"

    );

}

// =====================

// Low Liquidity Test

// =====================

const liquidityReport =

AdvisorReport.generate(

    {

        wealth:

        {

            netWorth:

            900000,

            wealthScore:

            75,

            liquidityMonths:

            2,

            cashFlow:

            {

                netCashFlow:

                30000

            }

        },

        liabilities:

        {

            debtRatio:

            20

        },

        tax:

        {

            status:

            "NORMAL"

        }

    }

);

// =====================

// Liquidity Result

// =====================

if(

    !liquidityReport.recommendations.includes(

        "Increase emergency liquidity"

    )

){

    throw new Error(

        "Liquidity recommendation failed"

    );

}

if(

    !liquidityReport.alerts.includes(

        "Low liquidity coverage"

    )

){

    throw new Error(

        "Liquidity alert failed"

    );

}

// =====================

// Missing Wealth Data Test

// =====================

const missingWealthReport =

AdvisorReport.generate(

    {

        assets:

        {},

        income:

        {},

        liabilities:

        {},

        cashflow:

        {},

        investment:

        {},

        tax:

        {}

    }

);

if(

    !missingWealthReport.alerts.includes(

        "Wealth Engine data unavailable"

    )

){

    throw new Error(

        "Missing Wealth Engine alert failed"

    );

}

// =====================

// Final

// =====================

console.log(

    "Advisor Report Engine V7 Test Passed"

);
