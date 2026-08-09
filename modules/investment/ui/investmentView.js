/*

Family Wealth AI OS V7

Investment View

Investment Center UI

第二阶段：

Add Investment

View Investment

Edit Investment

Delete Investment

*/

import InvestmentAPI from "../api/investmentAPI.js";

const InvestmentView = {

    // ==========================================

    // Render

    // ==========================================

    render(

        container,

        onBack

    ){

        const investments =

            InvestmentAPI

            .getInvestments();

        const portfolio =

            InvestmentAPI

            .getPortfolioSummary();

        const performance =

            InvestmentAPI

            .getPerformance();

        const risk =

            InvestmentAPI

            .getRiskReport();

        container.innerHTML = `

            <div

                class="investment-center"

            >

                <h2>

                    Investment Center

                </h2>

                <button

                    id="investment-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

                <hr>

                <section>

                    <h3>

                        Portfolio Value

                    </h3>

                    <p>

                        $${Number(

                            portfolio.totalValue || 0

                        ).toLocaleString()}

                    </p>

                </section>

                <section>

                    <h3>

                        Portfolio Allocation

                    </h3>

                    <pre>

${JSON.stringify(

    portfolio.allocation,

    null,

    2

)}

                    </pre>

                </section>

                <section>

                    <h3>

                        Performance

                    </h3>

                    <pre>

${JSON.stringify(

    performance,

    null,

    2

)}

                    </pre>

                </section>

                <section>

                    <h3>

                        Risk

                    </h3>

                    <pre>

${JSON.stringify(

    risk,

    null,

    2

)}

                    </pre>

                </section>

                <hr>

                <button

                    id="add-investment-button"

                    type="button"

                >

                    + Add Investment

                </button>

                <div

                    id="investment-form-container"

                ></div>

                <h3>

                    Investments

                </h3>

                <ul>

                    ${

                        investments.length === 0

                        ?

                        "<li>No investments</li>"

                        :

                        investments.map(

                            investment => `

                                <li

                                    data-investment-id="${investment.id}"

                                >

                                    <strong>

                                        ${investment.name || "Unnamed"}

                                    </strong>

                                    -

                                    ${investment.symbol || "N/A"}

                                    -

                                    $${Number(

                                        investment.currentValue || 0

                                    ).toLocaleString()}

                                    <button

                                        type="button"

                                        class="edit-investment-button"

                                        data-id="${investment.id}"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-investment-button"

                                        data-id="${investment.id}"

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

        // Back Button

        // ==========================================

        const backButton =

            container.querySelector(

                "#investment-back-button"

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

        // Add Button

        // ==========================================

        const addButton =

            container.querySelector(

                "#add-investment-button"

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

        // Edit Buttons

        // ==========================================

        const editButtons =

            container.querySelectorAll(

                ".edit-investment-button"

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

        // Delete Buttons

        // ==========================================

        const deleteButtons =

            container.querySelectorAll(

                ".delete-investment-button"

            );

        deleteButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.deleteInvestment(

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

    // Create Investment Form

    // ==========================================

    showCreateForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#investment-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="investment-form"

            >

                <h3>

                    Add Investment

                </h3>

                <form

                    id="investment-create-form"

                >

                    <div>

                        <label>

                            Investment Name

                        </label>

                        <br>

                        <input

                            id="investment-name"

                            type="text"

                            required

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Symbol

                        </label>

                        <br>

                        <input

                            id="investment-symbol"

                            type="text"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Type

                        </label>

                        <br>

                        <select

                            id="investment-type"

                            required

                        >

                            <option value="">

                                Select Type

                            </option>

                            <option value="Stock">

                                Stock

                            </option>

                            <option value="ETF">

                                ETF

                            </option>

                            <option value="Bond">

                                Bond

                            </option>

                            <option value="Fund">

                                Fund

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <br>

                    <div>

                        <label>

                            Current Value

                        </label>

                        <br>

                        <input

                            id="investment-value"

                            type="number"

                            min="0"

                            step="0.01"

                            required

                        >

                    </div>

                    <br>

                    <button

                        type="submit"

                    >

                        Save Investment

                    </button>

                    <button

                        type="button"

                        id="cancel-investment-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#investment-create-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const investment = {

                    name:

                        form.querySelector(

                            "#investment-name"

                        ).value.trim(),

                    symbol:

                        form.querySelector(

                            "#investment-symbol"

                        ).value.trim(),

                    type:

                        form.querySelector(

                            "#investment-type"

                        ).value,

                    currentValue:

                        Number(

                            form.querySelector(

                                "#investment-value"

                            ).value

                        )

                };

                InvestmentAPI

                .createInvestment(

                    investment

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-investment-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // Edit Investment Form

    // ==========================================

    showEditForm(

        container,

        id,

        onBack

    ){

        const investments =

            InvestmentAPI

            .getInvestments();

        const investment =

            investments.find(

                item =>

                    item.id === id

            );

        if(!investment){

            throw new Error(

                "Investment not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#investment-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="investment-form"

            >

                <h3>

                    Edit Investment

                </h3>

                <form

                    id="investment-edit-form"

                >

                    <div>

                        <label>

                            Investment Name

                        </label>

                        <br>

                        <input

                            id="edit-investment-name"

                            type="text"

                            required

                            value="${investment.name || ""}"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Symbol

                        </label>

                        <br>

                        <input

                            id="edit-investment-symbol"

                            type="text"

                            value="${investment.symbol || ""}"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Type

                        </label>

                        <br>

                        <select

                            id="edit-investment-type"

                            required

                        >

                            <option value="Stock">

                                Stock

                            </option>

                            <option value="ETF">

                                ETF

                            </option>

                            <option value="Bond">

                                Bond

                            </option>

                            <option value="Fund">

                                Fund

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <br>

                    <div>

                        <label>

                            Current Value

                        </label>

                        <br>

                        <input

                            id="edit-investment-value"

                            type="number"

                            min="0"

                            step="0.01"

                            required

                            value="${Number(

                                investment.currentValue || 0

                            )}"

                        >

                    </div>

                    <br>

                    <button

                        type="submit"

                    >

                        Update Investment

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-investment-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        const typeSelect =

            formContainer.querySelector(

                "#edit-investment-type"

            );

        typeSelect.value =

            investment.type || "Other";

        const form =

            formContainer.querySelector(

                "#investment-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updatedInvestment = {

                    ...investment,

                    name:

                        form.querySelector(

                            "#edit-investment-name"

                        ).value.trim(),

                    symbol:

                        form.querySelector(

                            "#edit-investment-symbol"

                        ).value.trim(),

                    type:

                        form.querySelector(

                            "#edit-investment-type"

                        ).value,

                    currentValue:

                        Number(

                            form.querySelector(

                                "#edit-investment-value"

                            ).value

                        )

                };

                InvestmentAPI

                .createInvestment(

                    updatedInvestment

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-investment-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // Delete Investment

    // ==========================================

    deleteInvestment(

        container,

        id,

        onBack

    ){

        const investments =

            InvestmentAPI

            .getInvestments();

        const investment =

            investments.find(

                item =>

                    item.id === id

            );

        if(!investment){

            throw new Error(

                "Investment not found: " +

                id

            );

        }

        const confirmed =

            window.confirm(

                "Delete investment: " +

                (investment.name || "Unnamed") +

                "?"

            );

        if(!confirmed){

            return;

        }

        InvestmentAPI

        .deleteInvestment(

            id

        );

        this.render(

            container,

            onBack

        );

    }

};

export default InvestmentView;
