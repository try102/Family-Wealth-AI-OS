/*

Family Wealth AI OS V7

Retirement View

退休规划：当前净资产从系统基础数据汇总，参数可编辑，保存后重新测算。

*/

import RetirementAPI from "../api/retirementAPI.js?v=20261008ae";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261008ae";

import { renderSupportCenter, bindSupportCenter } from "../../support/supportCenter.js?v=20261008ae";

function money(value) {

    return "$" +

        Number(value || 0)

            .toLocaleString(

                undefined,

                {

                    maximumFractionDigits: 0

                }

            );

}

const RetirementView = {

    render(

        container,

        onBack

    ){

        const projection =

            RetirementAPI

            .getProjection();

        const profile =

            projection.profile;

        container.innerHTML = `

            <div class="retirement-center">

                <h2>

                    ${t("retire.title")}

                </h2>

                <button

                    id="retirement-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

                <br><br>

                <label>${t("common.language")}</label>

                <select id="retirement-language-select">${languageOptions(getLanguage())}</select>

                <hr>

                <section>

                    <h3>

                        ${t("retire.netWorthNow")}

                    </h3>

                    <p>

                        ${t("dash.netWorth")}：${money(projection.netWorth)}

                    </p>

                    <p>

                        ${t("retire.accountsPart")} ${money(projection.accountsTotal)}

                        ＋ ${t("retire.investmentsPart")} ${money(projection.investmentsTotal)}

                        ＋ ${t("retire.assetsPart")} ${money(projection.assetsTotal)}

                        － ${t("retire.liabilitiesPart")} ${money(projection.liabilitiesTotal)}

                    </p>

                </section>

                <section>

                    <h3>

                        ${t("retire.projection")}

                    </h3>

                    <p>

                        ${t("retire.yearsTo")} ${projection.yearsToRetirement} ${t("retire.yearsUnit")}，

                        ${t("retire.yearsIn")} ${projection.yearsInRetirement} ${t("retire.yearsUnit")}

                    </p>

                    <p>

                        ${t("retire.projected")}：${money(projection.projectedAssets)}

                    </p>

                    <p>

                        ${t("retire.required")}（${money(projection.annualExpenseUsed)} × ${projection.yearsInRetirement} ${t("retire.yearsUnit")}）：${money(projection.required)}

                    </p>

                    <p>

                        ${

                            projection.gap > 0

                            ?

                            t("retire.gap") + "：" + money(projection.gap)

                            :

                            t("retire.surplus") + "：" + money(-projection.gap)

                        }

                        （${t("retire.coverage")} ${(projection.fundedRatio * 100).toFixed(0)}%）

                    </p>

                    <p>

                        ${t("retire.recentExpense")}：${money(projection.recentAnnualExpense)}

                    </p>

                </section>

                <hr>

                <section>

                    <h3>

                        ${t("retire.profile")}

                    </h3>

                    <form id="retirement-profile-form">

                        <label>

                            ${t("retire.currentAge")}

                        </label>

                        <br>

                        <input

                            id="retire-current-age"

                            type="number"

                            min="0"

                            max="120"

                            value="${profile.currentAge}"

                        >

                        <br><br>

                        <label>

                            ${t("retire.retirementAge")}

                        </label>

                        <br>

                        <input

                            id="retire-at-age"

                            type="number"

                            min="0"

                            max="120"

                            value="${profile.retirementAge}"

                        >

                        <br><br>

                        <label>

                            ${t("retire.lifeExpectancy")}

                        </label>

                        <br>

                        <input

                            id="retire-life-expectancy"

                            type="number"

                            min="0"

                            max="130"

                            value="${profile.lifeExpectancy}"

                        >

                        <br><br>

                        <label>

                            ${t("retire.annualExpense")}

                        </label>

                        <br>

                        <input

                            id="retire-annual-expense"

                            type="number"

                            min="0"

                            step="0.01"

                            value="${profile.annualExpense || ""}"

                        >

                        <br><br>

                        <label>

                            ${t("retire.annualSavings")}

                        </label>

                        <br>

                        <input

                            id="retire-annual-savings"

                            type="number"

                            min="0"

                            step="0.01"

                            value="${profile.annualSavings || ""}"

                        >

                        <br><br>

                        <label>

                            ${t("retire.expectedReturn")}

                        </label>

                        <br>

                        <input

                            id="retire-expected-return"

                            type="number"

                            step="0.1"

                            value="${profile.expectedReturn}"

                        >

                        <br><br>

                        <button type="submit">

                            ${t("retire.saveRecalc")}

                        </button>

                    </form>

                </section>

                ${renderSupportCenter("retirement")}

            </div>

        `;

        const backButton =

            container.querySelector(

                "#retirement-back-button"

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

        const languageSelect =

            container.querySelector(

                "#retirement-language-select"

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

        bindSupportCenter(

            container,

            "retirement",

            () =>

                this.render(

                    container,

                    onBack

                )

        );

        const form =

            container.querySelector(

                "#retirement-profile-form"

            );

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                const numberOf = id =>

                    Number(

                        form.querySelector(id)

                            .value || 0

                    );

                RetirementAPI.saveProfile({

                    currentAge:

                        numberOf("#retire-current-age"),

                    retirementAge:

                        numberOf("#retire-at-age"),

                    lifeExpectancy:

                        numberOf("#retire-life-expectancy"),

                    annualExpense:

                        numberOf("#retire-annual-expense"),

                    annualSavings:

                        numberOf("#retire-annual-savings"),

                    expectedReturn:

                        numberOf("#retire-expected-return")

                });

                this.render(

                    container,

                    onBack

                );

            }

        );

    }

};

export default RetirementView;
