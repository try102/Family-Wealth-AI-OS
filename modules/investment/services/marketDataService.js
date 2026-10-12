/*

Family Wealth AI OS V7

Real-time market quotes via Tencent free quote API (no key required).

Supports:
  - A-share: 6-digit code, e.g. "600000" -> sh600000
  - US stocks: ticker letters, e.g. "AAPL" -> usAAPL
  - HK stocks: 5-digit code, e.g. "00700" -> hk00700

Pure frontend: loads https://qt.gtimg.cn/q=... through a <script>
tag, so it works on GitHub Pages with no backend and no CORS problem.
Batch requests are comma-separated in one URL. The API sets globals
like v_sh600000="1~name~code~price~..." (~ separated, price at [3]).

A-share quotes are in CNY; they are converted to USD with the Tencent
USDCNY forex quote so downstream USD-based math keeps working. The
original quote is kept on the returned entry for display.

*/

const TENCENT_BASE = "https://qt.gtimg.cn/q=";

const FETCH_TIMEOUT_MS = 12000;

function toTencentCode(symbol) {
    const s = String(symbol || "").trim();
    if (!s) {
        return null;
    }

    // A-share: 6 digits. 6/9 -> Shanghai, 0/2/3 -> Shenzhen, else Beijing.
    if (/^\d{6}$/.test(s)) {
        const head = s[0];
        if (head === "6" || head === "9") {
            return "sh" + s;
        }
        if (head === "0" || head === "2" || head === "3") {
            return "sz" + s;
        }
        return "bj" + s;
    }

    // HK: 5 digits, optional .HK suffix.
    const hk = s.toUpperCase().replace(/\.HK$/, "");
    if (/^\d{5}$/.test(hk)) {
        return "hk" + hk;
    }

    // US stock ticker: letters (allow . - for e.g. BRK.B).
    if (/^[A-Za-z][A-Za-z.\-^]*$/.test(s)) {
        return "us" + s.toUpperCase();
    }

    return null;
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        if (typeof document === "undefined") {
            reject(new Error("no document"));
            return;
        }
        const script = document.createElement("script");
        let done = false;
        const cleanup = () => {
            if (done) {
                return;
            }
            done = true;
            clearTimeout(timer);
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
        const timer = setTimeout(() => {
            cleanup();
            reject(new Error("quote request timed out"));
        }, FETCH_TIMEOUT_MS);
        script.onload = () => {
            cleanup();
            resolve();
        };
        script.onerror = () => {
            cleanup();
            reject(new Error("quote request failed"));
        };
        script.src = url;
        script.async = true;
        // The quote API returns GBK-ish text; charset keeps CJK names readable.
        script.charset = "GBK";
        document.head.appendChild(script);
    });
}

function globalKey(code) {
    return "v_" + code;
}

function readGlobal(code) {
    try {
        const key = globalKey(code);
        const raw =
            typeof window !== "undefined"
                ? window[key]
                : typeof globalThis !== "undefined"
                  ? globalThis[key]
                  : "";
        return typeof raw === "string" ? raw : "";
    } catch (error) {
        return "";
    }
}

function clearGlobal(code) {
    try {
        const key = globalKey(code);
        if (typeof window !== "undefined") {
            delete window[key];
        } else if (typeof globalThis !== "undefined") {
            delete globalThis[key];
        }
    } catch (error) {
        // ignore
    }
}

// Tencent: "type~name~code~price~prevClose~open~..." (~ separated, price at [3]).
// A-share/HK/US share this layout; currency differs.
function parseQuote(tencentCode, raw) {
    if (!raw) {
        return null;
    }
    const parts = raw.split("~");
    if (parts.length < 6) {
        return null;
    }
    const name = (parts[1] || "").trim();
    const price = Number(parts[3]);
    if (!(price > 0)) {
        return null;
    }
    const prevClose = Number(parts[4]) || 0;
    const changePct =
        prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;

    let currency = "CNY";
    if (tencentCode.indexOf("us") === 0) {
        currency = "USD";
    } else if (tencentCode.indexOf("hk") === 0) {
        currency = "HKD";
    }

    return { price, currency, name, changePct };
}

// Tencent forex whUSDCNY: "310~name~USDCNY~rate~..." -> rate at [3].
function parseFxRate(raw) {
    if (!raw) {
        return 0;
    }
    const parts = raw.split("~");
    const rate = Number(parts[3]);
    return rate > 5 && rate < 10 ? rate : 0;
}

async function fetchBatch(codes) {
    const list = codes.filter(Boolean);
    if (!list.length) {
        return {};
    }
    const url = TENCENT_BASE + list.join(",");
    await loadScript(url);
    const out = {};
    list.forEach(code => {
        const parsed = parseQuote(code, readGlobal(code));
        if (parsed) {
            out[code] = parsed;
        }
        clearGlobal(code);
    });
    return out;
}

export const MarketDataService = {
    toTencentCode,
    toSinaCode: toTencentCode,

    parseQuote,

    // Returns: { SYMBOL: { price, usdPrice, currency, name, changePct, fetchedAt } }
    // price = quote-currency price, usdPrice = converted to USD when needed.
    async fetchQuotes(symbols) {        const list = (Array.isArray(symbols) ? symbols : [symbols])
            .map(s => String(s || "").trim().toUpperCase())
            .filter(Boolean);
        if (!list.length) {
            return {};
        }

        const codeBySymbol = {};
        list.forEach(sym => {
            const code = toTencentCode(sym);
            if (code) {
                codeBySymbol[sym] = code;
            }
        });
        const codes = Object.values(codeBySymbol);
        if (!codes.length) {
            return {};
        }

        const quotes = await fetchBatch(codes);

        // Fetch USDCNY once when any CNY quote needs USD conversion.
        let fxRate = 0;
        const needFx = codes.some(
            c =>
                c.indexOf("sh") === 0 ||
                c.indexOf("sz") === 0 ||
                c.indexOf("bj") === 0
        );
        if (needFx) {
            try {
                await loadScript(TENCENT_BASE + "whUSDCNY");
                fxRate = parseFxRate(readGlobal("whUSDCNY"));
            } catch (error) {
                fxRate = 0;
            }
            clearGlobal("whUSDCNY");
        }

        const out = {};
        Object.keys(codeBySymbol).forEach(sym => {
            const code = codeBySymbol[sym];
            const q = quotes[code];
            if (!q) {
                return;
            }
            let usdPrice = q.price;
            let fxApplied = false;
            if (q.currency === "CNY" && fxRate > 0) {
                usdPrice = q.price / fxRate;
                fxApplied = true;
            }
            out[sym] = {
                price: q.price,
                usdPrice,
                currency: q.currency,
                fxApplied,
                fxRate: fxApplied ? fxRate : 0,
                name: q.name,
                changePct: q.changePct || 0,
                fetchedAt: Date.now()
            };
        });
        return out;
    },

    // Fetch historical daily closes via Tencent qfq (forward-adjusted).
    // Returns: [{ date, close }] or [] on failure. Pure frontend via script tag.
    async fetchHistoricalCloses(symbol) {
        const sym = String(symbol || "").trim().toUpperCase();
        if (!sym) {
            return [];
        }
        const code = toTencentCode(sym);
        if (!code) {
            return [];
        }
        // qfq_ prefix = forward-adjusted historical K-line
        const qfqCode = "qfq_" + code;
        try {
            await loadScript(TENCENT_BASE + qfqCode);
            const raw = readGlobal(qfqCode);
            clearGlobal(qfqCode);
            if (!raw || typeof raw !== "string") {
                return [];
            }
            // Format: "date,open,close,high,low,volume\n..."
            // Actually qfq returns: date, open, close, high, low, volume separated
            const lines = raw.trim().split("\n");
            const closes = [];
            for (const line of lines) {
                const parts = line.trim().split(",");
                if (parts.length >= 3) {
                    const date = parts[0].trim();
                    const close = parseFloat(parts[2]);
                    if (date && !isNaN(close) && close > 0) {
                        closes.push({ date, close });
                    }
                }
            }
            return closes;
        } catch (error) {
            return [];
        }
    },

    // Simple moving average of closes
    sma(closes, period) {
        if (!closes || closes.length < period) {
            return 0;
        }
        const slice = closes.slice(-period);
        const sum = slice.reduce((s, c) => s + c.close, 0);
        return sum / period;
    }
};
