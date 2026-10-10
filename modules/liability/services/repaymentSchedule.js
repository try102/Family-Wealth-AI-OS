/*

Family Wealth AI OS V7

Liability Repayment Schedule

负债还款计划计算（纯计算，无副作用）：

只输入借款金额、年利率、还款方式、期数与首次

还款日，即可生成逐期还款表，并把每期拆成本金

与利息。还款日已到的期数算已还款，未到的算待还。

还款方式：

- EQUAL_INSTALLMENT 等额本息：每期还款额相同

- EQUAL_PRINCIPAL 等额本金：每期本金相同，利息递减

- INTEREST_ONLY 先息后本：每期只付利息，到期还本金

- LUMP_SUM 到期一次还本付息：到期日一次付清

*/

export const REPAYMENT_METHODS = [

    "EQUAL_INSTALLMENT",

    "EQUAL_PRINCIPAL",

    "INTEREST_ONLY",

    "LUMP_SUM"

];

export const LIABILITY_CATEGORIES = [

    "MORTGAGE",

    "SECURED_LOAN",

    "PERSONAL_LOAN",

    "CREDIT_CARD",

    "MARGIN",

    "OTHER"

];

function roundMoney(value) {

    return Math.round(

        (Number(value) + Number.EPSILON) * 100

    ) / 100;

}

function pad2(value) {

    return String(value).padStart(2, "0");

}

export function formatDate(date) {

    return (

        date.getFullYear() +

        "-" +

        pad2(date.getMonth() + 1) +

        "-" +

        pad2(date.getDate())

    );

}

export function addMonths(dateText, months) {

    const parts =

        String(dateText || "")

            .split("-")

            .map(Number);

    if (

        parts.length !== 3 ||

        parts.some(part => !Number.isFinite(part))

    ) {

        return "";

    }

    const year = parts[0];

    const month = parts[1];

    const day = parts[2];

    const target =

        new Date(year, month - 1 + months, 1);

    const lastDay =

        new Date(

            target.getFullYear(),

            target.getMonth() + 1,

            0

        ).getDate();

    target.setDate(

        Math.min(day, lastDay)

    );

    return formatDate(target);

}

export function todayText(now = new Date()) {

    return formatDate(now);

}

/*

 * Build the full installment list.

 *

 * Returns [] when the loan has no usable schedule

 * (no method, no principal, no term, no date).

 */

export function computeSchedule(loan = {}) {

    const principal =

        Number(loan.principal || 0);

    const annualRate =

        Number(loan.interestRate || 0);

    const method =

        String(loan.repaymentMethod || "");

    const termMonths =

        Math.floor(Number(loan.termMonths || 0));

    const firstPaymentDate =

        String(loan.firstPaymentDate || "");

    if (

        !REPAYMENT_METHODS.includes(method) ||

        !(principal > 0) ||

        !(termMonths > 0) ||

        !firstPaymentDate

    ) {

        return [];

    }

    const monthlyRate =

        annualRate / 100 / 12;

    const installments = [];

    if (method === "LUMP_SUM") {

        const interest =

            roundMoney(

                principal *

                (annualRate / 100) *

                (termMonths / 12)

            );

        installments.push({

            period: 1,

            date: addMonths(

                firstPaymentDate,

                termMonths - 1

            ),

            payment: roundMoney(principal + interest),

            principalPortion: principal,

            interestPortion: interest,

            balanceAfter: 0

        });

        return installments;

    }

    let balance = principal;

    let levelPayment = 0;

    if (method === "EQUAL_INSTALLMENT") {

        levelPayment =

            monthlyRate > 0

                ? roundMoney(

                    principal *

                    monthlyRate /

                    (

                        1 -

                        Math.pow(

                            1 + monthlyRate,

                            -termMonths

                        )

                    )

                )

                : roundMoney(

                    principal / termMonths

                );

    }

    const levelPrincipal =

        method === "EQUAL_PRINCIPAL"

            ? roundMoney(principal / termMonths)

            : 0;

    for (

        let period = 1;

        period <= termMonths;

        period++

    ) {

        const isLast =

            period === termMonths;

        const interest =

            roundMoney(balance * monthlyRate);

        let principalPortion;

        let payment;

        if (method === "EQUAL_INSTALLMENT") {

            principalPortion =

                isLast

                    ? balance

                    : roundMoney(

                        levelPayment - interest

                    );

            payment =

                roundMoney(

                    principalPortion + interest

                );

        } else if (method === "EQUAL_PRINCIPAL") {

            principalPortion =

                isLast

                    ? balance

                    : levelPrincipal;

            payment =

                roundMoney(

                    principalPortion + interest

                );

        } else {

            // INTEREST_ONLY

            principalPortion =

                isLast

                    ? balance

                    : 0;

            payment =

                roundMoney(

                    principalPortion + interest

                );

        }

        balance =

            roundMoney(

                balance - principalPortion

            );

        installments.push({

            period,

            date: addMonths(

                firstPaymentDate,

                period - 1

            ),

            payment,

            principalPortion,

            interestPortion:

                interest,

            balanceAfter:

                Math.max(balance, 0)

        });

    }

    return installments;

}

/*

 * Split a schedule into paid / upcoming by date and

 * total up what has been repaid so far. Installments

 * the service already recorded (paidPeriods) always

 * count as paid, even if the date later shifts.

 */

export function summarizeSchedule(

    installments = [],

    today = todayText(),

    paidPeriods = []

) {

    const paidSet =

        new Set(

            (paidPeriods || []).map(

                period => Number(period)

            )

        );

    let paidPrincipal = 0;

    let paidInterest = 0;

    let paidCount = 0;

    let nextInstallment = null;

    installments.forEach(installment => {

        const paid =

            paidSet.has(installment.period) ||

            installment.date <= today;

        installment.paid = paid;

        if (paid) {

            paidCount += 1;

            paidPrincipal =

                roundMoney(

                    paidPrincipal +

                    installment.principalPortion

                );

            paidInterest =

                roundMoney(

                    paidInterest +

                    installment.interestPortion

                );

        } else if (!nextInstallment) {

            nextInstallment = installment;

        }

    });

    const totalPrincipal =

        installments.reduce(

            (sum, installment) =>

                sum + installment.principalPortion,

            0

        );

    return {

        installments,

        totalPeriods:

            installments.length,

        paidCount,

        paidPrincipal,

        paidInterest,

        remainingBalance:

            roundMoney(

                totalPrincipal - paidPrincipal

            ),

        nextInstallment

    };

}

export default {

    REPAYMENT_METHODS,

    LIABILITY_CATEGORIES,

    computeSchedule,

    summarizeSchedule,

    addMonths,

    todayText

};
