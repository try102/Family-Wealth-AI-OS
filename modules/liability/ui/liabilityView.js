/*

Family Wealth AI OS V7

Liability View

负债展示层

*/

import LiabilityAPI

    from "../api/liabilityAPI.js";

import LiabilityAgent

    from "../agent/liabilityAgent.js";

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

            LiabilityAPI.getLiabilities();

        const summary =

            LiabilityAPI.getSummary() || {};

        const total =

            liabilities.reduce(

                (

                    sum,

                    item

                ) => {

                    return sum +

                        Number(

                            item.currentBalance ||

                            item.balance ||

                            0

                        );

                },

                0

            );

        container.innerHTML = `

            <div

                class="app-shell"

            >

                <header

                    class="app-header"

                >

                    <h1>

                        💳 Liability Center

                    </h1>

                    <p>

                        Family Wealth AI OS V7

                    </p>

                </header>

                <section

                    class="dashboard"

                >

                    <h2>

                        Liability Dashboard

                    </h2>

                    <div

                        class="dashboard-grid"

                    >

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Liability Count

                            </h3>

                            <div

                                class="value"

                            >

                                ${

                                    liabilities.length

                                }

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Total Liability

                            </h3>

                            <div

                                class="value"

                            >

                                $${

                                    Number(

                                        total

                                    ).toLocaleString()

                                }

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                API Total

                            </h3>

                            <div

                                class="value"

                            >

                                $${

                                    Number(

                                        summary.totalLiability ??

                                        summary.total ??

                                        total

                                    ).toLocaleString()

                                }

                            </div>

                        </div>

                    </div>

                </section>

                <section

                    class="modules"

                >

                    <h2>

                        Liability List

                    </h2>

                    <button

                        id="add-liability-button"

                        type="button"

                    >

                        + Add Liability

                    </button>

                    <div

                        id="liability-form-container"

                    ></div>

                    <div

                        id="liability-list-container"

                        style="margin-top:20px;"

                    >

                        ${

                            liabilities.length === 0

                            ?

                            `

                            <p>

                                No Liability Data

                            </p>

                            `

                            :

                            liabilities.map(

                                liability => `

                                <div

                                    class="module-card"

                                    data-liability-id="${

                                        liability.id

                                    }"

                                    style="margin-bottom:15px;"

                                >

                                    <h3>

                                        ${

                                            liability.name ||

                                            "Unnamed Liability"

                                        }

                                    </h3>

                                    <p>

                                        Category:

                                        ${

                                            liability.category ||

                                            "Other"

                                        }

                                    </p>

                                    <p>

                                        Balance:

                                        $${

                                            Number(

                                                liability.currentBalance ??

                                                liability.balance ??

                                                0

                                            ).toLocaleString()

                                        }

                                    </p>

                                    <p>

                                        Interest Rate:

                                        ${

                                            Number(

                                                liability.interestRate ||

                                                liability.rate ||

                                                0

                                            )

                                        }%

                                    </p>

                                    <p>

                                        Status:

                                        ${

                                            liability.status ||

                                            "Active"

                                        }

                                    </p>

                                    <button

                                        type="button"

                                        class="edit-liability-button"

                                        data-id="${

                                            liability.id

                                        }"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-liability-button"

                                        data-id="${

                                            liability.id

                                        }"

                                    >

                                        Delete

                                    </button>

                                </div>

                                `

                            ).join("")

                        }

                    </div>

                </section>

                <section

                    class="modules"

                >

                    <h2>

                        Liability Analysis

                    </h2>

                    <div

                        class="module-card"

                    >

                        <h3>

                            LIABILITY ANALYSIS

                        </h3>

                        <p>

                            Liability analysis generated

                        </p>

                    </div>

                </section>

                <button

                    id="liability-back-button"

                    type="button"

                    style="margin-top:20px;"

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

        const editButtons =

            container.querySelectorAll(

                ".edit-liability-button"

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

                ".delete-liability-button"

            );

        deleteButtons.forEach(

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

    },

    // ==================================================

    // List View

    // ==================================================

    getListView(){

        return {

            title:

                "Liability Center",

            liabilities:

                LiabilityAPI.getLiabilities()

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

                LiabilityAPI.getSummary(),

            analysis:

                LiabilityAgent.analyzeDebtStatus()

        };

    },

    // ==================================================

    // Table Data

    // ==================================================

    getTableData(){

        const list =

            LiabilityAPI.getLiabilities();

        return list.map(

            item => ({

                id:

                    item.id,

                name:

                    item.name,

                category:

                    item.category,

                balance:

                    item.currentBalance,

                rate:

                    item.interestRate,

                status:

                    item.status

            })

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

                    Add Liability

                </h3>

                <form

                    id="liability-create-form"

                >

                    <label>

                        Liability Name

                    </label>

                    <br>

                    <input

                        id="liability-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        Category

                    </label>

                    <br>

                    <select

                        id="liability-category"

                        required

                    >

                        <option value="">

                            Select Category

                        </option>

                        <option value="Mortgage">

                            Mortgage

                        </option>

                        <option value="Credit Card">

                            Credit Card

                        </option>

                        <option value="Personal Loan">

                            Personal Loan

                        </option>

                        <option value="Auto Loan">

                            Auto Loan

                        </option>

                        <option value="Student Loan">

                            Student Loan

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>

                    <br><br>

                    <label>

                        Current Balance

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

                        Interest Rate (%)

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

                    <button

                        type="submit"

                    >

                        Save Liability

                    </button>

                    <button

                        type="button"

                        id="cancel-liability-button"

                    >

                        Cancel

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

                    ).value.trim();

                const category =

                    form.querySelector(

                        "#liability-category"

                    ).value;

                const balance =

                    Number(

                        form.querySelector(

                            "#liability-balance"

                        ).value

                    );

                const interestRate =

                    Number(

                        form.querySelector(

                            "#liability-rate"

                        ).value || 0

                    );

                LiabilityAPI.addLiability({

                    name,

                    category,

                    currentBalance:

                        balance,

                    balance,

                    interestRate,

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

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML =

                    "";

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

    ){

        const liabilities =

            LiabilityAPI.getLiabilities();

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

        const currentBalance =

            Number(

                liability.currentBalance ??

                liability.balance ??

                0

            );

        const currentRate =

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

                    Edit Liability

                </h3>

                <form

                    id="liability-edit-form"

                >

                    <label>

                        Liability Name

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

                        Category

                    </label>

                    <br>

                    <select

                        id="edit-liability-category"

                        required

                    >

                        <option value="Mortgage">

                            Mortgage

                        </option>

                        <option value="Credit Card">

                            Credit Card

                        </option>

                        <option value="Personal Loan">

                            Personal Loan

                        </option>

                        <option value="Auto Loan">

                            Auto Loan

                        </option>

                        <option value="Student Loan">

                            Student Loan

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>

                    <br><br>

                    <label>

                        Current Balance

                    </label>

                    <br>

                    <input

                        id="edit-liability-balance"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${

                            currentBalance

                        }"

                    >

                    <br><br>

                    <label>

                        Interest Rate (%)

                    </label>

                    <br>

                    <input

                        id="edit-liability-rate"

                        type="number"

                        min="0"

                        step="0.01"

                        value="${

                            currentRate

                        }"

                    >

                    <br><br>

                    <button

                        type="submit"

                    >

                        Update Liability

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-liability-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const categorySelect =

            formContainer.querySelector(

                "#edit-liability-category"

            );

        categorySelect.value =

            liability.category ||

            "Other";

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

                        ).value.trim(),

                    category:

                        form.querySelector(

                            "#edit-liability-category"

                        ).value,

                    currentBalance:

                        Number(

                            form.querySelector(

                                "#edit-liability-balance"

                            ).value

                        ),

                    balance:

                        Number(

                            form.querySelector(

                                "#edit-liability-balance"

                            ).value

                        ),

                    interestRate:

                        Number(

                            form.querySelector(

                                "#edit-liability-rate"

                            ).value || 0

                        ),

                    status:

                        liability.status ||

                        "Active"

                };

                if(

                    typeof LiabilityAPI.updateLiability !==

                    "function"

                ){

                    throw new Error(

                        "LiabilityAPI.updateLiability not found"

                    );

                }

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

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML =

                    "";

            }

        );

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

            LiabilityAPI.getLiabilities();

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

        if(

            typeof LiabilityAPI.deleteLiability !==

            "function"

        ){

            throw new Error(

                "LiabilityAPI.deleteLiability not found"

            );

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
