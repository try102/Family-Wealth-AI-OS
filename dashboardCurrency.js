/*

Family Wealth AI OS V7
Dashboard currency selector injector.
Injects the display currency dropdown into the dashboard header
without modifying the large app.js.

*/

(function() {
    function init() {
        // Find dashboard h2 - retry if not found
        const h2 = document.querySelector("section.dashboard h2");
        if (!h2) {
            setTimeout(init, 500);
            return;
        }
        if (document.querySelector("#dash-display-currency")) {
            return;
        }

        // Get current value
        let current = "USD";
        try {
            current = localStorage.getItem("fw_display_currency_v1") || "USD";
        } catch (e) {}

        // Create selector
        const label = document.createElement("label");
        label.style.cssText = "font-size:0.6em;font-weight:normal;margin-left:16px;";
        label.innerHTML = `显示币种: <select id="dash-display-currency">
            ${["USD","CNY","EUR","HKD","JPY","GBP"].map(c =>
                `<option value="${c}"${c===current?" selected":""}>${c}</option>`
            ).join("")}
        </select>`;

        h2.appendChild(label);

        // Wire change event
        label.querySelector("select").addEventListener("change", (e) => {
            try {
                localStorage.setItem("fw_display_currency_v1", e.target.value || "USD");
            } catch (err) {}
            location.reload();
        });
    }

    // Dashboard conversion: fetch FX rates and show converted totals
    async function doConversion() {
        try {
            let displayCurrency = "USD";
            try {
                displayCurrency = localStorage.getItem("fw_display_currency_v1") || "USD";
            } catch (e) {}
            if (displayCurrency === "USD") return;

            // Load FxService
            const fxMod = await import("./modules/core/services/fxService.js?v=20261012t");
            const rates = await fxMod.FxService.getRates();
            
            // Check if we have the rate
            if (!rates[displayCurrency]) return;

            const convertUSD = (usdAmount) =>
                fxMod.FxService.convert(usdAmount, "USD", displayCurrency, rates);
            const symbol = fxMod.FxService.getCurrencySymbol(displayCurrency);
            const fmt = (n) => n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

            // Find dashboard cards and replace with converted values
            // Total Assets
            const assetsCard = Array.from(document.querySelectorAll("section.dashboard .dashboard-card h3"))
                .find(h => h.textContent.includes("总资产") || h.textContent.includes("Total Assets"));
            if (assetsCard) {
                const valueDiv = assetsCard.parentElement.querySelector(".value");
                if (valueDiv && !valueDiv.dataset.converted) {
                    const text = valueDiv.textContent.replace(/[^0-9.-]/g, "");
                    const num = parseFloat(text);
                    if (!isNaN(num)) {
                        const converted = convertUSD(num);
                        if (converted !== null) {
                            valueDiv.dataset.converted = "1";
                            valueDiv.dataset.original = valueDiv.innerHTML;
                            valueDiv.innerHTML = `${symbol}${fmt(converted)} <small style="color:#888;">(${displayCurrency})</small>`;
                        }
                    }
                }
            }

            // Total Liabilities
            const liabCard = Array.from(document.querySelectorAll("section.dashboard .dashboard-card h3"))
                .find(h => h.textContent.includes("总负债") || h.textContent.includes("Total Liabilities"));
            if (liabCard) {
                const valueDiv = liabCard.parentElement.querySelector(".value");
                if (valueDiv && !valueDiv.dataset.converted) {
                    const text = valueDiv.textContent.replace(/[^0-9.-]/g, "");
                    const num = parseFloat(text);
                    if (!isNaN(num)) {
                        const converted = convertUSD(num);
                        if (converted !== null) {
                            valueDiv.dataset.converted = "1";
                            valueDiv.dataset.original = valueDiv.innerHTML;
                            valueDiv.innerHTML = `${symbol}${fmt(converted)} <small style="color:#888;">(${displayCurrency})</small>`;
                        }
                    }
                }
            }

            // Net Worth
            const nwCard = Array.from(document.querySelectorAll("section.dashboard .dashboard-card h3"))
                .find(h => h.textContent.includes("净资产") || h.textContent.includes("Net Worth"));
            if (nwCard) {
                const valueDiv = nwCard.parentElement.querySelector(".value");
                if (valueDiv && !valueDiv.dataset.converted) {
                    const text = valueDiv.textContent.replace(/[^0-9.-]/g, "");
                    const num = parseFloat(text);
                    if (!isNaN(num)) {
                        const converted = convertUSD(num);
                        if (converted !== null) {
                            valueDiv.dataset.converted = "1";
                            valueDiv.dataset.original = valueDiv.innerHTML;
                            valueDiv.innerHTML = `${symbol}${fmt(converted)} <small style="color:#888;">(${displayCurrency})</small>`;
                        }
                    }
                }
            }
        } catch (e) {
            console.warn("Dashboard FX conversion failed:", e);
        }
    }

    // Try now and on DOM changes
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(init, 500);
            setTimeout(doConversion, 1500);
        });
    } else {
        setTimeout(init, 500);
        setTimeout(doConversion, 1500);
    }
})();
