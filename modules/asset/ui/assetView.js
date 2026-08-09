/*

Family Wealth AI OS V7

Asset View

资产中心 UI

第一阶段：

Add Asset

*/

import AssetAPI from "../api/assetAPI.js";

const AssetView = {

    render(

        container

    ){

        const assets =

            AssetAPI.getAll();

        const totalValue =

            AssetAPI.getTotalValue();

        container.innerHTML = `

            <div class="asset-center">

                <h2>

                    Asset Center

                </h2>

                <p>

                    Total Assets:

                    $${Number(

                        totalValue

                    ).toLocaleString()}

                </p>

                <button

                    id="add-asset-button"

                    type="button"

                >

                    + Add Asset

                </button>

                <hr>

                <div

                    id="asset-form-container"

                ></div>

                <h3>

                    Assets

                </h3>

                <ul>

                    ${

                        assets.length === 0

                        ?

                        "<li>No assets</li>"

                        :

                        assets.map(

                            asset => `

                                <li>

                                    <strong>

                                        ${asset.name}

                                    </strong>

                                    :

                                    $${Number(

                                        asset.currentValue ||

                                        0

                                    ).toLocaleString()}

                                    <span>

                                        (${asset.category || "OTHER"})

                                    </span>

                                </li>

                            `

                        ).join("")

                    }

                </ul>

            </div>

        `;

        // ==========================================

        // Add Asset Button

        // ==========================================

        const addButton =

            container.querySelector(

                "#add-asset-button"

            );

        addButton.addEventListener(

            "click",

            () => {

                this.showCreateForm(

                    container

                );

            }

        );

    },

    // ==========================================

    // Create Asset Form

    // ==========================================

    showCreateForm(

        container

    ){

        const formContainer =

            container.querySelector(

                "#asset-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="asset-form"

            >

                <h3>

                    Add Asset

                </h3>

                <form

                    id="asset-create-form"

                >

                    <div>

                        <label>

                            Asset Name

                        </label>

                        <br>

                        <input

                            id="asset-name"

                            type="text"

                            required

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Category

                        </label>

                        <br>

                        <select

                            id="asset-category"

                            required

                        >

                            <option value="">

                                Select Category

                            </option>

                            <option value="Cash">

                                Cash

                            </option>

                            <option value="Real Estate">

                                Real Estate

                            </option>

                            <option value="Investment">

                                Investment

                            </option>

                            <option value="Business">

                                Business

                            </option>

                            <option value="Insurance">

                                Insurance

                            </option>

                            <option value="Precious Metals">

                                Precious Metals

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

                            id="asset-value"

                            type="number"

                            min="0"

                            step="0.01"

                            required

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Liquidity

                        </label>

                        <br>

                        <select

                            id="asset-liquidity"

                        >

                            <option value="High">

                                High

                            </option>

                            <option value="Medium">

                                Medium

                            </option>

                            <option value="Low">

                                Low

                            </option>

                        </select>

                    </div>

                    <br>

                    <button

                        type="submit"

                    >

                        Save Asset

                    </button>

                    <button

                        type="button"

                        id="cancel-asset-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        // ==========================================

        // Form Submit

        // ==========================================

        const form =

            formContainer.querySelector(

                "#asset-create-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const asset = {

                    name:

                        form.querySelector(

                            "#asset-name"

                        ).value.trim(),

                    category:

                        form.querySelector(

                            "#asset-category"

                        ).value,

                    currentValue:

                        Number(

                            form.querySelector(

                                "#asset-value"

                            ).value

                        ),

                    liquidity:

                        form.querySelector(

                            "#asset-liquidity"

                        ).value

                };

                AssetAPI.create(

                    asset

                );

                this.render(

                    container

                );

            }

        );

        // ==========================================

        // Cancel

        // ==========================================

        const cancelButton =

            formContainer.querySelector(

                "#cancel-asset-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    }

};

export default AssetView;
