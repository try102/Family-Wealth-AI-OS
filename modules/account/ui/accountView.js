/*

Family Wealth AI OS

Account View

*/

import AccountAPI from "../api/accountAPI.js";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js";

const AccountView = {

    render(

        container,

        onBack

    ){

        const accounts =

        AccountAPI.getAll();

        container.innerHTML =

        `

        <div class="account-center">

            <h2>

            🏦 ${t("account.title")}

            </h2>

            <button

                id="account-back-button"

                type="button"

            >

                ${t("common.back")}

            </button>

            <br><br>

            <label>${t("common.language")}</label>

            <select id="account-language-select">${languageOptions(getLanguage())}</select>

            <hr>

            <p>

            ${t("account.totalBalance")}:

            $${

                Number(

                    AccountAPI

                    .getTotalBalance()

                ).toLocaleString()

            }

            </p>

            <button

                id="add-account-button"

                type="button"

            >

                ${t("account.add")}

            </button>

            <div

                id="account-form-container"

            ></div>

            <hr>

            <div id="account-list-container">

            ${

                accounts.length === 0

                ?

                `

                <p>

                    ${t("account.empty")}

                </p>

                `

                :

                `

                <ul>

                ${

                    accounts.map(

                        account=>`

                        <li style="margin-bottom:15px;">

                        <strong>${account.name || "Unnamed Account"}</strong>

                        <br>

                        ${t("account.type")}: ${account.type || "N/A"}

                        <br>

                        ${t("account.balance")}: $${Number(account.balance || 0).toLocaleString()}

                        <br><br>

                        <button

                            type="button"

                            class="delete-account-button"

                            data-id="${account.id}"

                        >

                            ${t("common.delete")}

                        </button>

                        </li>

                        `

                    ).join("")

                }

                </ul>

                `

            }

            </div>

        </div>

        `;

        // ==================================================

        // Back

        // ==================================================

        const backButton =

            container.querySelector(

                "#account-back-button"

            );

        if (backButton) {

            backButton.addEventListener(

                "click",

                () => {

                    if (

                        typeof onBack ===

                        "function"

                    ) {

                        onBack();

                    }

                }

            );

        }

        // ==================================================

        // Language Switch

        // ==================================================

        const languageSelect =

            container.querySelector(

                "#account-language-select"

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

        // ==================================================

        // Add

        // ==================================================

        const addButton =

            container.querySelector(

                "#add-account-button"

            );

        if (addButton) {

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

        // Delete

        // ==================================================

        const deleteButtons =

            container.querySelectorAll(

                ".delete-account-button"

            );

        deleteButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.deleteAccount(

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

    showCreateForm(container, onBack) {

        const formContainer =

            container.querySelector(

                "#account-form-container"

            );

        if (!formContainer) {

            return;

        }

        formContainer.innerHTML = `

            <div

                class="account-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("account.add")}

                </h3>

                <form

                    id="account-create-form"

                >

                    <label>

                        ${t("common.name")}

                    </label>

                    <br>

                    <input

                        id="account-name"

                        type="text"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("account.type")}

                    </label>

                    <br>

                    <select

                        id="account-type"

                        required

                    >

                        <option value="">

                            Select Type

                        </option>

                        <option value="Checking">

                            Checking

                        </option>

                        <option value="Savings">

                            Savings

                        </option>

                        <option value="Credit Card">

                            Credit Card

                        </option>

                        <option value="Brokerage">

                            Brokerage

                        </option>

                        <option value="Cash">

                            Cash

                        </option>

                        <option value="Other">

                            Other

                        </option>

                    </select>

                    <br><br>

                    <label>

                        ${t("account.institution")}

                    </label>

                    <br>

                    <input

                        id="account-institution"

                        type="text"

                    >

                    <br><br>

                    <label>

                        ${t("account.balance")}

                    </label>

                    <br>

                    <input

                        id="account-balance"

                        type="number"

                        step="0.01"

                        value="0"

                    >

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-account-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#account-create-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const name =

                    form.querySelector(

                        "#account-name"

                    ).value.trim();

                const type =

                    form.querySelector(

                        "#account-type"

                    ).value;

                const institution =

                    form.querySelector(

                        "#account-institution"

                    ).value.trim();

                const balance =

                    Number(

                        form.querySelector(

                            "#account-balance"

                        ).value || 0

                    );

                AccountAPI.create({

                    name,

                    type,

                    accountType: type,

                    institution,

                    balance

                });

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-account-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==================================================

    // Delete

    // ==================================================

    deleteAccount(

        container,

        id,

        onBack

    ) {

        const account =

            AccountAPI.getById(

                id

            );

        if (!account) {

            return;

        }

        const confirmed =

            window.confirm(

                "Delete account: " +

                (

                    account.name ||

                    "Unnamed Account"

                ) +

                "?"

            );

        if (!confirmed) {

            return;

        }

        AccountAPI.remove(id);

        this.render(

            container,

            onBack

        );

    }

};

export default AccountView;
