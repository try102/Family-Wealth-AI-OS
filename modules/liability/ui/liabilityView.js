/*

 

Family Wealth AI OS V7

Liability View

负债展示层

*/

import LiabilityAPI

    from "../api/liabilityAPI.js?v=20261009by";

import LiabilityAgent

    from "../agent/liabilityAgent.js?v=20261008ae";

import AccountAPI

    from "../../account/api/accountAPI.js?v=20261008aw";

import MemberAPI from "../../member/api/memberAPI.js?v=20261008ap";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261009cc";

import { wireInlineCreate, resolveMemberId, resolveAccountId } from "../../../core/utils/inlineCreate.js?v=20261008ae";

const LiabilityView = {

    name:

        "Liability View V7",

    // ==================================================

    // Main Render

    // ==================================================

    render(

        container,

        onBack

    ){

        // Record any scheduled installments whose

        // repayment date has arrived before showing

        // the list (idempotent).

        try {

            LiabilityAPI

                .syncAllScheduledPayments();

        } catch (syncError) {

        }

        const liabilities =

            LiabilityAPI

                .getLiabilities();

        const summary =

            LiabilityAPI

                .getSummary();

        const analysis =

            LiabilityAgent

                .analyzeDebtStatus();

        // ==================================================

        // Interest Data

        //

        // IMPORTANT:

        // Interest data comes from LiabilityAgent.analysis

        // NOT LiabilityAPI.summary

        // ==================================================

        const annualInterest =

            Number(

                analysis?.annualInterest ||

                0

            );

        const monthlyInterest =

            Number(

                analysis?.monthlyInterest ||

                0

            );

        const averageInterestRate =

            Number(

                analysis?.averageInterestRate ||

                0

            );

        container.innerHTML = `

            <div

                class="app-shell"

            >

                <!-- ================================== -->

                <!-- Header -->

                <!-- ================================== -->

                <header

                    class="app-header"

                >

                    <h1>

                        💳 ${t("liability.title")}

                    </h1>

                    <p>

                        Family Wealth AI OS V7

                    </p>

                </header>

                <div style="padding:10px 20px;">

                    <label>${t("common.language")}</label>

                    <select id="liability-language-select">${languageOptions(getLanguage())}</select>

                </div>

                <!-- ================================== -->

                <!-- Debt Dashboard -->

                <!-- ================================== -->

                <section

                    class="dashboard"

                >

                    <h2>

                        ${t("liability.dashboard")}

                    </h2>

                    <div

                        class="dashboard-grid"

                    >

                        <!-- Liability Count -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("liability.count")}

                            </h3>

                            <div

                                class="value"

                            >

                                ${

                                    liabilities.length

                                }

                            </div>

                        </div>

                        <!-- Total Liability -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("liability.total")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.totalLiability ||

                                    0

                                ).toLocaleString(

                                    "en-US",

                                    {

                                        maximumFractionDigits:

                                            0

                                    }

                                )}

                            </div>

                        </div>

                        <!-- Annual Interest -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("liability.annualInterest")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${annualInterest.toLocaleString(

                                    "en-US",

                                    {

                                        maximumFractionDigits:

                                            0

                                    }

                                )}

                            </div>

                        </div>

                        <!-- Monthly Interest -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("liability.monthlyInterest")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${monthlyInterest.toLocaleString(

                                    "en-US",

                                    {

                                        minimumFractionDigits:

                                            2,

                                        maximumFractionDigits:

                                            2

                                    }

                                )}

                            </div>

                        </div>

                        <!-- Average Interest Rate -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("liability.avgRate")}

                            </h3>

                            <div

                                class="value"

                            >

                                ${averageInterestRate.toFixed(

                                    2

                                )}%

                            </div>

                        </div>

                        <!-- Debt Status -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("liability.debtStatus")}

                            </h3>

                            <div

                                class="value"

                            >

                                ${

                                    analysis?.debtLevel ||

                                    "READY"

                                }

                            </div>

                        </div>

                    </div>

                </section>

                <!-- ================================== -->

                <!-- Add Liability -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <button

                        id="add-liability-button"

                        type="button"

                    >

                        ${t("liability.add")}

                    </button>

                    <button

                        id="compare-liability-button"

                        type="button"

                    >

                        📊 ${t("liability.compare")}

                    </button>

                    <div

                        id="liability-form-container"

                    ></div>

                </section>

                <!-- ================================== -->

                <!-- Liability List -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <h2>

                        Liability List

                    </h2>

                    <div

                        id="liability-list-container"

                    >

                        ${

                            liabilities.length === 0

                            ?

                            `

                            <p>

                                ${t("liability.empty")}

                            </p>

                            `

                            :

                            `

                            <div

                                style="

                                    overflow-x:auto;

                                "

                            >

                                <table

                                    style="

                                        width:100%;

                                        border-collapse:collapse;

                                    "

                                >

                                    <thead>

                                        <tr>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("common.name")}

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("common.category")}

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("account.balance")}

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("liability.interest")}

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("liability.annualInterest")}

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("liability.status")}

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                ${t("common.actions")}

                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        ${

                                            liabilities

                                                .map(

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

                                                        const annualInterest =

                                                            balance *

                                                            rate /

                                                            100;

                                                        const schedule =

                                                            item.repaymentMethod

                                                                ? LiabilityAPI.getSchedule(item.id)

                                                                : null;

                                                        const scheduleLine =

                                                            schedule

                                                                ? `<div style="font-size:12px;color:#666;margin-top:4px;">${this.methodLabel(item.repaymentMethod)} · ${t("liability.progress", { paid: schedule.paidCount, total: schedule.totalPeriods })}${schedule.nextInstallment ? " · " + t("liability.nextPayment", { date: schedule.nextInstallment.date, amount: "$" + schedule.nextInstallment.payment.toLocaleString("en-US", { maximumFractionDigits: 2 }) }) : ""}</div>`

                                                                : "";

                                                        return `

                                                            <tr

                                                                data-liability-id="${

                                                                    item.id

                                                                }"

                                                            >

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    ${

                                                                        item.name ||

                                                                        "Unnamed Liability"

                                                                    }

                                                                    ${scheduleLine}

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    ${

                                                                        this.categoryLabel(

                                                                            item.category

                                                                        )

                                                                    }

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    $${balance.toLocaleString(

                                                                        "en-US",

                                                                        {

                                                                            maximumFractionDigits:

                                                                                0

                                                                        }

                                                                    )}

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    ${rate}%

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    $${annualInterest.toLocaleString(

                                                                        "en-US",

                                                                        {

                                                                            maximumFractionDigits:

                                                                                0

                                                                        }

                                                                    )}

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    ${

                                                                        item.status ||

                                                                        "Active"

                                                                    }

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    <button

                                                                        type="button"

                                                                        class="pay-liability-button"

                                                                        data-id="${

                                                                            item.id

                                                                        }"

                                                                    >

                                                                        ${t("liability.pay")}

                                                                    </button>

                                                                    ${

                                                                        item.repaymentMethod

                                                                            ? `

                                                                    <button

                                                                        type="button"

                                                                        class="schedule-liability-button"

                                                                        data-id="${

                                                                            item.id

                                                                        }"

                                                                    >

                                                                        ${t("liability.schedule")}

                                                                    </button>

                                                                            `

                                                                            : ""

                                                                    }

                                                                    <button

                                                                        type="button"

                                                                        class="edit-liability-button"

                                                                        data-id="${

                                                                            item.id

                                                                        }"

                                                                    >

                                                                        ${t("common.edit")}

                                                                    </button>

                                                                    <button

                                                                        type="button"

                                                                        class="delete-liability-button"

                                                                        data-id="${

                                                                            item.id

                                                                        }"

                                                                    >

                                                                        ${t("common.delete")}

                                                                    </button>

                                                                </td>

                                                            </tr>

                                                        `;

                                                    }

                                                )

                                                .join("")

                                        }

                                    </tbody>

                                </table>

                            </div>

                            `

                        }

                    </div>

                </section>

                <hr>

                <!-- ================================== -->

                <!-- Back -->

                <!-- ================================== -->

                <button

                    id="liability-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

            </div>

        `;

        // ==================================================

        // Language Switch

        // ==================================================

        const languageSelect =

            container.querySelector(

                "#liability-language-select"

            );

        if (languageSelect) {

            languageSelect.addEventListener(

                "change",

                () => {

                    setLanguage(

                        languageSelect.value

                    );

                    this.render(

                        container,

                        onBack

                    );

                }

            );

        }

        // ==================================================

        // Back

        // ==================================================

        const backButton =

            container.querySelector(

                "#liability-back-button"

            );

        if(backButton){

            backButton.addEventListener(

                "click",

                () => {

                    if(

                        typeof onBack ===

                        "function"

                    ){

                        onBack();

                    }

                }

            );

        }

        // ==================================================

        // Add

        // ==================================================

        const compareButton =

            container.querySelector(

                "#compare-liability-button"

            );

        if (compareButton){

            compareButton.addEventListener(

                "click",

                () => {

                    this.showCompare(

                        container,

                        onBack

                    );

                }

            );

        }

        const addButton =

            container.querySelector(

                "#add-liability-button"

            );

        if(addButton){

            addButton.addEventListener(

                "click",

                () => {

                    this.showCreateForm(

                        container,

                        onBack

                    );

                }

            );

        }

        // ==================================================

        // Edit

        // ==================================================

        container

            .querySelectorAll(

                ".edit-liability-button"

            )

            .forEach(

                button => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.showEditForm(

                                container,

                                button.dataset.id,

                                onBack

                            );

                        }

                    );

                }

            );

        // ==================================================

        // Delete

        // ==================================================

        container

            .querySelectorAll(

                ".delete-liability-button"

            )

            .forEach(

                button => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.deleteLiability(

                                container,

                                button.dataset.id,

                                onBack

                            );

                        }

                    );

                }

            );

        // ==================================================

        // Record Payment

        // ==================================================

        container

            .querySelectorAll(

                ".pay-liability-button"

            )

            .forEach(

                button => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.showPaymentForm(

                                container,

                                button.dataset.id,

                                onBack

                            );

                        }

                    );

                }

            );

        // ==================================================

        // Repayment Schedule

        // ==================================================

        container

            .querySelectorAll(

                ".schedule-liability-button"

            )

            .forEach(

                button => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.showSchedule(

                                container,

                                button.dataset.id,

                                onBack

                            );

                        }

                    );

                }

            );

    },

    // ==================================================

    // Repayment Schedule View

    // ==================================================

    showSchedule(

        container,

        id,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#liability-form-container"

            );

        if(!formContainer){

            return;

        }

        const liability =

            LiabilityAPI

                .getLiabilities()

                .find(

                    item =>

                        String(item.id) ===

                        String(id)

                );

        const schedule =

            LiabilityAPI.getSchedule(

                id

            );

        if(!liability || !schedule){

            formContainer.innerHTML = "";

            return;

        }

        const money =

            value =>

                "$" +

                Number(value || 0)

                    .toLocaleString(

                        "en-US",

                        {

                            maximumFractionDigits: 2

                        }

                    );

        const rows =

            schedule.installments

                .map(

                    installment => `

                        <tr>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${installment.period}</td>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${installment.date}</td>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${money(installment.principalPortion)}</td>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${money(installment.interestPortion)}</td>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${money(installment.payment)}</td>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${money(installment.balanceAfter)}</td>

                            <td style="padding:8px;border-bottom:1px solid #eee;">${installment.paid ? t("liability.paidStatus") : t("liability.dueStatus")}</td>

                        </tr>

                    `

                )

                .join("");

        formContainer.innerHTML = `

            <div

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("liability.schedule")} — ${liability.name || ""}

                </h3>

                <p>

                    ${this.methodLabel(liability.repaymentMethod)} · ${t("liability.progress", { paid: schedule.paidCount, total: schedule.totalPeriods })} · ${t("liability.paidPrincipal")}: ${money(schedule.paidPrincipal)} · ${t("liability.paidInterest")}: ${money(schedule.paidInterest)} · ${t("liability.remaining")}: ${money(schedule.remainingBalance)}

                </p>

                <div style="overflow-x:auto;">

                    <table style="width:100%;border-collapse:collapse;">

                        <thead>

                            <tr>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.period")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.date")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.principalPart")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.interestPart")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.installment")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.remaining")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.status")}</th>

                            </tr>

                        </thead>

                        <tbody>

                            ${rows}

                        </tbody>

                    </table>

                </div>

                <br>

                <button

                    type="button"

                    id="close-schedule-button"

                >

                    ${t("common.close")}

                </button>

            </div>

        `;

        const closeButton =

            formContainer.querySelector(

                "#close-schedule-button"

            );

        if(closeButton){

            closeButton.addEventListener(

                "click",

                () => {

                    formContainer.innerHTML =

                        "";

                }

            );

        }

        formContainer.scrollIntoView({

            behavior: "smooth"

        });

    },

    // ==================================================

    // Schedule Labels

    // ==================================================

    categoryLabel(

        category

    ){

        const code =

            String(category || "");

        if (

            LiabilityAPI

                .getCategoryOptions()

                .includes(code)

        ){

            return t(

                "liability.cat." + code

            );

        }

        return code || "Other";

    },

    methodLabel(

        method

    ){

        const code =

            String(method || "");

        if (!code){

            return "";

        }

        return t(

            "liability.method." + code

        );

    },

    buildCategoryOptions(

        selected = ""

    ){

        const known =

            LiabilityAPI

                .getCategoryOptions();

        let options =

            known

                .map(

                    code => `

                        <option

                            value="${code}"

                            ${

                                code === selected

                                    ? "selected"

                                    : ""

                            }

                        >${t("liability.cat." + code)}</option>

                    `

                )

                .join("");

        if (

            selected &&

            !known.includes(selected)

        ){

            options += `

                <option

                    value="${selected}"

                    selected

                >${selected}</option>

            `;

        }

        return options;

    },

    buildMethodOptions(

        selected = ""

    ){

        const none = `

            <option

                value=""

                ${

                    !selected

                        ? "selected"

                        : ""

                }

            >${t("liability.methodNone")}</option>

        `;

        return none +

            LiabilityAPI

                .getMethodOptions()

                .map(

                    code => `

                        <option

                            value="${code}"

                            ${

                                code === selected

                                    ? "selected"

                                    : ""

                            }

                        >${t("liability.method." + code)}</option>

                    `

                )

                .join("");

    },

    scheduleFieldsHtml(

        prefix,

        liability = {}

    ){

        return `

            <label>

                ${t("liability.method")}

            </label>

            <br>

            <select

                id="${prefix}-liability-method"

            >

                ${

                    this.buildMethodOptions(

                        liability.repaymentMethod ||

                        ""

                    )

                }

            </select>

            <br><br>

            <label>

                ${t("liability.termMonths")}

            </label>

            <br>

            <input

                id="${prefix}-liability-term"

                type="number"

                min="0"

                step="1"

                value="${

                    liability.termMonths ||

                    ""

                }"

            >

            <br><br>

            <label>

                ${t("liability.firstPaymentDate")}

            </label>

            <br>

            <input

                id="${prefix}-liability-first-date"

                type="date"

                value="${

                    liability.firstPaymentDate ||

                    ""

                }"

            >

            <br><br>

            <label>

                ${t("liability.paymentAccount")}

            </label>

            <br>

            <select

                id="${prefix}-liability-pay-account"

            >

                <option value="">${t("liability.paymentAccountNone")}</option>

                ${

                    this.buildAccountOptions(

                        liability.paymentAccountId ||

                        ""

                    )

                }

            </select>

            <br><br>

            <label>

                ${t("liability.payAccount2")}

            </label>

            <br>

            <select

                id="${prefix}-liability-pay-account-2"

            >

                <option value="">${t("liability.payAccount2None")}</option>

                ${

                    this.buildAccountOptions(

                        liability.paymentAccountId2 ||

                        ""

                    )

                }

            </select>

            <br><br>

        `;

    },

    readScheduleFields(

        form,

        prefix

    ){

        return {

            repaymentMethod:

                form.querySelector(

                    `#${prefix}-liability-method`

                ).value,

            termMonths:

                Number(

                    form.querySelector(

                        `#${prefix}-liability-term`

                    ).value || 0

                ),

            firstPaymentDate:

                form.querySelector(

                    `#${prefix}-liability-first-date`

                ).value,

            paymentAccountId:

                form.querySelector(

                    `#${prefix}-liability-pay-account`

                ).value,

            paymentAccountId2:

                (

                    form.querySelector(

                        `#${prefix}-liability-pay-account-2`

                    ) || {}

                ).value || ""

        };

    },

    // ==================================================

    // Accounts

    // ==================================================

    getAccounts() {

        try {

            return AccountAPI.getAll() || [];

        } catch (accountError) {

            return [];

        }

    },

    buildAccountOptions(selectedId = "") {

        let members = [];

        try {

            members =

                MemberAPI.getMembers() || [];

        } catch (memberError) {

        }

        const memberName =

            memberId => {

                const member =

                    members.find(

                        item =>

                            String(item.id) ===

                            String(memberId)

                    );

                return member

                    ? (member.name || member.id)

                    : "";

            };

        return this.getAccounts().map(

            account => {

                const owner =

                    memberName(

                        account.memberId ||

                        account.ownerId ||

                        ""

                    );

                const label =

                    (

                        owner

                            ? owner + " · "

                            : ""

                    ) +

                    (account.name || account.id);

                return `

                <option

                    value="${account.id}"

                    ${

                        String(account.id) ===

                        String(selectedId)

                        ?

                        "selected"

                        :

                        ""

                    }

                >

                    ${label}

                </option>

            `;

            }

        ).join("");

    },

    buildMemberOptions(selectedId = "") {

        let members = [];

        try {

            members =

                MemberAPI.getMembers() || [];

        } catch (memberError) {

        }

        return members.map(

            member => `

                <option

                    value="${member.id}"

                    ${

                        String(member.id) ===

                        String(selectedId)

                        ?

                        "selected"

                        :

                        ""

                    }

                >

                    ${member.name || member.id}

                </option>

            `

        ).join("");

    },

    // ==================================================

    // Payment Form

    // ==================================================

    showPaymentForm(

        container,

        id,

        onBack

    ) {

        const liability =

            LiabilityAPI.getLiability(

                id

            );

        if (!liability) {

            return;

        }

        const formContainer =

            container.querySelector(

                "#liability-form-container"

            );

        if (!formContainer) {

            return;

        }

        const paymentSchedule =

            LiabilityAPI.getSchedule(

                liability.id

            );

        const nextInstallment =

            paymentSchedule

                ? paymentSchedule

                    .installments

                    .find(

                        installment =>

                            !installment.paid

                    )

                : null;

        const accounts =

            this.getAccounts();

        const accountOptions =

            this.buildAccountOptions();

        const accountHint =

            accounts.length === 0

            ?

            `

            <p style="color:#c00;">

                No account yet. 没有账户也可以记录还款，会进入 Cash Flow（不影响账户余额）。

            </p>

            `

            :

            "";

        formContainer.innerHTML = `

            <div

                class="liability-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("liability.recordPayment")} — ${liability.name || "Liability"}

                </h3>

                <p>

                    ${t("liability.currentBalance")}: $${Number(liability.currentBalance || 0).toLocaleString()}

                </p>

                <form

                    id="liability-payment-form"

                >

                    <label>

                        ${t("liability.paymentAmount")}

                    </label>

                    <br>

                    <input

                        id="payment-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${nextInstallment ? nextInstallment.payment : (liability.monthlyPayment || "")}"

                    >

                    <br><br>

                    <label>

                        ${t("liability.interestPortion")}

                    </label>

                    <br>

                    <input

                        id="payment-interest"

                        type="number"

                        min="0"

                        step="0.01"

                        value="${nextInstallment ? nextInstallment.interestPortion : 0}"

                    >

                    <br><br>

                    <label>

                        Date

                    </label>

                    <br>

                    <input

                        id="payment-date"

                        type="date"

                    >

                    <br><br>

                    <label>

                        ${t("common.account")}（${t("liability.accountHint")}）

                    </label>

                    <br>

                    <select

                        id="payment-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${accountOptions}

                        <option value="__new_account__">${t("account.newOption")}</option>

                    </select>

                    <br><br>

                    <label>

                        ${t("liability.payAccount2")}

                    </label>

                    <br>

                    <select

                        id="payment-account-2"

                    >

                        <option value="">${t("liability.payAccount2None")}</option>

                        ${this.buildAccountOptions()}

                    </select>

                    <span id="payment-new-account-fields" style="display:none">

                        <input id="payment-new-account-name" type="text" placeholder="${t("account.namePlaceholder")}">

                        <input id="payment-new-account-balance" type="number" step="0.01" placeholder="${t("account.balancePlaceholder")}">

                    </span>

                    ${accountHint}

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-payment-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#liability-payment-form"

            );

        wireInlineCreate(

            form.querySelector(

                "#payment-account"

            ),

            [

                form.querySelector(

                    "#payment-new-account-fields"

                )

            ]

        );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const amount =

                    Number(

                        form.querySelector(

                            "#payment-amount"

                        ).value || 0

                    );

                const interestPortion =

                    Number(

                        form.querySelector(

                            "#payment-interest"

                        ).value || 0

                    );

                const date =

                    form.querySelector(

                        "#payment-date"

                    ).value;

                const ownerMemberId =

                    (() => {

                        try {

                            const liab =

                                LiabilityAPI.getLiabilities().find(

                                    item =>

                                        item.id === id

                                );

                            return liab

                                ? liab.memberId ||

                                    liab.ownerId ||

                                    ""

                                : "";

                        } catch (error) {

                            return "";

                        }

                    })();

                const accountField =

                    form.querySelector(

                        "#payment-account"

                    );

                const accountId =

                    resolveAccountId(

                        accountField,

                        form.querySelector(

                            "#payment-new-account-name"

                        ),

                        form.querySelector(

                            "#payment-new-account-balance"

                        ),

                        ownerMemberId

                    );

                LiabilityAPI.makePayment(

                    id,

                    {

                        amount,

                        interestPortion,

                        date,

                        accountId,

                        accountId2:

                            (

                                form.querySelector(

                                    "#payment-account-2"

                                ) || {}

                            ).value ||

                            ""

                    }

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-payment-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==================================================

    // List View

    // ==================================================

    getListView(){

        return {

            title:

                "Liability Center",

            liabilities:

                LiabilityAPI

                    .getLiabilities()

        };

    },

    // ==================================================

    // Dashboard View

    // ==================================================

    getDashboard(){

        return {

            title:

                "Debt Dashboard",

            summary:

                LiabilityAPI

                    .getSummary(),

            analysis:

                LiabilityAgent

                    .analyzeDebtStatus()

        };

    },

    // ==================================================

    // Table Data

    // ==================================================

    getTableData(){

        const list =

            LiabilityAPI

                .getLiabilities();

        return list.map(

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

                return {

                    id:

                        item.id,

                    name:

                        item.name,

                    category:

                        item.category,

                    balance:

                        balance,

                    rate:

                        rate,

                    annualInterest:

                        balance *

                        rate /

                        100,

                    monthlyInterest:

                        balance *

                        rate /

                        100 /

                        12,

                    status:

                        item.status

                };

            }

        );

    },

    // ==================================================

    // Create Form

    // ==================================================

    // ==================================================

    // Repayment Method Comparison (trial only)

    // ==================================================

    showCompare(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#liability-form-container"

            );

        if (!formContainer){

            return;

        }

        const money =

            value =>

                "$" +

                Number(value || 0)

                    .toLocaleString(

                        "en-US",

                        {

                            maximumFractionDigits: 2

                        }

                    );

        formContainer.innerHTML = `

            <div

                class="liability-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    📊 ${t("liability.compare")}

                </h3>

                <p style="color:#666;font-size:13px;">

                    ${t("liability.compareNote")}

                </p>

                <label>

                    ${t("liability.principal")}

                </label>

                <br>

                <input

                    id="compare-principal"

                    type="number"

                    min="0"

                    step="0.01"

                    value="1000000"

                >

                <br><br>

                <label>

                    ${t("liability.rate")}

                </label>

                <br>

                <input

                    id="compare-rate"

                    type="number"

                    min="0"

                    step="0.01"

                    value="5"

                >

                <br><br>

                <label>

                    ${t("liability.termMonths")}

                </label>

                <br>

                <input

                    id="compare-term"

                    type="number"

                    min="1"

                    step="1"

                    value="240"

                >

                <br><br>

                <button

                    id="compare-run-button"

                    type="button"

                >

                    ${t("liability.compare")}

                </button>

                <div id="compare-results"></div>

            </div>

        `;

        const run = () => {

            const rows =

                LiabilityAPI.compareMethods({

                    principal:

                        Number(

                            formContainer

                                .querySelector(

                                    "#compare-principal"

                                ).value

                        ),

                    interestRate:

                        Number(

                            formContainer

                                .querySelector(

                                    "#compare-rate"

                                ).value

                        ),

                    termMonths:

                        Number(

                            formContainer

                                .querySelector(

                                    "#compare-term"

                                ).value

                        )

                });

            const results =

                formContainer.querySelector(

                    "#compare-results"

                );

            if (!rows.length){

                results.innerHTML = "";

                return;

            }

            results.innerHTML = `

                <div style="overflow-x:auto;margin-top:16px;">

                    <table style="width:100%;border-collapse:collapse;">

                        <thead>

                            <tr>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.method")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.firstPayment")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.lastPayment")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.totalInterest")}</th>

                                <th style="padding:8px;border-bottom:1px solid #ddd;text-align:left;">${t("liability.totalPaid")}</th>

                            </tr>

                        </thead>

                        <tbody>

                            ${rows.map(row => `

                                <tr>

                                    <td style="padding:8px;border-bottom:1px solid #eee;">${this.methodLabel(row.method)}</td>

                                    <td style="padding:8px;border-bottom:1px solid #eee;">${money(row.firstPayment)}</td>

                                    <td style="padding:8px;border-bottom:1px solid #eee;">${money(row.lastPayment)}</td>

                                    <td style="padding:8px;border-bottom:1px solid #eee;">${money(row.totalInterest)}</td>

                                    <td style="padding:8px;border-bottom:1px solid #eee;">${money(row.totalPaid)}</td>

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>

            `;

        };

        formContainer

            .querySelector(

                "#compare-run-button"

            )

            .addEventListener(

                "click",

                run

            );

        run();

    },

    showCreateForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#liability-form-container"

            );

        if(!formContainer){

            return;

        }

        const memberOptions =

            (() => {

                try {

                    return MemberAPI.getMembers().map(

                        member => `<option value="${member.id}">${member.name || member.id}</option>`

                    ).join("");

                } catch (error) {

                    return "";

                }

            })();

        formContainer.innerHTML = `

            <div

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("liability.add")}

                </h3>

                <form

                    id="liability-create-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="liability-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("common.category")}

                    </label>

                    <br>

                    <select

                        id="liability-category"

                    >

                        ${

                            this.buildCategoryOptions(

                                "OTHER"

                            )

                        }

                    </select>

                    <br><br>

                    <label>

                        ${t("liability.principal")}

                    </label>

                    <br>

                    <input

                        id="liability-balance"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("liability.rate")}

                    </label>

                    <br>

                    <input

                        id="liability-rate"

                        type="number"

                        min="0"

                        step="0.01"

                        value="0"

                    >

                    <br><br>

                    ${

                        this.scheduleFieldsHtml(

                            "create",

                            {}

                        )

                    }

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="liability-member"

                    >

                        <option value="">${t("member.familyShared")}</option>

                        ${memberOptions}

                        <option value="__new__">${t("member.newOption")}</option>

                    </select>

                    <input id="liability-new-member-name" type="text" placeholder="${t("member.namePlaceholder")}" style="display:none">

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-liability-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#liability-create-form"

            );

        wireInlineCreate(

            form.querySelector(

                "#liability-member"

            ),

            [

                form.querySelector(

                    "#liability-new-member-name"

                )

            ]

        );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const name =

                    form.querySelector(

                        "#liability-name"

                    )

                    .value

                    .trim();

                const category =

                    form.querySelector(

                        "#liability-category"

                    )

                    .value ||

                    "OTHER";

                const balance =

                    Number(

                        form.querySelector(

                            "#liability-balance"

                        )

                        .value

                    );

                const rate =

                    Number(

                        form.querySelector(

                            "#liability-rate"

                        )

                        .value

                    );

                LiabilityAPI.createLiability({

                    name:

                        name,

                    category:

                        category,

                    principal:

                        balance,

                    currentBalance:

                        balance,

                    interestRate:

                        rate,

                    ...this.readScheduleFields(

                        form,

                        "create"

                    ),

                    memberId:

                        resolveMemberId(

                            form.querySelector(

                                "#liability-member"

                            ),

                            form.querySelector(

                                "#liability-new-member-name"

                            )

                        ),

                    status:

                        "Active"

                });

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-liability-button"

            );

        if(cancelButton){

            cancelButton.addEventListener(

                "click",

                () => {

                    formContainer.innerHTML =

                        "";

                }

            );

        }

    },

    // ==================================================

    // Edit Form

    // ==================================================

    showEditForm(

        container,

        id,

        onBack

    ){

        const liabilities =

            LiabilityAPI

                .getLiabilities();

        const liability =

            liabilities.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if(!liability){

            throw new Error(

                "Liability not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#liability-form-container"

            );

        if(!formContainer){

            return;

        }

        const balance =

            Number(

                liability.currentBalance ??

                liability.balance ??

                0

            );

        const rate =

            Number(

                liability.interestRate ??

                liability.rate ??

                0

            );

        // Current balance is derived, not typed:
        // principal minus the principal actually
        // repaid so far. Manual entry stays
        // available behind an explicit toggle.

        const editSchedule =

            LiabilityAPI.getSchedule(

                liability.id

            );

        const derivedBalance =

            editSchedule

                ? Math.max(

                    Math.round(

                        (

                            Number(

                                liability.principal ||

                                balance

                            ) -

                            Number(

                                editSchedule

                                    .paidPrincipal ||

                                0

                            )

                        ) * 100

                    ) / 100,

                    0

                )

                : null;

        formContainer.innerHTML = `

            <div

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("liability.edit")}

                </h3>

                <form

                    id="liability-edit-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="edit-liability-name"

                        type="text"

                        required

                        value="${

                            liability.name || ""

                        }"

                    >

                    <br><br>

                    <label>

                        ${t("common.category")}

                    </label>

                    <br>

                    <select

                        id="edit-liability-category"

                    >

                        ${

                            this.buildCategoryOptions(

                                liability.category ||

                                "OTHER"

                            )

                        }

                    </select>

                    <br><br>

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="edit-liability-member"

                    >

                        <option value="">${t("member.familyShared")}</option>

                        ${this.buildMemberOptions(liability.memberId || liability.ownerId || "")}

                    </select>

                    <br><br>

                    <label>

                        ${t("liability.principal")}

                    </label>

                    <br>

                    <input

                        id="edit-liability-principal"

                        type="number"

                        min="0"

                        step="0.01"

                        value="${

                            liability.principal ||

                            balance

                        }"

                    >

                    <br><br>

                    <label>

                        ${t("liability.currentBalance")}

                    </label>

                    <br>

                    <input

                        id="edit-liability-balance"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${

                            derivedBalance !== null

                                ? derivedBalance

                                : balance

                        }"

                        ${derivedBalance !== null ? "disabled" : ""}

                    >

                    ${derivedBalance !== null ? `

                    <div style="font-size:12px;color:#666;margin-top:4px;">

                        ${t("liability.derivedBalance")}

                    </div>

                    <label style="font-size:13px;">

                        <input

                            type="checkbox"

                            id="edit-liability-manual-balance"

                        >

                        ${t("liability.manualBalance")}

                    </label>

                    ` : ""}

                    <br><br>

                                        <label>

                        ${t("liability.balanceClass")}

                    </label>

                    <br>

                    <select

                        id="edit-liability-balance-class"

                    >

                        <option value="adjust">${t("liability.balanceClassAdjust")}</option>

                        <option value="payment">${t("liability.balanceClassPayment")}</option>

                    </select>

                    <br><br>

                    <label>

                        ${t("liability.interestPortion")}

                    </label>

                    <br>

                    <input

                        id="edit-liability-payment-interest"

                        type="number"

                        min="0"

                        step="0.01"

                        value="0"

                    >

                    <br><br>

<label>

                        ${t("liability.rate")}

                    </label>

                    <br>

                    <input

                        id="edit-liability-rate"

                        type="number"

                        min="0"

                        step="0.01"

                        value="${

                            rate

                        }"

                    >

                    <br><br>

                    ${

                        this.scheduleFieldsHtml(

                            "edit",

                            liability

                        )

                    }

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-liability-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#liability-edit-form"

            );

        const manualBalanceToggle =

            formContainer.querySelector(

                "#edit-liability-manual-balance"

            );

        if (manualBalanceToggle){

            manualBalanceToggle.addEventListener(

                "change",

                () => {

                    const balanceInput =

                        formContainer.querySelector(

                            "#edit-liability-balance"

                        );

                    if (balanceInput){

                        balanceInput.disabled =

                            !manualBalanceToggle.checked;

                    }

                }

            );

        }

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updated = {

                    name:

                        form.querySelector(

                            "#edit-liability-name"

                        )

                        .value

                        .trim(),

                    category:

                        form.querySelector(

                            "#edit-liability-category"

                        )

                        .value ||

                        "OTHER",

                    memberId:

                        (

                            form.querySelector(

                                "#edit-liability-member"

                            ) || {}

                        ).value ||

                        "", 

                    principal:

                        Number(

                            form.querySelector(

                                "#edit-liability-principal"

                            )

                            .value

                        ),

                    currentBalance:

                        (

                            derivedBalance !== null &&

                            !(

                                form.querySelector(

                                    "#edit-liability-manual-balance"

                                ) || {}

                            ).checked

                        )

                            ? Math.max(

                                Math.round(

                                    (

                                        Number(

                                            form.querySelector(

                                                "#edit-liability-principal"

                                            )

                                            .value

                                        ) -

                                        Number(

                                            (

                                                LiabilityAPI

                                                    .getSchedule(

                                                        id

                                                    ) || {}

                                            )

                                                .paidPrincipal ||

                                            0

                                        )

                                    ) * 100

                                ) / 100,

                                0

                            )

                            : Number(

                                form.querySelector(

                                    "#edit-liability-balance"

                                )

                                .value

                            ),

                    interestRate:

                        Number(

                            form.querySelector(

                                "#edit-liability-rate"

                            )

                            .value

                        ),

                    ...this.readScheduleFields(

                        form,

                        "edit"

                    ),

                    status:

                        liability.status ||

                        "Active"

                };

                // Booking on edit is explicit, never
                // implicit: lowering the balance only
                // becomes a recorded repayment when
                // the user classifies it that way.

                const oldBalance =

                    Number(

                        liability.currentBalance ||

                        0

                    );

                const balanceClass =

                    (

                        form.querySelector(

                            "#edit-liability-balance-class"

                        ) || {}

                    ).value ||

                    "adjust";

                const manualBalanceOn =

                    derivedBalance === null ||

                    (

                        (

                            form.querySelector(

                                "#edit-liability-manual-balance"

                            ) || {}

                        ).checked ===

                        true

                    );

                let bookAsPayment = null;

                if (

                    manualBalanceOn &&

                    balanceClass === "payment" &&

                    updated.currentBalance <

                        oldBalance - 0.004

                ){

                    bookAsPayment = {

                        principal:

                            Math.round(

                                (

                                    oldBalance -

                                    updated.currentBalance

                                ) * 100

                            ) / 100,

                        interest:

                            Number(

                                (

                                    form.querySelector(

                                        "#edit-liability-payment-interest"

                                    ) || {}

                                ).value ||

                                0

                            )

                    };

                    updated.currentBalance =

                        oldBalance;

                }

                LiabilityAPI.updateLiability(

                    id,

                    updated

                );

                const paymentAccountChanged =

                    (updated.paymentAccountId || "") !==

                        (liability.paymentAccountId || "") ||

                    (updated.paymentAccountId2 || "") !==

                        (liability.paymentAccountId2 || "");

                if (paymentAccountChanged){

                    const bookedCount =

                        LiabilityAPI.bookedPaymentCount(

                            id

                        );

                    if (

                        bookedCount > 0 &&

                        window.confirm(

                            t(

                                "liability.migrateConfirm",

                                {

                                    count:

                                        bookedCount

                                }

                            )

                        )

                    ){

                        LiabilityAPI

                            .migratePaymentAccount(

                                id

                            );

                    }

                }

                if (bookAsPayment){

                    LiabilityAPI.makePayment(

                        id,

                        {

                            amount:

                                bookAsPayment.principal +

                                bookAsPayment.interest,

                            interestPortion:

                                bookAsPayment.interest,

                            accountId:

                                updated.paymentAccountId ||

                                "",

                            accountId2:

                                updated.paymentAccountId2 ||

                                ""

                        }

                    );

                }

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-liability-button"

            );

        if(cancelButton){

            cancelButton.addEventListener(

                "click",

                () => {

                    formContainer.innerHTML =

                        "";

                }

            );

        }

    },

    // ==================================================

    // Delete

    // ==================================================

    deleteLiability(

        container,

        id,

        onBack

    ){

        const liabilities =

            LiabilityAPI

                .getLiabilities();

        const liability =

            liabilities.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if(!liability){

            throw new Error(

                "Liability not found: " +

                id

            );

        }

        const confirmed =

            window.confirm(

                "Delete liability: " +

                (

                    liability.name ||

                    "Unnamed Liability"

                ) +

                "?"

            );

        if(!confirmed){

            return;

        }

        LiabilityAPI.deleteLiability(

            id

        );

        this.render(

            container,

            onBack

        );

    }

};

export default LiabilityView;
