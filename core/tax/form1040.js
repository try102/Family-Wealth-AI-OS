/*

Family Wealth AI OS

Form 1040-style federal tax computation (2026 tax year).

Takes the separated buckets from TaxDataIntegration and
produces 1040-line figures:

  Line 1z  Total income (wages, ordinary dividends,
           taxable interest, capital gains, etc.)
  Line 9   Total income
  Line 11  AGI (no adjustments modeled yet)
  Line 12  Standard deduction (filing-status based)
  Line 15  Taxable income
  Line 16  Tax (ordinary brackets + preferential
           rates for qualified dividends / LTCG)

Gains treatment:
  - Short-term capital gains → ordinary rates
  - Long-term capital gains → preferential (0%/15%/20%)
  - Qualified dividends → preferential (0%/15%/20%)
  - Ordinary dividends, taxable interest → ordinary rates
  - Tax-exempt interest → excluded from income
  - Other capital gains (asset sales, unclassified) →
    ordinary rates (conservative; refine if holding
    period is known)

*/

import TaxTables2026 from "./taxTables2026.js?v=20261010dm";

const Form1040 = {

    compute(taxData, filingStatus = "married_joint") {

        const status =

            TaxTables2026.FILING_STATUS[

                filingStatus.toUpperCase().replace(

                    /[^A-Z]/g,

                    "_"

                )

            ] ||

            filingStatus;

        const validStatus =

            TaxTables2026.ordinaryBrackets[status]

                ? status

                : "married_joint";

        // --- 1040 Line 1-8: Income components ---

        const wages =

            Number(taxData.wageIncome || 0);

        const ordinaryDividends =

            Number(taxData.dividendIncome || 0);

        const qualifiedDividends =

            Number(taxData.qualifiedDividendIncome || 0);

        const taxableInterest =

            Number(taxData.interestIncome || 0);

        // taxExemptInterest is excluded (not in total).

        const shortTermGains =

            Number(taxData.capitalGainsShortTerm || 0);

        const longTermGains =

            Number(taxData.capitalGainsLongTerm || 0);

        const otherGains =

            Number(taxData.capitalGainsOther || 0);

        // --- Line 9: Total income ---

        // Note: qualified dividends are a SUBSET of

        // ordinary dividends for 1040 display, but our

        // buckets keep them separate (qualified was

        // removed from ordinary). Total = sum of buckets.

        const totalIncome =

            wages +

            ordinaryDividends +

            qualifiedDividends +

            taxableInterest +

            shortTermGains +

            longTermGains +

            otherGains;

        // --- Line 11: AGI ---

        // No above-the-line adjustments modeled yet.

        const agi = totalIncome;

        // --- Line 12: Deduction ---

        const standardDeduction =

            TaxTables2026.standardDeduction[validStatus] ||

            0;

        // --- Line 15: Taxable income ---

        const taxableIncome =

            Math.max(0, agi - standardDeduction);

        // --- Split taxable into ordinary vs preferential ---

        // Preferential: qualified dividends + LTCG.

        // These stack on top of ordinary income.

        const preferentialTotal =

            qualifiedDividends + longTermGains;

        // Ordinary taxable = total taxable minus

        // preferential, floored at 0. (If deductions

        // exceed ordinary income, they spill into

        // preferential — simplified here.)

        const ordinaryTaxable =

            Math.max(0, taxableIncome - preferentialTotal);

        // Actual preferential amount subject to

        // preferential rates (can't exceed taxable).

        const preferentialTaxable =

            Math.min(

                preferentialTotal,

                taxableIncome

            );

        // --- Line 16: Tax ---

        const taxResult =

            TaxTables2026.taxWithPreferential(

                ordinaryTaxable,

                preferentialTaxable,

                validStatus

            );

        // --- NIIT (3.8%) estimate ---

        // Applies to lesser of net investment income

        // or MAGI over threshold.

        const niitThreshold =

            TaxTables2026.niitThreshold[validStatus] ||

            250000;

        const netInvestmentIncome =

            ordinaryDividends +

            qualifiedDividends +

            taxableInterest +

            shortTermGains +

            longTermGains +

            otherGains;

        let niit = 0;

        if (agi > niitThreshold && netInvestmentIncome > 0) {

            niit =

                Math.min(

                    netInvestmentIncome,

                    agi - niitThreshold

                ) * TaxTables2026.niitRate;

        }

        const totalTax = taxResult.total + niit;

        return {

            year: TaxTables2026.year,

            filingStatus: validStatus,

            // 1040 lines

            wages,

            ordinaryDividends,

            qualifiedDividends,

            taxableInterest,

            taxExemptInterest:

                Number(taxData.taxExemptInterest || 0),

            shortTermGains,

            longTermGains,

            otherGains,

            totalIncome,

            agi,

            standardDeduction,

            taxableIncome,

            // Tax breakdown

            ordinaryTaxable,

            preferentialTaxable,

            taxOrdinary: taxResult.taxOrdinary,

            taxPreferential: taxResult.taxPreferential,

            preferentialBreakdown:

                taxResult.breakdown,

            niit,

            totalTax,

            taxPaid: Number(taxData.taxPaid || 0),

            balanceDue:

                totalTax - Number(taxData.taxPaid || 0),

        };

    },

};

export default Form1040;
