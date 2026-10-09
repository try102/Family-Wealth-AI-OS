/*

    

Family Wealth AI OS V7

Application Entry

Dashboard Data Integration

Investment Integration

Income Integration

Liability Interest Integration

*/

import { t, getLanguage, setLanguage, languageOptions } from "./core/i18n/i18n.js?v=20261009be";

const app =

    document.getElementById("app");

// ==================================================

// Currency Formatter

// ==================================================

function localizeDashName(prefix, raw) {
    const key = prefix + String(raw).toLowerCase();
    const translated = t(key);
    return translated === key ? raw : translated;
}

function formatCurrency(

    value

){

    return new Intl.NumberFormat(

        "en-US",

        {

            style:

                "currency",

            currency:

                "USD",

            maximumFractionDigits:

                0

        }

    ).format(

        Number(

            value || 0

        )

    );

}

// ==================================================

// Percentage Formatter

// ==================================================

function formatPercent(

    value

){

    return (

        Number(

            value || 0

        ).toFixed(2)

        +

        "%"

    );

}

// ==================================================

// Dashboard

// ==================================================

let dashboardScopeId = "";

let dashboardScopeMembers = [];

function renderDashboard(

    result,

    status,

    assets,

    liabilities,

    cashFlow,

    investments

){

    const allocation =

        result.allocation || {};

    const allocationHTML =

        Object.keys(

            allocation

        )

        .map(

            category => {

                const item =

                    allocation[

                        category

                    ];

                return `

                    <div

                        class="module-card"

                    >

                        <h3>

                            ${localizeDashName("dash.alloc.", category)}

                        </h3>

                        <p>

                            ${formatCurrency(

                                item.value

                            )}

                        </p>

                        <p>

                            ${formatPercent(

                                item.ratio

                            )}

                        </p>

                    </div>

                `;

            }

        )

        .join("");

    app.innerHTML = `

        <div class="app-shell">

            <!-- ================================== -->

            <!-- Header -->

            <!-- ================================== -->

            <header

                class="app-header"

            >

                <h1>

                    🏠 Family Wealth AI OS

                </h1>

                <p>

                    Family Wealth Operating System V7

                </p>

            </header>

            <div style="padding:10px 20px;">

                <label>${t("common.language")}</label>

                <select id="dash-language-select">${languageOptions(getLanguage())}</select>

                <label>${t("scope.label")}</label>

                <select id="dash-scope-select">

                    <option value=""${dashboardScopeId === "" ? " selected" : ""}>${t("scope.family")}</option>

                    <option value="__shared__"${dashboardScopeId === "__shared__" ? " selected" : ""}>${t("scope.shared")}</option>

                    ${dashboardScopeMembers.map(member => `<option value="${member.id}"${dashboardScopeId === member.id ? " selected" : ""}>${member.name || member.id}</option>`).join("")}

                </select>

            </div>

            <!-- ================================== -->

            <!-- System Status -->

            <!-- ================================== -->

            <section

                class="system-status"

            >

                <h2>

                    ${t("dash.systemStatus")}

                </h2>

                <div

                    class="status-ready"

                >

                    ${t("dash.systemReady")}

                </div>

                <p>

                    ${t("dash.advisorLabel")}:

                    <strong>

                        ${t("advisor.productName")}

                    </strong>

                </p>

            </section>

            <!-- ================================== -->

            <!-- Dashboard -->

            <!-- ================================== -->

            <section

                class="dashboard"

            >

                <h2>

                    📊 ${t("dash.title")}

                </h2>

                <div

                    class="dashboard-grid"

                >

                    <!-- Total Assets -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.totalAssets")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                result.totalAssets

                            )}

                        </div>

                    </div>

                    <!-- Total Liabilities -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.totalLiabilities")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                result.totalLiabilities

                            )}

                        </div>

                    </div>

                    <!-- Net Worth -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.netWorth")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                result.netWorth

                            )}

                        </div>

                    </div>

                    <!-- Income -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.income")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                cashFlow.income

                            )}

                        </div>

                    </div>

                    <!-- Expense -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.dailyExpense")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                cashFlow.expense

                            )}

                        </div>

                    </div>

                    <!-- Net Cash Flow -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.netCashFlow")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                cashFlow.net

                            )}

                        </div>

                    </div>

                    <!-- Investment Net -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.investNet")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                cashFlow.investmentNet ||

                                0

                            )}

                        </div>

                    </div>

                    <!-- Wealth Score -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.wealthScore")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${Number(

                                result.wealthScore ||

                                0

                            )}

                        </div>

                    </div>

                    <!-- Asset Count -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.assetCount")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${assets.length}

                        </div>

                    </div>

                    <!-- Investment Count -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.investmentCount")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${investments.length}

                        </div>

                    </div>

                    <!-- Liability Count -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            ${t("dash.liabilityCount")}

                        </h3>

                        <div

                            class="value"

                        >

                            ${liabilities.length}

                        </div>

                    </div>

                </div>

            </section>

            <!-- ================================== -->

            <!-- Asset Allocation -->

            <!-- ================================== -->

            <section

                class="modules"

            >

                <h2>

                    📊 ${t("dash.allocation")}

                </h2>

                <div

                    class="module-grid"

                >

                    ${

                        allocationHTML ||

                        `

                        <p>

                            ${t("dash.noAllocation")}

                        </p>

                        `

                    }

                </div>

            </section>

            <!-- ================================== -->

            <!-- Wealth Modules -->

            <!-- ================================== -->

            <section

                class="modules"

            >

                <h2>

                    ${t("dash.wealthModules")}

                </h2>

                <div

                    class="module-grid"

                >

                    ${

                        status.modules

                        .map(

                            module => `

                                <div

                                    class="module-card"

                                >

                                    <h3>

                                        ${localizeDashName("dash.module.", module)}

                                    </h3>

                                    <p>

                                        ${t("dash.statusActive")}

                                    </p>

                                </div>

                            `

                        )

                        .join("")

                    }

                </div>

            </section>

            <!-- ================================== -->

            <!-- AI Agents -->

            <!-- ================================== -->

            <section

                class="agents"

            >

                <h2>

                    ${t("dash.aiAgents")}

                </h2>

                <div

                    class="module-grid"

                >

                    ${

                        status.agents

                        .map(

                            agent => `

                                <div

                                    class="module-card"

                                >

                                    <h3>

                                        🤖 ${localizeDashName("dash.agent.", agent)}

                                    </h3>

                                    <p>

                                        ${t("dash.statusReady")}

                                    </p>

                                </div>

                            `

                        )

                        .join("")

                    }

                </div>

            </section>

            <!-- ================================== -->

            <!-- Quick Access -->

            <!-- ================================== -->

            <section

                class="quick-actions"

            >

                <h2>

                    ${t("dash.quickAccess")}

                </h2>

                <div

                    class="action-grid"

                >

                    <!-- Assets -->

                    <button

                        id="quick-assets-button"

                        type="button"

                    >

                        ${t("dash.assets")}

                    </button>

                    <!-- Investment -->

                    <button

                        id="quick-investment-button"

                        type="button"

                    >

                        ${t("dash.investment")}

                    </button>

                    <!-- Account -->

                    <button

                        id="quick-account-button"

                        type="button"

                    >

                        ${t("dash.accounts")}

                    </button>

                    <!-- Income -->

                    <button

                        id="quick-income-button"

                        type="button"

                    >

                        ${t("dash.incomeBtn")}

                    </button>

                    <!-- Expense -->

                    <button

                        id="quick-expense-button"

                        type="button"

                    >

                        ${t("dash.expenseBtn")}

                    </button>

                    <!-- Liability -->

                    <button

                        id="quick-liability-button"

                        type="button"

                    >

                        ${t("dash.liability")}

                    </button>

                    <!-- Cash Flow -->

                    <button

                        id="quick-cashflow-button"

                        type="button"

                    >

                        ${t("dash.cashflow")}

                    </button>

                    <!-- Tax -->

                    <button

                        id="quick-tax-button"

                        type="button"

                    >

                        ${t("dash.tax")}

                    </button>

                    <!-- Retirement -->

                    <button

                        id="quick-retirement-button"

                        type="button"

                    >

                        ${t("dash.retirement")}

                    </button>

                    <!-- Advisor -->

                    <button

                        id="quick-advisor-button"

                        type="button"

                    >

                        ${t("dash.advisor")}

                    </button>

                    <!-- Family Members -->

                    <button

                        id="quick-members-button"

                        type="button"

                    >

                        ${t("dash.members")}

                    </button>

                </div>

            </section>

        </div>

    `;

    // ==================================================

    // Dashboard Language Switch

    // ==================================================

    const dashLanguageSelect =

        document.getElementById(

            "dash-language-select"

        );

    if(

        dashLanguageSelect

    ){

        dashLanguageSelect.addEventListener(

            "change",

            () => {

                setLanguage(

                    dashLanguageSelect.value

                );

                start();

            }

        );

    }

    const dashScopeSelect =

        document.getElementById(

            "dash-scope-select"

        );

    if(

        dashScopeSelect

    ){

        dashScopeSelect.addEventListener(

            "change",

            () => {

                try {

                    globalThis.localStorage

                        ?.setItem(

                            "fw_dash_scope",

                            dashScopeSelect.value

                        );

                }

                catch (scopeError) {}

                start();

            }

        );

    }

    // ==================================================

    // Quick Access - Assets

    // ==================================================

    const assetsButton =

        document.getElementById(

            "quick-assets-button"

        );

    if(

        assetsButton

    ){

        assetsButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./core/modules/assetsModule.js?v=20261008ah"

                        );

                    const AssetsModule =

                        module.default;

                    if(

                        !AssetsModule ||

                        !AssetsModule.view

                    ){

                        throw new Error(

                            "AssetsModule.view not found"

                        );

                    }

                    AssetsModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Assets Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Investment

    // ==================================================

    const investmentButton =

        document.getElementById(

            "quick-investment-button"

        );

    if(

        investmentButton

    ){

        investmentButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./modules/investment/ui/investmentView.js?v=20261008ah"

                        );

                    const InvestmentView =

                        module.default;

                    if(

                        !InvestmentView ||

                        typeof InvestmentView.render !==

                            "function"

                    ){

                        throw new Error(

                            "InvestmentView.render not found"

                        );

                    }

                    InvestmentView.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Investment Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Account

    // ==================================================

    const accountButton =

        document.getElementById(

            "quick-account-button"

        );

    if(

        accountButton

    ){

        accountButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./modules/account/ui/accountView.js?v=20261009bc"

                        );

                    const AccountView =

                        module.default;

                    if(

                        !AccountView

                    ){

                        throw new Error(

                            "AccountView not found"

                        );

                    }

                    AccountView.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Account Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Income

    // ==================================================

    const incomeButton =

        document.getElementById(

            "quick-income-button"

        );

    if(

        incomeButton

    ){

        incomeButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./modules/income/incomeModule.js?v=20261008ae"

                        );

                    const IncomeModule =

                        module.default;

                    if(

                        !IncomeModule

                    ){

                        throw new Error(

                            "IncomeModule not found"

                        );

                    }

                    if(

                        !IncomeModule.view

                    ){

                        throw new Error(

                            "IncomeModule.view not found"

                        );

                    }

                    IncomeModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Income Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Expense

    // ==================================================

    const expenseButton =

        document.getElementById(

            "quick-expense-button"

        );

    if(

        expenseButton

    ){

        expenseButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./modules/expense/expenseModule.js?v=20261008ae"

                        );

                    const ExpenseModule =

                        module.default;

                    if(

                        !ExpenseModule

                    ){

                        throw new Error(

                            "ExpenseModule not found"

                        );

                    }

                    if(

                        !ExpenseModule.view

                    ){

                        throw new Error(

                            "ExpenseModule.view not found"

                        );

                    }

                    ExpenseModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Expense Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Liability

    // ==================================================

    const liabilityButton =

        document.getElementById(

            "quick-liability-button"

        );

    if(

        liabilityButton

    ){

        liabilityButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./core/modules/liabilityModule.js?v=20261008ae"

                        );

                    const LiabilityModule =

                        module.default;

                    if(

                        !LiabilityModule ||

                        !LiabilityModule.view

                    ){

                        throw new Error(

                            "LiabilityModule.view not found"

                        );

                    }

                    LiabilityModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    console.error(

                        "Liability Module Error:",

                        error

                    );

                    renderError(

                        "Liability Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Cash Flow

    // ==================================================

    const cashflowButton =

        document.getElementById(

            "quick-cashflow-button"

        );

    if(

        cashflowButton

    ){

        cashflowButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./core/modules/cashflowModule.js?v=20261008ae"

                        );

                    const CashflowModule =

                        module.default;

                    if(

                        !CashflowModule ||

                        !CashflowModule.view

                    ){

                        throw new Error(

                            "CashflowModule.view not found"

                        );

                    }

                    CashflowModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Cash Flow Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Retirement

    // ==================================================

    const retirementButton =

        document.getElementById(

            "quick-retirement-button"

        );

    if(

        retirementButton

    ){

        retirementButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./modules/retirement/retirementModule.js?v=20261008ae"

                        );

                    const RetirementModule =

                        module.default;

                    RetirementModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Retirement Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // ==================================================

    // Quick Access - Family Members

    // ==================================================

    const membersButton =

        document.getElementById(

            "quick-members-button"

        );

    if(

        membersButton

    ){

        membersButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./modules/member/ui/memberView.js?v=20261008ae"

                        );

                    const MemberView =

                        module.default;

                    MemberView.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Member Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Advisor

    // ==================================================

    const advisorButton =

        document.getElementById(

            "quick-advisor-button"

        );

    if(

        advisorButton

    ){

        advisorButton.addEventListener(

            "click",

            async () => {

                try{

                    const module =

                        await import(

                            "./ai/advisorView.js?v=20261008as"

                        );

                    const AdvisorView =

                        module.default;

                    AdvisorView.render(

                        app,

                        () => {

                            start();

                        }

                    );

                }

                catch(error){

                    renderError(

                        "Advisor Module Error",

                        error

                    );

                }

            }

        );

    }

    // ==================================================

    // Quick Access - Tax

    // ==================================================

    const taxButton =

        document.getElementById(

            "quick-tax-button"

        );

    if(

        taxButton

    ){

        taxButton.addEventListener(

            "click",

            async () => {

                try{

const module =

    await import(

        "./tax/taxModule.js?v=20261008ae"

    );

                    const TaxModule =

                        module.default;

                    if(

                        !TaxModule ||

                        !TaxModule.view

                    ){

                        throw new Error(

                            "TaxModule.view not found"

                        );

                    }

                    TaxModule.view.render(

                        app,

                        () => {

                            start();

                        }

                    );

                    // Prefill the Tax Plan from the

                    // base data layer (read-only;

                    // Tax V7.7 engine untouched).

                    try {

                        const taxDataModule =

                            await import(

                                "./core/integration/taxDataIntegration.js?v=20261009be"

                            );

                        const TaxDataIntegration =

                            taxDataModule.default;

                        const taxData =

                            TaxDataIntegration

                                .getTaxDataSummary(

                                    new Date()

                                        .getFullYear()

                                );

                        const incomeInput =

                            document

                                .getElementById(

                                    "tax-plan-income"

                                );

                        if(

                            incomeInput &&

                            Number(

                                incomeInput.value ||

                                0

                            ) === 0 &&

                            taxData.totalIncome > 0

                        ){

                            incomeInput.value =

                                taxData.totalIncome;

                        }

                        const taxForm =

                            document

                                .getElementById(

                                    "tax-plan-form"

                                );

                        if(

                            taxForm &&

                            taxForm.parentNode &&

                            !document

                                .getElementById(

                                    "tax-data-panel"

                                )

                        ){

                            const panel =

                                document

                                    .createElement(

                                        "div"

                                    );

                            panel.id =

                                "tax-data-panel";

                            panel.style.cssText =

                                "margin:12px 0;padding:12px;border:1px solid #ddd;border-radius:10px;";

                            const fmt =

                                value =>

                                    "$" +

                                    Number(

                                        value ||

                                        0

                                    )

                                        .toLocaleString();

                            panel.innerHTML =

                                "<h4>" +

                                t("taxsum.title", { year: taxData.year }) +

                                "</h4>" +

                                "<p>" +

                                t("taxsum.wage") +

                                fmt(taxData.wageIncome) +

                                "</p>" +

                                "<p>" +

                                t("taxsum.dividends") +

                                fmt(taxData.dividendIncome) +

                                t("taxsum.interestSep") +

                                fmt(taxData.interestIncome) +

                                "</p>" +

                                "<p>" +

                                t("taxsum.gains") +

                                fmt(taxData.capitalGains) +

                                "</p>" +

                                "<p>" +

                                t("taxsum.gainsLong") +

                                fmt(taxData.capitalGainsLongTerm) +

                                t("taxsum.gainsShortSep") +

                                fmt(taxData.capitalGainsShortTerm) +

                                "</p>" +

                                "<p>" +

                                t("taxsum.gainsOther") +

                                fmt(taxData.capitalGainsOther) +

                                "</p>" +

                                "<p>" +

                                t("taxsum.mortgage") +

                                fmt(taxData.mortgageInterestPaid) +

                                t("taxsum.paidSep") +

                                fmt(taxData.taxPaid) +

                                "</p>" +

                                "<p>" +

                                t("taxsum.total") +

                                fmt(taxData.totalIncome) +

                                "</p>";

                            taxForm.parentNode

                                .insertBefore(

                                    panel,

                                    taxForm

                                );

                        }

                    }

                    catch(taxDataError){

                        console.warn(

                            "Tax data prefill unavailable:",

                            taxDataError

                        );

                    }

                    // External Support Center (Tax):

                    // injected at page level; the Tax V7.7

                    // module itself is not modified.

                    try {

                        const supportModule =

                            await import(

                                "./modules/support/supportCenter.js?v=20261008ae"

                            );

                        const SupportCenter =

                            supportModule.default;

                        const renderTaxSupport =

                            window.__renderTaxSupport =

                            () => {

                                let slot =

                                    document

                                        .getElementById(

                                            "tax-support-center-slot"

                                        );

                                if(

                                    !slot

                                ){

                                    slot =

                                        document

                                            .createElement(

                                                "div"

                                            );

                                    slot.id =

                                        "tax-support-center-slot";

                                    const form =

                                        document

                                            .getElementById(

                                                "tax-plan-form"

                                            );

                                    if(

                                        form &&

                                        form.parentNode

                                    ){

                                        form.parentNode

                                            .insertBefore(

                                                slot,

                                                form.nextSibling

                                            );

                                    }

                                    else{

                                        app.appendChild(

                                            slot

                                        );

                                    }

                                }

                                slot.innerHTML =

                                    SupportCenter

                                        .renderSupportCenter(

                                            "tax"

                                        );

                                SupportCenter

                                    .bindSupportCenter(

                                        slot,

                                        "tax",

                                        renderTaxSupport

                                    );

                            };

                        renderTaxSupport();

                        // Language switcher for the Tax page

                        // (the Tax V7.7 view itself has none;

                        // injected here at page level).

                        try {

                            const buildTaxLanguageBar = () => {

                                let bar =

                                    document.getElementById(

                                        "tax-language-bar"

                                    );

                                if(

                                    !bar

                                ){

                                    bar =

                                        document.createElement(

                                            "div"

                                        );

                                    bar.id =

                                        "tax-language-bar";

                                    bar.style.cssText =

                                        "display:flex;justify-content:center;align-items:center;padding:8px 0 4px;";

                                    const taxHeader =

                                        app.querySelector(

                                            "header.app-header"

                                        ) ||

                                        app.querySelector(

                                            "header"

                                        );

                                    if(

                                        taxHeader &&

                                        taxHeader.parentNode

                                    ){

                                        taxHeader.parentNode

                                            .insertBefore(

                                                bar,

                                                taxHeader.nextSibling

                                            );

                                    }

                                    else{

                                        app.insertBefore(

                                            bar,

                                            app.firstChild

                                        );

                                    }

                                }

                                bar.innerHTML =

                                    `<label>${t("common.language")} <select id="tax-language-select">${languageOptions(getLanguage())}</select></label>`;

                                const taxLangSelect =

                                    document.getElementById(

                                        "tax-language-select"

                                    );

                                if(

                                    taxLangSelect

                                ){

                                    taxLangSelect.addEventListener(

                                        "change",

                                        event => {

                                            setLanguage(

                                                event.target.value

                                            );

                                            // Reload the whole app so

                                            // every part of the Tax page

                                            // (body + support center)

                                            // renders in the new language;

                                            // the tax page re-opens

                                            // automatically after reload.

                                            try {

                                                globalThis.localStorage

                                                    ?.setItem(

                                                        "fw_reopen_tax",

                                                        "1"

                                                    );

                                            }

                                            catch(reopenError){}

                                            location.reload();

                                        }

                                    );

                                }

                            };

                            window.__ensureTaxLanguageBar =

                                buildTaxLanguageBar;

                            buildTaxLanguageBar();

                        }

                        catch(taxLangError){

                            console.warn(

                                "Tax language switcher unavailable:",

                                taxLangError

                            );

                        }

                        // // Small-scope DOM label translation

                        // for the Tax page (exact matches only;

                        // anything unknown stays in English).

                        try {

                            const labelMap = {

                                "Total Income":

                                    t("income.total"),

                                "Taxable Income":

                                    t("tax.taxableIncome"),

                                "Income":

                                    t("cashflow.income"),

                                "Deductions":

                                    t("tax.deductions"),

                                "Tax Year":

                                    t("tax.year"),

                                "Save Tax Plan":

                                    t("tax.savePlan"),

                                "🧾 Tax Center":

                                    t("taxpage.center"),

                                "Tax Module Status":

                                    t("taxpage.moduleStatus"),

                                "✅ TAX SYSTEM READY":

                                    t("taxpage.systemReady"),

                                "Tax Plans:":

                                    t("taxpage.plansColon"),

                                "📊 Tax Dashboard":

                                    t("taxpage.dashboard"),

                                "Tax Plans":

                                    t("taxpage.plans"),

                                "Total Deductions":

                                    t("taxpage.totalDeductions"),

                                "Estimated Tax":

                                    t("taxpage.estimatedTax"),

                                "Effective Tax Rate":

                                    t("taxpage.effectiveRate"),

                                "📋 Latest Tax Plan":

                                    t("taxpage.latestPlan"),

                                "Tax Year:":

                                    t("taxpage.yearColon"),

                                "Income:":

                                    t("taxpage.incomeColon"),

                                "Deductions:":

                                    t("taxpage.deductionsColon"),

                                "Taxable Income:":

                                    t("taxpage.taxableColon"),

                                "🧾 Create Tax Plan":

                                    t("taxpage.createPlan"),

                                "Tax Plan Information":

                                    t("taxpage.planInfo"),

                                "🎯 Tax Optimization":

                                    t("taxpage.optimization"),

                                "No Opportunities":

                                    t("taxpage.noOpportunities"),

                                "No tax optimization opportunities identified.":

                                    t("taxpage.noOpportunitiesText"),

                                "🤖 Tax Advisor":

                                    t("taxpage.advisor"),

                                "No Advisor Data":

                                    t("taxpage.noAdvisorData"),

                                "Create a tax plan to generate tax advice.":

                                    t("taxpage.noAdvisorText"),

                                "No Recommendations":

                                    t("taxpage.noRecommendations"),

                                "No immediate tax recommendations.":

                                    t("taxpage.noRecommendationsText"),

                                "💡 Recommendation":

                                    t("taxpage.recommendation"),

                                "Quick Access":

                                    t("taxpage.quickAccess"),

                                "➕ Create Tax Plan":

                                    t("taxpage.createPlanBtn"),

                                "🔄 Refresh":

                                    t("taxpage.refresh"),

                                "⬅️ Back":

                                    t("taxpage.back"),

                                "No Tax Plan":

                                    t("taxpage.noPlan"),

                                "No tax plan has been created yet.":

                                    t("taxpage.noPlanText"),

                                "Name":

                                    t("common.name"),

                                "Deduction":

                                    t("taxpage.deductionType"),

                                "Strategy":

                                    t("taxpage.strategyType"),

                                "Tax Reduction":

                                    t("taxpage.taxReductionType"),

                                "Status":

                                    t("taxpage.statusType"),

                                "HIGH":

                                    t("taxpage.priorityHigh"),

                                "MEDIUM":

                                    t("taxpage.priorityMedium"),

                                "LOW":

                                    t("taxpage.priorityLow"),

                                "Potential deduction optimization opportunity":

                                    t("taxpage.msgDeduction"),

                                "Existing strategies can be reviewed":

                                    t("taxpage.msgStrategies"),

                                "Review tax reduction strategies":

                                    t("taxpage.msgReview"),

                                "No major tax optimization opportunity identified":

                                    t("taxpage.msgNone"),

                                "Taxable income remains relatively high after deductions":

                                    t("taxpage.msgHighTaxable"),

                                "Review tax optimization opportunities":

                                    t("taxpage.advReviewOpt"),

                                "Consider increasing eligible deductions":

                                    t("taxpage.advIncreaseDeductions"),

                                "Review deduction documentation and eligibility":

                                    t("taxpage.advReviewDocs"),

                                "Review taxable income calculation":

                                    t("taxpage.advReviewCalc"),

                                "Estimated tax is currently zero; verify deductions and tax assumptions":

                                    t("taxpage.advZeroTax"),

                                "Existing tax strategies detected":

                                    t("taxpage.advStrategies"),

                                "No immediate tax optimization opportunities identified":

                                    t("taxpage.advNoOpt"),

                                "No tax income data is currently available":

                                    t("taxpage.advNoData"),

                                "No Optimization Data":

                                    t("taxpage.noOptData"),

                                "Create a tax plan to begin analysis.":

                                    t("taxpage.noOptDataText")

                            };

                            const walker =

                                document

                                    .createTreeWalker(

                                        app,

                                        NodeFilter

                                            .SHOW_TEXT

                                    );

                            const textNodes = [];

                            while(

                                walker.nextNode()

                            ){

                                textNodes.push(

                                    walker.currentNode

                                );

                            }

                            textNodes.forEach(

                                node => {

                                    const trimmed =

                                        node.nodeValue

                                            .trim();

                                    if(

                                        labelMap[trimmed]

                                    ){

                                        node.nodeValue =

                                            node.nodeValue

                                                .replace(

                                                    trimmed,

                                                    labelMap[trimmed]

                                                );

                                    }

                                }

                            );

                            const taxPlanNameInput =

                                document.getElementById(

                                    "tax-plan-name"

                                );

                            if(

                                taxPlanNameInput &&

                                taxPlanNameInput.value === "Tax Plan"

                            ){

                                taxPlanNameInput.value =

                                    t("taxpage.defaultPlanName");

                            }

                            // The Tax view may re-render some

                            // sections asynchronously; re-apply

                            // the label translation shortly after.

                            setTimeout(

                                () => {

                                    try {

                                        const walker2 =

                                            document

                                                .createTreeWalker(

                                                    app,

                                                    NodeFilter

                                                        .SHOW_TEXT

                                                );

                                        const nodes2 = [];

                                        while(

                                            walker2.nextNode()

                                        ){

                                            nodes2.push(

                                                walker2.currentNode

                                            );

                                        }

                                        nodes2.forEach(

                                            node => {

                                                const trimmed =

                                                    node.nodeValue

                                                        .trim();

                                                if(

                                                    labelMap[trimmed]

                                                ){

                                                    node.nodeValue =

                                                        node.nodeValue

                                                            .replace(

                                                                trimmed,

                                                                labelMap[trimmed]

                                                            );

                                                }

                                            }

                                        );

                                    }

                                    catch(retryError){}

                                },

                                600

                            );

                            setTimeout(

                                () => {

                                    try {

                                        const walker3 =

                                            document

                                                .createTreeWalker(

                                                    app,

                                                    NodeFilter

                                                        .SHOW_TEXT

                                                );

                                        const nodes3 = [];

                                        while(

                                            walker3.nextNode()

                                        ){

                                            nodes3.push(

                                                walker3.currentNode

                                            );

                                        }

                                        nodes3.forEach(

                                            node => {

                                                const trimmed =

                                                    node.nodeValue

                                                        .trim();

                                                if(

                                                    labelMap[trimmed]

                                                ){

                                                    node.nodeValue =

                                                        node.nodeValue

                                                            .replace(

                                                                trimmed,

                                                                labelMap[trimmed]

                                                            );

                                                }

                                            }

                                        );

                                    }

                                    catch(retryError){}

                                },

                                1800

                            );

                            // Some Tax sections re-render even

                            // later (after data analysis). Keep

                            // re-applying the translation while

                            // this page is shown.

                            try {

                                const applyTaxLabelsAgain = () => {

                                    // The Tax view's own Refresh

                                    // button re-renders the page and

                                    // wipes the injected language

                                    // switcher and support center;

                                    // put them back while the Tax

                                    // page is shown.

                                    try {

                                        const onTaxPage =

                                            document.getElementById(

                                                "tax-create-plan-button"

                                            ) ||

                                            document.getElementById(

                                                "tax-plan-form"

                                            );

                                        if(

                                            onTaxPage

                                        ){

                                            if(

                                                !document.getElementById(

                                                    "tax-language-bar"

                                                ) &&

                                                window.__ensureTaxLanguageBar

                                            ){

                                                window.__ensureTaxLanguageBar();

                                            }

                                            if(

                                                !document.getElementById(

                                                    "tax-support-center-slot"

                                                ) &&

                                                window.__renderTaxSupport

                                            ){

                                                window.__renderTaxSupport();

                                            }

                                        }

                                    }

                                    catch(barError){}

                                    const w =

                                        document

                                            .createTreeWalker(

                                                app,

                                                NodeFilter

                                                    .SHOW_TEXT

                                            );

                                    const ns = [];

                                    while(

                                        w.nextNode()

                                    ){

                                        ns.push(

                                            w.currentNode

                                        );

                                    }

                                    ns.forEach(

                                        node => {

                                            const trimmed =

                                                node.nodeValue

                                                    .trim();

                                            if(

                                                labelMap[trimmed]

                                            ){

                                                node.nodeValue =

                                                    node.nodeValue

                                                        .replace(

                                                            trimmed,

                                                            labelMap[trimmed]

                                                        );

                                            }

                                        }

                                    );

                                };

                                if(

                                    window.__taxI18nObserver

                                ){

                                    window.__taxI18nObserver

                                        .disconnect();

                                }

                                window.__taxI18nObserver =

                                    new MutationObserver(

                                        () => {

                                            clearTimeout(

                                                window.__taxI18nTimer

                                            );

                                            window.__taxI18nTimer =

                                                setTimeout(

                                                    applyTaxLabelsAgain,

                                                    150

                                                );

                                        }

                                    );

                                window.__taxI18nObserver.observe(

                                    app,

                                    {

                                        childList:

                                            true,

                                        subtree:

                                            true

                                    }

                                );

                                setTimeout(

                                    () => {

                                        if(

                                            window.__taxI18nObserver

                                        ){

                                            window.__taxI18nObserver

                                                .disconnect();

                                        }

                                    },

                                    600000

                                );

                            }

                            catch(observeError){}

                        }

                        catch(translateError){

                            console.warn(

                                "Tax label translation unavailable:",

                                translateError

                            );

                        }

                    }

                    catch(supportError){

                        console.warn(

                            "Tax support center unavailable:",

                            supportError

                        );

                    }

                }

                catch(error){

                    renderError(

                        "Tax Module Error",

                        error

                    );

                }

            }

        );

    }

}

// ==================================================

// Error

// ==================================================

function renderError(

    title,

    error

){

    app.innerHTML = `

        <div

            class="error-screen"

        >

            <h1>

                ${title}

            </h1>

            <pre

                style="

                    white-space:pre-wrap;

                    word-break:break-word;

                    color:red;

                "

            >

${error?.stack ||

  error?.message ||

  String(error)}

            </pre>

        </div>

    `;

}

// ==================================================

// Application Start

// ==================================================

async function start(){

    try{

        app.innerHTML = `

            <div

                class="startup"

            >

                <h1>

                    🏠 Family Wealth AI OS V7

                </h1>

                <p>

                    Loading Wealth System...

                </p>

            </div>

        `;

        // ==================================================

        // System Manager

        // ==================================================

        const systemModule =

            await import(

                "./core/system/systemManager.js?v=20261008ae"

            );

        const SystemManager =

            systemModule.default;

        // ==================================================

        // Start System

        // ==================================================

        const startResult =

            SystemManager.start();

        const systemStatus =

            SystemManager.status();

        // ==================================================

        // Transaction → Cashflow Bridge

        //

        // Start the same integration wiring that

        // SystemBootstrap performs, so Transaction

        // events reach Cashflow in the real App:

        //

        // - Connect TransactionIntegration facade

        // - Initialize CashflowIntegration with the

        //   real TransactionManager (subscribes to

        //   TRANSACTION_CREATED and synchronizes

        //   existing Transactions into Cashflow)

        //

        // ==================================================

        try{

            const transactionModuleImport =

                await import(

                    "./transaction/transactionModule.js?v=20261008ae"

                );

            const TransactionModule =

                transactionModuleImport.default;

            const transactionModule =

                new TransactionModule();

            const transactionIntegrationImport =

                await import(

                    "./core/integration/transactionIntegration.js?v=20261008ak"

                );

            const TransactionIntegration =

                transactionIntegrationImport.default;

            TransactionIntegration.setFacade(

                transactionModule.getFacade()

            );

            TransactionIntegration.initialize();

            const cashflowIntegrationImport =

                await import(

                    "./core/integration/cashflowIntegration.js?v=20261009be"

                );

            const CashflowIntegration =

                cashflowIntegrationImport.default;

            CashflowIntegration.initialize(

                transactionModule.getManager()

            );

            const accountBalanceIntegrationImport =

                await import(

                    "./core/integration/accountBalanceIntegration.js?v=20261009bd"

                );

            const AccountBalanceIntegration =

                accountBalanceIntegrationImport.default;

            AccountBalanceIntegration.initialize();

            // Reconcile: a deleted Income / Expense record

            // must stop counting everywhere. Revoke any

            // Transaction whose source record is gone

            // (covers records deleted before cascading

            // deletes existed), and prune cash-flow

            // entries whose Transaction no longer exists.

            try {

                const incomeRepoImport =

                    await import(

                        "./modules/income/repository/incomeRepository.js?v=20261008ae"

                    );

                const expenseRepoImport =

                    await import(

                        "./modules/expense/repository/expenseRepository.js?v=20261008ae"

                    );

                const cashflowApiImport =

                    await import(

                        "./modules/cashflow/api/cashflowAPI.js?v=20261008ae"

                    );

                const cashflowAPI =

                    cashflowApiImport.default;

                const incomeIds =

                    new Set(

                        (

                            incomeRepoImport.default

                                .findAll() || []

                        ).map(

                            record => String(record.id)

                        )

                    );

                const expenseIds =

                    new Set(

                        (

                            expenseRepoImport.default

                                .findAll() || []

                        ).map(

                            record => String(record.id)

                        )

                    );

                const allTransactions =

                    TransactionIntegration

                        .getAllTransactions() || [];

                allTransactions.forEach(

                    transaction => {

                        const details =

                            transaction.businessDetails || {};

                        const orphanExpense =

                            details.expense &&

                            details.expense.expenseId &&

                            !expenseIds.has(

                                String(details.expense.expenseId)

                            );

                        const orphanIncome =

                            details.income &&

                            details.income.incomeId &&

                            !incomeIds.has(

                                String(details.income.incomeId)

                            );

                        if (!orphanExpense && !orphanIncome) {

                            return;

                        }

                        TransactionIntegration

                            .removeTransaction(

                                transaction.id

                            );

                    }

                );

                try {

                    const liveTransactionIds =

                        new Set(

                            (

                                TransactionIntegration

                                    .getAllTransactions() || []

                            ).map(

                                transaction =>

                                    String(transaction.id)

                            )

                        );

                    (

                        cashflowAPI.getCashflows() || []

                    )

                        .filter(

                            entry =>

                                entry.transactionId &&

                                !liveTransactionIds.has(

                                    String(entry.transactionId)

                                )

                        )

                        .forEach(

                            entry =>

                                cashflowAPI.deleteCashflow(

                                    entry.id

                                )

                        );

                } catch (pruneError) {

                }

            } catch (reconcileError) {

            }

            // Account sync + balance calibration:

            // referenced-but-missing accounts are

            // created; balances derive from the ledger.

            try {

                AccountBalanceIntegration

                    .syncAndCalibrate(

                        TransactionIntegration

                            .getAllTransactions() || []

                    );

            } catch (calibrationError) {

            }

            // Sync: members who already have trades

            // but no account get a default account.

            try {

                const memberApiImport =

                    await import(

                        "./modules/member/api/memberAPI.js?v=20261008ap"

                    );

                memberApiImport.default

                    .ensureDefaultAccounts();

            } catch (memberSyncError) {

            }

        }

        catch(bridgeError){

            console.warn(

                "Transaction-Cashflow bridge unavailable:",

                bridgeError

            );

        }

        // ==================================================

        // Assets

        // ==================================================

        const assetsModule =

            await import(

                "./core/modules/assetsModule.js?v=20261008ah"

            );

        const AssetsModule =

            assetsModule.default;

        const assets =

            AssetsModule.api.getAll();

        // ==================================================

        // Investments

        // ==================================================

        const investmentAPI =

            await import(

                "./modules/investment/api/investmentAPI.js?v=20261008ah"

            );

        const InvestmentAPI =

            investmentAPI.default;

        const investments =

            InvestmentAPI.getInvestments();

        // ==================================================

        // Liabilities

        // ==================================================

        const liabilityModule =

            await import(

                "./core/modules/liabilityModule.js?v=20261008ae"

            );

        const LiabilityModule =

            liabilityModule.default;

        const liabilities =

            LiabilityModule.api

                .getLiabilities();

        // ==================================================

        // Dashboard member scope

        //

        // "" = whole family; "__shared__" = family shared;

        // otherwise a member id. Persisted per device.

        // ==================================================

        let dashAssets =

            assets;

        let dashInvestments =

            investments;

        try {

            const dashAgentModule =

                await import(

                    "./modules/investment/agent/investmentAgent.js?v=20261008ah"

                );

            const dashPositions =

                dashAgentModule.InvestmentAgent

                    .deriveMemberPositions(

                        ""

                    ) || [];

            if (dashPositions.length) {

                const coveredSymbols =

                    new Set(

                        dashPositions.map(

                            position =>

                                String(

                                    position.symbol ||

                                        ""

                                ).toUpperCase()

                        )

                    );

                dashInvestments = [

                    ...dashPositions.map(

                        position => ({

                            name:

                                position.name,

                            symbol:

                                position.symbol,

                            quantity:

                                position.quantity,

                            currentValue:

                                position.marketValue,

                            marketValue:

                                position.marketValue,

                            memberId:

                                position.memberId

                        })

                    ),

                    ...investments.filter(

                        record =>

                            !coveredSymbols.has(

                                String(

                                    record.symbol ||

                                        ""

                                ).toUpperCase()

                            )

                    )

                ];

            }

        }

        catch (dashPositionError) {

        }

        let dashLiabilities =

            liabilities;

        let dashScopeBucket =

            null;

        const dashScopeId =

            (() => {

                try {

                    return globalThis.localStorage

                        ?.getItem(

                            "fw_dash_scope"

                        ) || "";

                }

                catch (scopeError) {

                    return "";

                }

            })();

        dashboardScopeId =

            dashScopeId;

        try {

            const memberModule =

                await import(

                    "./modules/member/api/memberAPI.js?v=20261008ap"

                );

            const MemberAPI =

                memberModule.default;

            dashboardScopeMembers =

                MemberAPI.getMembers() || [];

            if (dashScopeId) {

                const stats =

                    MemberAPI.getMemberStats();

                dashScopeBucket =

                    dashScopeId === "__shared__"

                        ? stats.unassigned

                        : (

                            stats.members.find(

                                item =>

                                    item.member &&

                                    item.member.id ===

                                        dashScopeId

                            ) || null

                        );

                const accountModule =

                    await import(

                        "./modules/account/api/accountAPI.js?v=20261008aw"

                    );

                const accountMember = {};

                (

                    accountModule.default.getAll() || []

                ).forEach(

                    account => {

                        accountMember[account.id] =

                            account.memberId ||

                            account.ownerId ||

                            "";

                    }

                );

                const ownerOf =

                    record =>

                        record.memberId ||

                        record.ownerId ||

                        (

                            record.accountId

                                ? accountMember[record.accountId] || ""

                                : ""

                        ) ||

                        "";

                const inScope =

                    record =>

                        dashScopeId === "__shared__"

                            ? ownerOf(record) === ""

                            : ownerOf(record) === dashScopeId;

                dashAssets =

                    assets.filter(inScope);

                dashInvestments =

                    investments.filter(inScope);

                try {

                    const agentModule =

                        await import(

                            "./modules/investment/agent/investmentAgent.js?v=20261008ah"

                        );

                    const scopedPositions =

                        agentModule.default

                            .deriveMemberPositions(

                                dashScopeId

                            );

                    const coveredSymbols =

                        scopedPositions.map(

                            position =>

                                String(

                                    position.symbol || ""

                                ).toUpperCase()

                        );

                    dashInvestments = [

                        ...scopedPositions.map(

                            position => ({

                                id:

                                    "position-" +

                                    position.symbol,

                                name:

                                    position.name ||

                                    position.symbol,

                                symbol:

                                    position.symbol,

                                quantity:

                                    position.quantity,

                                currentValue:

                                    position.marketValue,

                                marketValue:

                                    position.marketValue,

                                memberId:

                                    dashScopeId === "__shared__"

                                        ? ""

                                        : dashScopeId

                            })

                        ),

                        ...investments.filter(

                            record =>

                                inScope(record) &&

                                !coveredSymbols.includes(

                                    String(

                                        record.symbol || ""

                                    ).toUpperCase()

                                )

                        )

                    ];

                }

                catch (agentError) {}

                dashLiabilities =

                    liabilities.filter(inScope);

            }

        }

        catch (scopeError) {

            console.warn(

                "Dashboard member scope unavailable:",

                scopeError

            );

        }

        // ==================================================

        // Income V7

        //

        // Dashboard income comes directly

        // from Income V7.

        // ==================================================

        const incomeModule =

            await import(

                "./modules/income/incomeModule.js?v=20261008ae"

            );

        const IncomeModule =

            incomeModule.default;

        if(

            !IncomeModule ||

            !IncomeModule.agent

        ){

            throw new Error(

                "IncomeModule.agent not found"

            );

        }

        const incomeSummary =

            IncomeModule.agent

                .getIncomeSummary();

        // ==================================================

        // Income Total

        // ==================================================

        const incomeTotal =

            Number(

                incomeSummary?.totalIncome ||

                0

            );

        // ==================================================

        // Cash Flow

        //

        // Direct Cash Flow Expenses

        // +

        // Liability Annual Interest

        //

        // IMPORTANT:

        // Liability interest is NOT inserted

        // into Cashflow Repository.

        //

        // It is calculated dynamically here

        // to avoid duplicate expenses.

        // ==================================================

        let cashFlowExpense = 0;

        let directCashflowExpense = 0;

        let liabilityAnnualInterest = 0;

        let dashRegularExpense = 0;

        let dashInvestmentNet = 0;

        // ==================================================

        // Direct Cashflow Expense

        // ==================================================

        try{

            const cashflowModule =

                await import(

                    "./core/modules/cashflowModule.js?v=20261008ae"

                );

            const CashflowModule =

                cashflowModule.default;

            if(

                CashflowModule &&

                CashflowModule.api &&

                typeof CashflowModule.api.getSummary ===

                    "function"

            ){

                const cashflowSummary =

                    CashflowModule.api

                        .getSummary();

                directCashflowExpense =

                    Number(

                        cashflowSummary?.expense ||

                        0

                    );

                dashRegularExpense =

                    Number(

                        cashflowSummary?.regularExpense ??

                        cashflowSummary?.expense ??

                        0

                    );

                dashInvestmentNet =

                    Number(

                        cashflowSummary?.investmentNet ||

                        0

                    );

            }

        }

        catch(error){

            console.warn(

                "Cash Flow Module unavailable:",

                error

            );

        }

        // ==================================================

        // Liability Annual Interest

        //

        // balance × interestRate / 100

        // ==================================================

        liabilityAnnualInterest =

            dashLiabilities.reduce(

                (

                    total,

                    liability

                ) => {

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

                    const annualInterest =

                        balance *

                        rate /

                        100;

                    return (

                        total +

                        annualInterest

                    );

                },

                0

            );

        // ==================================================

        // Unified Expense

        // ==================================================

        cashFlowExpense =

            directCashflowExpense;

        // ==================================================

        // Unified Cash Flow

        //

        // Income V7

        // +

        // Direct Cashflow Expenses

        // +

        // Liability Interest

        // ==================================================

        const cashFlowData = {

            income:

                incomeTotal,

            expense:

                dashRegularExpense,

            net:

                incomeTotal -

                dashRegularExpense +

                dashInvestmentNet,

            netCashFlow:

                incomeTotal -

                dashRegularExpense +

                dashInvestmentNet,

            investmentNet:

                dashInvestmentNet,

            directExpense:

                directCashflowExpense,

            liabilityInterest:

                liabilityAnnualInterest

        };

        if (dashScopeBucket) {

            cashFlowData.income =

                dashScopeBucket.income;

            cashFlowData.expense =

                dashScopeBucket.expense;

            cashFlowData.net =

                dashScopeBucket.netFlow;

            cashFlowData.netCashFlow =

                dashScopeBucket.netFlow;

            // Member-scoped investment cash flow

            // (sells in, buys out) from the trades

            // themselves.

            try {

                const acctModule =

                    await import(

                        "./modules/account/api/accountAPI.js?v=20261008aw"

                    );

                const acctMember = {};

                (

                    acctModule.default.getAll() || []

                ).forEach(

                    account => {

                        acctMember[account.id] =

                            account.memberId ||

                            account.ownerId ||

                            "";

                    }

                );

                let scopedInvestmentNet = 0;

                (

                    InvestmentAPI.getTrades() || []

                ).forEach(

                    trade => {

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

                            dashScopeId === "__shared__"

                                ? owner === ""

                                : owner === dashScopeId;

                        if (!inScope) {

                            return;

                        }

                        const amount =

                            Math.abs(

                                Number(trade.amount || 0)

                            );

                        const action =

                            String(

                                trade.action || ""

                            ).toUpperCase();

                        if (action === "SELL") {

                            scopedInvestmentNet += amount;

                        } else if (action === "BUY") {

                            scopedInvestmentNet -= amount;

                        }

                    }

                );

                cashFlowData.investmentNet =

                    scopedInvestmentNet;

                cashFlowData.net =

                    dashScopeBucket.netFlow +

                    scopedInvestmentNet;

                cashFlowData.netCashFlow =

                    cashFlowData.net;

            } catch (scopedInvestmentError) {

            }

        }

        // ==================================================

        // Wealth Engine

        // ==================================================

        const wealthModule =

            await import(

                "./core/engines/wealth/wealthEngine.js?v=20261008ae"

            );

        const WealthEngine =

            wealthModule.default;

        // ==================================================

        // Combine Assets + Investments

        //

        // Investment is treated as an asset

        // for dashboard wealth calculation.

        // ==================================================

        // Account cash is part of total assets:

        // after a sale the proceeds sit in the

        // account, next to the remaining holding

        // market value, and together they form

        // the Dashboard asset value.

        let dashAccounts = [];

        try {

            const accountModuleForAssets =

                await import(

                    "./modules/account/api/accountAPI.js?v=20261008aw"

                );

            const allAccounts =

                accountModuleForAssets.default.getAll() || [];

            dashAccounts =

                (

                    dashScopeId

                        ? allAccounts.filter(

                            account => {

                                const owner =

                                    account.memberId ||

                                    account.ownerId ||

                                    "";

                                return dashScopeId === "__shared__"

                                    ? owner === ""

                                    : owner === dashScopeId;

                            }

                        )

                        : allAccounts

                ).filter(

                    // Zero-balance accounts add no

                    // value; keep them out of the

                    // asset count and allocation.

                    // Accounts mirrored from an asset

                    // record are the same money as

                    // that asset: count them once,

                    // on the asset side.

                    account =>

                        Number(account.balance || 0) !== 0 &&

                        account.openingSource !== "asset"

                );

        }

        catch (accountError) {

            dashAccounts = [];

        }

        const dashboardAssets = [

            ...dashAssets,

            ...dashAccounts.map(

                account => ({

                    id:

                        "account-" +

                        account.id,

                    name:

                        account.name ||

                        "Account",

                    category:

                        "Cash",

                    value:

                        Number(

                            account.balance ||

                            0

                        ),

                    type:

                        "Account"

                })

            ),

            ...dashInvestments.map(

                investment => ({

                    id:

                        "investment-" +

                        investment.id,

                    name:

                        investment.name ||

                        "Investment",

                    category:

                        "Investment",

                    value:

                        Number(

                            investment.currentValue ||

                            0

                        ),

                    type:

                        "Investment"

                })

            )

        ];

        // ==================================================

        // Analyze Wealth

        // ==================================================

        const wealthResult =

            WealthEngine.analyze(

                dashboardAssets,

                liabilities,

                cashFlowData,

                0

            );

        // ==================================================

        // Final Result

        // ==================================================

        const result = {

            ...wealthResult,

            status:

                startResult.status,

            advisor:

                startResult.advisor

        };

        // ==================================================

        // Render Dashboard

        // ==================================================

        renderDashboard(

            result,

            systemStatus,

            dashboardAssets,

            dashLiabilities,

            cashFlowData,

            dashInvestments

        );

        // After a Tax-page language switch the app

        // reloads; re-open the Tax page automatically.

        try {

            if(

                globalThis.localStorage

                    ?.getItem(

                        "fw_reopen_tax"

                    )

            ){

                globalThis.localStorage

                    .removeItem(

                        "fw_reopen_tax"

                    );

                const reopenTaxButton =

                    document.getElementById(

                        "quick-tax-button"

                    );

                if(

                    reopenTaxButton

                ){

                    reopenTaxButton.click();

                }

            }

        }

        catch(reopenTaxError){}

    }

    catch(error){

        renderError(

            "Family Wealth AI OS V7 Startup Error",

            error

        );

    }

}

// ==================================================

// Start Application

// ==================================================

start();
