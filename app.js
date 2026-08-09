/*

Family Wealth AI OS V7

Application Entry

Dashboard + Module Navigation

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

    cashFlow

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

                    allocation[category];

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

            <!-- Header -->

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

            <!-- System -->

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

            <!-- Dashboard -->

            <section

                class="dashboard"

            >

                <h2>

                    📊 财富驾驶舱

                </h2>

                <div

                    class="dashboard-grid"

                >

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

            <!-- Asset Allocation -->

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

            <!-- Wealth Modules -->

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

            <!-- AI Agents -->

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

            <!-- Quick Access -->

            <section

                class="quick-actions"

            >

                <h2>

                    Quick Access

                </h2>

                <div

                    class="action-grid"

                >

                    <button

                        id="quick-assets"

                        type="button"

                    >

                        💰 Assets

                    </button>

                    <button

                        id="quick-investment"

                        type="button"

                    >

                        📈 Investment

                    </button>

                    <button

                        id="quick-income"

                        type="button"

                    >

                        💵 Income

                    </button>

                    <button

                        id="quick-liability"

                        type="button"

                    >

                        💳 Liability

                    </button>

                    <button

                        id="quick-cashflow"

                        type="button"

                    >

                        💸 Cash Flow

                    </button>

                    <button

                        id="quick-tax"

                        type="button"

                    >

                        🧾 Tax

                    </button>

                </div>

            </section>

            <!-- Module Container -->

            <section

                id="module-container"

                class="module-container"

            ></section>

        </div>

    `;

    // ==================================================

    // Quick Access - Assets

    // ==================================================

    document

        .getElementById(

            "quick-assets"

        )

        .addEventListener(

            "click",

            async () => {

                try {

                    const module =

                        await import(

                            "./core/modules/assetsModule.js"

                        );

                    const AssetsModule =

                        module.default;

                    const container =

                        document.getElementById(

                            "module-container"

                        );

                    AssetsModule.view.render(

                        container

                    );

                    container.scrollIntoView({

                        behavior:

                        "smooth"

                    });

                }

                catch(error){

                    renderError(

                        "Assets Module Error",

                        error

                    );

                }

            }

        );

    // ==================================================

    // Quick Access - Investment

    // ==================================================

    document

        .getElementById(

            "quick-investment"

        )

        .addEventListener(

            "click",

            async () => {

                await openModule(

                    "investment"

                );

            }

        );

    // ==================================================

    // Quick Access - Income

    // ==================================================

    document

        .getElementById(

            "quick-income"

        )

        .addEventListener(

            "click",

            async () => {

                await openModule(

                    "income"

                );

            }

        );

    // ==================================================

    // Quick Access - Liability

    // ==================================================

    document

        .getElementById(

            "quick-liability"

        )

        .addEventListener(

            "click",

            async () => {

                await openModule(

                    "liability"

                );

            }

        );

    // ==================================================

    // Quick Access - Cashflow

    // ==================================================

    document

        .getElementById(

            "quick-cashflow"

        )

        .addEventListener(

            "click",

            async () => {

                await openModule(

                    "cashflow"

                );

            }

        );

    // ==================================================

    // Quick Access - Tax

    // ==================================================

    document

        .getElementById(

            "quick-tax"

        )

        .addEventListener(

            "click",

            async () => {

                await openModule(

                    "tax"

                );

            }

        );

}

// ==================================================

// Generic Module Opener

// ==================================================

async function openModule(

    moduleName

){

    const container =

        document.getElementById(

            "module-container"

        );

    if(!container){

        return;

    }

    try {

        let module;

        if(

            moduleName ===

            "investment"

        ){

            module =

                await import(

                    "./core/modules/investmentModule.js"

                );

        }

        else if(

            moduleName ===

            "income"

        ){

            module =

                await import(

                    "./core/modules/incomeModule.js"

                );

        }

        else if(

            moduleName ===

            "liability"

        ){

            module =

                await import(

                    "./core/modules/liabilityModule.js"

                );

        }

        else if(

            moduleName ===

            "cashflow"

        ){

            module =

                await import(

                    "./core/modules/cashflowModule.js"

                );

        }

        else if(

            moduleName ===

            "tax"

        ){

            module =

                await import(

                    "./core/modules/taxModule.js"

                );

        }

        else {

            throw new Error(

                "Unknown module: " +

                moduleName

            );

        }

        const Module =

            module.default;

        if(!Module){

            throw new Error(

                moduleName +

                " module default export not found"

            );

        }

        if(

            Module.view &&

            typeof Module.view.render ===

            "function"

        ){

            Module.view.render(

                container

            );

        }

        else {

            container.innerHTML = `

                <div

                    class="module-card"

                >

                    <h2>

                        ${moduleName}

                    </h2>

                    <p>

                        Module loaded successfully.

                    </p>

                    <p>

                        UI View is not connected yet.

                    </p>

                </div>

            `;

        }

        container.scrollIntoView({

            behavior:

            "smooth"

        });

    }

    catch(error){

        renderError(

            moduleName +

            " Module Error",

            error

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

            <pre style="

                white-space:pre-wrap;

                word-break:break-word;

                color:red;

            ">

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

    try {

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

        // ------------------------------------------

        // System Manager

        // ------------------------------------------

        const systemModule =

            await import(

                "./core/system/systemManager.js"

            );

        const SystemManager =

            systemModule.default;

        // ------------------------------------------

        // Start System

        // ------------------------------------------

        const startResult =

            SystemManager.start();

        const systemStatus =

            SystemManager.status();

        // ------------------------------------------

        // Assets

        // ------------------------------------------

        const assetsModule =

            await import(

                "./core/modules/assetsModule.js"

            );

        const AssetsModule =

            assetsModule.default;

        const assets =

            AssetsModule.api.getAll();

        // ------------------------------------------

        // Liabilities

        // ------------------------------------------

        const liabilityModule =

            await import(

                "./core/modules/liabilityModule.js"

            );

        const LiabilityModule =

            liabilityModule.default;

        const liabilities =

            LiabilityModule.api

            .getLiabilities();

        // ------------------------------------------

        // Cashflow

        // ------------------------------------------

        const cashflowModule =

            await import(

                "./core/modules/cashflowModule.js"

            );

        const CashflowModule =

            cashflowModule.default;

        const cashFlowSummary =

            CashflowModule.api

            .getSummary();

        // ------------------------------------------

        // Normalize Cash Flow

        // ------------------------------------------

        const cashFlowData = {

            income:

                Number(

                    cashFlowSummary.income ||

                    0

                ),

            expense:

                Number(

                    cashFlowSummary.expense ||

                    0

                ),

            net:

                Number(

                    cashFlowSummary.net ||

                    0

                ),

            netCashFlow:

                Number(

                    cashFlowSummary.net ||

                    0

                )

        };

        // ------------------------------------------

        // Wealth Engine

        // ------------------------------------------

        const wealthModule =

            await import(

                "./core/engines/wealth/wealthEngine.js"

            );

        const WealthEngine =

            wealthModule.default;

        // ------------------------------------------

        // Analyze Wealth

        // ------------------------------------------

        const wealthResult =

            WealthEngine.analyze(

                assets,

                liabilities,

                cashFlowData,

                0

            );

        // ------------------------------------------

        // Final Result

        // ------------------------------------------

        const result = {

            ...wealthResult,

            status:

                startResult.status,

            advisor:

                startResult.advisor

        };

        // ------------------------------------------

        // Render

        // ------------------------------------------

        renderDashboard(

            result,

            systemStatus,

            assets,

            liabilities,

            cashFlowData

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

// Start

// ==================================================

start();
