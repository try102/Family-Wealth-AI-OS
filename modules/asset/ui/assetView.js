/*

Family Wealth AI OS V7

Asset View

资产中心 UI

第三阶段：

Add Asset

View Asset

Edit Asset

Delete Asset

Return To Dashboard

*/

import AssetAPI from "../api/assetAPI.js";

import AccountAPI from "../../account/api/accountAPI.js";

import MemberAPI from "../../member/api/memberAPI.js";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js";

const AssetView = {

    // ==========================================

    // Render

    // ==========================================

    render(

        container,

        onBack

    ){

        const assets =

            AssetAPI.getAll();

        const totalValue =

            AssetAPI.getTotalValue();

        container.innerHTML = `

            <div class="asset-center">

                <h2>

                    ${t("asset.title")}

                </h2>

                <p>

                    ${t("asset.totalValue")}:

                    $${Number(

                        totalValue

                    ).toLocaleString()}

                </p>

                <!-- ==========================

                     Navigation

                =========================== -->

                <div>

                    <button

                        id="asset-home-button"

                        type="button"

                    >

                        ${t("common.back")}

                    </button>

                </div>

                <br>

                <label>${t("common.language")}</label>

                <select id="asset-language-select">${languageOptions(getLanguage())}</select>

                <br>

                <!-- ==========================

                     Add

                =========================== -->

                <button

                    id="add-asset-button"

                    type="button"

                >

                    ${t("asset.add")}

                </button>

                <hr>

                <div

                    id="asset-form-container"

                ></div>

                <h3>

                    ${t("asset.list")}

                </h3>

                <ul>

                    ${

                        assets.length === 0

                        ?

                        "<li>" + t("asset.empty") + "</li>"

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

                                        (${asset.category ||

                                        "OTHER"})

                                    </span>

                                    <span>

                                        -

                                        ${t("asset.liquidity")}:

                                        ${asset.liquidity ||

                                        "N/A"}

                                    </span>

                                    <button

                                        type="button"

                                        class="buy-asset-button"

                                        data-id="${asset.id}"

                                    >

                                        ${t("asset.recordPurchase")}

                                    </button>

                                    <button

                                        type="button"

                                        class="sell-asset-button"

                                        data-id="${asset.id}"

                                    >

                                        ${t("asset.recordSale")}

                                    </button>

                                    <button

                                        type="button"

                                        class="edit-asset-button"

                                        data-id="${asset.id}"

                                    >

                                        ${t("common.edit")}

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-asset-button"

                                        data-id="${asset.id}"

                                    >

                                        ${t("common.delete")}

                                    </button>

                                </li>

                            `

                        ).join("")

                    }

                </ul>

            </div>

        `;

        // ==========================================

        // Language Switch

        // ==========================================

        const languageSelect =

            container.querySelector(

                "#asset-language-select"

            );

        if (languageSelect) {

            languageSelect.addEventListener(

                "change",

                () => {

                    setLanguage(

                        languageSelect.value

                    );

                    this.render(

                        container,

                        onBack

                    );

                }

            );

        }

        // ==========================================

        // Back To Dashboard

        // ==========================================

        const homeButton =

            container.querySelector(

                "#asset-home-button"

            );

        if(

            homeButton

        ){

            homeButton.addEventListener(

                "click",

                () => {

                    if(

                        typeof onBack ===

                        "function"

                    ){

                        onBack();

                    }

                    else {

                        window.location.reload();

                    }

                }

            );

        }

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

                            button.dataset.id,

                            onBack

                        );

                    }

                );

            }

        );

        // ==========================================

        // Buy / Sell Buttons

        // ==========================================

        const buyButtons =

            container.querySelectorAll(

                ".buy-asset-button"

            );

        buyButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.showAssetEventForm(

                            container,

                            button.dataset.id,

                            "BUY",

                            onBack

                        );

                    }

                );

            }

        );

        const sellButtons =

            container.querySelectorAll(

                ".sell-asset-button"

            );

        sellButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.showAssetEventForm(

                            container,

                            button.dataset.id,

                            "SELL",

                            onBack

                        );

                    }

                );

            }

        );

    },

    // ==========================================

    // Accounts

    // ==========================================

    getAccounts() {

        try {

            return AccountAPI.getAll() || [];

        } catch (accountError) {

            return [];

        }

    },

    buildAccountOptions(selectedId = "") {

        return this.getAccounts().map(

            account => `

                <option

                    value="${account.id}"

                    ${

                        String(account.id) ===

                        String(selectedId)

                        ?

                        "selected"

                        :

                        ""

                    }

                >

                    ${

                        account.name ||

                        account.id

                    }

                </option>

            `

        ).join("");

    },

    // ==========================================

    // Asset Purchase / Sale Form

    // ==========================================

    showAssetEventForm(

        container,

        id,

        mode,

        onBack

    ){

        const asset =

            AssetAPI.getById(

                id

            );

        if (!asset) {

            return;

        }

        const formContainer =

            container.querySelector(

                "#asset-form-container"

            );

        if (!formContainer) {

            return;

        }

        const isBuy =

            mode === "BUY";

        const accounts =

            this.getAccounts();

        const accountOptions =

            this.buildAccountOptions(

                asset.accountId || ""

            );

        const accountHint =

            accounts.length === 0

            ?

            `

            <p style="color:#c00;">

                ${t("common.noAccountWarn")}

            </p>

            `

            :

            "";

        formContainer.innerHTML = `

            <div

                class="asset-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${isBuy ? t("asset.recordPurchase") : t("asset.recordSale")} — ${asset.name || "Asset"}

                </h3>

                <form

                    id="asset-event-form"

                >

                    <label>

                        ${isBuy ? t("asset.purchaseAmount") : t("asset.saleAmount")}

                    </label>

                    <br>

                    <input

                        id="asset-event-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                        value="${

                            isBuy

                            ?

                            (asset.purchaseValue || "")

                            :

                            (asset.currentValue || "")

                        }"

                    >

                    <br><br>

                    <label>

                        ${t("common.date")}

                    </label>

                    <br>

                    <input

                        id="asset-event-date"

                        type="date"

                    >

                    <br><br>

                    <label>

                        ${t("asset.payAccount")}

                    </label>

                    <br>

                    <select

                        id="asset-event-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${accountOptions}

                    </select>

                    ${accountHint}

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-asset-event-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#asset-event-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const amount =

                    Number(

                        form.querySelector(

                            "#asset-event-amount"

                        ).value || 0

                    );

                const date =

                    form.querySelector(

                        "#asset-event-date"

                    ).value;

                const accountField =

                    form.querySelector(

                        "#asset-event-account"

                    );

                const accountId =

                    accountField

                    ?

                    accountField.value

                    :

                    "";

                if (isBuy) {

                    AssetAPI.recordPurchase(

                        id,

                        {

                            amount,

                            date,

                            accountId

                        }

                    );

                } else {

                    AssetAPI.recordSale(

                        id,

                        {

                            amount,

                            date,

                            accountId

                        }

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

                "#cancel-asset-event-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

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

        const memberOptions =

            (() => {

                try {

                    return MemberAPI.getMembers().map(

                        member => `<option value="${member.id}">${member.name || member.id}</option>`

                    ).join("");

                } catch (error) {

                    return "";

                }

            })();

        formContainer.innerHTML = `

            <div class="asset-form">

                <h3>

                    ${t("asset.add")}

                </h3>

                <form

                    id="asset-create-form"

                >

                    <div>

                        <label>

                            ${t("common.name")}

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

                            ${t("common.category")}

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

                            ${t("asset.currentValue")}

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

                            ${t("asset.liquidity")}

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

                    <br><br>

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="asset-member"

                    >

                        <option value="">${t("member.familyShared")}</option>

                        ${memberOptions}

                    </select>

                    </div>

                    <br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-asset-button"

                    >

                        ${t("common.cancel")}

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

                        ).value,

                    memberId:

                        form.querySelector(

                            "#asset-member"

                        )?.value || ""

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

                formContainer.innerHTML =

                    "";

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

                "Asset not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#asset-form-container"

            );

        formContainer.innerHTML = `

            <div class="asset-form">

                <h3>

                    ${t("asset.edit")}

                </h3>

                <form

                    id="asset-edit-form"

                >

                    <div>

                        <label>

                            ${t("common.name")}

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

                            ${t("common.category")}

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

                            ${t("asset.currentValue")}

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

                            ${t("asset.liquidity")}

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

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-asset-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        // ==========================================

        // Existing Values

        // ==========================================

        formContainer.querySelector(

            "#edit-asset-category"

        ).value =

            asset.category ||

            "Other";

        formContainer.querySelector(

            "#edit-asset-liquidity"

        ).value =

            asset.liquidity ||

            "Medium";

        // ==========================================

        // Edit Submit

        // ==========================================

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

        // ==========================================

        // Cancel Edit

        // ==========================================

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-asset-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML =

                    "";

            }

        );

    },

    // ==========================================

    // Delete Asset

    // ==========================================

    deleteAsset(

        container,

        id,

        onBack

    ){

        const asset =

            AssetAPI.getById(

                id

            );

        if(!asset){

            throw new Error(

                "Asset not found: " +

                id

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

            container,

            onBack

        );

    }

};

export default AssetView;
