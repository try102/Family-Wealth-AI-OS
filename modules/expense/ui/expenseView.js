/*

Family Wealth AI OS V7

Expense View

支出展示层

*/

import ExpenseAgent from "../agent/expenseAgent.js";

import AccountAPI from "../../account/api/accountAPI.js";

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

                    🧾 Expense Center

                </h1>

                <button

                    id="expense-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

                <hr>

                <section>

                    <h2>

                        Expense Summary

                    </h2>

                    <p>

                        <strong>Total Expense:</strong>

                        $${Number(

                            summary.totalExpense || 0

                        ).toLocaleString()}

                    </p>

                    <p>

                        <strong>Expense Count:</strong>

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

                    + Add Expense

                </button>

                <div

                    id="expense-form-container"

                ></div>

                <hr>

                <section>

                    <h2>

                        Expense

                    </h2>

                    <div id="expense-list-container">

                        ${

                            expenses.length === 0

                            ?

                            `

                            <p>

                                No expense records.

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

                                            Category:

                                            ${

                                                expense.category ||

                                                "Other"

                                            }

                                            <br>

                                            Amount:

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

                                                Edit

                                            </button>

                                            <button

                                                type="button"

                                                class="delete-expense-button"

                                                data-id="${expense.id}"

                                            >

                                                Delete

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

        const accountOptions =

            this.buildAccountOptions();

        const accountHint =

            accounts.length === 0

            ?

            `

            <p style="color:#c00;">

                No account found. 请先到 Accounts 页面新建账户，否则这笔支出不会进入 Cash Flow。

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

                    Add Expense

                </h3>

                <form

                    id="expense-create-form"

                >

                    <label>

                        Expense Name

                    </label>

                    <br>

                    <input

                        id="expense-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        Category

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

                        Amount

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

                        Date

                    </label>

                    <br>

                    <input

                        id="expense-date"

                        type="date"

                    >

                    <br><br>

                    <label>

                        Account（选了才会进入 Cash Flow）

                    </label>

                    <br>

                    <select

                        id="expense-account"

                    >

                        <option value="">

                            Select Account

                        </option>

                        ${accountOptions}

                    </select>

                    ${accountHint}

                    <br><br>

                    <button

                        type="submit"

                    >

                        Save Expense

                    </button>

                    <button

                        type="button"

                        id="cancel-expense-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#expense-create-form"

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

                const accountField =

                    form.querySelector(

                        "#expense-account"

                    );

                const accountId =

                    accountField

                    ?

                    accountField.value

                    :

                    "";

                ExpenseAgent.addExpense({

                    name,

                    category,

                    amount,

                    date,

                    accountId

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

                    Edit Expense

                </h3>

                <form

                    id="expense-edit-form"

                >

                    <label>

                        Expense Name

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

                        Category

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

                        Amount

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

                        Date

                    </label>

                    <br>

                    <input

                        id="edit-expense-date"

                        type="date"

                        value="${expense.date || ""}"

                    >

                    <br><br>

                    <label>

                        Account（选了才会进入 Cash Flow）

                    </label>

                    <br>

                    <select

                        id="edit-expense-account"

                    >

                        <option value="">

                            Select Account

                        </option>

                        ${this.buildAccountOptions(expense.accountId || "")}

                    </select>

                    <br><br>

                    <button

                        type="submit"

                    >

                        Update Expense

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-expense-button"

                    >

                        Cancel

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
