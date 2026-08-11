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

        return liabilities.reduce(

            (

                total,

                item

            ) =>

                total +

                Number(

                    item.currentBalance ??

                    item.balance ??

                    0

                ),

            0

        );

    },

    // ==================================================

    // Monthly Payment

    // ==================================================

    totalMonthlyPayment(

        liabilities = []

    ){

        return liabilities.reduce(

            (

                total,

                item

            ) =>

                total +

                Number(

                    item.monthlyPayment ??

                    0

                ),

            0

        );

    },

    // ==================================================

    // Annual Interest

    // ==================================================

    annualInterest(

        liabilities = []

    ){

        return liabilities.reduce(

            (

                total,

                item

            ) => {

                const balance =

                    Number(

                        item.currentBalance ??

                        item.balance ??

                        0

                    );

                const rate =

                    Number(

                        item.interestRate ??

                        item.rate ??

                        0

                    );

                return (

                    total +

                    balance *

                    rate /

                    100

                );

            },

            0

        );

    },

    // ==================================================

    // Monthly Interest

    // ==================================================

    monthlyInterest(

        liabilities = []

    ){

        return (

            this.annualInterest(

                liabilities

            ) /

            12

        );

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

        let weightedBalance = 0;

        let totalDebt = 0;

        liabilities.forEach(

            item => {

                const balance =

                    Number(

                        item.currentBalance ??

                        item.balance ??

                        0

                    );

                const rate =

                    Number(

                        item.interestRate ??

                        item.rate ??

                        0

                    );

                weightedBalance +=

                    balance *

                    rate;

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

            weightedBalance /

            totalDebt

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

        const assetValue =

            assets.reduce(

                (

                    total,

                    item

                ) =>

                    total +

                    Number(

                        item.value ??

                        0

                    ),

                0

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

            annualInterest:

                annualInterest,

            monthlyInterest:

                monthlyInterest,

            averageInterestRate:

                this.averageInterestRate(

                    liabilities

                ),

            debtAssetRatio:

                this.debtAssetRatio(

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
