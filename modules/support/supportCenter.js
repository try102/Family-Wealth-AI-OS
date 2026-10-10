/*

Family Wealth AI OS V7

External Support Center

外部支持中心：官方资源 + 自定义链接（本机保存），

后续外部支持系统可在此接入。

*/

import { t } from "../../core/i18n/i18n.js?v=20261009bo";

export const SUPPORT_RESOURCES = {

    tax: [

        { id: "irs", url: "https://www.irs.gov" },

        { id: "irsFreeFile", url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free" },

        { id: "irsWithholding", url: "https://www.irs.gov/individuals/tax-withholding-estimator" },

        { id: "irsForms", url: "https://www.irs.gov/forms-instructions" },

        { id: "waDor", url: "https://dor.wa.gov" }

    ],

    retirement: [

        { id: "ssa", url: "https://www.ssa.gov" },

        { id: "ssaEstimator", url: "https://www.ssa.gov/benefits/retirement/" },

        { id: "ssaBenefits", url: "https://www.ssa.gov/benefits/" },

        { id: "medicare", url: "https://www.medicare.gov" },

        { id: "cfpb", url: "https://www.consumerfinance.gov" }

    ]

};

function storageKey(domain) {

    return `fw_support_links_${domain}`;

}

function readLinks(domain) {

    try {

        const raw =

            globalThis.localStorage

                ?.getItem(

                    storageKey(domain)

                );

        const parsed =

            raw

            ? JSON.parse(raw)

            : [];

        return Array.isArray(parsed)

            ? parsed

            : [];

    } catch (error) {

        return [];

    }

}

function writeLinks(domain, links) {

    try {

        globalThis.localStorage

            ?.setItem(

                storageKey(domain),

                JSON.stringify(links)

            );

    } catch (error) {

        // Storage unavailable: links will not persist.

    }

}

export function getCustomLinks(domain) {

    return readLinks(domain);

}

export function addCustomLink(domain, link) {

    const item = {

        id:

            "c" +

            Date.now().toString(36) +

            Math.random().toString(36).slice(2, 7),

        name:

            String(link?.name || "").trim(),

        url:

            String(link?.url || "").trim(),

        note:

            String(link?.note || "").trim()

    };

    if (item.name && item.url) {

        const links =

            readLinks(domain);

        links.push(item);

        writeLinks(domain, links);

    }

    return item;

}

export function removeCustomLink(domain, id) {

    const links =

        readLinks(domain)

        .filter(

            link => link.id !== id

        );

    writeLinks(domain, links);

    return links;

}

function esc(value) {

    return String(value ?? "")

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;");

}

export function renderSupportCenter(domain) {

    const titleKey =

        domain === "tax"

        ? "support.taxTitle"

        : "support.retireTitle";

    const resources =

        SUPPORT_RESOURCES[domain] || [];

    const custom =

        getCustomLinks(domain);

    const resourceItems =

        resources.map(

            resource => `

                <li>

                    <a href="${resource.url}" target="_blank" rel="noopener">${esc(t("support.res." + resource.id + ".name"))}</a>

                    — ${esc(t("support.res." + resource.id + ".desc"))}

                    （<a href="${resource.url}" target="_blank" rel="noopener">${t("support.open")}</a>）

                </li>

            `

        ).join("");

    const customItems =

        custom.length === 0

        ? `<p>${t("support.emptyCustom")}</p>`

        : `<ul>` +

            custom.map(

                link => `

                <li>

                    <a href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.name)}</a>

                    ${link.note ? "— " + esc(link.note) : ""}

                    <button

                        type="button"

                        class="support-link-delete"

                        data-link-id="${link.id}"

                    >${t("common.delete")}</button>

                </li>

            `

            ).join("") +

            `</ul>`;

    return `

    <section class="support-center">

        <h3>${t(titleKey)}</h3>

        <p>${t("support.subtitle")}</p>

        <h4>${t("support.official")}</h4>

        <ul>${resourceItems}</ul>

        <h4>${t("support.externalSystems")}</h4>

        <p>${t("support.externalNote")}</p>

        <h4>${t("support.custom")}</h4>

        ${customItems}

        <form class="support-link-form">

            <label>${t("support.linkName")}</label>

            <br>

            <input class="support-link-name" type="text">

            <br><br>

            <label>${t("support.linkUrl")}</label>

            <br>

            <input class="support-link-url" type="url" placeholder="https://">

            <br><br>

            <label>${t("support.linkNote")}</label>

            <br>

            <input class="support-link-note" type="text">

            <br><br>

            <button type="submit">${t("support.addLink")}</button>

        </form>

    </section>

    `;

}

export function bindSupportCenter(container, domain, onChange) {

    const root =

        container.querySelector(

            ".support-center"

        );

    if (!root) {

        return;

    }

    const notify = () => {

        if (

            typeof onChange ===

            "function"

        ) {

            onChange();

        }

    };

    const form =

        root.querySelector(

            ".support-link-form"

        );

    if (form) {

        form.addEventListener(

            "submit",

            event => {

                event.preventDefault();

                addCustomLink(domain, {

                    name:

                        root.querySelector(

                            ".support-link-name"

                        )?.value,

                    url:

                        root.querySelector(

                            ".support-link-url"

                        )?.value,

                    note:

                        root.querySelector(

                            ".support-link-note"

                        )?.value

                });

                notify();

            }

        );

    }

    root.querySelectorAll(

        ".support-link-delete"

    ).forEach(

        button =>

            button.addEventListener(

                "click",

                () => {

                    removeCustomLink(

                        domain,

                        button.getAttribute(

                            "data-link-id"

                        )

                    );

                    notify();

                }

            )

    );

}

export default {

    SUPPORT_RESOURCES,

    getCustomLinks,

    addCustomLink,

    removeCustomLink,

    renderSupportCenter,

    bindSupportCenter

};
