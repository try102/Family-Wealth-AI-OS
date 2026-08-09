/*

Family Wealth AI OS V7

Income View

收入展示层

*/

import IncomeAgent from "../agent/incomeAgent.js";

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

                    💵 Income Center

                </h1>

                <button

                    id="income-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

                <hr>

                <section>

                    <h2>

                        Income Summary

                    </h2>

                    <p>

                        <strong>Total Income:</strong>

                        $${Number(

                            summary.totalIncome || 0

                        ).toLocaleString()}

                    </p>

                    <p>

                        <strong>Income Count:</strong>

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

                    + Add Income

                </button>

                <div

                    id="income-form-container"

                ></div>

                <hr>

                <section>

                    <h2>

                        Income

                    </h2>

                    <div id="income-list-container">

                        ${

                            incomes.length === 0

                            ?

                            `

                            <p>

                                No income records.

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

                                            Source:

                                            ${

                                                income.source ||

                                                "N/A"

                                            }

                                            <br>

                                            Type:

                                            ${

                                                income.type ||

                                                "Other"

                                            }

                                            <br>

                                            Amount:

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

                                                Edit

                                            </button>

                                            <button

                                                type="button"

                                                class="delete-income-button"

                                                data-id="${income.id}"

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

    // Create Form

    // ==================================================

    showCreateForm(container, onBack) {

        const formContainer =

            container.querySelector(

                "#income-form-container"

            );

        if (!formContainer) {

            return;

        }

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

                    Add Income

                </h3>

                <form

                    id="income-create-form"

                >

                    <label>

                        Income Name

                    </label>

                    <br>

                    <input

                        id="income-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        Source

                    </label>

                    <br>

                    <input

                        id="income-source"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        Type

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

                        Amount

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

                    <button

                        type="submit"

                    >

                        Save Income

                    </button>

                    <button

                        type="button"

                        id="cancel-income-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#income-create-form"

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

                IncomeAgent.addIncome({

                    name,

                    source,

                    type,

                    amount,

                    value: amount

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

                    Edit Income

                </h3>

                <form

                    id="income-edit-form"

                >

                    <label>

                        Income Name

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

                        Source

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

                        Type

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

                        Amount

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

                    <button

                        type="submit"

                    >

                        Update Income

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-income-button"

                    >

                        Cancel

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
