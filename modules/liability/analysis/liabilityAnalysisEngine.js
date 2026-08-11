/*

Family Wealth AI OS V7

Liability Analysis Engine

负债分析引擎

*/

const LiabilityAnalysisEngine = {

    name:

        "Liability Analysis Engine V7",

    // ==================================================

    // Total Debt

    // ==================================================

    totalDebt(

        liabilities = []

    ){

        let total = 0;

        liabilities.forEach(

            item => {

                total +=

                    Number(

                        item.currentBalance || 0

                    );

            }

        );

        return total;

    },

    // ==================================================

    // Monthly Payment

    // ==================================================

    totalMonthlyPayment(

        liabilities = []

    ){

        let total = 0;

        liabilities.forEach(

            item => {

                total +=

                    Number(

                        item.monthlyPayment || 0

                    );

            }

        );

        return total;

    },

    // ==================================================

    // Average Interest Rate

    // ==================================================

    averageInterestRate(

        liabilities = []

    ){

        if(

            liabilities.length === 0

        ){

            return 0;

        }

        let totalWeightedInterest = 0;

        let totalDebt = 0;

        liabilities.forEach(

            item => {

                const balance =

                    Number(

                        item.currentBalance || 0

                    );

                const rate =

                    Number(

                        item.interestRate || 0

                    );

                totalWeightedInterest +=

                    balance * rate;

                totalDebt +=

                    balance;

            }

        );

        if(

            totalDebt === 0

        ){

            return 0;

        }

        return (

            totalWeightedInterest /

            totalDebt

        );

    },

    // ==================================================

    // Annual Interest

    //

    // 利息 = 当前负债余额 × 年利率

    //

    // 例如：

    //

    // $250,000 × 6% = $15,000

    //

    // ==================================================

    annualInterest(

        liabilities = []

    ){

        let total = 0;

        liabilities.forEach(

            item => {

                const balance =

                    Number(

                        item.currentBalance || 0

                    );

                const rate =

                    Number(

                        item.interestRate || 0

                    );

                total +=

                    balance *

                    (

                        rate / 100

                    );

            }

        );

        return total;

    },

    // ==================================================

    // Monthly Interest

    //

    // 年利息 ÷ 12

    //

    // ==================================================

    monthlyInterest(

        liabilities = []

    ){

        return (

            this.annualInterest(

                liabilities

            ) / 12

        );

    },

    // ==================================================

    // Debt Asset Ratio

    // ==================================================

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

            item => {

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

    // ==================================================

    // Debt Risk Score

    // ==================================================

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

    // ==================================================

    // Full Analysis

    // ==================================================

    analyze(

        liabilities = []

    ){

        const totalDebt =

            this.totalDebt(

                liabilities

            );

        const annualInterest =

            this.annualInterest(

                liabilities

            );

        const monthlyInterest =

            this.monthlyInterest(

                liabilities

            );

        return {

            totalDebt:

                totalDebt,

            monthlyPayment:

                this.totalMonthlyPayment(

                    liabilities

                ),

            averageInterestRate:

                this.averageInterestRate(

                    liabilities

                ),

            annualInterest:

                annualInterest,

            monthlyInterest:

                monthlyInterest,

            debtAssetRatio:

                0,

            debtRiskScore:

                this.debtRiskScore(

                    liabilities

                )

        };

    }

};

export default LiabilityAnalysisEngine;
