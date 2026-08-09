/*

Family Wealth AI OS V7

Application Entry

*/

const app =

document.getElementById("app");

function renderSystem(

    systemResult,

    systemStatus

){

    app.innerHTML = `

        <div class="app-shell">

            <header class="app-header">

                <h1>

                    🏠 Family Wealth AI OS

                </h1>

                <p>

                    Family Wealth Operating System V7

                </p>

            </header>

            <section class="system-status">

                <h2>

                    System Status

                </h2>

                <div class="status-ready">

                    ✅ SYSTEM READY

                </div>

                <p>

                    Advisor:

                    <strong>

                        ${systemResult.advisor}

                    </strong>

                </p>

            </section>

            <section class="dashboard">

                <h2>

                    📊 财富驾驶舱

                </h2>

                <div class="dashboard-grid">

                    <div class="dashboard-card">

                        <h3>

                            净资产

                        </h3>

                        <div class="value">

                            $0

                        </div>

                    </div>

                    <div class="dashboard-card">

                        <h3>

                            总资产

                        </h3>

                        <div class="value">

                            $0

                        </div>

                    </div>

                    <div class="dashboard-card">

                        <h3>

                            总负债

                        </h3>

                        <div class="value">

                            $0

                        </div>

                    </div>

                    <div class="dashboard-card">

                        <h3>

                            年度收入

                        </h3>

                        <div class="value">

                            $0

                        </div>

                    </div>

                </div>

            </section>

            <section class="modules">

                <h2>

                    Wealth Modules

                </h2>

                <div class="module-grid">

                    ${systemStatus.modules.map(

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

                    ).join("")}

                </div>

            </section>

            <section class="agents">

                <h2>

                    AI Agents

                </h2>

                <div class="module-grid">

                    ${systemStatus.agents.map(

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

                    ).join("")}

                </div>

            </section>

            <section class="quick-actions">

                <h2>

                    Quick Access

                </h2>

                <div class="action-grid">

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

function renderError(

    title,

    error

){

    app.innerHTML = `

        <div class="error-screen">

            <h1>

                ${title}

            </h1>

            <pre>${error?.stack ||

                error?.message ||

                String(error)}</pre>

        </div>

    `;

}

async function start(){

    try {

        app.innerHTML = `

            <div class="startup">

                <h1>

                    🏠 Family Wealth AI OS V7

                </h1>

                <p>

                    Starting Family Wealth AI OS...

                </p>

            </div>

        `;

        const module =

            await import(

                "./core/system/systemManager.js"

            );

        const SystemManager =

            module.default;

        const result =

            SystemManager.start();

        const status =

            SystemManager.status();

        renderSystem(

            result,

            status

        );

    }

    catch(error){

        renderError(

            "Family Wealth AI OS V7 Startup Error",

            error

        );

    }

}

start();
