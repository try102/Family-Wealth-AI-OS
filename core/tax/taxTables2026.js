/*

Family Wealth AI OS

2026 Federal Tax Tables (tax year 2026, filed in 2027)

Sources: IRS Rev. Proc. 2025-32 (brackets, standard deduction,
capital-gain thresholds). Figures verified 2026-10-10.

*/

const TaxTables2026 = {

    year: 2026,

    // Filing statuses

    FILING_STATUS: {

        SINGLE: "single",

        MARRIED_JOINT: "married_joint",

        MARRIED_SEPARATE: "married_separate",

        HEAD_OF_HOUSEHOLD: "head_of_household",

    },

    // Standard deductions (2026)

    standardDeduction: {

        single: 16100,

        married_joint: 32200,

        married_separate: 16100,

        head_of_household: 24150,

    },

    // Ordinary income tax brackets (2026).

    // Each entry: [upper bound of bracket, rate].

    // Upper bound is Infinity for the top bracket.

    ordinaryBrackets: {

        single: [

            [12400, 0.10],

            [50400, 0.12],

            [105700, 0.22],

            [201775, 0.24],

            [256225, 0.32],

            [640600, 0.35],

            [Infinity, 0.37],

        ],

        married_joint: [

            [24800, 0.10],

            [100800, 0.12],

            [211400, 0.22],

            [403550, 0.24],

            [512450, 0.32],

            [768700, 0.35],

            [Infinity, 0.37],

        ],

        married_separate: [

            [12400, 0.10],

            [50400, 0.12],

            [105700, 0.22],

            [201775, 0.24],

            [256225, 0.32],

            [384350, 0.35],

            [Infinity, 0.37],

        ],

        head_of_household: [

            [17700, 0.10],

            [67450, 0.12],

            [105700, 0.22],

            [201750, 0.24],

            [256200, 0.32],

            [640600, 0.35],

            [Infinity, 0.37],

        ],

    },

    // Preferential-rate thresholds for qualified dividends

    // and long-term capital gains (2026). These apply to

    // TOTAL taxable income (ordinary income stacks first).

    // [0% up to, 15% up to]; above is 20%.

    preferentialThresholds: {

        single: [49450, 545500],

        married_joint: [98900, 613700],

        married_separate: [49450, 306850],

        head_of_household: [66200, 579600],

    },

    preferentialRates: [0, 0.15, 0.20],

    // Net Investment Income Tax (3.8%)

    niitRate: 0.038,

    niitThreshold: {

        single: 200000,

        married_joint: 250000,

        married_separate: 125000,

        head_of_household: 200000,

    },

    // Compute tax on ordinary taxable income using

    // marginal brackets.

    taxOnOrdinary(taxableIncome, filingStatus) {

        const brackets =

            this.ordinaryBrackets[filingStatus] ||

            this.ordinaryBrackets.single;

        let remaining = Math.max(0, taxableIncome);

        let tax = 0;

        let prevBound = 0;

        for (const [bound, rate] of brackets) {

            if (remaining <= 0) break;

            const inBracket =

                Math.min(remaining, bound - prevBound);

            tax += inBracket * rate;

            remaining -= inBracket;

            prevBound = bound;

        }

        return tax;

    },

    // Compute total tax given:

    //   ordinaryTaxable: taxable income taxed at ordinary rates

    //   preferentialAmount: qualified dividends + LTCG

    //   filingStatus

    // Uses the Schedule D worksheet stacking logic:

    // ordinary income fills lower layers first, then

    // preferential income stacks on top and is taxed

    // at 0%/15%/20% based on where it falls.

    taxWithPreferential(

        ordinaryTaxable,

        preferentialAmount,

        filingStatus

    ) {

        const ord = Math.max(0, ordinaryTaxable);

        const pref = Math.max(0, preferentialAmount);

        // Tax on ordinary portion at ordinary rates.

        const taxOrdinary =

            this.taxOnOrdinary(ord, filingStatus);

        if (pref === 0) {

            return {

                taxOrdinary,

                taxPreferential: 0,

                total: taxOrdinary,

                breakdown: [],

            };

        }

        const [thresh0, thresh15] =

            this.preferentialThresholds[filingStatus] ||

            this.preferentialThresholds.single;

        // How much of the preferential amount falls

        // in each preferential layer. Ordinary income

        // occupies the bottom; preferential stacks on top.

        let remaining = pref;

        const breakdown = [];

        // 0% layer: from max(ord, 0) to thresh0

        const room0 = Math.max(0, thresh0 - ord);

        const amt0 = Math.min(remaining, room0);

        if (amt0 > 0) {

            breakdown.push({ rate: 0, amount: amt0 });

            remaining -= amt0;

        }

        // 15% layer: from max(ord, thresh0) to thresh15

        const room15 =

            Math.max(0, thresh15 - Math.max(ord, thresh0));

        const amt15 = Math.min(remaining, room15);

        if (amt15 > 0) {

            breakdown.push({ rate: 0.15, amount: amt15 });

            remaining -= amt15;

        }

        // 20% layer: remainder

        if (remaining > 0) {

            breakdown.push({ rate: 0.20, amount: remaining });

        }

        let taxPreferential = 0;

        breakdown.forEach(b => {

            taxPreferential += b.amount * b.rate;

        });

        return {

            taxOrdinary,

            taxPreferential,

            total: taxOrdinary + taxPreferential,

            breakdown,

        };

    },

};

export default TaxTables2026;
