/*

Family Wealth AI OS V7

Expense View

支出展示层

*/

import ExpenseAgent from "../agent/expenseAgent.js?v=20261008ae";

import AccountAPI from "../../account/api/accountAPI.js?v=20261008aw";

import MemberAPI from "../../member/api/memberAPI.js?v=20261008ap";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261009bo";

import { wireInlineCreate, resolveMemberId, resolveAccountId } from "../../../core/utils/inlineCreate.js?v=20261008ae";

const ExpenseView = {

    name: "Expense View V7",

    // ==================================================

    // Main Render

    // ==================================================

    render(container, onBack) {

        const expenses = ExpenseAgent.getExpense();

        const summary = ExpenseAgent.getExpenseSummary();

        container.innerHTML = `

            <div class="expense-center">

                <h1>

                    🧾 ${t("expense.title")}

                </h1>

                <button

                    id="expense-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

                <br><br>

                <label>${t("common.language")}</label>

                <select id="expense-language-select">${languageOptions(getLanguage())}</select>

                <hr>

                <section>

                    <h2>

                        ${t("expense.summary")}

                    </h2>

                    <p>

                        <strong>${t("expense.total")}:</strong>

                        $${Number(

                            summary.totalExpense || 0

                        ).toLocaleString()}

                    </p>

                    <p>

                        <strong>${t("expense.count")}:</strong>

                        ${Number(

                            summary.count || 0

                        )}

                    </p>

                </section>

                <hr>

                <button

                    id="add-expense-button"

                    type="button"

                >

                    ${t("expense.add")}

                </button>

                <div

                    id="expense-form-container"

                ></div>

                <hr>

                <section>

                    <h2>

                        ${t("expense.records")}

                    </h2>

                    <div id="expense-list-container">

                        ${

                            expenses.length === 0

                            ?

                            `

                            <p>

                                ${t("expense.empty")}

                            </p>

                            `

                            :

                            `

                            <ul>

                                ${

                                    expenses.map(

                                        expense => `

                                        <li

                                            data-expense-id="${expense.id}"

                                            style="margin-bottom:15px;"

                                        >

                                            <strong>

                                                ${

                                                    expense.name ||

                                                    "Unnamed Expense"

                                                }

                                            </strong>

                                            <br>

                                            ${t("common.category")}:

                                            ${

                                                expense.category ||

                                                "Other"

                                            }

                                            <br>

                                            ${t("common.amount")}:

                                            $${Number(

                                                expense.amount ??

                                                0

                                            ).toLocaleString()}

                                            <br><br>

                                            <button

                                                type="button"

                                                class="edit-expense-button"

                                                data-id="${expense.id}"

                                            >

                                                ${t("common.edit")}

                                            </button>

                                            <button

                                                type="button"

                                                class="delete-expense-button"

                                                data-id="${expense.id}"

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

                "#expense-back-button"

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

                "#expense-language-select"

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

                "#add-expense-button"

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

                ".edit-expense-button"

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

                ".delete-expense-button"

            );

        deleteButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.deleteExpense(

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

    categoryOptions(selectedCategory = "") {

        const categories = [

            "Housing",

            "Food",

            "Transportation",

            "Utilities",

            "Insurance",

            "Healthcare",

            "Entertainment",

            "Education",

            "Travel",

            "Other"

        ];

        return categories.map(

            category => `

                <option

                    value="${category}"

                    ${

                        category ===

                        selectedCategory

                        ?

                        "selected"

                        :

                        ""

                    }

                >

                    ${category}

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

                "#expense-form-container"

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

                class="expense-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("expense.add")}

                </h3>

                <form

                    id="expense-create-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="expense-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("common.category")}

                    </label>

                    <br>

                    <select

                        id="expense-category"

                        required

                    >

                        ${this.categoryOptions()}

                    </select>

                    <br><br>

                    <label>

                        ${t("common.amount")}

                    </label>

                    <br>

                    <input

                        id="expense-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("common.date")}

                    </label>

                    <br>

                    <input

                        id="expense-date"

                        type="date"

                    >

                    <br><br>

                    <label>

                        ${t("common.account")}（${t("common.accountHint")}）

                    </label>

                    <br>

                    <select

                        id="expense-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${accountOptions}

                        <option value="__new_account__">${t("account.newOption")}</option>

                    </select>

                    <span id="expense-new-account-fields" style="display:none">

                        <input id="expense-new-account-name" type="text" placeholder="${t("account.namePlaceholder")}">

                        <input id="expense-new-account-balance" type="number" step="0.01" placeholder="${t("account.balancePlaceholder")}">

                    </span>

                    ${accountHint}

                    <br><br>

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="expense-member"

                    >

                        <option value="">

                            ${t("member.familyShared")}

                        </option>

                        ${memberOptions}

                        <option value="__new__">${t("member.newOption")}</option>

                    </select>

                    <input id="expense-new-member-name" type="text" placeholder="${t("member.namePlaceholder")}" style="display:none">

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("expense.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-expense-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#expense-create-form"

            );

        wireInlineCreate(

            form.querySelector(

                "#expense-account"

            ),

            [

                form.querySelector(

                    "#expense-new-account-fields"

                )

            ]

        );

        wireInlineCreate(

            form.querySelector(

                "#expense-member"

            ),

            [

                form.querySelector(

                    "#expense-new-member-name"

                )

            ]

        );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const name =

                    form.querySelector(

                        "#expense-name"

                    ).value.trim();

                const category =

                    form.querySelector(

                        "#expense-category"

                    ).value;

                const amount =

                    Number(

                        form.querySelector(

                            "#expense-amount"

                        ).value

                    );

                const date =

                    form.querySelector(

                        "#expense-date"

                    ).value;

                const memberField =

                    form.querySelector(

                        "#expense-member"

                    );

                const memberId =

                    memberField

                    ?

                    resolveMemberId(

                        memberField,

                        form.querySelector(

                            "#expense-new-member-name"

                        )

                    )

                    :

                    "";

                const accountField =

                    form.querySelector(

                        "#expense-account"

                    );

                const accountId =

                    accountField

                    ?

                    resolveAccountId(

                        accountField,

                        form.querySelector(

                            "#expense-new-account-name"

                        ),

                        form.querySelector(

                            "#expense-new-account-balance"

                        ),

                        memberId

                    )

                    :

                    "";

                ExpenseAgent.addExpense({

                    name,

                    category,

                    amount,

                    date,

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

                "#cancel-expense-button"

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

        const expenses =

            ExpenseAgent.getExpense();

        const expense =

            expenses.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if (!expense) {

            throw new Error(

                "Expense not found: " + id

            );

        }

        const formContainer =

            container.querySelector(

                "#expense-form-container"

            );

        const currentAmount =

            Number(

                expense.amount ??

                0

            );

        formContainer.innerHTML = `

            <div

                class="expense-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("expense.edit")}

                </h3>

                <form

                    id="expense-edit-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="edit-expense-name"

                        type="text"

                        required

                        value="${expense.name || ""}"

                    >

                    <br><br>

                    <label>

                        ${t("common.category")}

                    </label>

                    <br>

                    <select

                        id="edit-expense-category"

                        required

                    >

                        ${this.categoryOptions(expense.category || "Other")}

                    </select>

                    <br><br>

                    <label>

                        ${t("common.amount")}

                    </label>

                    <br>

                    <input

                        id="edit-expense-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${currentAmount}"

                    >

                    <br><br>

                    <label>

                        ${t("common.date")}

                    </label>

                    <br>

                    <input

                        id="edit-expense-date"

                        type="date"

                        value="${expense.date || ""}"

                    >

                    <br><br>

                    <label>

                        ${t("common.account")}（${t("common.accountHint")}）

                    </label>

                    <br>

                    <select

                        id="edit-expense-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${this.buildAccountOptions(expense.accountId || "")}

                    </select>

                    <br><br>

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="edit-expense-member"

                    >

                        <option value="">

                            ${t("member.familyShared")}

                        </option>

                        ${this.buildMemberOptions(expense.memberId || "")}

                    </select>


                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-expense-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#expense-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updatedExpense = {

                    name:

                        form.querySelector(

                            "#edit-expense-name"

                        ).value.trim(),

                    category:

                        form.querySelector(

                            "#edit-expense-category"

                        ).value,

                    amount:

                        Number(

                            form.querySelector(

                                "#edit-expense-amount"

                            ).value

                        ),

                    date:

                        form.querySelector(

                            "#edit-expense-date"

                        ).value

                };

                const editAccountField =

                    form.querySelector(

                        "#edit-expense-account"

                    );

                updatedExpense.accountId =

                    editAccountField

                    ?

                    editAccountField.value

                    :

                    (

                        expense.accountId ||

                        ""

                    );


                const editMemberField =

                    form.querySelector(

                        "#edit-expense-member"

                    );

                updatedExpense.memberId =

                    editMemberField

                    ?

                    editMemberField.value

                    :

                    (

                        expense.memberId ||

                        ""

                    );


                ExpenseAgent.updateExpense(

                    id,

                    updatedExpense

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-expense-button"

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

    deleteExpense(

        container,

        id,

        onBack

    ) {

        const expenses =

            ExpenseAgent.getExpense();

        const expense =

            expenses.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if (!expense) {

            throw new Error(

                "Expense not found: " + id

            );

        }

        const confirmed =

            window.confirm(

                "Delete expense: " +

                (

                    expense.name ||

                    "Unnamed Expense"

                ) +

                "?"

            );

        if (!confirmed) {

            return;

        }

        ExpenseAgent.deleteExpense(id);

        this.render(

            container,

            onBack

        );

    }

};

export default ExpenseView;
