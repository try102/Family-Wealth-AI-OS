/*

Family Wealth AI OS V7

Liability Analysis Engine

负债分析引擎

*/

const LiabilityAnalysisEngine = {

    name:

    "Liability Analysis Engine V7",

    // =====================

    // Total Debt

    // =====================

    totalDebt(

        liabilities = []

    ){

        let total = 0;

        liabilities.forEach(

            item=>{

                total +=

                Number(

                    item.currentBalance || 0

                );

            }

        );

        return total;

    },

    // =====================

    // Monthly Payment

    // =====================

    totalMonthlyPayment(

        liabilities = []

    ){

        let total = 0;

        liabilities.forEach(

            item=>{

                total +=

                Number(

                    item.monthlyPayment || 0

                );

            }

        );

        return total;

    },

    // =====================

    // Average Interest Rate

    // =====================

    averageInterestRate(

        liabilities = []

    ){

        if(

            liabilities.length === 0

        ){

            return 0;

        }

        let total = 0;

        liabilities.forEach(

            item=>{

                total +=

                Number(

                    item.interestRate || 0

                );

            }

        );

        return (

            total /

            liabilities.length

        );

    },

    // =====================

    // Debt Asset Ratio

    // =====================

    debtAssetRatio(

        liabilities = [],

        assets = []

    ){

        const debt =

        this.totalDebt(

            liabilities

        );

        let assetValue = 0;

        assets.forEach(

            item=>{

                assetValue +=

                Number(

                    item.value || 0

                );

            }

        );

        if(

            assetValue === 0

        ){

            return 0;

        }

        return (

            debt /

            assetValue

        );

    },

    // =====================

    // Debt Risk Score

    // =====================

    debtRiskScore(

        liabilities = []

    ){

        const debt =

        this.totalDebt(

            liabilities

        );

        const interest =

        this.averageInterestRate(

            liabilities

        );

        let score = 0;

        if(

            debt > 500000

        ){

            score += 40;

        }

        else if(

            debt > 100000

        ){

            score += 20;

        }

        if(

            interest > 10

        ){

            score += 40;

        }

        else if(

            interest > 5

        ){

            score += 20;

        }

        return Math.min(

            score,

            100

        );

    },

    // =====================

    // Full Analysis

    // =====================

    analyze(

        liabilities = []

    ){

        return {

            totalDebt:

            this.totalDebt(

                liabilities

            ),

            monthlyPayment:

            this.totalMonthlyPayment(

                liabilities

            ),

            averageInterestRate:

            this.averageInterestRate(

                liabilities

            ),

            debtRiskScore:

            this.debtRiskScore(

                liabilities

            )

        };

    }

};

export default LiabilityAnalysisEngine;
