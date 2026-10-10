/*

Family Wealth AI OS V7

Cashflow View

现金流 UI 展示层

*/

import cashflowAPI

    from "../api/cashflowAPI.js?v=20261008ae";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js?v=20261008ak";

import AccountAPI

    from "../../account/api/accountAPI.js?v=20261008aw";

import MemberAPI

    from "../../member/api/memberAPI.js?v=20261008ap";

import IncomeAPI

    from "../../income/api/incomeAPI.js?v=20261008ae";

import ExpenseAPI

    from "../../expense/api/expenseAPI.js?v=20261008ae";

import LiabilityAPI

    from "../../liability/api/liabilityAPI.js?v=20261009bo";

import AssetAPI

    from "../../asset/api/assetAPI.js?v=20261008ae";

import InvestmentAPI

    from "../../investment/api/investmentAPI.js?v=20261008ah";

import TransactionRepository

    from "../../../transaction/transactionRepository.js?v=20261008ae";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261009bo";

import { wireInlineCreate, resolveAccountId } from "../../../core/utils/inlineCreate.js?v=20261008ae";

import cashflowAgent

    from "../agent/cashflowAgent.js?v=20261008ae";

import cashflowAI

    from "../ai/cashflowAI.js?v=20261008ae";

const cashflowView = {

    name:

        "Cashflow View V7",

    // ==================================================

    // Main Render

    // ==================================================

    render(

        container,

        onBack

    ){

        const scopeId =

            this.cashflowScopeMemberId || "";

        const members =

            (() => {

                try {

                    return MemberAPI.getMembers() || [];

                }

                catch (memberError) {

                    return [];

                }

            })();

        // Member attribution for cash flow entries:

        // source business record -> its account -> shared.

        const accountMemberMap = {};

        try {

            (AccountAPI.getAll() || []).forEach(

                account => {

                    accountMemberMap[account.id] =

                        account.memberId ||

                        account.ownerId ||

                        "";

                }

            );

        } catch (mapError) {}

        const recordMember = {};

        const collectRecords =

            list => {

                (list || []).forEach(

                    record => {

                        if (record && record.id) {

                            recordMember[record.id] =

                                record.memberId ||

                                record.ownerId ||

                                "";

                        }

                    }

                );

            };

        try { collectRecords(IncomeAPI.getAllIncome()); } catch (e) {}

        try { collectRecords(ExpenseAPI.getAllExpense()); } catch (e) {}

        try { collectRecords(LiabilityAPI.getLiabilities()); } catch (e) {}

        try { collectRecords(AssetAPI.getAll()); } catch (e) {}

        try { collectRecords(InvestmentAPI.getTrades()); } catch (e) {}

        const transactionById = {};

        try {

            TransactionRepository

                .getTransactions()

                .forEach(

                    transaction => {

                        transactionById[transaction.id] =

                            transaction;

                    }

                );

        } catch (mapError) {}

        const entryOwner =

            entry => {

                const transaction =

                    transactionById[entry.transactionId];

                const details =

                    (transaction && transaction.businessDetails) || {};

                const nested =

                    details.income ||

                    details.expense ||

                    details.liability ||

                    details.asset ||

                    details.investment ||

                    null;

                if (nested) {

                    if (

                        typeof nested.memberId === "string" &&

                        nested.memberId

                    ) {

                        return nested.memberId;

                    }

                    const recordId =

                        nested.incomeId ||

                        nested.expenseId ||

                        nested.liabilityId ||

                        nested.assetId ||

                        nested.tradeId ||

                        nested.investmentId ||

                        nested.id ||

                        "";

                    if (

                        recordId &&

                        recordMember[recordId]

                    ) {

                        return recordMember[recordId];

                    }

                }

                if (

                    entry.accountId &&

                    accountMemberMap[entry.accountId]

                ) {

                    return accountMemberMap[entry.accountId];

                }

                return "";

            };

        const inScope =

            owner =>

                !scopeId

                    ? true

                    : scopeId === "__shared__"

                        ? owner === ""

                        : owner === scopeId;

        const allCashflows =

            cashflowAPI

                .getCashflows();

        const cashflows =

            scopeId

                ? allCashflows.filter(

                    entry => inScope(entryOwner(entry))

                )

                : allCashflows;

        const annualizeEntry =

            item => {

                const value =

                    Number(item.amount || 0);

                switch (item.frequency) {

                    case "MONTHLY":

                        return value * 12;

                    case "QUARTERLY":

                        return value * 4;

                    default:

                        return value;

                }

            };

        const summary =

            scopeId

                ? (() => {

                    let income = 0;

                    let expense = 0;

                    let investmentIn = 0;

                    let investmentOut = 0;

                    let regularIncome = 0;

                    let regularExpense = 0;

                    cashflows.forEach(

                        item => {

                            const value =

                                annualizeEntry(item);

                            const isInvestment =

                                item.category ===

                                "Investment";

                            if (item.type === "INCOME") {

                                income += value;

                                if (isInvestment) {

                                    investmentIn += value;

                                } else {

                                    regularIncome += value;

                                }

                            }

                            if (item.type === "EXPENSE") {

                                expense += value;

                                if (isInvestment) {

                                    investmentOut += value;

                                } else {

                                    regularExpense += value;

                                }

                            }

                        }

                    );

                    return {

                        income,

                        expense,

                        net: income - expense,

                        investmentIn,

                        investmentOut,

                        investmentNet:

                            investmentIn - investmentOut,

                        regularIncome,

                        regularExpense,

                        regularNet:

                            regularIncome - regularExpense

                    };

                })()

                : cashflowAPI

                    .getSummary();

        // Cash across ALL accounts (checking,

        // savings, investment-account cash...),

        // classified by member and account.

        const cashAccounts =

            (() => {

                try {

                    const memberNames = {};

                    (

                        MemberAPI.getMembers() || []

                    ).forEach(

                        member => {

                            memberNames[member.id] =

                                member.name || "";

                        }

                    );

                    return (

                        AccountAPI.getAll() || []

                    )

                        .filter(

                            account =>

                                Number(

                                    account.balance || 0

                                ) !== 0

                        )

                        .filter(

                            account =>

                                !scopeId

                                    ? true

                                    : scopeId === "__shared__"

                                        ? !(

                                            account.memberId ||

                                            account.ownerId ||

                                            ""

                                        )

                                        : (

                                            account.memberId ||

                                            account.ownerId ||

                                            ""

                                        ) === scopeId

                        )

                        .map(

                            account => ({

                                name:

                                    account.name ||

                                    "Account",

                                type:

                                    account.type ||

                                    "",

                                owner:

                                    memberNames[

                                        account.memberId ||

                                        account.ownerId ||

                                        ""

                                    ] || "",

                                balance:

                                    Number(

                                        account.balance || 0

                                    )

                            })

                        );

                } catch (cashError) {

                    return [];

                }

            })();

        const cashTotal =

            cashAccounts.reduce(

                (sum, account) => sum + account.balance,

                0

            );

        // Realized gains (FIFO, persisted on each

        // SELL trade): economic income shown apart

        // from daily income — the sale proceeds are

        // already counted once as investment cash

        // in, so gains are never added to cash

        // income again.

        const realizedGains =

            (() => {

                try {

                    const acctMember = {};

                    (

                        AccountAPI.getAll() || []

                    ).forEach(

                        account => {

                            acctMember[account.id] =

                                account.memberId ||

                                account.ownerId ||

                                "";

                        }

                    );

                    let sum = 0;

                    (

                        InvestmentAPI.getTrades() || []

                    ).forEach(

                        trade => {

                            if (

                                String(

                                    trade.action || ""

                                ).toUpperCase() !== "SELL"

                            ) {

                                return;

                            }

                            const owner =

                                trade.memberId ||

                                (

                                    trade.accountId

                                        ? acctMember[

                                            trade.accountId

                                        ]

                                        : ""

                                ) ||

                                "";

                            const inScope =

                                !scopeId

                                    ? true

                                    : scopeId === "__shared__"

                                        ? owner === ""

                                        : owner === scopeId;

                            if (!inScope) {

                                return;

                            }

                            sum +=

                                Number(

                                    trade.realizedGainLoss || 0

                                );

                        }

                    );

                    return sum;

                } catch (gainsError) {

                    return 0;

                }

            })();

        let report = null;

        let advice = null;

        try{

            report =

                cashflowAgent

                    .generateReport();

        }

        catch(error){

            console.warn(

                "Cashflow Agent Report unavailable:",

                error

            );

        }

        try{

            advice =

                cashflowAI

                    .generateAdvice();

        }

        catch(error){

            console.warn(

                "Cashflow AI Advice unavailable:",

                error

            );

        }

        container.innerHTML = `

            <div

                class="app-shell"

            >

                <!-- ================================== -->

                <!-- Header -->

                <!-- ================================== -->

                <header

                    class="app-header"

                >

                    <h1>

                        💸 ${t("cashflow.title")}

                    </h1>

                    <p>

                        Family Wealth AI OS V7

                    </p>

                </header>

                <div style="padding:10px 20px;">

                    <label>${t("common.language")}</label>

                    <select id="cashflow-language-select">${languageOptions(getLanguage())}</select>

                    <label>${t("scope.label")}</label>

                    <select id="cashflow-scope-select">

                        <option value=""${scopeId === "" ? " selected" : ""}>${t("scope.family")}</option>

                        <option value="__shared__"${scopeId === "__shared__" ? " selected" : ""}>${t("scope.shared")}</option>

                        ${members.map(member => `<option value="${member.id}"${scopeId === member.id ? " selected" : ""}>${member.name || member.id}</option>`).join("")}

                    </select>

                </div>

                <!-- ================================== -->

                <!-- Dashboard -->

                <!-- ================================== -->

                <section

                    class="dashboard"

                >

                    <h2>

                        ${t("cashflow.dashboard")}

                    </h2>

                    <div

                        class="dashboard-grid"

                    >

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.dailyIncome")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.regularIncome ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.dailyExpense")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.regularExpense ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.dailyNet")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.regularNet ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.investOut")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.investmentOut ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.investIn")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.investmentIn ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.investNet")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.investmentNet ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.realizedGains")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    realizedGains ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                        <div

                            class="dashboard-card"

                        >

                            <h3>

                                ${t("cashflow.combinedNet")}

                            </h3>

                            <div

                                class="value"

                            >

                                $${Number(

                                    summary?.net ||

                                    0

                                ).toLocaleString()}

                            </div>

                        </div>

                    </div>

                </section>

                <section

                    class="card"

                >

                    <h2>

                        ${t("cashflow.cashTitle")}

                    </h2>

                    <p>

                        ${t("cashflow.cashTotal")}：$${cashTotal.toLocaleString()}

                    </p>

                    ${cashAccounts.map(

                        account =>

                            `<p>${account.owner ? account.owner + " · " : ""}${account.name}${account.type ? "（" + account.type + "）" : ""}：$${account.balance.toLocaleString()}</p>`

                    ).join("")}

                </section>

                <!-- ================================== -->

                <!-- Add -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <button

                        id="add-cashflow-button"

                        type="button"

                    >

                        ${t("cashflow.add")}

                    </button>

                    <div

                        id="cashflow-form-container"

                    ></div>

                </section>

                <!-- ================================== -->

                <!-- List -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <h2>

                        Cash Flow List

                    </h2>

                    <div

                        id="cashflow-list-container"

                    >

                        ${

                            cashflows.length === 0

                            ?

                            `

                            <p>

                                ${t("cashflow.empty")}

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

                                            <th>${t("cashflow.type")}</th>

                                            <th>${t("common.category")}</th>

                                            <th>${t("common.description")}</th>

                                            <th>${t("common.amount")}</th>

                                            <th>${t("cashflow.frequency")}</th>

                                            <th>${t("cashflow.annualized")}</th>

                                            <th>${t("common.actions")}</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        ${

                                            cashflows

                                            .map(

                                                item => `

                                                <tr

                                                    data-id="${item.id}"

                                                >

                                                    <td>

                                                        ${

                                                            item.type ||

                                                            ""

                                                        }

                                                    </td>

                                                    <td>

                                                        ${

                                                            item.category ||

                                                            "Other"

                                                        }

                                                    </td>

                                                    <td>

                                                        ${

                                                            item.description ||

                                                            ""

                                                        }

                                                    </td>

                                                    <td>

                                                        $${Number(

                                                            item.amount ||

                                                            0

                                                        ).toLocaleString()}

                                                    </td>

                                                    <td>

                                                        ${

                                                            item.frequency ||

                                                            "YEARLY"

                                                        }

                                                    </td>

                                                    <td>

                                                        $${Number(

                                                            item.annualizedAmount ??

                                                            item.amount ??

                                                            0

                                                        ).toLocaleString()}

                                                    </td>

                                                    <td>

                                                        <button

                                                            type="button"

                                                            class="edit-cashflow-button"

                                                            data-id="${item.id}"

                                                        >

                                                            ${t("common.edit")}

                                                        </button>

                                                        <button

                                                            type="button"

                                                            class="delete-cashflow-button"

                                                            data-id="${item.id}"

                                                        >

                                                            ${t("common.delete")}

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

                <!-- ================================== -->

                <!-- Analysis -->

                <!-- ================================== -->

                <section

                    class="modules"

                >

                    <h2>

                        Cash Flow Analysis

                    </h2>

                    ${

                        report

                        ?

                        `

                        <p>

                            Health Score:

                            ${

                                report.healthScore ??

                                0

                            }

                        </p>

                        `

                        :

                        ""

                    }

                    ${

                        advice?.recommendation

                        ?

                        `

                        <p>

                            ${

                                advice.recommendation

                            }

                        </p>

                        `

                        :

                        ""

                    }

                </section>

                <hr>

                <!-- ================================== -->

                <!-- Back -->

                <!-- ================================== -->

                <button

                    id="cashflow-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

            </div>

        `;

        // ==================================================

        // Back

        // ==================================================

        const backButton =

            container.querySelector(

                "#cashflow-back-button"

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

        // Add Button

        // ==================================================

        const addButton =

            container.querySelector(

                "#add-cashflow-button"

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

        // Language Switch

        // ==================================================

        const languageSelect =

            container.querySelector(

                "#cashflow-language-select"

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

        const scopeSelect =

            container.querySelector(

                "#cashflow-scope-select"

            );

        if (scopeSelect) {

            scopeSelect.addEventListener(

                "change",

                () => {

                    this.cashflowScopeMemberId =

                        scopeSelect.value;

                    this.render(

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

                ".edit-cashflow-button"

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

                ".delete-cashflow-button"

            )

            .forEach(

                button => {

                    button.addEventListener(

                        "click",

                        () => {

                            this.deleteCashflow(

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

    showCreateForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#cashflow-form-container"

            );

        if(!formContainer){

            return;

        }

        const accountOptions =

            this.buildAccountOptions();

        const hasAccounts =

            this.getAccounts().length > 0;

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

                    ${t("cashflow.add")}

                </h3>

                <form

                    id="cashflow-create-form"

                >

                    <label>

                        ${t("cashflow.type")}

                    </label>

                    <br>

                    <select

                        id="cashflow-type"

                        required

                    >

                        <option value="INCOME">

                            Income

                        </option>

                        <option value="EXPENSE">

                            Expense

                        </option>

                    </select>

                    <br><br>

                    <label>

                        ${t("common.category")}

                    </label>

                    <br>

                    <input

                        id="cashflow-category"

                        type="text"

                        value="Other"

                    >

                    <br><br>

                    <label>

                        ${t("common.description")}

                    </label>

                    <br>

                    <input

                        id="cashflow-description"

                        type="text"

                    >

                    <br><br>

                    <label>

                        ${t("common.amount")}

                    </label>

                    <br>

                    <input

                        id="cashflow-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("common.account")}（${t("cashflow.accountHint")}）

                    </label>

                    <br>

                    <select

                        id="cashflow-account"

                    >

                        <option value="">

                            ${t("common.selectAccount")}

                        </option>

                        ${accountOptions}

                        <option value="__new_account__">${t("account.newOption")}</option>

                    </select>

                    <span id="cashflow-new-account-fields" style="display:none">

                        <input id="cashflow-new-account-name" type="text" placeholder="${t("account.namePlaceholder")}">

                        <input id="cashflow-new-account-balance" type="number" step="0.01" placeholder="${t("account.balancePlaceholder")}">

                    </span>

                    ${

                        hasAccounts

                        ?

                        ""

                        :

                        `<p style="color:#c00;">No account yet. 没有账户也可以直接记录，会进入 Cash Flow（不影响账户余额）。</p>`

                    }

                    <br><br>

                    <label>

                        ${t("cashflow.frequency")}

                    </label>

                    <br>

                    <select

                        id="cashflow-frequency"

                        required

                    >

                        <option value="YEARLY">

                            Yearly

                        </option>

                        <option value="MONTHLY">

                            Monthly

                        </option>

                        <option value="QUARTERLY">

                            Quarterly

                        </option>

                        <option value="ONE_TIME">

                            One Time

                        </option>

                    </select>

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-cashflow-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#cashflow-create-form"

            );

        wireInlineCreate(

            form.querySelector(

                "#cashflow-account"

            ),

            [

                form.querySelector(

                    "#cashflow-new-account-fields"

                )

            ]

        );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const type =

                    form.querySelector(

                        "#cashflow-type"

                    ).value;

                const category =

                    form.querySelector(

                        "#cashflow-category"

                    ).value.trim()

                    ||

                    "Other";

                const description =

                    form.querySelector(

                        "#cashflow-description"

                    ).value.trim();

                const amount =

                    Number(

                        form.querySelector(

                            "#cashflow-amount"

                        ).value

                    );

                const frequency =

                    form.querySelector(

                        "#cashflow-frequency"

                    ).value;

                const accountField =

                    form.querySelector(

                        "#cashflow-account"

                    );

                const accountId =

                    resolveAccountId(

                        accountField,

                        form.querySelector(

                            "#cashflow-new-account-name"

                        ),

                        form.querySelector(

                            "#cashflow-new-account-balance"

                        )

                    );

                let recorded =

                    false;

                {

                    try{

                        const payload = {

                            date:

                                new Date()

                                    .toISOString()

                                    .slice(0, 10),

                            accountId,

                            amount,

                            currency:

                                "USD",

                            description:

                                description ||

                                category,

                            source:

                                "BusinessModule"

                        };

                        if(

                            type ===

                            "INCOME"

                        ){

                            TransactionIntegration

                                .recordIncome(

                                    {

                                        ...payload,

                                        income:

                                            {

                                                category

                                            }

                                    }

                                );

                        }else{

                            TransactionIntegration

                                .recordExpense(

                                    {

                                        ...payload,

                                        expense:

                                            {

                                                category

                                            }

                                    }

                                );

                        }

                        recorded =

                            true;

                    }catch(txError){

                        console.warn(

                            "Cash flow transaction not recorded:",

                            txError.message

                        );

                    }

                }

                if(

                    !recorded

                ){

                    cashflowAPI.createCashflow({

                        type,

                        category,

                        description,

                        amount,

                        frequency

                    });

                }

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-cashflow-button"

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

    // Accounts

    // ==================================================

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

    // ==================================================

    // Edit Form

    // ==================================================

    showEditForm(

        container,

        id,

        onBack

    ){

        const cashflow =

            cashflowAPI.getCashflow(

                Number(id)

            );

        if(!cashflow){

            throw new Error(

                "Cashflow not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#cashflow-form-container"

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

                    ${t("cashflow.editTitle")}

                </h3>

                <form

                    id="cashflow-edit-form"

                >

                    <label>

                        ${t("cashflow.type")}

                    </label>

                    <br>

                    <select

                        id="edit-cashflow-type"

                    >

                        <option value="INCOME">

                            Income

                        </option>

                        <option value="EXPENSE">

                            Expense

                        </option>

                    </select>

                    <br><br>

                    <label>

                        ${t("common.category")}

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-category"

                        type="text"

                        value="${cashflow.category || "Other"}"

                    >

                    <br><br>

                    <label>

                        ${t("common.description")}

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-description"

                        type="text"

                        value="${cashflow.description || ""}"

                    >

                    <br><br>

                    <label>

                        ${t("common.amount")}

                    </label>

                    <br>

                    <input

                        id="edit-cashflow-amount"

                        type="number"

                        min="0"

                        step="0.01"

                        value="${Number(cashflow.amount || 0)}"

                        required

                    >

                    <br><br>

                    <label>

                        ${t("cashflow.frequency")}

                    </label>

                    <br>

                    <select

                        id="edit-cashflow-frequency"

                    >

                        <option value="YEARLY">

                            Yearly

                        </option>

                        <option value="MONTHLY">

                            Monthly

                        </option>

                        <option value="QUARTERLY">

                            Quarterly

                        </option>

                        <option value="ONE_TIME">

                            One Time

                        </option>

                    </select>

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("common.save")}

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-cashflow-button"

                    >

                        ${t("common.cancel")}

                    </button>

                </form>

            </div>

        `;

        formContainer.querySelector(

            "#edit-cashflow-type"

        ).value =

            cashflow.type || "EXPENSE";

        formContainer.querySelector(

            "#edit-cashflow-frequency"

        ).value =

            cashflow.frequency || "YEARLY";

        const form =

            formContainer.querySelector(

                "#cashflow-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updated = {

                    type:

                        form.querySelector(

                            "#edit-cashflow-type"

                        ).value,

                    category:

                        form.querySelector(

                            "#edit-cashflow-category"

                        ).value.trim()

                        ||

                        "Other",

                    description:

                        form.querySelector(

                            "#edit-cashflow-description"

                        ).value.trim(),

                    amount:

                        Number(

                            form.querySelector(

                                "#edit-cashflow-amount"

                            ).value

                        ),

                    frequency:

                        form.querySelector(

                            "#edit-cashflow-frequency"

                        ).value

                };

                cashflowAPI.updateCashflow(

                    Number(id),

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

                "#cancel-edit-cashflow-button"

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

    deleteCashflow(

        container,

        id,

        onBack

    ){

        const cashflow =

            cashflowAPI.getCashflow(

                Number(id)

            );

        if(!cashflow){

            throw new Error(

                "Cashflow not found: " +

                id

            );

        }

        const confirmed =

            window.confirm(

                "Delete this cash flow?"

            );

        if(!confirmed){

            return;

        }

        cashflowAPI.deleteCashflow(

            Number(id)

        );

        this.render(

            container,

            onBack

        );

    },

    // ==================================================

    // Data Views

    // ==================================================

    dashboard(){

        const report =

            cashflowAgent.generateReport();

        const advice =

            cashflowAI.generateAdvice();

        return {

            title:

                "Cashflow Dashboard",

            summary:

                report.summary,

            analysis:

                report.analysis,

            healthScore:

                report.healthScore,

            advice:

                advice.recommendation

        };

    },

    overview(){

        return cashflowAPI.getSummary();

    },

    aiReport(){

        return cashflowAI.analyze();

    }

};

export default cashflowView;
