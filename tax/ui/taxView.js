/*

 

Family Wealth AI OS V7.7

 

Tax View

 

Tax 模块用户界面层

 

负责：

1. Tax Dashboard

2. Tax Plan

3. Tax Report

4. Tax Optimization

5. Tax Advisor

6. Tax Status

 

*/

import TaxFacade from "../taxFacade.js";

class TaxView {

    constructor(){

        this.facade =

            new TaxFacade();

    }

    // ==================================================

    // Render

    // ==================================================

    render(

        container,

        onBack

    ){

        if(

            !container

        ){

            throw new Error(

                "TaxView render container not found"

            );

        }

        this.container =

            container;

        this.onBack =

            typeof onBack ===

                "function"

                ?

                onBack

                :

                () => {};

        this.facade.initialize();

        this.renderDashboard();

    }

    // ==================================================

    // Dashboard

    // ==================================================

    renderDashboard(){

        const dashboard =

            this.facade

                .kernel

                .getModule()

                .dashboard();

        const summary =

            dashboard.summary || {};

        const latestPlan =

            dashboard.latestPlan || null;

        const analysis =

            dashboard.analysis || null;

        const optimization =

            analysis?.optimization ||

            null;

        const advice =

            analysis?.advice ||

            null;

        this.container.innerHTML = `

            <div class="app-shell">

                <header class="app-header">

                    <h1>

                        🧾 Tax Center

                    </h1>

                    <p>

                        Family Wealth AI OS V7.7

                    </p>

                </header>

                <section class="system-status">

                    <h2>

                        Tax Module Status

                    </h2>

                    <div class="status-ready">

                        ✅ TAX SYSTEM READY

                    </div>

                    <p>

                        Tax Plans:

                        <strong>

                            ${Number(

                                summary.count || 0

                            )}

                        </strong>

                    </p>

                </section>

                <section class="dashboard">

                    <h2>

                        📊 Tax Dashboard

                    </h2>

                    <div class="dashboard-grid">

                        <div class="dashboard-card">

                            <h3>

                                Tax Plans

                            </h3>

                            <div class="value">

                                ${Number(

                                    summary.count || 0

                                )}

                            </div>

                        </div>

                        <div class="dashboard-card">

                            <h3>

                                Total Income

                            </h3>

                            <div class="value">

                                ${this.formatCurrency(

                                    summary.totalIncome

                                )}

                            </div>

                        </div>

                        <div class="dashboard-card">

                            <h3>

                                Total Deductions

                            </h3>

                            <div class="value">

                                ${this.formatCurrency(

                                    summary.totalDeductions

                                )}

                            </div>

                        </div>

                        <div class="dashboard-card">

                            <h3>

                                Taxable Income

                            </h3>

                            <div class="value">

                                ${this.formatCurrency(

                                    summary.totalTaxableIncome

                                )}

                            </div>

                        </div>

                        <div class="dashboard-card">

                            <h3>

                                Estimated Tax

                            </h3>

                            <div class="value">

                                ${this.formatCurrency(

                                    summary.totalEstimatedTax

                                )}

                            </div>

                        </div>

                        <div class="dashboard-card">

                            <h3>

                                Effective Tax Rate

                            </h3>

                            <div class="value">

                                ${this.formatPercent(

                                    (

                                        summary.averageEffectiveTaxRate ||

                                        0

                                    ) * 100

                                )}

                            </div>

                        </div>

                    </div>

                </section>

                <section class="modules">

                    <h2>

                        📋 Latest Tax Plan

                    </h2>

                    <div class="module-grid">

                        ${

                            latestPlan

                                ?

                                `

                                <div class="module-card">

                                    <h3>

                                        ${this.escapeHTML(

                                            latestPlan.name ||

                                            "Tax Plan"

                                        )}

                                    </h3>

                                    <p>

                                        Tax Year:

                                        ${Number(

                                            latestPlan.taxYear ||

                                            0

                                        )}

                                    </p>

                                    <p>

                                        Income:

                                        ${this.formatCurrency(

                                            latestPlan.income

                                        )}

                                    </p>

                                    <p>

                                        Deductions:

                                        ${this.formatCurrency(

                                            latestPlan.deductions

                                        )}

                                    </p>

                                    <p>

                                        Taxable Income:

                                        ${this.formatCurrency(

                                            latestPlan.taxableIncome

                                        )}

                                    </p>

                                </div>

                                `

                                :

                                `

                                <div class="module-card">

                                    <h3>

                                        No Tax Plan

                                    </h3>

                                    <p>

                                        No tax plan has been created yet.

                                    </p>

                                </div>

                                `

                        }

                    </div>

                </section>

                <section class="modules">

                    <h2>

                        🎯 Tax Optimization

                    </h2>

                    <div class="module-grid">

                        ${

                            optimization

                                ?

                                this.renderOptimization(

                                    optimization

                                )

                                :

                                `

                                <div class="module-card">

                                    <h3>

                                        No Optimization Data

                                    </h3>

                                    <p>

                                        Create a tax plan to begin analysis.

                                    </p>

                                </div>

                                `

                        }

                    </div>

                </section>

                <section class="modules">

                    <h2>

                        🤖 Tax Advisor

                    </h2>

                    <div class="module-grid">

                        ${

                            advice

                                ?

                                this.renderAdvice(

                                    advice

                                )

                                :

                                `

                                <div class="module-card">

                                    <h3>

                                        No Advisor Data

                                    </h3>

                                    <p>

                                        Create a tax plan to generate tax advice.

                                    </p>

                                </div>

                                `

                        }

                    </div>

                </section>

                <section class="quick-actions">

                    <h2>

                        Quick Access

                    </h2>

                    <div class="action-grid">

                        <button

                            id="tax-create-plan-button"

                            type="button"

                        >

                            ➕ Create Tax Plan

                        </button>

                        <button

                            id="tax-refresh-button"

                            type="button"

                        >

                            🔄 Refresh

                        </button>

                        <button

                            id="tax-back-button"

                            type="button"

                        >

                            ⬅️ Back

                        </button>

                    </div>

                </section>

            </div>

        `;

        this.bindEvents();

    }

    // ==================================================

    // Render Optimization

    // ==================================================

    renderOptimization(

        optimization

    ){

        const opportunities =

            Array.isArray(

                optimization.opportunities

            )

                ?

                optimization.opportunities

                :

                [];

        if(

            opportunities.length === 0

        ){

            return `

                <div class="module-card">

                    <h3>

                        No Opportunities

                    </h3>

                    <p>

                        No tax optimization opportunities identified.

                    </p>

                </div>

            `;

        }

        return opportunities

            .map(

                opportunity => `

                    <div class="module-card">

                        <h3>

                            ${this.escapeHTML(

                                opportunity.type ||

                                "Opportunity"

                            )}

                        </h3>

                        <p>

                            Priority:

                            <strong>

                                ${this.escapeHTML(

                                    opportunity.priority ||

                                    "LOW"

                                )}

                            </strong>

                        </p>

                        <p>

                            ${this.escapeHTML(

                                opportunity.message ||

                                ""

                            )}

                        </p>

                    </div>

                `

            )

            .join("");

    }

    // ==================================================

    // Render Advice

    // ==================================================

    renderAdvice(

        advice

    ){

        const recommendations =

            Array.isArray(

                advice.recommendations

            )

                ?

                advice.recommendations

                :

                [];

        if(

            recommendations.length === 0

        ){

            return `

                <div class="module-card">

                    <h3>

                        No Recommendations

                    </h3>

                    <p>

                        No immediate tax recommendations.

                    </p>

                </div>

            `;

        }

        return recommendations

            .map(

                recommendation => `

                    <div class="module-card">

                        <h3>

                            💡 Recommendation

                        </h3>

                        <p>

                            ${this.escapeHTML(

                                recommendation

                            )}

                        </p>

                    </div>

                `

            )

            .join("");

    }

    // ==================================================

    // Bind Events

    // ==================================================

    bindEvents(){

        const createButton =

            document.getElementById(

                "tax-create-plan-button"

            );

        if(

            createButton

        ){

            createButton.addEventListener(

                "click",

                () => {

                    this.createPlanForm();

                }

            );

        }

        const refreshButton =

            document.getElementById(

                "tax-refresh-button"

            );

        if(

            refreshButton

        ){

            refreshButton.addEventListener(

                "click",

                () => {

                    this.renderDashboard();

                }

            );

        }

        const backButton =

            document.getElementById(

                "tax-back-button"

            );

        if(

            backButton

        ){

            backButton.addEventListener(

                "click",

                () => {

                    this.onBack();

                }

            );

        }

    }

    // ==================================================

    // Create Tax Plan Form

    // ==================================================

    createPlanForm(){

        this.container.innerHTML = `

            <div class="app-shell">

                <header class="app-header">

                    <h1>

                        🧾 Create Tax Plan

                    </h1>

                    <p>

                        Family Wealth AI OS V7.7

                    </p>

                </header>

                <section class="modules">

                    <div class="module-card">

                        <h3>

                            Tax Plan Information

                        </h3>

                        <form id="tax-plan-form">

                            <p>

                                <label>

                                    Name

                                </label>

                                <input

                                    id="tax-plan-name"

                                    type="text"

                                    value="Tax Plan"

                                >

                            </p>

                            <p>

                                <label>

                                    Tax Year

                                </label>

                                <input

                                    id="tax-plan-year"

                                    type="number"

                                    value="${new Date().getFullYear()}"

                                >

                            </p>

                            <p>

                                <label>

                                    Income

                                </label>

                                <input

                                    id="tax-plan-income"

                                    type="number"

                                    step="0.01"

                                    value="0"

                                >

                            </p>

                            <p>

                                <label>

                                    Deductions

                                </label>

                                <input

                                    id="tax-plan-deductions"

                                    type="number"

                                    step="0.01"

                                    value="0"

                                >

                            </p>

                            <div class="action-grid">

                                <button

                                    type="submit"

                                >

                                    Save Tax Plan

                                </button>

                                <button

                                    id="tax-plan-cancel"

                                    type="button"

                                >

                                    Cancel

                                </button>

                            </div>

                        </form>

                    </div>

                </section>

            </div>

        `;

        const form =

            document.getElementById(

                "tax-plan-form"

            );

        if(

            form

        ){

            form.addEventListener(

                "submit",

                event => {

                    event.preventDefault();

                    this.savePlan();

                }

            );

        }

        const cancel =

            document.getElementById(

                "tax-plan-cancel"

            );

        if(

            cancel

        ){

            cancel.addEventListener(

                "click",

                () => {

                    this.renderDashboard();

                }

            );

        }

    }

    // ==================================================

    // Save Tax Plan

    // ==================================================

    savePlan(){

        const name =

            document.getElementById(

                "tax-plan-name"

            )?.value ||

            "Tax Plan";

        const taxYear =

            Number(

                document.getElementById(

                    "tax-plan-year"

                )?.value ||

                new Date()

                    .getFullYear()

            );

        const income =

            Number(

                document.getElementById(

                    "tax-plan-income"

                )?.value ||

                0

            );

        const deductions =

            Number(

                document.getElementById(

                    "tax-plan-deductions"

                )?.value ||

                0

            );

        this.facade

            .kernel

            .getModule()

            .controller

            .taxService

            .createPlan({

                name,

                taxYear,

                income,

                deductions

            });

        this.renderDashboard();

    }

    // ==================================================

    // Currency Formatter

    // ==================================================

    formatCurrency(

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

    formatPercent(

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

    // Escape HTML

    // ==================================================

    escapeHTML(

        value

    ){

        return String(

            value ?? ""

        )

        .replace(

            /&/g,

            "&amp;"

        )

        .replace(

            /</g,

            "&lt;"

        )

        .replace(

            />/g,

            "&gt;"

        )

        .replace(

            /"/g,

            "&quot;"

        )

        .replace(

            /'/g,

            "&#039;"

        );

    }

}

// ==================================================

// Singleton View

// ==================================================

const taxView =

    new TaxView();

export default taxView;
