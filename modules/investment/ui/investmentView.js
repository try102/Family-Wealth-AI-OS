/*

Family Wealth AI OS V7

Investment View

Investment Center UI

第二阶段：

${t("formAddTitle")}

View Investment

${t("formEditTitle")}

Delete Investment

*/

import InvestmentAPI from "../api/investmentAPI.js?v=20261008s";

import InvestmentAgent from "../agent/investmentAgent.js?v=20261008s";

import AccountAPI from "../../account/api/accountAPI.js";

import MemberAPI from "../../member/api/memberAPI.js";

import {

    SUPPORTED_LANGUAGES,

    getLanguage,

    setLanguage,

    t

} from "../i18n/investmentLocales.js?v=20261008s";

const InvestmentView = {

    // ==========================================

    // Render

    // ==========================================

    render(

        container,

        onBack

    ){

        const investments =

            InvestmentAPI

            .getInvestments();

        const portfolio =

            InvestmentAPI

            .getPortfolioSummary();

        const performance =

            InvestmentAPI

            .getPerformance();

        const risk =

            InvestmentAPI

            .getRiskReport();

        const typeLabel =

            type => {

                const key = {

                    STOCK: "typeStock",

                    ETF: "typeETF",

                    BOND: "typeBond",

                    FUND: "typeFund",

                    OTHER: "typeOther"

                }[String(type || "").toUpperCase()];

                return key

                    ? t(key)

                    : String(type || "");

            };

        const trades =

            InvestmentAPI

            .getTrades();

        const scopeMemberId =

            this.scopeMemberId || "";

        const decision =

            InvestmentAgent

            .getDecisionCenter(

                scopeMemberId

            );

        const positions =

            scopeMemberId

            ? decision.scopedPositions

            : InvestmentAPI

                .getPositions();

        const members =

            (() => {

                try {

                    return MemberAPI.getMembers();

                } catch (error) {

                    return [];

                }

            })();

        const accountMemberMap =

            (() => {

                const map = {};

                try {

                    (AccountAPI.getAll() || []).forEach(

                        account => {

                            map[account.id] =

                                account.memberId ||

                                account.ownerId ||

                                "";

                        }

                    );

                } catch (error) {}

                return map;

            })();

        const tradeOwner =

            trade =>

                typeof trade.memberId === "string"

                    ? trade.memberId

                    : accountMemberMap[trade.accountId] || "";

        const positionTradeLines =

            symbol => {

                const wanted =

                    String(symbol || "").toUpperCase();

                const lines =

                    (trades || [])

                    .filter(

                        trade =>

                            (trade.action === "BUY" ||

                                trade.action === "SELL") &&

                            String(trade.symbol || "").toUpperCase() === wanted &&

                            (

                                !scopeMemberId

                                    ? true

                                    : scopeMemberId === "__shared__"

                                        ? tradeOwner(trade) === ""

                                        : tradeOwner(trade) === scopeMemberId

                            )

                    )

                    .map(

                        trade => {

                            const gain =

                                trade.action === "SELL"

                                    ? InvestmentAgent

                                        .getRealizedGains(scopeMemberId)

                                        .byTrade[trade.id]

                                    : undefined;

                            const gainText =

                                gain === undefined

                                    ? ""

                                    : ` · ${t("realizedGainLoss")} $${Number(gain || 0).toLocaleString()}`;

                            return `<br><small>${trade.tradeDate || trade.date || ""} ${trade.action === "BUY" ? t("buyDate") : t("sellDate")} ${Number(trade.quantity || 0)} ${t("sharesUnit")} @ $${Number(trade.price || 0).toLocaleString()}${gainText}</small>`;

                        }

                    );

                return lines.join("");

            };

        const language =

            getLanguage();

        const fmtPct =

            value =>

                Number(value || 0)

                    .toFixed(1) +

                "%";

        const signalReason =

            holding => {

                const params = {

                    weight:

                        Number(holding.weight || 0)

                            .toFixed(1),

                    rate:

                        Number(holding.returnRate || 0)

                            .toFixed(1)

                };

                if (

                    holding.signalReason ===

                    "concentration"

                ) {

                    return t(

                        "reasonConcentration",

                        params

                    );

                }

                if (

                    holding.signalReason ===

                    "loss"

                ) {

                    return t(

                        "reasonLoss",

                        params

                    );

                }

                if (

                    holding.signalReason ===

                    "profit"

                ) {

                    return t(

                        "reasonProfit",

                        params

                    );

                }

                if (

                    holding.signalReason ===

                    "small"

                ) {

                    return t("reasonSmall");

                }

                return t("reasonHold");

            };

        const adviceItems = [

            ...decision.warnings.map(

                warning =>

                    t(

                        "concentrationWarn",

                        {

                            symbol:

                                warning.symbol || "",

                            weight:

                                Number(warning.ratio || 0)

                                    .toFixed(1)

                        }

                    )

            ),

            ...decision.holdings

                .filter(

                    holding =>

                        holding.signalCode !==

                        "HOLD"

                )

                .map(

                    holding =>

                        `${holding.symbol}: ${t("signal" + holding.signalCode)} — ${signalReason(holding)}`

                )

        ];

        container.innerHTML = `

            <div

                class="investment-center"

            >

                <h2>

                    ${t("title")}

                </h2>

                <label>

                    ${t("language")}

                </label>

                <select

                    id="inv-language-select"

                >

                    ${

                        SUPPORTED_LANGUAGES.map(

                            item => `

                                <option

                                    value="${item.code}"

                                    ${

                                        item.code ===

                                        language

                                        ?

                                        "selected"

                                        :

                                        ""

                                    }

                                >

                                    ${item.label}

                                </option>

                            `

                        ).join("")

                    }

                </select>

                <br><br>

                <label>

                    ${t("scopeLabel")}

                </label>

                <select

                    id="inv-scope-select"

                >

                    <option value="" ${scopeMemberId === "" ? "selected" : ""}>${t("scopeMerged")}</option>

                    ${

                        members.map(

                            member => `<option value="${member.id}" ${scopeMemberId === member.id ? "selected" : ""}>${member.name || member.id}</option>`

                        ).join("")

                    }

                    <option value="__shared__" ${scopeMemberId === "__shared__" ? "selected" : ""}>${t("scopeShared")}</option>

                </select>

                <br><br>

                <button

                    id="investment-back-button"

                    type="button"

                >

                    ${t("back")}

                </button>

                <hr>

                <section>

                    <h3>

                        ${t("overview")}

                    </h3>

                    <p>

                        ${t("portfolioValue")}：$${Number(decision.totalValue || 0).toLocaleString()}

                        ｜ ${t("totalCost")}：$${Number(decision.totalCost || 0).toLocaleString()}

                        ｜ ${t("totalGainLoss")}：$${Number(decision.totalGainLoss || 0).toLocaleString()}

                        （${t("totalReturn")} ${fmtPct(decision.totalReturnRate)}）

                    </p>

                    <p>

                        ${t("holdingsCount")}：${decision.holdings.length}

                        ｜ ${t("riskWarnings")}：${decision.warnings.length}

                        ｜ ${t("realizedGainLoss")}：$${Number(InvestmentAgent.getRealizedGains(scopeMemberId).total || 0).toLocaleString()}

                    </p>

                </section>

                <section>

                    <h3>

                        ${t("decisionTable")}

                    </h3>

                    ${

                        decision.holdings.length === 0

                        ?

                        `<p>${t("noHoldings")}</p>`

                        :

                        `

                    <table style="border-collapse:collapse;">

                        <tr>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colSymbol")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colQty")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colAvgCost")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colPrice")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colMarketValue")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colWeight")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colGainLoss")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colReturn")}</th>

                            <th style="padding:6px;border:1px solid #ccc;">${t("colDecision")}</th>

                        </tr>

                        ${

                            decision.holdings.map(

                                holding => `

                        <tr>

                            <td style="padding:6px;border:1px solid #ccc;">${holding.symbol}</td>

                            <td style="padding:6px;border:1px solid #ccc;">${holding.quantity}</td>

                            <td style="padding:6px;border:1px solid #ccc;">$${Number(holding.averageCost || 0).toFixed(2)}</td>

                            <td style="padding:6px;border:1px solid #ccc;">$${Number(holding.currentPrice || 0).toFixed(2)}</td>

                            <td style="padding:6px;border:1px solid #ccc;">$${Number(holding.marketValue || 0).toLocaleString()}</td>

                            <td style="padding:6px;border:1px solid #ccc;">${fmtPct(holding.weight)}</td>

                            <td style="padding:6px;border:1px solid #ccc;">$${Number(holding.gainLoss || 0).toLocaleString()}</td>

                            <td style="padding:6px;border:1px solid #ccc;">${fmtPct(holding.returnRate)}</td>

                            <td style="padding:6px;border:1px solid #ccc;">${t("signal" + holding.signalCode)}<br><small>${signalReason(holding)}</small></td>

                        </tr>

                                `

                            ).join("")

                        }

                    </table>

                        `

                    }

                </section>

                <section>

                    <h3>

                        ${t("adviceTitle")}

                    </h3>

                    <ul>

                        ${

                            adviceItems.length === 0

                            ?

                            `<li>${t("adviceNone")}</li>`

                            :

                            adviceItems.map(

                                item => `<li>${item}</li>`

                            ).join("")

                        }

                    </ul>

                    <p>

                        <small>${t("disclaimer")}</small>

                    </p>

                </section>

                <hr>

                <section>

                    <h3>

                        ${t("portfolioValue")}

                    </h3>

                    <p>

                        $${Number(

                            portfolio.totalValue || 0

                        ).toLocaleString()}

                    </p>

                </section>

                <section>

                    <h3>

                        ${t("allocation")}

                    </h3>

                    <ul>

                        ${

                            Object.keys(

                                portfolio.allocation ||

                                {}

                            ).length === 0

                            ?

                            `<li>${t("allocEmpty")}</li>`

                            :

                            Object.entries(

                                portfolio.allocation

                            ).map(

                                ([type, item]) => `

                                    <li>

                                        ${typeLabel(type)}：$${Number(item.value || 0).toLocaleString()}（${Number(item.ratio || 0)}%）

                                    </li>

                                `

                            ).join("")

                        }

                    </ul>

                </section>

                <section>

                    <h3>

                        ${t("performanceLabel")}

                    </h3>

                    <ul>

                        <li>${t("totalCost")}：$${Number(performance.cost || 0).toLocaleString()}</li>

                        <li>${t("portfolioValue")}：$${Number(performance.value || 0).toLocaleString()}</li>

                        <li>${t("totalGainLoss")}：$${Number(performance.gain || 0).toLocaleString()}</li>

                        <li>${t("totalReturn")}：${Number(performance.returnRate || 0)}%</li>

                    </ul>

                </section>

                <section>

                    <h3>

                        ${t("riskLabel")}

                    </h3>

                    <ul>

                        ${

                            (risk.concentration || []).length === 0

                            ?

                            `<li>${t("riskNone")}</li>`

                            :

                            risk.concentration.map(

                                item => `

                                    <li>

                                        ${item.symbol || ""} — ${t("colWeight")} ${Number(item.ratio || 0)}%（${item.level === "HIGH" ? t("riskHighLevel") : item.level || ""}）

                                    </li>

                                `

                            ).join("")

                        }

                    </ul>

                </section>

                <section>

                    <h3>

                        ${t("holdingsAuto")}

                    </h3>

                    <ul>

                        ${

                            positions.length === 0

                            ?

                            `<li>${t("noHoldings")}</li>`

                            :

                            positions.map(

                                position => `

                                    <li>

                                        <strong>

                                            ${position.symbol || position.name || ""}

                                        </strong>

                                        ${position.name || ""}

                                        -

                                        ${Number(position.quantity || 0)} ${t("sharesUnit")}

                                        -

                                        ${t("posCost")} $${Number(position.costBasis || 0).toLocaleString()}

                                        -

                                        ${t("colMarketValue")} $${Number(position.marketValue || 0).toLocaleString()}

                                        -

                                        ${t("unrealized")} $${Number(position.unrealizedGainLoss || 0).toLocaleString()}

                                        -

                                        ${t("holdingBalance")} ${Number(position.quantity || 0)} ${t("sharesUnit")} / $${Number(position.marketValue || 0).toLocaleString()}

                                        ${positionTradeLines(position.symbol)}

                                    </li>

                                `

                            ).join("")

                        }

                    </ul>

                </section>

                <hr>

                <button

                    id="add-investment-button"

                    type="button"

                >

                    ${t("addInvestment")}

                </button>

                <button

                    id="record-trade-button"

                    type="button"

                >

                    ${t("recordTrade")}

                </button>

                <div

                    id="investment-form-container"

                ></div>

                <div

                    id="trade-form-container"

                ></div>

                <h3>

                    ${t("investmentsTitle")}

                </h3>

                <ul>

                    ${

                        investments.length === 0

                        ?

                        `<li>${t("noInvestments")}</li>`

                        :

                        investments.map(

                            investment => `

                                <li

                                    data-investment-id="${investment.id}"

                                >

                                    <strong>

                                        ${investment.name || t("unnamed")}

                                    </strong>

                                    -

                                    ${investment.symbol || "N/A"}

                                    -

                                    $${Number(

                                        investment.currentValue || 0

                                    ).toLocaleString()}

                                    <button

                                        type="button"

                                        class="edit-investment-button"

                                        data-id="${investment.id}"

                                    >

                                        ${t("edit")}

                                    </button>

                                    <button

                                        type="button"

                                        class="delete-investment-button"

                                        data-id="${investment.id}"

                                    >

                                        ${t("delete")}

                                    </button>

                                </li>

                            `

                        ).join("")

                    }

                </ul>

                <h3>

                    ${t("recentTrades")}

                </h3>

                <ul>

                    ${

                        trades.length === 0

                        ?

                        `<li>${t("noTrades")}</li>`

                        :

                        trades.slice(-10).reverse().map(

                            trade => `

                                <li>

                                    ${trade.action || ""}

                                    ${trade.symbol || trade.name || ""}

                                    -

                                    $${Number(

                                        trade.amount ||

                                        (

                                            Number(trade.quantity || 0) *

                                            Number(trade.price || 0)

                                        )

                                    ).toLocaleString()}

                                    ${

                                        trade.accountId

                                        ?

                                        "(已记账)"

                                        :

                                        ""

                                    }

                                </li>

                            `

                        ).join("")

                    }

                </ul>

            </div>

        `;

        // ==========================================

        // Back Button

        // ==========================================

        const backButton =

            container.querySelector(

                "#investment-back-button"

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

        // ==========================================

        // Add Button

        // ==========================================

        const addButton =

            container.querySelector(

                "#add-investment-button"

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

        // ==========================================

        // ${t("formTradeTitle")} Button

        // ==========================================

        const tradeButton =

            container.querySelector(

                "#record-trade-button"

            );

        if(tradeButton){

            tradeButton.addEventListener(

                "click",

                () => {

                    this.showTradeForm(

                        container,

                        onBack

                    );

                }

            );

        }

        // ==========================================

        // Language Switch

        // ==========================================

        const languageSelect =

            container.querySelector(

                "#inv-language-select"

            );

        if(languageSelect){

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

        // Holdings Scope Switch

        // ==========================================

        const scopeSelect =

            container.querySelector(

                "#inv-scope-select"

            );

        if(scopeSelect){

            scopeSelect.addEventListener(

                "change",

                () => {

                    this.scopeMemberId =

                        scopeSelect.value;

                    this.render(

                        container,

                        onBack

                    );

                }

            );

        }

        // ==========================================

        // Edit Buttons

        // ==========================================

        const editButtons =

            container.querySelectorAll(

                ".edit-investment-button"

            );

        editButtons.forEach(

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

        // ==========================================

        // Delete Buttons

        // ==========================================

        const deleteButtons =

            container.querySelectorAll(

                ".delete-investment-button"

            );

        deleteButtons.forEach(

            button => {

                button.addEventListener(

                    "click",

                    () => {

                        this.deleteInvestment(

                            container,

                            button.dataset.id,

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

    // ${t("formTradeTitle")} Form

    // ==========================================

    showTradeForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#trade-form-container"

            );

        if (!formContainer) {

            return;

        }

        const accounts =

            this.getAccounts();

        const accountOptions =

            this.buildAccountOptions();

        const tradeMembers =

            (() => {

                try {

                    return MemberAPI.getMembers() || [];

                }

                catch (memberError) {

                    return [];

                }

            })();

        const tradeMemberId =

            this.scopeMemberId &&

            this.scopeMemberId !== "__shared__"

                ? this.scopeMemberId

                : "";

        const memberOptions =

            tradeMembers.map(

                member => `<option value="${member.id}"${member.id === tradeMemberId ? " selected" : ""}>${member.name || member.id}</option>`

            ).join("");

        const accountHint =

            accounts.length === 0

            ?

            `

            <p style="color:#c00;">

                ${t("noAccountHint")}

            </p>

            `

            :

            "";

        formContainer.innerHTML = `

            <div

                class="trade-form"

                style="

                    margin-top:20px;

                    padding:20px;

                    border:1px solid #ddd;

                    border-radius:10px;

                "

            >

                <h3>

                    ${t("formTradeTitle")}

                </h3>

                <form

                    id="trade-create-form"

                >

                    <label>

                        ${t("actionLabel")}

                    </label>

                    <br>

                    <select

                        id="trade-action"

                        required

                    >

                        <option value="BUY">

                            ${t("optBuy")}

                        </option>

                        <option value="SELL">

                            ${t("optSell")}

                        </option>

                        <option value="DIVIDEND">

                            ${t("optDividend")}

                        </option>

                        <option value="INTEREST">

                            ${t("optInterest")}

                        </option>

                    </select>

                    <br><br>

                    <label>

                        ${t("symbolLabel")}

                    </label>

                    <br>

                    <input

                        id="trade-symbol"

                        type="text"

                    >

                    <br><br>

                    <label>

                        ${t("nameLabel")}

                    </label>

                    <br>

                    <input

                        id="trade-name"

                        type="text"

                    >

                    <br><br>

                    <label>

                        ${t("quantityLabel")}（${t("quantityHint")}）

                    </label>

                    <br>

                    <input

                        id="trade-quantity"

                        type="number"

                        min="0"

                        step="any"

                    >

                    <br><br>

                    <label>

                        ${t("priceLabel")}（${t("priceHint")}）

                    </label>

                    <br>

                    <input

                        id="trade-price"

                        type="number"

                        min="0"

                        step="any"

                    >

                    <br><br>

                    <label>

                        ${t("amountLabel")}（${t("amountHint")}）

                    </label>

                    <br>

                    <input

                        id="trade-amount"

                        type="number"

                        min="0"

                        step="0.01"

                    >

                    <br><br>

                    <label>

                        ${t("dateLabel")}

                    </label>

                    <br>

                    <input

                        id="trade-date"

                        type="date"

                    >

                    <br><br>

                    <label>

                        ${t("accountLabel")}（${t("accountHintTrade")}）

                    </label>

                    <br>

                    <select

                        id="trade-account"

                    >

                        <option value="">

                            ${t("selectAccount")}

                        </option>

                        ${accountOptions}

                    </select>

                    ${accountHint}

                    <br><br>

                    <label>

                        ${t("memberLabel")}

                    </label>

                    <br>

                    <select

                        id="trade-member"

                    >

                        <option value=""${tradeMemberId === "" ? " selected" : ""}>${t("scopeShared")}</option>

                        ${memberOptions}

                        <option value="__new__">${t("memberNewOption")}</option>

                    </select>

                    <input

                        id="trade-member-name"

                        type="text"

                        placeholder="${t("memberNamePlaceholder")}"

                        style="display:none;margin-top:8px;"

                    >

                    <br><br>

                    <button

                        type="submit"

                    >

                        ${t("saveTrade")}

                    </button>

                    <button

                        type="button"

                        id="cancel-trade-button"

                    >

                        ${t("cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#trade-create-form"

            );

        const memberSelect =

            form.querySelector(

                "#trade-member"

            );

        const memberNameInput =

            form.querySelector(

                "#trade-member-name"

            );

        if (memberSelect && memberNameInput) {

            memberSelect.addEventListener(

                "change",

                () => {

                    memberNameInput.style.display =

                        memberSelect.value === "__new__"

                            ? "block"

                            : "none";

                }

            );

        }

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const action =

                    form.querySelector(

                        "#trade-action"

                    ).value;

                const symbol =

                    form.querySelector(

                        "#trade-symbol"

                    ).value.trim();

                const name =

                    form.querySelector(

                        "#trade-name"

                    ).value.trim();

                const quantity =

                    Number(

                        form.querySelector(

                            "#trade-quantity"

                        ).value || 0

                    );

                const price =

                    Number(

                        form.querySelector(

                            "#trade-price"

                        ).value || 0

                    );

                const amountInput =

                    Number(

                        form.querySelector(

                            "#trade-amount"

                        ).value || 0

                    );

                const amount =

                    amountInput > 0

                    ?

                    amountInput

                    :

                    quantity * price;

                const tradeDate =

                    form.querySelector(

                        "#trade-date"

                    ).value;

                const accountField =

                    form.querySelector(

                        "#trade-account"

                    );

                const accountId =

                    accountField

                    ?

                    accountField.value

                    :

                    "";

                const memberField =

                    form.querySelector(

                        "#trade-member"

                    );

                let memberId =

                    memberField

                    ?

                    memberField.value

                    :

                    "";

                if (memberId === "__new__") {

                    const nameField =

                        form.querySelector(

                            "#trade-member-name"

                        );

                    const newName =

                        nameField

                        ?

                        nameField.value.trim()

                        :

                        "";

                    memberId = "";

                    if (newName) {

                        try {

                            const created =

                                MemberAPI.saveMember({

                                    name: newName

                                });

                            memberId =

                                created && created.id

                                    ? created.id

                                    : "";

                        }

                        catch (createError) {

                            memberId = "";

                        }

                    }

                }

                InvestmentAPI.recordTrade({

                    memberId,

                    action,

                    symbol,

                    name,

                    quantity,

                    price,

                    amount,

                    tradeDate,

                    accountId,

                    currency:

                    "USD"

                });

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-trade-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // Create Investment Form

    // ==========================================

    showCreateForm(

        container,

        onBack

    ){

        const formContainer =

            container.querySelector(

                "#investment-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="investment-form"

            >

                <h3>

                    ${t("formAddTitle")}

                </h3>

                <form

                    id="investment-create-form"

                >

                    <div>

                        <label>

                            ${t("invName")}

                        </label>

                        <br>

                        <input

                            id="investment-name"

                            type="text"

                            required

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            ${t("symbolLabel")}

                        </label>

                        <br>

                        <input

                            id="investment-symbol"

                            type="text"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            ${t("typeLabel")}

                        </label>

                        <br>

                        <select

                            id="investment-type"

                            required

                        >

                            <option value="">

                                ${t("selectType")}

                            </option>

                            <option value="Stock">

                                ${t("typeStock")}

                            </option>

                            <option value="ETF">

                                ${t("typeETF")}

                            </option>

                            <option value="Bond">

                                ${t("typeBond")}

                            </option>

                            <option value="Fund">

                                ${t("typeFund")}

                            </option>

                            <option value="Other">

                                ${t("typeOther")}

                            </option>

                        </select>

                    </div>

                    <br>

                    <div>

                        <label>

                            ${t("currentValueLabel")}

                        </label>

                        <br>

                        <input

                            id="investment-value"

                            type="number"

                            min="0"

                            step="0.01"

                            required

                        >

                    </div>

                    <br>

                    <button

                        type="submit"

                    >

                        ${t("saveInvestment")}

                    </button>

                    <button

                        type="button"

                        id="cancel-investment-button"

                    >

                        ${t("cancel")}

                    </button>

                </form>

            </div>

        `;

        const form =

            formContainer.querySelector(

                "#investment-create-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const investment = {

                    name:

                        form.querySelector(

                            "#investment-name"

                        ).value.trim(),

                    symbol:

                        form.querySelector(

                            "#investment-symbol"

                        ).value.trim(),

                    type:

                        form.querySelector(

                            "#investment-type"

                        ).value,

                    currentValue:

                        Number(

                            form.querySelector(

                                "#investment-value"

                            ).value

                        )

                };

                InvestmentAPI

                .createInvestment(

                    investment

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-investment-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // ${t("formEditTitle")} Form

    // ==========================================

    showEditForm(

        container,

        id,

        onBack

    ){

        const investments =

            InvestmentAPI

            .getInvestments();

        const investment =

            investments.find(

                item =>

                    item.id === id

            );

        if(!investment){

            throw new Error(

                "Investment not found: " +

                id

            );

        }

        const formContainer =

            container.querySelector(

                "#investment-form-container"

            );

        formContainer.innerHTML = `

            <div

                class="investment-form"

            >

                <h3>

                    ${t("formEditTitle")}

                </h3>

                <form

                    id="investment-edit-form"

                >

                    <div>

                        <label>

                            ${t("invName")}

                        </label>

                        <br>

                        <input

                            id="edit-investment-name"

                            type="text"

                            required

                            value="${investment.name || ""}"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            ${t("symbolLabel")}

                        </label>

                        <br>

                        <input

                            id="edit-investment-symbol"

                            type="text"

                            value="${investment.symbol || ""}"

                        >

                    </div>

                    <br>

                    <div>

                        <label>

                            ${t("typeLabel")}

                        </label>

                        <br>

                        <select

                            id="edit-investment-type"

                            required

                        >

                            <option value="Stock">

                                ${t("typeStock")}

                            </option>

                            <option value="ETF">

                                ${t("typeETF")}

                            </option>

                            <option value="Bond">

                                ${t("typeBond")}

                            </option>

                            <option value="Fund">

                                ${t("typeFund")}

                            </option>

                            <option value="Other">

                                ${t("typeOther")}

                            </option>

                        </select>

                    </div>

                    <br>

                    <div>

                        <label>

                            ${t("currentValueLabel")}

                        </label>

                        <br>

                        <input

                            id="edit-investment-value"

                            type="number"

                            min="0"

                            step="0.01"

                            required

                            value="${Number(

                                investment.currentValue || 0

                            )}"

                        >

                    </div>

                    <br>

                    <button

                        type="submit"

                    >

                        ${t("updateInvestment")}

                    </button>

                    <button

                        type="button"

                        id="cancel-edit-investment-button"

                    >

                        ${t("cancel")}

                    </button>

                </form>

            </div>

        `;

        const typeSelect =

            formContainer.querySelector(

                "#edit-investment-type"

            );

        typeSelect.value =

            investment.type || "Other";

        const form =

            formContainer.querySelector(

                "#investment-edit-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const updatedInvestment = {

                    ...investment,

                    name:

                        form.querySelector(

                            "#edit-investment-name"

                        ).value.trim(),

                    symbol:

                        form.querySelector(

                            "#edit-investment-symbol"

                        ).value.trim(),

                    type:

                        form.querySelector(

                            "#edit-investment-type"

                        ).value,

                    currentValue:

                        Number(

                            form.querySelector(

                                "#edit-investment-value"

                            ).value

                        )

                };

                InvestmentAPI

                .createInvestment(

                    updatedInvestment

                );

                this.render(

                    container,

                    onBack

                );

            }

        );

        const cancelButton =

            formContainer.querySelector(

                "#cancel-edit-investment-button"

            );

        cancelButton.addEventListener(

            "click",

            () => {

                formContainer.innerHTML = "";

            }

        );

    },

    // ==========================================

    // Delete Investment

    // ==========================================

    deleteInvestment(

        container,

        id,

        onBack

    ){

        const investments =

            InvestmentAPI

            .getInvestments();

        const investment =

            investments.find(

                item =>

                    item.id === id

            );

        if(!investment){

            throw new Error(

                "Investment not found: " +

                id

            );

        }

        const confirmed =

            window.confirm(

                t("confirmDelete") + ": " +

                (investment.name || t("unnamed")) +

                "?"

            );

        if(!confirmed){

            return;

        }

        InvestmentAPI

        .deleteInvestment(

            id

        );

        this.render(

            container,

            onBack

        );

    }

};

export default InvestmentView;
