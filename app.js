/*

Family Wealth AI OS V7

Application Entry

Dashboard Data Integration

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

                    <button>

                        💰 Assets

                    </button>

                    <button>

                        📈 Investment

                    </button>

                    <button>

                        💵 Income

                    </button>

                    <button>

                        💳 Liability

                    </button>

                    <button>

                        💸 Cash Flow

                    </button>

                    <button>

                        🧾 Tax

                    </button>

                </div>

            </section>

        </div>

    `;

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

            <pre>

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
