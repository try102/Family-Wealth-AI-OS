/*

Family Wealth AI OS V7
Dashboard family-common split injector.
When Dashboard is filtered to a specific member, adds their share
of family-common (unassigned) assets/liabilities to the display.
Default 50/50, customizable via localStorage fw_family_split_v1.

*/

(function() {
    async function applySplit() {
        try {
            // Check if Dashboard is in single-member scope
            const scopeSelect = document.querySelector("section.dashboard select");
            if (!scopeSelect) return;
            
            const scopeId = scopeSelect.value;
            if (!scopeId || scopeId === "" || scopeId === "__shared__") return;
            
            // Get member stats with shared values
            const memberMod = await import("./modules/member/api/memberAPI.js?v=20261010da");
            const stats = memberMod.default.getMemberStats();
            const memberStat = stats.members.find(m => m.member && m.member.id === scopeId);
            
            if (!memberStat || !memberStat.combinedNetWorth) return;
            
            // Update the displayed values
            // Find the cards and replace with combined values
            const cards = document.querySelectorAll("section.dashboard .dashboard-card");
            cards.forEach(card => {
                const h3 = card.querySelector("h3");
                if (!h3) return;
                const title = h3.textContent;
                const valueDiv = card.querySelector(".value");
                if (!valueDiv || valueDiv.dataset.splitApplied) return;
                
                let newValue = null;
                if (title.includes("总资产") || title.includes("Total Assets")) {
                    newValue = memberStat.combinedTotalAssets;
                } else if (title.includes("净资产") || title.includes("Net Worth")) {
                    newValue = memberStat.combinedNetWorth;
                } else if (title.includes("总负债") || title.includes("Total Liabilities")) {
                    // Liabilities: own + shared
                    newValue = (memberStat.liabilitiesValue || 0) + (memberStat.sharedLiabilitiesValue || 0);
                }
                
                if (newValue !== null && !isNaN(newValue)) {
                    // Preserve currency display if active
                    const displayCurrency = (() => {
                        try { return localStorage.getItem("fw_display_currency_v1") || "USD"; }
                        catch (e) { return "USD"; }
                    })();
                    
                    if (displayCurrency === "USD") {
                        valueDiv.innerHTML = "$" + Number(newValue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                    } else {
                        // Let dashboardCurrency.js handle the conversion
                        // Just set the USD value, it will convert
                        valueDiv.innerHTML = "$" + Number(newValue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
                        valueDiv.dataset.usdValue = newValue;
                        delete valueDiv.dataset.dashconv;
                    }
                    valueDiv.dataset.splitApplied = "1";
                }
            });
        } catch (e) {
            console.warn("Dashboard split failed:", e);
        }
    }

    // Run after dashboard renders
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(applySplit, 2000);
            setTimeout(applySplit, 4000);
        });
    } else {
        setTimeout(applySplit, 2000);
        setTimeout(applySplit, 4000);
    }
    
    // Re-apply when scope changes
    document.addEventListener("change", (e) => {
        if (e.target && e.target.closest("section.dashboard") && e.target.tagName === "SELECT") {
            setTimeout(applySplit, 1000);
        }
    });
})();
