/*

Family Wealth AI OS V7
Dashboard currency selector injector. (stamp 20261012x)
Injects the display currency dropdown into the dashboard header
without modifying the large app.js, and converts dashboard amounts
to the selected display currency.

Root-cause note (2026-10-12): the previous version parsed
valueDiv.textContent, which included the child span
#dash-assets-converted filled by app.js ("$5,718,493" +
"¥38,347,182.92 (CNY)" -> digits concatenated into 571849338347182.92,
x6.70582 -> quadrillions). This version only reads DIRECT text nodes,
so child spans can never pollute the parse. Verified: the exact
mechanism reproduced all three reported wrong numbers to the cent.

*/

(function() {
    // Idempotent: safe to call after every re-render (e.g. 范围 switch).
    function ensureSelector() {
        // Find dashboard h2
        var h2 = document.querySelector("section.dashboard h2");
        if (!h2) return false;
        if (document.querySelector("#dash-display-currency")) return true;

        // Get current value
        var current = "USD";
        try {
            current = localStorage.getItem("fw_display_currency_v1") || "USD";
        } catch (e) {}

        // Create selector
        var label = document.createElement("label");
        label.style.cssText = "font-size:0.6em;font-weight:normal;margin-left:16px;";
        label.innerHTML = "显示币种: <select id=\"dash-display-currency\">" +
            ["USD","CNY","EUR","HKD","JPY","GBP"].map(function(c) {
                return "<option value=\"" + c + "\"" + (c === current ? " selected" : "") + ">" + c + "</option>";
            }).join("") +
            "</select>";

        h2.appendChild(label);

        // Wire change event
        label.querySelector("select").addEventListener("change", function(e) {
            try {
                localStorage.setItem("fw_display_currency_v1", e.target.value || "USD");
            } catch (err) {}
            location.reload();
        });
        return true;
    }

    function init() {
        // Retry until the dashboard header exists
        if (!ensureSelector()) setTimeout(init, 500);
    }

    // Concatenate only DIRECT text-node children (nodeType 3).
    // Child elements (<br>, #dash-*-converted spans, etc.) are ignored,
    // so an already-appended conversion line can never be re-parsed.
    function directText(el) {
        var t = "";
        for (var i = 0; i < el.childNodes.length; i++) {
            var n = el.childNodes[i];
            if (n.nodeType === 3) t += n.textContent;
        }
        return t;
    }

    // Parse "$5,718,493" / "-$17,000" -> number. Returns null if not an amount.
    function parseUSD(raw) {
        if (!/[$¥€£]/.test(raw)) return null; // score/count cards have bare numbers
        var neg = /-\s*[$¥€£]/.test(raw);
        var num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
        if (isNaN(num)) return null;
        return neg ? -num : num;
    }

    function escapeHtml(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Dashboard conversion: fetch FX rates and convert amounts.
    // Marker data-dashconv guards re-entry (own DOM writes, observer re-fires).
    async function doConversion() {
        try {
            var displayCurrency = "USD";
            try {
                displayCurrency = localStorage.getItem("fw_display_currency_v1") || "USD";
            } catch (e) {}
            if (displayCurrency === "USD") return;

            var fxMod = await import("./modules/core/services/fxService.js?v=20261012t");
            var rates = await fxMod.FxService.getRates();
            if (!rates || !rates[displayCurrency]) return;

            var convertUSD = function(usdAmount) {
                return fxMod.FxService.convert(usdAmount, "USD", displayCurrency, rates);
            };
            var symbol = fxMod.FxService.getCurrencySymbol(displayCurrency);
            var fmt = function(n) {
                return n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
            };
            var renderConv = function(usd) {
                var c = convertUSD(usd);
                if (c === null || isNaN(c)) return null;
                // Sanity: rate error guard (abs — negatives like -$17,000 must pass)
                if (Math.abs(c) > Math.abs(usd) * 1000) return null;
                return symbol + fmt(c) + " <small style=\"color:#888;\">(" + displayCurrency + ")</small>";
            };

            // ---- 1. All dashboard amount cards ----
            // A card is an amount card iff its .value direct text carries a
            // currency symbol; score/count cards ("50", "7") are skipped
            // automatically, in every language.
            var cards = document.querySelectorAll("section.dashboard .dashboard-card");
            for (var i = 0; i < cards.length; i++) {
                var valueDiv = cards[i].querySelector(".value");
                if (!valueDiv || valueDiv.dataset.dashconv) continue;
                var usdValue = parseUSD(directText(valueDiv));
                if (usdValue === null) { valueDiv.dataset.dashconv = "1"; continue; }
                var html = renderConv(usdValue);
                if (html === null) { valueDiv.dataset.dashconv = "1"; continue; }
                valueDiv.innerHTML = html;
                valueDiv.dataset.dashconv = "1";
            }

            // ---- 2. 备注行：生活总流出 = 日常支出 $x + 本金偿还 $y = $z ----
            // Amounts always appear in expense/principal/total order in all
            // languages; each match is converted in place, order-independent.
            var paras = document.querySelectorAll("section.dashboard p");
            for (var j = 0; j < paras.length; j++) {
                var p = paras[j];
                if (p.dataset.dashconv) continue;
                if (!/生活总流出|living outflow|生活流出合計/.test(p.textContent)) continue;
                var re = /-?\$[\d,]+(?:\.\d{1,2})?/g;
                if (!re.test(p.textContent)) { p.dataset.dashconv = "1"; continue; }
                re.lastIndex = 0;
                p.innerHTML = escapeHtml(p.textContent).replace(re, function(match) {
                    var u = parseUSD(match);
                    if (u === null) return match;
                    var h = renderConv(u);
                    return h === null ? match : h;
                });
                p.dataset.dashconv = "1";
            }

            // ---- 3. 资产配置 section: first <p> of each module-card is the amount ----
            var allocTitles = ["资产配置", "資產配置", "Asset Allocation", "資産配分"];
            var sections = document.querySelectorAll("section.modules");
            for (var k = 0; k < sections.length; k++) {
                var h2 = sections[k].querySelector("h2");
                if (!h2) continue;
                var isAlloc = allocTitles.some(function(t) { return h2.textContent.indexOf(t) !== -1; });
                if (!isAlloc) continue;
                var mcards = sections[k].querySelectorAll(".module-card");
                for (var m = 0; m < mcards.length; m++) {
                    var amountP = mcards[m].querySelector("p");
                    if (!amountP || amountP.dataset.dashconv) continue;
                    var au = parseUSD(directText(amountP));
                    if (au === null) { amountP.dataset.dashconv = "1"; continue; }
                    var ah = renderConv(au);
                    if (ah === null) { amountP.dataset.dashconv = "1"; continue; }
                    amountP.innerHTML = ah;
                    amountP.dataset.dashconv = "1";
                }
            }
        } catch (e) {
            console.warn("Dashboard FX conversion failed:", e);
        }
    }

    // Re-run after dashboard re-renders (e.g. 范围 switch calls start()).
    // Debounced; data-dashconv markers make re-runs no-ops.
    var convTimer = 0;
    function scheduleConversion() {
        if (convTimer) clearTimeout(convTimer);
        convTimer = setTimeout(function() {
            convTimer = 0;
            ensureSelector(); // start() re-renders wipe the injected dropdown
            doConversion();
        }, 800);
    }

    function boot() {
        setTimeout(init, 500);
        setTimeout(function() {
            doConversion();
            try {
                var app = document.getElementById("app") || document.body;
                if (window.MutationObserver && app) {
                    var mo = new MutationObserver(function() { scheduleConversion(); });
                    mo.observe(app, {childList: true, subtree: true});
                }
            } catch (e) {}
        }, 1500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
