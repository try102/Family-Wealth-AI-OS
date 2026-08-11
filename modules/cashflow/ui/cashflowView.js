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

        const cashflows =

            cashflowAPI

                .getCashflows();

        const summary =

            cashflowAPI

                .getSummary();

        let report = null;

        let advice = null;

        try{

            report =

                cashflowAgent

                    .generateReport();

        }

        catch(error){

            console.warn(

                "Cashflow Agent Report unavailable:",

                error

            );

        }

        try{

            advice =

                cashflowAI

                    .generateAdvice();

        }

        catch(error){

            console.warn(

                "Cashflow AI Advice unavailable:",

                error

            );

        }

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

                <!-- Add -->

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

                <!-- List -->

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

                                            <th>Type</th>

                                            <th>Category</th>

                                            <th>Description</th>

                                            <th>Amount</th>

                                            <th>Frequency</th>

                                            <th>Annualized</th>

                                            <th>Actions</th>

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

                                                    <td>

                                                        ${

                                                            item.type ||

                                                            ""

                                                        }

                                                    </td>

                                                    <td>

                                                        ${

                                                            item.category ||

                                                            "Other"

                                                        }

                                                    </td>

                                                    <td>

                                                        ${

                                                            item.description ||

                                                            ""

                                                        }

                                                    </td>

                                                    <td>

                                                        $${Number(

                                                            item.amount ||

                                                            0

                                                        ).toLocaleString()}

                                                    </td>

                                                    <td>

                                                        ${

                                                            item.frequency ||

                                                            "YEARLY"

                                                        }

                                                    </td>

                                                    <td>

                                                        $${Number(

                                                            item.annualizedAmount ??

                                                            item.amount ??

                                                            0

                                                        ).toLocaleString()}

                                                    </td>

                                                    <td>

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

                    ${

                        report

                        ?

                        `

                        <p>

                            Health Score:

                            ${

                                report.healthScore ??

                                0

                            }

                        </p>

                        `

                        :

                        ""

                    }

                    ${

                        advice?.recommendation

                        ?

                        `

                        <p>

                            ${

                                advice.recommendation

                            }

                        </p>

                        `

                        :

                        ""

                    }

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

        // Add Button

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

                        required

                    >

                        <option value="INCOME">

                            Income

                        </option>

                        <option value="EXPENSE">

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

                    <label>

                        Frequency

                    </label>

                    <br>

                    <select

                        id="cashflow-frequency"

                        required

                    >

                        <option value="YEARLY">

                            Yearly

                        </option>

                        <option value="MONTHLY">

                            Monthly

                        </option>

                        <option value="QUARTERLY">

                            Quarterly

                        </option>

                        <option value="ONE_TIME">

                            One Time

                        </option>

                    </select>

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

                    ).value.trim()

                    ||

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

                const frequency =

                    form.querySelector(

                        "#cashflow-frequency"

                    ).value;

                cashflowAPI.createCashflow({

                    type,

                    category,

                    description,

                    amount,

                    frequency

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

        const cashflow =

            cashflowAPI.getCashflow(

                Number(id)

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

                        <option value="INCOME">

                            Income

                        </option>

                        <option value="EXPENSE">

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

                        value="${cashflow.category || "Other"}"

                    >

                    <br><br>

                    <label>

                        Description

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-description"

                        type="text"

                        value="${cashflow.description || ""}"

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

                        value="${Number(cashflow.amount || 0)}"

                        required

                    >

                    <br><br>

                    <label>

                        Frequency

                    </label>

                    <br>

                    <select

                        id="edit-cashflow-frequency"

                    >

                        <option value="YEARLY">

                            Yearly

                        </option>

                        <option value="MONTHLY">

                            Monthly

                        </option>

                        <option value="QUARTERLY">

                            Quarterly

                        </option>

                        <option value="ONE_TIME">

                            One Time

                        </option>

                    </select>

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

        formContainer.querySelector(

            "#edit-cashflow-type"

        ).value =

            cashflow.type || "EXPENSE";

        formContainer.querySelector(

            "#edit-cashflow-frequency"

        ).value =

            cashflow.frequency || "YEARLY";

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

                        ).value.trim()

                        ||

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

                        ),

                    frequency:

                        form.querySelector(

                            "#edit-cashflow-frequency"

                        ).value

                };

                cashflowAPI.updateCashflow(

                    Number(id),

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

        const cashflow =

            cashflowAPI.getCashflow(

                Number(id)

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

            Number(id)

        );

        this.render(

            container,

            onBack

        );

    },

    // ==================================================

    // Data Views

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

    overview(){

        return cashflowAPI.getSummary();

    },

    aiReport(){

        return cashflowAI.analyze();

    }

};

export default cashflowView;
