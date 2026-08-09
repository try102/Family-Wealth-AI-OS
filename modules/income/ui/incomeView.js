/*

    

Family Wealth AI OS V7

Income View

收入管理 UI

第二阶段：

Add Income

View Income

Edit Income

Delete Income

Back to Dashboard

*/

import IncomeAgent from "../agent/incomeAgent.js";

const IncomeView = {

    name:

        "Income View V7",

    // ==========================================

    // Main Render

    // ==========================================

    render(

        container,

        onBack

    ){

        const incomes =

            IncomeAgent

            .getIncome();

        const summary =

            IncomeAgent

            .getIncomeSummary();

        container.innerHTML = `

            <div

                class="income-center"

            >

                <h2>

                    Income Center

                </h2>

                <button

                    id="income-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

                <hr>

                <!-- Summary -->

                <section>

                    <h3>

                        Income Summary

                    </h3>

                    <p>

                        Total Income:

                        $${Number(

                            summary.total ||

                            summary.income ||

                            0

                        ).toLocaleString()}

                    </p>

                </section>

                <hr>

                <!-- Add -->

                <button

                    id="add-income-button"

                    type="button"

                >

                    + Add Income

                </button>

                <div

                    id="income-form-container"

                ></div>

                <!-- List -->

                <h3>

                    Incomes

                </h3>

                <ul>

                    ${

                        incomes.length === 0

                        ?

                        "<li>No income records</li>"

                        :

                        incomes.map(

                            income => `

                                <li

                                    data-income-id="${

                                        income.id

                                    }"

                                >

                                    <strong>

                                        ${

                                            income.name ||

                                            income.source ||

                                            "Unnamed Income"

                                        }

                                    </strong>

                                    -

                                    $${Number(

                                        income.amount ||

                                        income.value ||

                                        0

                                    ).toLocaleString()}

                                    <button

                                        type="button"

                                        class="edit-income-button"

                                        data-id="${

                                            income.id

                                        }"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-income-button"

                                        data-id="${

                                            income.id

                                        }"

                                    >

                                        Delete

                                    </button>

                                </li>

                            `

                        ).join("")

                    }

                </ul>

            </div>

        `;

        // ==========================================

        // Back

        // ==========================================

        const backButton =

            container.querySelector(

                "#income-back-button"

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

        // ==========================================

        // Add

        // ==========================================

        const addButton =

            container.querySelector(

                "#add-income-button"

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

        // ==========================================

        // Edit

        // ==========================================

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

        // ==========================================

        // Delete

        // ==========================================

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

    // ==========================================

    // Create Form

    // ==========================================

    showCreateForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#income-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="income-form"

            >

                <h3>

                    Add Income

                </h3>

                <form

                    id="income-create-form"

                >

                    <div>

                        <label>

                            Income Source

                        </label>

                        <br>

                        <input

                            id="income-source"

                            type="text"

                            required

                        >

                    </div>

                    <br>

                    <div>

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

                    </div>

                    <br>

                    <div>

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

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <br>

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

                const source =

                    form.querySelector(

                        "#income-source"

                    ).value.trim();

                const amount =

                    Number(

                        form.querySelector(

                            "#income-amount"

                        ).value

                    );

                const type =

                    form.querySelector(

                        "#income-type"

                    ).value;

                if(

                    typeof IncomeAgent.addIncome !==

                    "function"

                ){

                    throw new Error(

                        "IncomeAgent.addIncome not found"

                    );

                }

                IncomeAgent.addIncome({

                    source,

                    name:

                        source,

                    amount,

                    value:

                        amount,

                    type

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

    // ==========================================

    // Edit Form

    // ==========================================

    showEditForm(

        container,

        id,

        onBack

    ){

        const incomes =

            IncomeAgent

            .getIncome();

        const income =

            incomes.find(

                item =>

                    item.id === id

            );

        if(!income){

            throw new Error(

                "Income not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#income-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="income-form"

            >

                <h3>

                    Edit Income

                </h3>

                <form

                    id="income-edit-form"

                >

                    <div>

                        <label>

                            Income Source

                        </label>

                        <br>

                        <input

                            id="edit-income-source"

                            type="text"

                            required

                            value="${

                                income.source ||

                                income.name ||

                                ""

                            }"

                        >

                    </div>

                    <br>

                    <div>

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

                            value="${

                                Number(

                                    income.amount ||

                                    income.value ||

                                    0

                                )

                            }"

                        >

                    </div>

                    <br>

                    <div>

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

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <br>

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

            income.type ||

            "Other";

        const form =

            formContainer.querySelector(

                "#income-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const source =

                    form.querySelector(

                        "#edit-income-source"

                    ).value.trim();

                const amount =

                    Number(

                        form.querySelector(

                            "#edit-income-amount"

                        ).value

                    );

                const type =

                    form.querySelector(

                        "#edit-income-type"

                    ).value;

                const updatedIncome = {

                    ...income,

                    source,

                    name:

                        source,

                    amount,

                    value:

                        amount,

                    type

                };

                if(

                    typeof IncomeAgent.updateIncome ===

                    "function"

                ){

                    IncomeAgent.updateIncome(

                        updatedIncome

                    );

                }

                else if(

                    typeof IncomeAgent.addIncome ===

                    "function"

                ){

                    IncomeAgent.addIncome(

                        updatedIncome

                    );

                }

                else{

                    throw new Error(

                        "IncomeAgent update method not found"

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

                "#cancel-edit-income-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // Delete

    // ==========================================

    deleteIncome(

        container,

        id,

        onBack

    ){

        const incomes =

            IncomeAgent

            .getIncome();

        const income =

            incomes.find(

                item =>

                    item.id === id

            );

        if(!income){

            throw new Error(

                "Income not found: " +

                id

            );

        }

        const confirmed =

            window.confirm(

                "Delete income: " +

                (

                    income.source ||

                    income.name ||

                    "Unnamed Income"

                ) +

                "?"

            );

        if(!confirmed){

            return;

        }

        if(

            typeof IncomeAgent.deleteIncome !==

            "function"

        ){

            throw new Error(

                "IncomeAgent.deleteIncome not found"

            );

        }

        IncomeAgent.deleteIncome(

            id

        );

        this.render(

            container,

            onBack

        );

    },

    // ==========================================

    // Existing Data Views

    // ==========================================

    renderList(){

        const incomes =

            IncomeAgent

            .getIncome();

        return {

            title:

                "Income List",

            data:

                incomes

        };

    },

    renderSummary(){

        const summary =

            IncomeAgent

            .getIncomeSummary();

        return {

            title:

                "Income Summary",

            data:

                summary

        };

    },

    renderDashboard(){

        const analysis =

            IncomeAgent

            .analyze();

        return {

            module:

                "income",

            analysis

        };

    }

};

export default IncomeView;
