/*

Family Wealth AI OS V7

Investment View

投资中心 UI

第二阶段：

Add Investment

View Investment

Edit Investment

Delete Investment

*/

import InvestmentAPI from "../api/investmentAPI.js";

const InvestmentView = {

    // ==================================================

    // Render

    // ==================================================

    render(

        container,

        onBack

    ){

        const portfolio =

            InvestmentAPI

            .getPortfolioSummary();

        const performance =

            InvestmentAPI

            .getPerformance();

        const risk =

            InvestmentAPI

            .getRiskReport();

        const investments =

            this.getInvestments();

        const totalValue =

            Number(

                portfolio?.totalValue || 0

            );

        container.innerHTML = `

            <div

                class="investment-center"

            >

                <h2>

                    Investment Center

                </h2>

                <p>

                    Portfolio Value:

                    $${totalValue.toLocaleString()}

                </p>

                <button

                    type="button"

                    id="investment-back-button"

                >

                    ← Back to Dashboard

                </button>

                <button

                    type="button"

                    id="add-investment-button"

                >

                    + Add Investment

                </button>

                <hr>

                <div

                    id="investment-form-container"

                ></div>

                <h3>

                    Investments

                </h3>

                <div

                    id="investment-list"

                >

                    ${

                        investments.length === 0

                        ?

                        `

                            <p>

                                No investments

                            </p>

                        `

                        :

                        investments.map(

                            investment => `

                                <div

                                    class="investment-card"

                                    data-investment-id="${

                                        investment.id

                                    }"

                                >

                                    <strong>

                                        ${

                                            investment.name ||

                                            "Unnamed Investment"

                                        }

                                    </strong>

                                    <p>

                                        Type:

                                        ${

                                            investment.type ||

                                            "Investment"

                                        }

                                    </p>

                                    <p>

                                        Quantity:

                                        ${

                                            Number(

                                                investment.quantity ||

                                                0

                                            ).toLocaleString()

                                        }

                                    </p>

                                    <p>

                                        Value:

                                        $${

                                            Number(

                                                investment.currentValue ||

                                                investment.value ||

                                                0

                                            ).toLocaleString()

                                        }

                                    </p>

                                    <button

                                        type="button"

                                        class="edit-investment-button"

                                        data-id="${

                                            investment.id

                                        }"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-investment-button"

                                        data-id="${

                                            investment.id

                                        }"

                                    >

                                        Delete

                                    </button>

                                </div>

                            `

                        ).join("")

                    }

                </div>

                <hr>

                <section>

                    <h3>

                        Allocation

                    </h3>

                    <pre>

${JSON.stringify(

    portfolio?.allocation || {},

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

    performance || {},

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

    risk || {},

    null,

    2

)}

                    </pre>

                </section>

            </div>

        `;

        // ==================================================

        // Back Button

        // ==================================================

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

        // ==================================================

        // Add Investment

        // ==================================================

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

        // ==================================================

        // Edit Buttons

        // ==================================================

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

        // ==================================================

        // Delete Buttons

        // ==================================================

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

    // ==================================================

    // Get Investments

    // ==================================================

    getInvestments(){

        /*

        Try the most common API names.

        We do not change InvestmentAPI.

        We only adapt the UI to the existing API.

        */

        if(

            typeof InvestmentAPI.getAll ===

            "function"

        ){

            return InvestmentAPI.getAll() || [];

        }

        if(

            typeof InvestmentAPI.getInvestments ===

            "function"

        ){

            return InvestmentAPI

                .getInvestments() || [];

        }

        if(

            typeof InvestmentAPI.list ===

            "function"

        ){

            return InvestmentAPI.list() || [];

        }

        return [];

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

                "#investment-form-container"

            );

        if(!formContainer){

            return;

        }

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

                            <option value="Cash">

                                Cash

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <br>

                    <div>

                        <label>

                            Quantity

                        </label>

                        <br>

                        <input

                            id="investment-quantity"

                            type="number"

                            min="0"

                            step="0.0001"

                            value="0"

                        >

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

        // ==================================================

        // Submit

        // ==================================================

        const form =

            formContainer.querySelector(

                "#investment-create-form"

            );

        if(!form){

            return;

        }

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const investment = {

                    name:

                        form.querySelector(

                            "#investment-name"

                        ).value.trim(),

                    type:

                        form.querySelector(

                            "#investment-type"

                        ).value,

                    quantity:

                        Number(

                            form.querySelector(

                                "#investment-quantity"

                            ).value || 0

                        ),

                    currentValue:

                        Number(

                            form.querySelector(

                                "#investment-value"

                            ).value || 0

                        )

                };

                if(

                    typeof InvestmentAPI.create ===

                    "function"

                ){

                    InvestmentAPI.create(

                        investment

                    );

                }

                else{

                    throw new Error(

                        "InvestmentAPI.create not found"

                    );

                }

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

                "#cancel-investment-button"

            );

        if(cancelButton){

            cancelButton.addEventListener(

                "click",

                () => {

                    formContainer.innerHTML = "";

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

        const investment =

            this.getById(id);

        if(!investment){

            throw new Error(

                "Investment not found: " + id

            );

        }

        const formContainer =

            container.querySelector(

                "#investment-form-container"

            );

        if(!formContainer){

            return;

        }

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

                            value="${

                                investment.name || ""

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

                            <option value="Cash">

                                Cash

                            </option>

                            <option value="Other">

                                Other

                            </option>

                        </select>

                    </div>

                    <br>

                    <div>

                        <label>

                            Quantity

                        </label>

                        <br>

                        <input

                            id="edit-investment-quantity"

                            type="number"

                            min="0"

                            step="0.0001"

                            value="${

                                Number(

                                    investment.quantity || 0

                                )

                            }"

                        >

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

                            value="${

                                Number(

                                    investment.currentValue ||

                                    investment.value ||

                                    0

                                )

                            }"

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

        formContainer.querySelector(

            "#edit-investment-type"

        ).value =

            investment.type ||

            "Other";

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

                    type:

                        form.querySelector(

                            "#edit-investment-type"

                        ).value,

                    quantity:

                        Number(

                            form.querySelector(

                                "#edit-investment-quantity"

                            ).value || 0

                        ),

                    currentValue:

                        Number(

                            form.querySelector(

                                "#edit-investment-value"

                            ).value || 0

                        )

                };

                if(

                    typeof InvestmentAPI.update ===

                    "function"

                ){

                    InvestmentAPI.update(

                        updatedInvestment

                    );

                }

                else{

                    throw new Error(

                        "InvestmentAPI.update not found"

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

                "#cancel-edit-investment-button"

            );

        if(cancelButton){

            cancelButton.addEventListener(

                "click",

                () => {

                    formContainer.innerHTML = "";

                }

            );

        }

    },

    // ==================================================

    // Get By ID

    // ==================================================

    getById(id){

        if(

            typeof InvestmentAPI.getById ===

            "function"

        ){

            return InvestmentAPI.getById(id);

        }

        const investments =

            this.getInvestments();

        return investments.find(

            item =>

                String(item.id) ===

                String(id)

        );

    },

    // ==================================================

    // Delete

    // ==================================================

    deleteInvestment(

        container,

        id,

        onBack

    ){

        const investment =

            this.getById(id);

        if(!investment){

            throw new Error(

                "Investment not found: " + id

            );

        }

        const confirmed =

            window.confirm(

                "Delete investment: " +

                (

                    investment.name ||

                    "this investment"

                ) +

                "?"

            );

        if(!confirmed){

            return;

        }

        if(

            typeof InvestmentAPI.remove ===

            "function"

        ){

            InvestmentAPI.remove(id);

        }

        else if(

            typeof InvestmentAPI.delete ===

            "function"

        ){

            InvestmentAPI.delete(id);

        }

        else{

            throw new Error(

                "InvestmentAPI.remove/delete not found"

            );

        }

        this.render(

            container,

            onBack

        );

    }

};

export default InvestmentView;
