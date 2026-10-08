/*

 

Family Wealth AI OS V7

Liability View

负债展示层

*/

import LiabilityAPI

    from "../api/liabilityAPI.js";

import LiabilityAgent

    from "../agent/liabilityAgent.js";

import AccountAPI

    from "../../account/api/accountAPI.js";

import MemberAPI from "../../member/api/memberAPI.js";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js";

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

                                                                </td>

                                                                <td

                                                                    style="

                                                                        padding:10px;

                                                                    "

                                                                >

                                                                    ${

                                                                        item.category ||

                                                                        "Other"

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

        return this.getAccounts().map(

            account => `

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

                    ${

                        account.name ||

                        account.id

                    }

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

                        value="${liability.monthlyPayment || ""}"

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

                        value="0"

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

                    </select>

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

                const accountField =

                    form.querySelector(

                        "#payment-account"

                    );

                const accountId =

                    accountField

                    ?

                    accountField.value

                    :

                    "";

                LiabilityAPI.makePayment(

                    id,

                    {

                        amount,

                        interestPortion,

                        date,

                        accountId

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

                    <input

                        id="liability-category"

                        type="text"

                        value="Other"

                    >

                    <br><br>

                    <label>

                        ${t("liability.currentBalance")}

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

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="liability-member"

                    >

                        <option value="">${t("member.familyShared")}</option>

                        ${memberOptions}

                    </select>

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

                    .value

                    .trim() ||

                    "Other";

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

                    currentBalance:

                        balance,

                    interestRate:

                        rate,

                    memberId:

                        form.querySelector(

                            "#liability-member"

                        )?.value || "",

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

                    <input

                        id="edit-liability-category"

                        type="text"

                        value="${

                            liability.category ||

                            "Other"

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

                            balance

                        }"

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

                        .value

                        .trim() ||

                        "Other",

                    currentBalance:

                        Number(

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

                    status:

                        liability.status ||

                        "Active"

                };

                LiabilityAPI.updateLiability(

                    id,

                    updated

                );

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
