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

            LiabilityAPI

                .getLiabilities();

        const summary =

            LiabilityAPI

                .getSummary();

        const analysis =

            LiabilityAgent

                .analyzeDebtStatus();

        const totalLiability =

            Number(

                summary?.totalLiability ??

                summary?.totalLiabilities ??

                summary?.totalDebt ??

                0

            );

        container.innerHTML = `

            <div

                class="app-shell"

            >

                <!-- Header -->

                <header

                    class="app-header"

                >

                    <h1>

                        💳 Liability

                    </h1>

                    <p>

                        Family Wealth AI OS V7

                    </p>

                </header>

                <!-- Dashboard -->

                <section

                    class="dashboard"

                >

                    <h2>

                        Debt Dashboard

                    </h2>

                    <div

                        class="dashboard-grid"

                    >

                        <!-- Count -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Liability Count

                            </h3>

                            <div

                                class="value"

                            >

                                ${liabilities.length}

                            </div>

                        </div>

                        <!-- Total -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Total Liability

                            </h3>

                            <div

                                class="value"

                            >

                                $${totalLiability.toLocaleString()}

                            </div>

                        </div>

                        <!-- Status -->

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                Debt Status

                            </h3>

                            <div

                                class="value"

                            >

                                ${

                                    analysis?.status ||

                                    analysis?.type ||

                                    "READY"

                                }

                            </div>

                        </div>

                    </div>

                </section>

                <!-- Add -->

                <section

                    class="modules"

                >

                    <button

                        id="add-liability-button"

                        type="button"

                    >

                        + Add Liability

                    </button>

                    <div

                        id="liability-form-container"

                    ></div>

                </section>

                <!-- List -->

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

                                No liability data.

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

                                                Name

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

                                                Balance

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                Interest

                                            </th>

                                            <th

                                                style="

                                                    padding:10px;

                                                    border-bottom:1px solid #ddd;

                                                "

                                            >

                                                Status

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

                                            liabilities

                                                .map(

                                                    item => `

                                                    <tr

                                                        data-liability-id="${item.id}"

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

                                                            $${Number(

                                                                item.currentBalance ??

                                                                item.balance ??

                                                                0

                                                            ).toLocaleString()}

                                                        </td>

                                                        <td

                                                            style="

                                                                padding:10px;

                                                            "

                                                        >

                                                            ${Number(

                                                                item.interestRate ??

                                                                item.rate ??

                                                                0

                                                            )}%

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

                                                                class="edit-liability-button"

                                                                data-id="${item.id}"

                                                            >

                                                                Edit

                                                            </button>

                                                            <button

                                                                type="button"

                                                                class="delete-liability-button"

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

                <hr>

                <!-- Back -->

                <button

                    id="liability-back-button"

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

                        <option value="Mortgage">

                            Mortgage

                        </option>

                        <option value="Credit Card">

                            Credit Card

                        </option>

                        <option value="Auto Loan">

                            Auto Loan

                        </option>

                        <option value="Student Loan">

                            Student Loan

                        </option>

                        <option value="Personal Loan">

                            Personal Loan

                        </option>

                        <option value="Other" selected>

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

                        Interest Rate %

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

        if(!form){

            throw new Error(

                "Liability create form not found"

            );

        }

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                // ==========================================

                // Read Form

                // ==========================================

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

                // ==========================================

                // Validation

                // ==========================================

                if(!name){

                    alert(

                        "Please enter liability name."

                    );

                    return;

                }

                if(

                    !Number.isFinite(balance) ||

                    balance < 0

                ){

                    alert(

                        "Please enter a valid liability balance."

                    );

                    return;

                }

                if(

                    !Number.isFinite(rate) ||

                    rate < 0

                ){

                    alert(

                        "Please enter a valid interest rate."

                    );

                    return;

                }

                // ==========================================

                // Create

                //

                // IMPORTANT:

                // LiabilityAPI uses createLiability()

                // ==========================================

                const created =

                    LiabilityAPI

                        .createLiability({

                            name,

                            category,

                            currentBalance:

                                balance,

                            interestRate:

                                rate,

                            status:

                                "Active"

                        });

                if(!created){

                    throw new Error(

                        "Liability creation failed"

                    );

                }

                // ==========================================

                // Refresh

                // ==========================================

                this.render(

                    container,

                    onBack

                );

            }

        );

        // ==================================================

        // Cancel

        // ==================================================

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

                        value="${liability.name || ""}"

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

                        <option value="Auto Loan">

                            Auto Loan

                        </option>

                        <option value="Student Loan">

                            Student Loan

                        </option>

                        <option value="Personal Loan">

                            Personal Loan

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

                        value="${balance}"

                    >

                    <br><br>

                    <label>

                        Interest Rate %

                    </label>

                    <br>

                    <input

                        id="edit-liability-rate"

                        type="number"

                        min="0"

                        step="0.01"

                        value="${rate}"

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

                        )

                        .value

                        .trim(),

                    category:

                        form.querySelector(

                            "#edit-liability-category"

                        )

                        .value,

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

                if(

                    !Number.isFinite(

                        updated.currentBalance

                    ) ||

                    updated.currentBalance < 0

                ){

                    alert(

                        "Please enter a valid liability balance."

                    );

                    return;

                }

                if(

                    !Number.isFinite(

                        updated.interestRate

                    ) ||

                    updated.interestRate < 0

                ){

                    alert(

                        "Please enter a valid interest rate."

                    );

                    return;

                }

                const result =

                    LiabilityAPI

                        .updateLiability(

                            id,

                            updated

                        );

                if(!result){

                    throw new Error(

                        "Liability update failed"

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

        const result =

            LiabilityAPI

                .deleteLiability(

                    id

                );

        if(!result){

            throw new Error(

                "Liability deletion failed"

            );

        }

        this.render(

            container,

            onBack

        );

    }

};

export default LiabilityView;
