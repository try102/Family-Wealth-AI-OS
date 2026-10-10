/*

Family Wealth AI OS V7

Member View

家庭成员中心：成员档案管理 + 分成员统计 + 自动合并家庭总计。

*/

import MemberAPI from "../api/memberAPI.js?v=20261008ap";

import { t, getLanguage, setLanguage, languageOptions } from "../../../core/i18n/i18n.js?v=20261009by";

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

function reportHTML(report) {

    const cell =

        "padding:6px;border:1px solid #ccc;";

    const title =

        report.subject.type === "family"

        ? t("member.familyReport")

        : `${report.subject.name} · ${t("member.reportFor")}`;

    const memberShare =

        report.subject.type === "family" &&

        report.memberBreakdown.length

        ? `

                <h4>${t("member.memberShare")}</h4>

                <table style="border-collapse:collapse;">

                    <tr>

                        <th style="${cell}">${t("member.colMember")}</th>

                        <th style="${cell}">${t("member.income")}</th>

                        <th style="${cell}">${t("member.netWorth")}</th>

                    </tr>

                    ${

                        report.memberBreakdown.map(

                            item => `

                    <tr>

                        <td style="${cell}">${item.name}</td>

                        <td style="${cell}">${money(item.income)}</td>

                        <td style="${cell}">${money(item.netWorth)}</td>

                    </tr>

                            `

                        ).join("")

                    }

                </table>

            `

        : "";

    return `

        <div style="border:1px solid #ddd;border-radius:8px;padding:14px;margin-top:12px;">

            <h3>${title}</h3>

            <p><small>${t("member.generatedAt")}：${new Date().toLocaleString()}</small></p>

            <h4>${t("member.cashflowTitle")}</h4>

            <p>

                ${t("member.income")}：${money(report.income)}<br>

                ${t("member.expense")}：${money(report.expense)}<br>

                ${t("member.netFlow")}：${money(report.netFlow)}<br>

                ${t("member.savingsRate")}：${Number(report.savingsRate || 0).toFixed(1)}%

            </p>

            <h4>${t("member.balanceTitle")}</h4>

            <p>

                ${t("member.accounts")}：${money(report.accountsValue)}<br>

                ${t("member.investments")}：${money(report.investmentsValue)}<br>

                ${t("member.assets")}：${money(report.assetsValue)}<br>

                ${t("member.totalAssets")}：${money(report.totalAssets)}<br>

                ${t("member.liabilities")}：${money(report.liabilitiesValue)}<br>

                ${t("member.netWorth")}：${money(report.netWorth)}<br>

                ${t("member.debtRatio")}：${Number(report.debtRatio || 0).toFixed(1)}%

            </p>

            <h4>${t("member.taxTitle", { year: report.year })}</h4>

            <p>

                ${t("member.wage")}：${money(report.tax.wage)}<br>

                ${t("member.dividends")}：${money(report.tax.dividends)}<br>

                ${t("member.interest")}：${money(report.tax.interest)}<br>

                ${t("member.gains")}：${money(report.tax.capitalGains)}<br>

                ${t("member.mortgageInterest")}：${money(report.tax.mortgageInterest)}<br>

                ${t("member.taxPaid")}：${money(report.tax.taxPaid)}<br>

                ${t("member.totalIncome")}：${money(report.tax.totalIncome)}

            </p>

            ${memberShare}

        </div>

    `;

}

const MemberView = {

    render(container, onBack) {

        const stats =

            MemberAPI.getMemberStats();

        const members =

            MemberAPI.getMembers();

        const cell =

            "padding:6px;border:1px solid #ccc;";

        const rowFor = (label, stat, bold) => `

            <tr${bold ? ' style="font-weight:bold;"' : ""}>

                <td style="${cell}">${label}</td>

                <td style="${cell}">${money(stat.income)}</td>

                <td style="${cell}">${money(stat.expense)}</td>

                <td style="${cell}">${money(stat.netFlow)}</td>

                <td style="${cell}">${money(stat.accountsValue)}</td>

                <td style="${cell}">${money(stat.investmentsValue)}</td>

                <td style="${cell}">${money(stat.assetsValue)}</td>

                <td style="${cell}">${money(stat.totalAssets)}</td>

                <td style="${cell}">${money(stat.liabilitiesValue)}</td>

                <td style="${cell}">${money(stat.netWorth)}</td>

            </tr>

        `;

        container.innerHTML = `

            <div>

                <h2>

                    ${t("member.title")}

                </h2>

                <label>

                    ${t("common.language")}

                </label>

                <select id="member-language-select">

                    ${languageOptions(getLanguage())}

                </select>

                <br><br>

                <button

                    id="member-back-button"

                    type="button"

                >

                    ${t("common.back")}

                </button>

                <hr>

                <section>

                    <h3>

                        ${t("member.statsTitle")}

                    </h3>

                    <table style="border-collapse:collapse;">

                        <tr>

                            <th style="${cell}">${t("member.colMember")}</th>

                            <th style="${cell}">${t("member.income")}</th>

                            <th style="${cell}">${t("member.expense")}</th>

                            <th style="${cell}">${t("member.netFlow")}</th>

                            <th style="${cell}">${t("member.accounts")}</th>

                            <th style="${cell}">${t("member.investments")}</th>

                            <th style="${cell}">${t("member.assets")}</th>

                            <th style="${cell}">${t("member.totalAssets")}</th>

                            <th style="${cell}">${t("member.liabilities")}</th>

                            <th style="${cell}">${t("member.netWorth")}</th>

                        </tr>

                        ${

                            stats.members.map(

                                stat =>

                                    rowFor(

                                        stat.member.name || stat.member.id,

                                        stat

                                    )

                            ).join("")

                        }

                        ${rowFor(t("member.unassigned"), stats.unassigned)}

                        ${rowFor(t("member.familyTotal"), stats.family, true)}

                    </table>

                    <p>

                        <small>${t("member.statsNote")}</small>

                    </p>

                </section>

                <hr>

                <section>

                    <h3>

                        ${t("member.reportTitle")}

                    </h3>

                    <label>

                        ${t("member.reportScope")}

                    </label>

                    <select id="member-report-scope">

                        <option value="">${t("member.familyReport")}</option>

                        ${

                            members.map(

                                member => `<option value="${member.id}">${member.name || member.id}</option>`

                            ).join("")

                        }

                    </select>

                    <button

                        id="member-report-button"

                        type="button"

                    >

                        ${t("member.generate")}

                    </button>

                    <button

                        id="member-report-print"

                        type="button"

                    >

                        ${t("member.print")}

                    </button>

                    <div id="member-report-panel"></div>

                </section>

                <hr>

                <section>

                    <h3>

                        ${t("member.membersTitle")}

                    </h3>

                    ${

                        members.length === 0

                        ?

                        `<p>${t("member.emptyMembers")}</p>`

                        :

                        `<ul>${

                            members.map(

                                member => `

                                <li>

                                    ${member.name}${member.relation ? `（${member.relation}）` : ""}${member.note ? ` — ${member.note}` : ""}

                                    <button type="button" class="member-delete-button" data-id="${member.id}">${t("common.delete")}</button>

                                </li>

                                `

                            ).join("")

                        }</ul>`

                    }

                    <form id="member-add-form">

                        <div>

                            <label>${t("member.name")}</label>

                            <input id="member-name" type="text" required>

                        </div>

                        <div>

                            <label>${t("member.relation")}</label>

                            <input id="member-relation" type="text" placeholder="${t("member.relationHint")}">

                        </div>

                        <div>

                            <label>${t("member.note")}</label>

                            <input id="member-note" type="text">

                        </div>

                        <br>

                        <button type="submit">

                            ${t("member.addMember")}

                        </button>

                    </form>

                </section>

            </div>

        `;

        const backButton =

            container.querySelector(

                "#member-back-button"

            );

        if (

            backButton &&

            typeof onBack === "function"

        ) {

            backButton.addEventListener(

                "click",

                onBack

            );

        }

        const languageSelect =

            container.querySelector(

                "#member-language-select"

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

        container.querySelectorAll(

            ".member-delete-button"

        ).forEach(

            button =>

                button.addEventListener(

                    "click",

                    () => {

                        MemberAPI.deleteMember(

                            button.dataset.id

                        );

                        this.render(

                            container,

                            onBack

                        );

                    }

                )

        );

        const reportButton =

            container.querySelector(

                "#member-report-button"

            );

        const reportPanel =

            container.querySelector(

                "#member-report-panel"

            );

        if (

            reportButton &&

            reportPanel

        ) {

            reportButton.addEventListener(

                "click",

                () => {

                    const scope =

                        container.querySelector(

                            "#member-report-scope"

                        )?.value || "";

                    reportPanel.innerHTML =

                        reportHTML(

                            MemberAPI.getReport(scope)

                        );

                }

            );

        }

        const printButton =

            container.querySelector(

                "#member-report-print"

            );

        if (printButton) {

            printButton.addEventListener(

                "click",

                () => {

                    window.print();

                }

            );

        }

        const form =

            container.querySelector(

                "#member-add-form"

            );

        if (form) {

            form.addEventListener(

                "submit",

                event => {

                    event.preventDefault();

                    const name =

                        document.getElementById("member-name")?.value?.trim();

                    if (!name) {

                        return;

                    }

                    MemberAPI.saveMember({

                        name,

                        relation:

                            document.getElementById("member-relation")?.value || "",

                        note:

                            document.getElementById("member-note")?.value || ""

                    });

                    this.render(

                        container,

                        onBack

                    );

                }

            );

        }

    }

};

export default MemberView;
