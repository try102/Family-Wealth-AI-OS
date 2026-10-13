/*

Family Wealth AI OS V7
Dashboard currency selector injector.
Injects the display currency dropdown into the dashboard header
without modifying the large app.js.

*/

(function() {
    function init() {
        // Find dashboard h2
        const h2 = document.querySelector("section.dashboard h2");
        if (!h2 || document.querySelector("#dash-display-currency")) {
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

    // Try now and on DOM changes
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => setTimeout(init, 500));
    } else {
        setTimeout(init, 500);
    }
})();
