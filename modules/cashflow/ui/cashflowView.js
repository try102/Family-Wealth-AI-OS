/*

    

Family Wealth AI OS V7

Cashflow View

现金流 UI 展示层

*/

import cashflowAPI

    from "../api/cashflowAPI.js";

import cashflowAgent

    from "../agent/cashflowAgent.js";

import cashflowAI

    from "../ai/cashflowAI.js";

const cashflowView = {

    name:

        "Cashflow View V7",

    // ==================================================

    // Main Render

    // ==================================================

    render(

        container,

        onBack

    ){

        const summary =

            cashflowAPI.getSummary();

        const cashflows =

            cashflowAPI.getCashflows();

        const report =

            cashflowAgent.generateReport();

        const advice =

            cashflowAI.generateAdvice();

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

                        💸 Cash Flow

                    </h1>

                    <p>

                        Family Wealth AI OS V7

                    </p>

                </header>

                <!-- ================================== -->

                <!-- Dashboard -->

                <!-- ================================== -->

                <section

                    class="dashboard"

                >

                    <h2>

                        Cashflow Dashboard

                    </h2>

                    <div

                        class="dashboard-grid"

                    >

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Income

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.income ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Expense

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.expense ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Net Cashflow

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.net ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                    </div>

                </section>

                <!-- ================================== -->

                <!-- Add Cashflow -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <button

                        id="add-cashflow-button"

                        type="button"

                    >

                        + Add Cash Flow

                    </button>

                    <div

                        id="cashflow-form-container"

                    ></div>

                </section>

                <!-- ================================== -->

                <!-- Cashflow List -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <h2>

                        Cash Flow List

                    </h2>

                    <div

                        id="cashflow-list-container"

                    >

                        ${

                            cashflows.length === 0

                            ?

                            `

                                <p>

                                    No cash flow data.

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

                                                    Type

                                                </th>

                                                <th

                                                    style="

                                                        padding:10px;

                                                        border-bottom:1px solid #ddd;

                                                    "

                                                >

                                                    Category

                                                </th>

                                                <th

                                                    style="

                                                        padding:10px;

                                                        border-bottom:1px solid #ddd;

                                                    "

                                                >

                                                    Description

                                                </th>

                                                <th

                                                    style="

                                                        padding:10px;

                                                        border-bottom:1px solid #ddd;

                                                    "

                                                >

                                                    Amount

                                                </th>

                                                <th

                                                    style="

                                                        padding:10px;

                                                        border-bottom:1px solid #ddd;

                                                    "

                                                >

                                                    Actions

                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            ${

                                                cashflows

                                                .map(

                                                    item => `

                                                        <tr

                                                            data-id="${item.id}"

                                                        >

                                                            <td

                                                                style="

                                                                    padding:10px;

                                                                "

                                                            >

                                                                ${

                                                                    item.type ===

                                                                    "INCOME"

                                                                    ?

                                                                    "Income"

                                                                    :

                                                                    "Expense"

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

                                                                ${

                                                                    item.description ||

                                                                    item.name ||

                                                                    ""

                                                                }

                                                            </td>

                                                            <td

                                                                style="

                                                                    padding:10px;

                                                                "

                                                            >

                                                                $${Number(

                                                                    item.amount ||

                                                                    0

                                                                ).toLocaleString()}

                                                            </td>

                                                            <td

                                                                style="

                                                                    padding:10px;

                                                                "

                                                            >

                                                                <button

                                                                    type="button"

                                                                    class="edit-cashflow-button"

                                                                    data-id="${item.id}"

                                                                >

                                                                    Edit

                                                                </button>

                                                                <button

                                                                    type="button"

                                                                    class="delete-cashflow-button"

                                                                    data-id="${item.id}"

                                                                >

                                                                    Delete

                                                                </button>

                                                            </td>

                                                        </tr>

                                                    `

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

                <!-- ================================== -->

                <!-- Analysis -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <h2>

                        Cash Flow Analysis

                    </h2>

                    <p>

                        Health Score:

                        <strong>

                            ${Number(

                                report?.healthScore ||

                                0

                            )}

                        </strong>

                    </p>

                    <p>

                        ${

                            advice?.recommendation ||

                            "No recommendation available."

                        }

                    </p>

                </section>

                <hr>

                <!-- ================================== -->

                <!-- Back -->

                <!-- ================================== -->

                <button

                    id="cashflow-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

            </div>

        `;

        // ==================================================

        // Back

        // ==================================================

        const backButton =

            container.querySelector(

                "#cashflow-back-button"

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

                "#add-cashflow-button"

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

                ".edit-cashflow-button"

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

                ".delete-cashflow-button"

            )

            .forEach(

                button => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.deleteCashflow(

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

    // Dashboard Data

    // ==================================================

    dashboard(){

        const report =

            cashflowAgent.generateReport();

        const advice =

            cashflowAI.generateAdvice();

        return {

            title:

                "Cashflow Dashboard",

            summary:

                report.summary,

            analysis:

                report.analysis,

            healthScore:

                report.healthScore,

            advice:

                advice.recommendation

        };

    },

    // ==================================================

    // Overview

    // ==================================================

    overview(){

        const summary =

            cashflowAPI.getSummary();

        return {

            income:

                summary.income,

            expense:

                summary.expense,

            net:

                summary.net

        };

    },

    // ==================================================

    // AI Report

    // ==================================================

    aiReport(){

        return cashflowAI.analyze();

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

                "#cashflow-form-container"

            );

        if(!formContainer){

            return;

        }

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

                    Add Cash Flow

                </h3>

                <form

                    id="cashflow-create-form"

                >

                    <label>

                        Type

                    </label>

                    <br>

                    <select

                        id="cashflow-type"

                    >

                        <option

                            value="INCOME"

                        >

                            Income

                        </option>

                        <option

                            value="EXPENSE"

                        >

                            Expense

                        </option>

                    </select>

                    <br><br>

                    <label>

                        Category

                    </label>

                    <br>

                    <input

                        id="cashflow-category"

                        type="text"

                        value="Other"

                    >

                    <br><br>

                    <label>

                        Description

                    </label>

                    <br>

                    <input

                        id="cashflow-description"

                        type="text"

                    >

                    <br><br>

                    <label>

                        Amount

                    </label>

                    <br>

                    <input

                        id="cashflow-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                    >

                    <br><br>

                    <button

                        type="submit"

                    >

                        Save Cash Flow

                    </button>

                    <button

                        type="button"

                        id="cancel-cashflow-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#cashflow-create-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const type =

                    form.querySelector(

                        "#cashflow-type"

                    ).value;

                const category =

                    form.querySelector(

                        "#cashflow-category"

                    ).value.trim() ||

                    "Other";

                const description =

                    form.querySelector(

                        "#cashflow-description"

                    ).value.trim();

                const amount =

                    Number(

                        form.querySelector(

                            "#cashflow-amount"

                        ).value

                    );

                cashflowAPI.createCashflow({

                    type,

                    category,

                    description,

                    amount

                });

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-cashflow-button"

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

        const cashflows =

            cashflowAPI.getCashflows();

        const cashflow =

            cashflows.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if(!cashflow){

            throw new Error(

                "Cashflow not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#cashflow-form-container"

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

                    Edit Cash Flow

                </h3>

                <form

                    id="cashflow-edit-form"

                >

                    <label>

                        Type

                    </label>

                    <br>

                    <select

                        id="edit-cashflow-type"

                    >

                        <option

                            value="INCOME"

                            ${

                                cashflow.type ===

                                "INCOME"

                                ? "selected"

                                : ""

                            }

                        >

                            Income

                        </option>

                        <option

                            value="EXPENSE"

                            ${

                                cashflow.type ===

                                "EXPENSE"

                                ? "selected"

                                : ""

                            }

                        >

                            Expense

                        </option>

                    </select>

                    <br><br>

                    <label>

                        Category

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-category"

                        type="text"

                        value="${

                            cashflow.category ||

                            "Other"

                        }"

                    >

                    <br><br>

                    <label>

                        Description

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-description"

                        type="text"

                        value="${

                            cashflow.description ||

                            ""

                        }"

                    >

                    <br><br>

                    <label>

                        Amount

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${

                            Number(

                                cashflow.amount ||

                                0

                            )

                        }"

                    >

                    <br><br>

                    <button

                        type="submit"

                    >

                        Update Cash Flow

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-cashflow-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#cashflow-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updated = {

                    type:

                        form.querySelector(

                            "#edit-cashflow-type"

                        ).value,

                    category:

                        form.querySelector(

                            "#edit-cashflow-category"

                        ).value.trim() ||

                        "Other",

                    description:

                        form.querySelector(

                            "#edit-cashflow-description"

                        ).value.trim(),

                    amount:

                        Number(

                            form.querySelector(

                                "#edit-cashflow-amount"

                            ).value

                        )

                };

                cashflowAPI.updateCashflow(

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

                "#cancel-edit-cashflow-button"

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

    deleteCashflow(

        container,

        id,

        onBack

    ){

        const cashflows =

            cashflowAPI.getCashflows();

        const cashflow =

            cashflows.find(

                item =>

                    String(item.id) ===

                    String(id)

            );

        if(!cashflow){

            throw new Error(

                "Cashflow not found: " +

                id

            );

        }

        const confirmed =

            window.confirm(

                "Delete this cash flow?"

            );

        if(!confirmed){

            return;

        }

        cashflowAPI.deleteCashflow(

            id

        );

        this.render(

            container,

            onBack

        );

    }

};

export default cashflowView;
