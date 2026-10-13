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
    // Idempotent: safe to run multiple times
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

            function convertCard(cardTitle) {
                const card = Array.from(document.querySelectorAll("section.dashboard .dashboard-card h3"))
                    .find(h => h.textContent.includes(cardTitle));
                if (!card) return;
                const valueDiv = card.parentElement.querySelector(".value");
                if (!valueDiv) return;

                // Get original USD value (stored on first run, or parse fresh)
                let usdValue;
                if (valueDiv.dataset.usdValue) {
                    usdValue = parseFloat(valueDiv.dataset.usdValue);
                } else {
                    // Parse only the original text (before any conversion)
                    // Remove any existing conversion span first
                    const clone = valueDiv.cloneNode(true);
                    const existing = clone.querySelector(".dash-conv-replaced");
                    if (existing) existing.remove();
                    const text = clone.textContent.replace(/[^0-9.-]/g, "");
                    usdValue = parseFloat(text);
                    if (isNaN(usdValue)) return;
                    valueDiv.dataset.usdValue = usdValue;
                }

                const converted = convertUSD(usdValue);
                if (converted === null || isNaN(converted)) return;

                // Sanity check: converted value should be within reasonable bounds
                // (USD 5M -> CNY should be ~33M, not quadrillions)
                if (converted > usdValue * 1000 || converted < usdValue / 1000) {
                    console.warn("FX conversion sanity check failed, skipping");
                    return;
                }

                valueDiv.innerHTML = `${symbol}${fmt(converted)} <small style="color:#888;">(${displayCurrency})</small>`;
            }

            convertCard("总资产");
            convertCard("Total Assets");
            convertCard("总负债");
            convertCard("Total Liabilities");
            convertCard("净资产");
            convertCard("Net Worth");
            convertCard("收入");
            convertCard("Income");
            convertCard("日常支出");
            convertCard("Expenses");
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
