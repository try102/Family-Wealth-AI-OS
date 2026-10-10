/*

Family Wealth AI OS

Account View

*/

import AccountAPI from "../api/accountAPI.js?v=20261010da";

import MemberAPI from "../../member/api/memberAPI.js?v=20261010da";

import IncomeAPI from "../../income/api/incomeAPI.js?v=20261010da";

import ExpenseAPI from "../../expense/api/expenseAPI.js?v=20261010da";

import LiabilityAPI from "../../liability/api/liabilityAPI.js?v=20261010da";

import InvestmentAPI from "../../investment/api/investmentAPI.js?v=20261010dg";

import AssetAPI from "../../asset/api/assetAPI.js?v=20261010da";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261010dc";

const AccountView = {

    render(

        container,

        onBack

    ){

        const accounts =

        AccountAPI.getAll();

                const memberList =

            (() => {

                try {

                    return MemberAPI.getMembers();

                } catch (error) {

                    return [];

                }

            })();

        const accountItemHTML =

            account => `

                        <li style="margin-bottom:15px;">

                        <strong>${account.name || "Unnamed Account"}</strong>

                        <br>

                        ${t("account.type")}: ${account.type || "N/A"}

                        <br>

                        ${t("account.balance")}: $${Number(account.balance || 0).toLocaleString()}

                        <br><br>

                        <button

                            type="button"

                            class="edit-balance-button"

                            data-id="${account.id}"

                        >

                            ${t("account.deposit")}

                        </button>

                        <button

                            type="button"

                            class="delete-account-button"

                            data-id="${account.id}"

                        >

                            ${t("common.delete")}

                        </button>

                        </li>

                        `;

        const accountGroupsHTML =

            (() => {

                const byOwner = {};

                accounts.forEach(

                    account => {

                        const owner =

                            account.memberId ||

                            account.ownerId ||

                            "";

                        if (!byOwner[owner]) {

                            byOwner[owner] = [];

                        }

                        byOwner[owner].push(

                            account

                        );

                    }

                );

                const groups = [];

                memberList.forEach(

                    member => {

                        if (byOwner[member.id]) {

                            groups.push({

                                label:

                                    member.name ||

                                    member.id,

                                items:

                                    byOwner[member.id]

                            });

                            delete byOwner[member.id];

                        }

                    }

                );

                Object.keys(byOwner).forEach(

                    owner => {

                        groups.push({

                            label:

                                owner === ""

                                    ? t("scope.shared")

                                    : owner,

                            items:

                                byOwner[owner]

                        });

                    }

                );

                return groups.map(

                    group => {

                        const subtotal =

                            group.items.reduce(

                                (sum, account) =>

                                    sum +

                                    Number(account.balance || 0),

                                0

                            );

                        return `

                <h3>${group.label}</h3>

                <p>${t("account.totalBalance")}: $${subtotal.toLocaleString()}</p>

                <ul>

                ${group.items.map(accountItemHTML).join("")}

                </ul>

                `;

                    }

                ).join("");

            })();

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

            <button

                id="transfer-account-button"

                type="button"

            >

                ${t("account.transfer")}

            </button>

            <button

                id="account-diag-button"

                type="button"

            >

                诊断

            </button>

            <div

                id="account-diag-container"

            ></div>

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

                ${accountGroupsHTML}

                `

            }

            <hr>

            <button

                id="account-diagnostic-button"

                type="button"

                style="margin-top:10px;font-size:12px;color:#666;"

            >

                📋 导出诊断数据

            </button>

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

        // Diagnostic Export

        // ==================================================

        const diagnosticButton =

            container.querySelector(

                "#account-diagnostic-button"

            );

        if (diagnosticButton) {

            diagnosticButton.addEventListener(

                "click",

                () => {

                    try {

                        const data = {

                            exportedAt:

                                new Date().toISOString(),

                            accounts:

                                (

                                    AccountAPI.getAll() ||

                                    []

                                ).map(a => ({

                                    id: a.id,

                                    name: a.name,

                                    type: a.type,

                                    accountType:

                                        a.accountType,

                                    memberId:

                                        a.memberId ||

                                        a.ownerId,

                                    balance: a.balance,

                                    openingBalance:

                                        a.openingBalance,

                                    basisValue:

                                        a.basisValue,

                                    mirrorBasisValue:

                                        a.mirrorBasisValue,

                                })),

                        };

                        // Investment trades

                        try {

                            data.investmentTrades =

                                (

                                    InvestmentAPI.getTrades() ||

                                    []

                                ).map(t => ({

                                    id: t.id,

                                    action: t.action,

                                    symbol: t.symbol,

                                    amount: t.amount,

                                    quantity:

                                        t.quantity,

                                    price: t.price,

                                    memberId:

                                        t.memberId,

                                    accountId:

                                        t.accountId,

                                    tradeDate:

                                        t.tradeDate,

                                }));

                        } catch (e) {}

                        // Paired assets (for Investment/Checking)

                        try {

                            data.assets =

                                (

                                    AssetAPI.getAll() ||

                                    []

                                ).map(a => ({

                                    id: a.id,

                                    name: a.name,

                                    category: a.category,

                                    type: a.type,

                                    memberId:

                                        a.memberId,

                                    amount: a.amount,

                                    currentValue:

                                        a.currentValue,

                                    basisValue:

                                        a.basisValue,

                                }));

                        } catch (e) {}

                        const blob =

                            new Blob(

                                [

                                    JSON.stringify(

                                        data,

                                        null,

                                        2

                                    )

                                ],

                                {

                                    type:

                                        "application/json"

                                }

                            );

                        const url =

                            URL.createObjectURL(blob);

                        const a =

                            document.createElement("a");

                        a.href = url;

                        a.download =

                            "diagnostic-" +

                            Date.now() +

                            ".json";

                        document.body.appendChild(a);

                        a.click();

                        document.body.removeChild(a);

                        URL.revokeObjectURL(url);

                    } catch (err) {

                        alert(

                            "导出失败: " +

                            err.message

                        );

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

        const transferButton =

            container.querySelector(

                "#transfer-account-button"

            );

        if (transferButton) {

            transferButton.addEventListener(

                "click",

                () => {

                    this.showTransferForm(

                        container,

                        onBack

                    );

                }

            );

        }

        const diagButton =

            container.querySelector(

                "#account-diag-button"

            );

        if (diagButton) {

            diagButton.addEventListener(

                "click",

                () => {

                    const diagContainer =

                        container.querySelector(

                            "#account-diag-container"

                        );

                    if (!diagContainer) {

                        return;

                    }

                    let diagText = "";

                    try {

                        diagText =

                            localStorage.getItem(

                                "fw_last_diag"

                            ) || "";

                    } catch (diagReadError) {

                    }

                    diagContainer.innerHTML =

                        `<p>把下面全部内容复制发给 Muse：</p><textarea readonly rows="14" style="width:100%">${diagText.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</textarea>`;

                    const area =

                        diagContainer.querySelector(

                            "textarea"

                        );

                    if (area) {

                        area.focus();

                        area.select();

                    }

                }

            );

        }

        // ==================================================

        // Edit balance (classified)

        // ==================================================

        const editBalanceButtons =

            container.querySelectorAll(

                ".edit-balance-button"

            );

        editBalanceButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.showBalanceEditForm(

                            container,

                            onBack,

                            button.dataset.id

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

    // Edit Balance Form (classified)

    //

    // Typing a new balance in the Account Center

    // asks what the change IS: a plain adjustment

    // (new anchor), income (also lands in the

    // Income Center), an expense, or borrowed

    // money (also lands in the Liability Center).

    // ==================================================

    showBalanceEditForm(

        container,

        onBack,

        accountId

    ){

        const formContainer =

            container.querySelector(

                "#account-form-container"

            );

        if (!formContainer) {

            return;

        }

        const account =

            (

                AccountAPI.getAll() || []

            ).find(

                item =>

                    String(item.id) ===

                    String(accountId)

            );

        if (!account) {

            return;

        }

        const currentBalance =

            Number(account.balance || 0);

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

                    ${t("account.deposit")} — ${account.name || account.id}

                </h3>

                <form

                    id="account-balance-edit-form"

                >

                    <label>

                        ${t("account.currentBalance")}：$${currentBalance.toLocaleString()}

                    </label>

                    <br><br>

                    <label>

                        ${t("account.depositAmount")}

                    </label>

                    <br>

                    <input

                        id="deposit-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("account.depositAfter")}：<span id="deposit-after-value">$${currentBalance.toLocaleString()}</span>

                    </label>

                    <br><br>

                    <label>

                        ${t("account.balanceKind")}

                    </label>

                    <br>

                    <select

                        id="deposit-kind"

                    >

                        <option value="income">${t("account.kindIncome")}</option>

                        <option value="liability">${t("account.kindLiability")}</option>

                        <option value="adjust">${t("account.kindAdjust")}</option>

                    </select>

                    <br><br>

                    <div id="deposit-type-row">

                        <label>

                            ${t("account.incomeNature")}

                        </label>

                        <br>

                        <select

                            id="deposit-income-type"

                        >

                            <option value="Salary">${t("account.typeSalary")}</option>

                            <option value="Business">${t("account.typeBusiness")}</option>

                            <option value="Rental">${t("account.typeRental")}</option>

                            <option value="Pension">${t("account.typePension")}</option>

                            <option value="OrdinaryDividend">${t("account.typeOrdinaryDividend")}</option>

                            <option value="QualifiedDividend">${t("account.typeQualifiedDividend")}</option>

                            <option value="OrdinaryInterest">${t("account.typeOrdinaryInterest")}</option>

                            <option value="TaxExemptInterest">${t("account.typeTaxExemptInterest")}</option>

                            <option value="Investment">${t("account.typeInvestment")}</option>

                            <option value="Other">${t("account.typeOther")}</option>

                        </select>

                        <br><br>

                    </div>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-balance-edit-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#account-balance-edit-form"

            );

        const amountInput =

            form.querySelector(

                "#deposit-amount"

            );

        const afterValue =

            form.querySelector(

                "#deposit-after-value"

            );

        const kindSelect =

            form.querySelector(

                "#deposit-kind"

            );

        const typeRow =

            form.querySelector(

                "#deposit-type-row"

            );

        const refreshDepositPreview =

            () => {

                const amount =

                    Number(amountInput.value || 0);

                afterValue.textContent =

                    "$" +

                    (

                        currentBalance +

                        (

                            Number.isFinite(amount)

                                ? amount

                                : 0

                        )

                    ).toLocaleString();

                typeRow.style.display =

                    kindSelect.value === "income"

                        ? ""

                        : "none";

            };

        amountInput.addEventListener(

            "input",

            refreshDepositPreview

        );

        kindSelect.addEventListener(

            "change",

            refreshDepositPreview

        );

        refreshDepositPreview();

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                // A deposit is a money event, never a
                // typed balance: the amount is booked
                // under the chosen classification and
                // the balance follows from the books.

                const amount =

                    Number(amountInput.value || 0);

                if (!(amount > 0)) {

                    return;

                }

                const kind =

                    kindSelect.value;

                const owner =

                    account.memberId ||

                    account.ownerId ||

                    "";

                const today =

                    new Date().toISOString().slice(0, 10);

                try {

                    if (kind === "income") {

                        const incomeType =

                            form.querySelector(

                                "#deposit-income-type"

                            ).value ||

                            "Other";

                        IncomeAPI.createIncome({

                            name:

                                t("account.balanceIncomeName"),

                            type:

                                incomeType,

                            category:

                                t(

                                    "account.type" +

                                    incomeType

                                ),

                            amount,

                            date: today,

                            accountId: account.id,

                            memberId: owner

                        });

                    } else if (kind === "liability") {

                        LiabilityAPI.createLiability({

                            name:

                                t("account.balanceLiabilityName"),

                            currentBalance: amount,

                            memberId: owner

                        });

                        AccountAPI.update({

                            ...account,

                            balance:

                                currentBalance + amount

                        });

                    } else {

                        AccountAPI.update({

                            ...account,

                            balance:

                                currentBalance + amount

                        });

                    }

                } catch (editError) {

                }

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-balance-edit-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==================================================

    // Create Form

    // ==================================================

    showTransferForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#account-form-container"

            );

        if (!formContainer) {

            return;

        }

        const accounts =

            AccountAPI.getAll() || [];

        const memberName =

            id => {

                if (!id) {

                    return "";

                }

                try {

                    const member =

                        (

                            MemberAPI.getMembers() ||

                            []

                        ).find(

                            item =>

                                String(item.id) ===

                                String(id)

                        );

                    return member ? member.name : "";

                } catch (memberError) {

                    return "";

                }

            };

        const options =

            accounts

                .map(

                    account => {

                        const owner =

                            memberName(

                                account.memberId ||

                                account.ownerId

                            );

                        const label =

                            `${owner ? owner + " — " : ""}${account.name || account.id} ($${Number(account.balance || 0).toLocaleString()})`;

                        return `<option value="${account.id}">${label}</option>`;

                    }

                )

                .join("");

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

                    ${t("account.transfer")}

                </h3>

                <form

                    id="account-transfer-form"

                >

                    <label>

                        ${t("account.transferFrom")}

                    </label>

                    <br>

                    <select

                        id="transfer-from"

                        required

                    >

                        ${options}

                    </select>

                    <br><br>

                    <label>

                        ${t("account.transferTo")}

                    </label>

                    <br>

                    <select

                        id="transfer-to"

                        required

                    >

                        ${options}

                    </select>

                    <br><br>

                    <label>

                        ${t("account.transferAmount")}

                    </label>

                    <br>

                    <input

                        id="transfer-amount"

                        type="number"

                        step="0.01"

                        min="0"

                        required

                    >

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("account.transferSubmit")}

                    </button>

                    <button

                        type="button"

                        id="cancel-transfer-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#account-transfer-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const fromId =

                    form.querySelector(

                        "#transfer-from"

                    ).value;

                const toId =

                    form.querySelector(

                        "#transfer-to"

                    ).value;

                const amount =

                    Number(

                        form.querySelector(

                            "#transfer-amount"

                        ).value || 0

                    );

                if (

                    fromId &&

                    toId &&

                    fromId !== toId &&

                    amount > 0

                ) {

                    AccountAPI.transfer(

                        fromId,

                        toId,

                        amount

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

                "#cancel-transfer-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    showCreateForm(container, onBack) {

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

                    <label>

                        ${t("member.owner")}

                    </label>

                    <br>

                    <select

                        id="account-member"

                    >

                        <option value="">${t("member.familyShared")}</option>

                        ${memberOptions}

                    </select>

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

                const memberId =

                    form.querySelector(

                        "#account-member"

                    )?.value || "";

                AccountAPI.create({

                    name,

                    type,

                    accountType: type,

                    memberId,

                    ownerId: memberId,

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
