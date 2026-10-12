/*

Family Wealth AI OS V7

Shared currency UI helpers: dropdown HTML, display currency
setting, and amount formatting with conversion.

*/

import { FxService } from "./fxService.js";

const DISPLAY_CURRENCY_KEY = "fw_display_currency_v1";

export const CurrencyUI = {

    // Get/set the global display currency
    getDisplayCurrency() {
        try {
            return localStorage.getItem(DISPLAY_CURRENCY_KEY) || "USD";
        } catch (e) {
            return "USD";
        }
    },

    setDisplayCurrency(currency) {
        try {
            localStorage.setItem(
                DISPLAY_CURRENCY_KEY,
                String(currency || "USD").toUpperCase()
            );
        } catch (e) {}
    },

    // Generate <select> HTML for currency choice
    // id: element id, selected: current value, t: i18n function (optional)
    dropdownHTML(id, selected = "USD", t = null) {
        const currencies = FxService.getSupportedCurrencies();
        const sel = String(selected || "USD").toUpperCase();
        const label = t ? t("currency") || "Currency" : "Currency";
        return `
            <label>${label}:
                <select id="${id}">
                    ${currencies.map(c =>
                        `<option value="${c}" ${c === sel ? "selected" : ""}>${c}</option>`
                    ).join("")}
                </select>
            </label>`;
    },

    // Format amount with currency symbol
    // If convertTo and rates provided, converts first
    format(amount, currency = "USD", convertTo = null, rates = null) {
        let amt = Number(amount || 0);
        let cur = String(currency || "USD").toUpperCase();

        if (convertTo && rates && cur !== convertTo) {
            amt = FxService.convert(amt, cur, convertTo, rates);
            cur = convertTo;
        }

        const symbol = FxService.getCurrencySymbol(cur);
        return `${symbol}${amt.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    },

    // Get display currency selector HTML for page headers
    displaySelectorHTML(t = null) {
        const current = this.getDisplayCurrency();
        const label = t ? t("displayCurrency") || "Display" : "Display";
        return `
            <label style="margin-left:12px;">${label}:
                <select id="global-display-currency">
                    ${FxService.getSupportedCurrencies().map(c =>
                        `<option value="${c}" ${c === current ? "selected" : ""}>${c}</option>`
                    ).join("")}
                </select>
            </label>`;
    },

    // Wire up the display currency selector (call after render)
    wireDisplaySelector(container, onChange) {
        const sel = container.querySelector("#global-display-currency");
        if (sel) {
            sel.addEventListener("change", () => {
                this.setDisplayCurrency(sel.value);
                if (onChange) onChange(sel.value);
            });
        }
    },

    // Convert a list of records to display currency total.
    // Each record: { amount, currency, fxRateToUSD }
    // Returns { total, displayCurrency, breakdown: { USD: x, CNY: y, ... } }
    async convertRecordsToDisplay(records, amountField = "amount") {
        const displayCurrency = this.getDisplayCurrency();
        const rates = await FxService.getRates();

        let totalUSD = 0;
        const breakdown = {};

        (records || []).forEach(rec => {
            const amount = Number(rec[amountField] || 0);
            const currency = String(rec.currency || "USD").toUpperCase();
            const fxRate = Number(rec.fxRateToUSD || 0);

            // Track breakdown by original currency
            if (!breakdown[currency]) breakdown[currency] = 0;
            breakdown[currency] += amount;

            // Convert to USD using stored historical rate
            let usdAmount;
            if (fxRate > 0) {
                usdAmount = amount * fxRate;
            } else {
                // Fallback: use current rate
                usdAmount = FxService.convert(amount, currency, "USD", rates);
            }
            totalUSD += usdAmount;
        });

        // Convert USD total to display currency
        const total = FxService.convert(totalUSD, "USD", displayCurrency, rates);

        return { total, displayCurrency, breakdown, rates };
    }
};
