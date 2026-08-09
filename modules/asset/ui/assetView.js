/*

Family Wealth AI OS V7

Asset View

资产中心 UI

第二阶段：

Add Asset

View Asset

Edit Asset

Delete Asset

*/

import AssetAPI from "../api/assetAPI.js";

const AssetView = {

    // ==========================================

    // Render

    // ==========================================

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

                                <li

                                    data-asset-id="${asset.id}"

                                >

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

                                    <span>

                                        -

                                        Liquidity:

                                        ${asset.liquidity || "N/A"}

                                    </span>

                                    <button

                                        type="button"

                                        class="edit-asset-button"

                                        data-id="${asset.id}"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-asset-button"

                                        data-id="${asset.id}"

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

        // Add Button

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

        // ==========================================

        // Edit Buttons

        // ==========================================

        const editButtons =

            container.querySelectorAll(

                ".edit-asset-button"

            );

        editButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.showEditForm(

                            container,

                            button.dataset.id

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

                ".delete-asset-button"

            );

        deleteButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.deleteAsset(

                            container,

                            button.dataset.id

                        );

                    }

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

            <div class="asset-form">

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

    },

    // ==========================================

    // Edit Asset Form

    // ==========================================

    showEditForm(

        container,

        id

    ){

        const asset =

            AssetAPI.getById(

                id

            );

        if(!asset){

            throw new Error(

                "Asset not found: " + id

            );

        }

        const formContainer =

            container.querySelector(

                "#asset-form-container"

            );

        formContainer.innerHTML = `

            <div class="asset-form">

                <h3>

                    Edit Asset

                </h3>

                <form

                    id="asset-edit-form"

                >

                    <div>

                        <label>

                            Asset Name

                        </label>

                        <br>

                        <input

                            id="edit-asset-name"

                            type="text"

                            required

                            value="${asset.name || ""}"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Category

                        </label>

                        <br>

                        <select

                            id="edit-asset-category"

                            required

                        >

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

                            id="edit-asset-value"

                            type="number"

                            min="0"

                            step="0.01"

                            required

                            value="${Number(

                                asset.currentValue ||

                                0

                            )}"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            Liquidity

                        </label>

                        <br>

                        <select

                            id="edit-asset-liquidity"

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

                        Update Asset

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-asset-button"

                    >

                        Cancel

                    </button>

                </form>

            </div>

        `;

        formContainer.querySelector(

            "#edit-asset-category"

        ).value =

            asset.category || "Other";

        formContainer.querySelector(

            "#edit-asset-liquidity"

        ).value =

            asset.liquidity || "Medium";

        const form =

            formContainer.querySelector(

                "#asset-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updatedAsset = {

                    ...asset,

                    name:

                        form.querySelector(

                            "#edit-asset-name"

                        ).value.trim(),

                    category:

                        form.querySelector(

                            "#edit-asset-category"

                        ).value,

                    currentValue:

                        Number(

                            form.querySelector(

                                "#edit-asset-value"

                            ).value

                        ),

                    liquidity:

                        form.querySelector(

                            "#edit-asset-liquidity"

                        ).value

                };

                AssetAPI.update(

                    updatedAsset

                );

                this.render(

                    container

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-asset-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // Delete Asset

    // ==========================================

    deleteAsset(

        container,

        id

    ){

        const asset =

            AssetAPI.getById(

                id

            );

        if(!asset){

            throw new Error(

                "Asset not found: " + id

            );

        }

        const confirmed =

            window.confirm(

                "Delete asset: " +

                asset.name +

                "?"

            );

        if(!confirmed){

            return;

        }

        AssetAPI.remove(

            id

        );

        this.render(

            container

        );

    }

};

export default AssetView;
