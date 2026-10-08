/*

    

Family Wealth AI OS V7

Application Entry

Dashboard Data Integration

Investment Integration

Income Integration

Liability Interest Integration

*/

const app =

    document.getElementById("app");

// ==================================================

// Currency Formatter

// ==================================================

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

                            ${category}

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

            <!-- ================================== -->

            <!-- System Status -->

            <!-- ================================== -->

            <section

                class="system-status"

            >

                <h2>

                    System Status

                </h2>

                <div

                    class="status-ready"

                >

                    ✅ SYSTEM READY

                </div>

                <p>

                    Advisor:

                    <strong>

                        ${result.advisor}

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

                    📊 财富驾驶舱

                </h2>

                <div

                    class="dashboard-grid"

                >

                    <!-- Total Assets -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            总资产

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

                            总负债

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

                            净资产

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

                            现金流收入

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

                            现金流支出

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

                            净现金流

                        </h3>

                        <div

                            class="value"

                        >

                            ${formatCurrency(

                                cashFlow.net

                            )}

                        </div>

                    </div>

                    <!-- Wealth Score -->

                    <div

                        class="dashboard-card"

                    >

                        <h3>

                            财富评分

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

                            资产数量

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

                            投资数量

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

                            负债数量

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

                    📊 资产配置

                </h2>

                <div

                    class="module-grid"

                >

                    ${

                        allocationHTML ||

                        `

                        <p>

                            暂无资产配置数据

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

                    Wealth Modules

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

                                        ${module}

                                    </h3>

                                    <p>

                                        ACTIVE

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

                    AI Agents

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

                                        🤖 ${agent}

                                    </h3>

                                    <p>

                                        READY

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

                    Quick Access

                </h2>

                <div

                    class="action-grid"

                >

                    <!-- Assets -->

                    <button

                        id="quick-assets-button"

                        type="button"

                    >

                        💰 Assets

                    </button>

                    <!-- Investment -->

                    <button

                        id="quick-investment-button"

                        type="button"

                    >

                        📈 Investment

                    </button>

                    <!-- Account -->

                    <button

                        id="quick-account-button"

                        type="button"

                    >

                        🏦 Accounts

                    </button>

                    <!-- Income -->

                    <button

                        id="quick-income-button"

                        type="button"

                    >

                        💵 Income

                    </button>

                    <!-- Expense -->

                    <button

                        id="quick-expense-button"

                        type="button"

                    >

                        🧾 Expense

                    </button>

                    <!-- Liability -->

                    <button

                        id="quick-liability-button"

                        type="button"

                    >

                        💳 Liability

                    </button>

                    <!-- Cash Flow -->

                    <button

                        id="quick-cashflow-button"

                        type="button"

                    >

                        💸 Cash Flow

                    </button>

                    <!-- Tax -->

                    <button

                        id="quick-tax-button"

                        type="button"

                    >

                        🧾 Tax

                    </button>

                    <!-- Retirement -->

                    <button

                        id="quick-retirement-button"

                        type="button"

                    >

                        🏖️ Retirement

                    </button>

                </div>

            </section>

        </div>

    `;

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

                            "./core/modules/assetsModule.js"

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

                            "./modules/investment/ui/investmentView.js"

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

                            "./modules/account/ui/accountView.js"

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

                            "./modules/income/incomeModule.js"

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

                            "./modules/expense/expenseModule.js"

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

                            "./core/modules/liabilityModule.js"

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

                            "./core/modules/cashflowModule.js"

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

                            "./modules/retirement/retirementModule.js"

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

        "./tax/taxModule.js"

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

                                "./core/integration/taxDataIntegration.js"

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

                                "<h4>系统数据汇总（" +

                                taxData.year +

                                "）</h4>" +

                                "<p>工资/业务收入（Income 模块）：" +

                                fmt(taxData.wageIncome) +

                                "</p>" +

                                "<p>股息：" +

                                fmt(taxData.dividendIncome) +

                                "　利息：" +

                                fmt(taxData.interestIncome) +

                                "</p>" +

                                "<p>资本利得（资产出售）：" +

                                fmt(taxData.capitalGains) +

                                "</p>" +

                                "<p>房贷利息已付（可抵扣参考）：" +

                                fmt(taxData.mortgageInterestPaid) +

                                "　已缴税款：" +

                                fmt(taxData.taxPaid) +

                                "</p>" +

                                "<p>合计收入（已自动填入 Income）：" +

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

                "./core/system/systemManager.js"

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

                    "./transaction/transactionModule.js"

                );

            const TransactionModule =

                transactionModuleImport.default;

            const transactionModule =

                new TransactionModule();

            const transactionIntegrationImport =

                await import(

                    "./core/integration/transactionIntegration.js"

                );

            const TransactionIntegration =

                transactionIntegrationImport.default;

            TransactionIntegration.setFacade(

                transactionModule.getFacade()

            );

            TransactionIntegration.initialize();

            const cashflowIntegrationImport =

                await import(

                    "./core/integration/cashflowIntegration.js"

                );

            const CashflowIntegration =

                cashflowIntegrationImport.default;

            CashflowIntegration.initialize(

                transactionModule.getManager()

            );

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

                "./core/modules/assetsModule.js"

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

                "./modules/investment/api/investmentAPI.js"

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

                "./core/modules/liabilityModule.js"

            );

        const LiabilityModule =

            liabilityModule.default;

        const liabilities =

            LiabilityModule.api

                .getLiabilities();

        // ==================================================

        // Income V7

        //

        // Dashboard income comes directly

        // from Income V7.

        // ==================================================

        const incomeModule =

            await import(

                "./modules/income/incomeModule.js"

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

        // ==================================================

        // Direct Cashflow Expense

        // ==================================================

        try{

            const cashflowModule =

                await import(

                    "./core/modules/cashflowModule.js"

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

            liabilities.reduce(

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

                cashFlowExpense,

            net:

                incomeTotal -

                cashFlowExpense,

            netCashFlow:

                incomeTotal -

                cashFlowExpense,

            directExpense:

                directCashflowExpense,

            liabilityInterest:

                liabilityAnnualInterest

        };

        // ==================================================

        // Wealth Engine

        // ==================================================

        const wealthModule =

            await import(

                "./core/engines/wealth/wealthEngine.js"

            );

        const WealthEngine =

            wealthModule.default;

        // ==================================================

        // Combine Assets + Investments

        //

        // Investment is treated as an asset

        // for dashboard wealth calculation.

        // ==================================================

        const dashboardAssets = [

            ...assets,

            ...investments.map(

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

            liabilities,

            cashFlowData,

            investments

        );

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
