/*

Family Wealth AI OS V7

Central FX service: real-time exchange rates via Tencent free API.
All rates are normalized to "units per USD" (e.g. USDCNY = 7.2 means
1 USD = 7.2 CNY). Rates are cached in memory for 5 minutes.

Supported currencies: USD, CNY, EUR, HKD, JPY, GBP.

Each transaction stores its fxRateToUSD at creation time for
historical accuracy. Display conversion uses stored USD values.

*/

const TENCENT_BASE = "https://qt.gtimg.cn/q=";
const CACHE_TTL_MS = 5 * 60 * 1000;

// Tencent codes for FX pairs
const FX_CODES = {
    USDCNY: "whUSDCNY",
    EURUSD: "whEURUSD",
    USDHKD: "whUSDHKD",
    USDJPY: "whUSDJPY",
    GBPUSD: "whGBPUSD"
};

let rateCache = null;
let cacheTime = 0;

function loadScript(url) {
    return new Promise((resolve, reject) => {
        if (typeof document === "undefined") {
            reject(new Error("no document"));
            return;
        }
        const script = document.createElement("script");
        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
        const timer = setTimeout(() => {
            cleanup();
            reject(new Error("FX request timed out"));
        }, 12000);
        script.onload = () => { cleanup(); resolve(); };
        script.onerror = () => { cleanup(); reject(new Error("FX load failed")); };
        script.src = url;
        document.head.appendChild(script);
    });
}

function parseRate(raw) {
    if (!raw || typeof raw !== "string") return 0;
    const parts = raw.split("~");
    const rate = Number(parts[3]);
    return rate > 0 ? rate : 0;
}

export const FxService = {

    // Returns { USD: 1, CNY: 7.2, EUR: 0.92, HKD: 7.8, JPY: 150, GBP: 0.79 }
    // All values = units per 1 USD
    async getRates() {
        const now = Date.now();
        if (rateCache && (now - cacheTime) < CACHE_TTL_MS) {
            return rateCache;
        }

        const rates = { USD: 1 };
        const codes = Object.values(FX_CODES);

        try {
            await loadScript(TENCENT_BASE + codes.join(","));

            const getRaw = (code) => {
                try {
                    const v = window[code];
                    delete window[code];
                    return v;
                } catch (e) { return null; }
            };

            // USDCNY: 1 USD = X CNY
            const usdcny = parseRate(getRaw(FX_CODES.USDCNY));
            if (usdcny > 0) rates.CNY = usdcny;

            // EURUSD: 1 EUR = X USD → invert to get USD per EUR... 
            // Actually we want CNY per USD style: units per USD
            // EURUSD = 1.08 means 1 EUR = 1.08 USD, so 1 USD = 1/1.08 EUR
            const eurusd = parseRate(getRaw(FX_CODES.EURUSD));
            if (eurusd > 0) rates.EUR = 1 / eurusd;

            // USDHKD: 1 USD = X HKD
            const usdhkd = parseRate(getRaw(FX_CODES.USDHKD));
            if (usdhkd > 0) rates.HKD = usdhkd;

            // USDJPY: 1 USD = X JPY
            const usdjpy = parseRate(getRaw(FX_CODES.USDJPY));
            if (usdjpy > 0) rates.JPY = usdjpy;

            // GBPUSD: 1 GBP = X USD → 1 USD = 1/X GBP
            const gbpusd = parseRate(getRaw(FX_CODES.GBPUSD));
            if (gbpusd > 0) rates.GBP = 1 / gbpusd;

        } catch (e) {
            // Tencent failed, try fallback API
        }

        // Fallback: open.er-api.com (CORS-friendly, no key)
        // Only if Tencent didn't give us CNY (the most important one)
        if (!rates.CNY) {
            try {
                const resp = await fetch("https://open.er-api.com/v6/latest/USD");
                const data = await resp.json();
                if (data && data.rates) {
                    // data.rates is { CNY: 7.2, EUR: 0.92, ... } = units per USD
                    // This matches our format directly!
                    ["CNY", "EUR", "HKD", "JPY", "GBP"].forEach(cur => {
                        if (data.rates[cur] > 0 && !rates[cur]) {
                            rates[cur] = data.rates[cur];
                        }
                    });
                }
            } catch (e) {
                // Fallback also failed
            }
        }

        if (Object.keys(rates).length > 1) {
            rateCache = rates;
            cacheTime = now;
        }

        return rates;
    },

    // Convert amount from one currency to another using rates
    // rates = output of getRates()
    // Returns null if conversion is not possible (missing rate)
    convert(amount, fromCurrency, toCurrency, rates) {
        const from = String(fromCurrency || "USD").toUpperCase();
        const to = String(toCurrency || "USD").toUpperCase();
        const amt = Number(amount || 0);
        if (from === to) return amt;
        if (!rates) return null;

        // Convert to USD first, then to target
        // Must have explicit rates for both currencies, no silent 1:1 fallback
        const fromRate = rates[from];
        const toRate = rates[to];
        if (!fromRate || !toRate) return null;

        const usdAmount = amt / fromRate;
        return usdAmount * toRate;
    },

    // Get the rate to convert 1 unit of currency to USD
    // (for storing with transactions)
    toUsdRate(currency, rates) {
        const cur = String(currency || "USD").toUpperCase();
        if (cur === "USD") return 1;
        const rate = rates && rates[cur];
        return rate ? 1 / rate : 1;
    },

    // Supported currency list
    getSupportedCurrencies() {
        return ["USD", "CNY", "EUR", "HKD", "JPY", "GBP"];
    },

    // Currency symbols for display
    getCurrencySymbol(currency) {
        const symbols = {
            USD: "$",
            CNY: "¥",
            EUR: "€",
            HKD: "HK$",
            JPY: "¥",
            GBP: "£"
        };
        return symbols[String(currency || "USD").toUpperCase()] || "$";
    },

    // Clear cache (for testing)
    clearCache() {
        rateCache = null;
        cacheTime = 0;
    }
};
