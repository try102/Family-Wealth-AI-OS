/*

Family Wealth AI OS V7

Retirement View

退休规划：当前净资产从系统基础数据汇总，参数可编辑，保存后重新测算。

*/

import RetirementAPI from "../api/retirementAPI.js";

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

                    🏖️ Retirement Center

                </h2>

                <button

                    id="retirement-back-button"

                    type="button"

                >

                    ← Back to Dashboard

                </button>

                <hr>

                <section>

                    <h3>

                        当前净资产（系统汇总）

                    </h3>

                    <p>

                        Net Worth：${money(projection.netWorth)}

                    </p>

                    <p>

                        账户 ${money(projection.accountsTotal)}

                        ＋ 投资 ${money(projection.investmentsTotal)}

                        ＋ 资产 ${money(projection.assetsTotal)}

                        － 负债 ${money(projection.liabilitiesTotal)}

                    </p>

                </section>

                <section>

                    <h3>

                        退休测算

                    </h3>

                    <p>

                        距退休 ${projection.yearsToRetirement} 年，

                        退休期 ${projection.yearsInRetirement} 年

                    </p>

                    <p>

                        退休时预计资产：${money(projection.projectedAssets)}

                    </p>

                    <p>

                        退休总需求（年支出 ${money(projection.annualExpenseUsed)} × ${projection.yearsInRetirement} 年）：${money(projection.required)}

                    </p>

                    <p>

                        ${

                            projection.gap > 0

                            ?

                            "还差：" + money(projection.gap)

                            :

                            "已覆盖，富余：" + money(-projection.gap)

                        }

                        （覆盖率 ${(projection.fundedRatio * 100).toFixed(0)}%）

                    </p>

                    <p>

                        最近 12 个月支出（Expense 模块）：${money(projection.recentAnnualExpense)}

                    </p>

                </section>

                <hr>

                <section>

                    <h3>

                        规划参数

                    </h3>

                    <form id="retirement-profile-form">

                        <label>

                            Current Age 现在年龄

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

                            Retirement Age 退休年龄

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

                            Life Expectancy 预期寿命

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

                            Annual Expense 退休后年支出（留 0 则用最近 12 个月支出）

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

                            Annual Savings 退休前每年储蓄

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

                            Expected Return 预期年回报 %

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

                            Save & Recalculate 保存并重算

                        </button>

                    </form>

                </section>

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
