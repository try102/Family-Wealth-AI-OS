/*

Family Wealth AI OS V7

Income View

收入展示层

*/

import IncomeAgent from "../agent/incomeAgent.js?v=20261008ae";

import AccountAPI from "../../account/api/accountAPI.js?v=20261008aw";

import MemberAPI from "../../member/api/memberAPI.js?v=20261008ap";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261009bh";

import { wireInlineCreate, resolveMemberId, resolveAccountId } from "../../../core/utils/inlineCreate.js?v=20261008ae";

const IncomeView = {

    name: "Income View V7",

    // ==================================================

    // Main Render

    // ==================================================

    render(container, onBack) {

        const incomes = IncomeAgent.getIncome();

        const summary = IncomeAgent.getIncomeSummary();

        container.innerHTML = `

            <div class="income-center">

                <h1>

                    💵 ${t("income.title")}

                </h1>

                <button

                    id="income-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

                <br><br>

                <label>${t("common.language")}</label>

                <select id="income-language-select">${languageOptions(getLanguage())}</select>

                <hr>

                <section>

                    <h2>

                        ${t("income.summary")}

                    </h2>

                    <p>

                        <strong>${t("income.total")}:</strong>

                        $${Number(

                            summary.totalIncome || 0

                        ).toLocaleString()}

                    </p>

                    <p>

                        <strong>${t("income.count")}:</strong>

                        ${Number(

                            summary.count || 0

                        )}

                    </p>

                </section>

                <hr>

                <button

                    id="add-income-button"

                    type="button"

                >

                    ${t("income.add")}

                </button>

                <div

                    id="income-form-container"

                ></div>

                <hr>

                <section>

                    <h2>

                        ${t("income.records")}

                    </h2>

                    <div id="income-list-container">

                        ${

                            incomes.length === 0

                            ?

                            `

                            <p>

                                ${t("income.empty")}

                            </p>

                            `

                            :

                            `

                            <ul>

                                ${

                                    incomes.map(

                                        income => `

                                        <li

                                            data-income-id="${income.id}"

                                            style="margin-bottom:15px;"

                                        >

                                            <strong>

                                                ${

                                                    income.name ||

                                                    income.source ||

                                                    "Unnamed Income"

                                                }

                                            </strong>

                                            <br>

                                            ${t("income.source")}:

                                            ${

                                                income.source ||

                                                "N/A"

                                            }

                                            <br>

                                            ${t("income.type")}:

                                            ${

                                                income.type ||

                                                "Other"

                                            }

                                            <br>

                                            ${t("income.amount")}:

                                            $${Number(

                                                income.amount ??

                                                income.value ??

                                                0

                                            ).toLocaleString()}

                                            <br><br>

                                            <button

                                                type="button"

                                                class="edit-income-button"

                                                data-id="${income.id}"

                                            >

                                                ${t("common.edit")}

                                            </button>

                                            <button

                                                type="button"

                                                class="delete-income-button"

                                                data-id="${income.id}"

                                            >

                                                ${t("common.delete")}

                                            </button>

                                        </li>

                                        `

                                    ).join("")

                                }

                            </ul>

                            `

                        }

                    </div>

                </section>

            </div>

        `;

        // ==================================================

        // Back

        // ==================================================

        const backButton =

            container.querySelector(

                "#income-back-button"

            );

        if (backButton) {

            backButton.addEventListener(

                "click",

                () => {

                    if (

                        typeof onBack ===

                        "function"

                    ) {

                        onBack();

                    }

                }

            );

        }

        // ==================================================

        // Language Switch

        // ==================================================

        const languageSelect =

            container.querySelector(

                "#income-language-select"

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

        // Add

        // ==================================================

        const addButton =

            container.querySelector(

                "#add-income-button"

            );

        if (addButton) {

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

        const editButtons =

            container.querySelectorAll(

                ".edit-income-button"

            );

        editButtons.forEach(

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

        const deleteButtons =

            container.querySelectorAll(

                ".delete-income-button"

            );

        deleteButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.deleteIncome(

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

    // List View

    // ==================================================

    renderList() {

        const incomes =

            IncomeAgent.getIncome();

        return {

            title: "Income List",

            data: incomes

        };

    },

    // ==================================================

    // Summary View

    // ==================================================

    renderSummary() {

        const summary =

            IncomeAgent.getIncomeSummary();

        return {

            title: "Income Summary",

            data: summary

        };

    },

    // ==================================================

    // Dashboard

    // ==================================================

    renderDashboard() {

        const analysis =

            IncomeAgent.analyze();

        return {

            module: "income",

            analysis

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

    // Create Form

    // ==================================================

    getMembers() {

        try {

            return MemberAPI.getMembers();

        } catch (error) {

            return [];

        }

    },

    buildMemberOptions(selectedId = "") {

        return this.getMembers().map(

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

    showCreateForm(container, onBack) {

        const formContainer =

            container.querySelector(

                "#income-form-container"

            );

        if (!formContainer) {

            return;

        }

        const accounts =

            this.getAccounts();

        const memberOptions =

            this.buildMemberOptions();

        const accountOptions =

            this.buildAccountOptions();

        const accountHint =

            accounts.length === 0

            ?

            `

            <p style="color:#c00;">

                ${t("common.noAccountWarn")}

            </p>

            `

            :

            "";

        formContainer.innerHTML = `

            <div

                class="income-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("income.add")}

                </h3>

                <form

                    id="income-create-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="income-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("income.source")}

                    </label>

                    <br>

                    <input

                        id="income-source"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("income.type")}

                    </label>

                    <br>

                    <select

                        id="income-type"

                        required

                    >

                        <option value="">

                            Select Type

                        </option>

                        <option value="Salary">

                            Salary

                        </option>

                        <option value="Business">

                            Business

                        </option>

                        <option value="Investment">

                            Investment

                        </option>

                        <option value="Rental">

                            Rental

                        </option>

                        <option value="Pension">

                            Pension

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>

                    <br><br>

                    <label>

                        ${t("income.amount")}

                    </label>

                    <br>

                    <input

                        id="income-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("common.account")}（${t("common.accountHint")}）

                    </label>

                    <br>

                    <select

                        id="income-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${accountOptions}

                        <option value="__new_account__">${t("account.newOption")}</option>

                    </select>

                    <span id="income-new-account-fields" style="display:none">

                        <input id="income-new-account-name" type="text" placeholder="${t("account.namePlaceholder")}">

                        <input id="income-new-account-balance" type="number" step="0.01" placeholder="${t("account.balancePlaceholder")}">

                    </span>

                    ${accountHint}

                    <br><br>

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="income-member"

                    >

                        <option value="">

                            ${t("member.familyShared")}

                        </option>

                        ${memberOptions}

                        <option value="__new__">${t("member.newOption")}</option>

                    </select>

                    <input id="income-new-member-name" type="text" placeholder="${t("member.namePlaceholder")}" style="display:none">

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("income.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-income-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#income-create-form"

            );

        wireInlineCreate(

            form.querySelector(

                "#income-account"

            ),

            [

                form.querySelector(

                    "#income-new-account-fields"

                )

            ]

        );

        wireInlineCreate(

            form.querySelector(

                "#income-member"

            ),

            [

                form.querySelector(

                    "#income-new-member-name"

                )

            ]

        );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const name =

                    form.querySelector(

                        "#income-name"

                    ).value.trim();

                const source =

                    form.querySelector(

                        "#income-source"

                    ).value.trim();

                const type =

                    form.querySelector(

                        "#income-type"

                    ).value;

                const amount =

                    Number(

                        form.querySelector(

                            "#income-amount"

                        ).value

                    );

                const memberField =

                    form.querySelector(

                        "#income-member"

                    );

                const memberId =

                    resolveMemberId(

                        memberField,

                        form.querySelector(

                            "#income-new-member-name"

                        )

                    );

                const accountField =

                    form.querySelector(

                        "#income-account"

                    );

                const accountId =

                    resolveAccountId(

                        accountField,

                        form.querySelector(

                            "#income-new-account-name"

                        ),

                        form.querySelector(

                            "#income-new-account-balance"

                        ),

                        memberId

                    );

                IncomeAgent.addIncome({

                    name,

                    source,

                    type,

                    amount,

                    value: amount,

                    accountId,

                    memberId

                });

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-income-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==================================================

    // Edit Form

    // ==================================================

    showEditForm(

        container,

        id,

        onBack

    ) {

        const incomes =

            IncomeAgent.getIncome();

        const income =

            incomes.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if (!income) {

            throw new Error(

                "Income not found: " + id

            );

        }

        const formContainer =

            container.querySelector(

                "#income-form-container"

            );

        const currentAmount =

            Number(

                income.amount ??

                income.value ??

                0

            );

        formContainer.innerHTML = `

            <div

                class="income-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("income.edit")}

                </h3>

                <form

                    id="income-edit-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="edit-income-name"

                        type="text"

                        required

                        value="${income.name || ""}"

                    >

                    <br><br>

                    <label>

                        ${t("income.source")}

                    </label>

                    <br>

                    <input

                        id="edit-income-source"

                        type="text"

                        required

                        value="${income.source || ""}"

                    >

                    <br><br>

                    <label>

                        ${t("income.type")}

                    </label>

                    <br>

                    <select

                        id="edit-income-type"

                        required

                    >

                        <option value="Salary">

                            Salary

                        </option>

                        <option value="Business">

                            Business

                        </option>

                        <option value="Investment">

                            Investment

                        </option>

                        <option value="Rental">

                            Rental

                        </option>

                        <option value="Pension">

                            Pension

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>

                    <br><br>

                    <label>

                        ${t("income.amount")}

                    </label>

                    <br>

                    <input

                        id="edit-income-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${currentAmount}"

                    >

                    <br><br>

                    <label>

                        ${t("common.account")}（${t("common.accountHint")}）

                    </label>

                    <br>

                    <select

                        id="edit-income-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${this.buildAccountOptions(income.accountId || "")}

                    </select>

                    <br><br>

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="edit-income-member"

                    >

                        <option value="">

                            ${t("member.familyShared")}

                        </option>

                        ${this.buildMemberOptions(income.memberId || "")}

                    </select>


                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-income-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const typeSelect =

            formContainer.querySelector(

                "#edit-income-type"

            );

        typeSelect.value =

            income.type || "Other";

        const form =

            formContainer.querySelector(

                "#income-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updatedIncome = {

                    name:

                        form.querySelector(

                            "#edit-income-name"

                        ).value.trim(),

                    source:

                        form.querySelector(

                            "#edit-income-source"

                        ).value.trim(),

                    type:

                        form.querySelector(

                            "#edit-income-type"

                        ).value,

                    amount:

                        Number(

                            form.querySelector(

                                "#edit-income-amount"

                            ).value

                        )

                };

                updatedIncome.value =

                    updatedIncome.amount;

                const editAccountField =

                    form.querySelector(

                        "#edit-income-account"

                    );

                updatedIncome.accountId =

                    editAccountField

                    ?

                    editAccountField.value

                    :

                    (

                        income.accountId ||

                        ""

                    );


                const editMemberField =

                    form.querySelector(

                        "#edit-income-member"

                    );

                updatedIncome.memberId =

                    editMemberField

                    ?

                    editMemberField.value

                    :

                    (

                        income.memberId ||

                        ""

                    );


                IncomeAgent.updateIncome(

                    id,

                    updatedIncome

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-income-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==================================================

    // Delete

    // ==================================================

    deleteIncome(

        container,

        id,

        onBack

    ) {

        const incomes =

            IncomeAgent.getIncome();

        const income =

            incomes.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if (!income) {

            throw new Error(

                "Income not found: " + id

            );

        }

        const confirmed =

            window.confirm(

                "Delete income: " +

                (

                    income.name ||

                    income.source ||

                    "Unnamed Income"

                ) +

                "?"

            );

        if (!confirmed) {

            return;

        }

        IncomeAgent.deleteIncome(id);

        this.render(

            container,

            onBack

        );

    }

};

export default IncomeView;
