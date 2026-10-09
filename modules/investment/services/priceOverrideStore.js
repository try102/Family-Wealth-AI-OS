/*

Family Wealth AI OS V7

Manual / imported current-price overrides, keyed by symbol.

A position's market value uses the override price when one is set,
otherwise the latest trade price. New trades clear the override for
that symbol (the executed trade price is fresher).

*/

const STORAGE_KEY =

    "fw_price_overrides_v1";

function normalizeSymbol(

    symbol

) {

    return String(

        symbol || ""

    )

        .trim()

        .toUpperCase();

}

function readAll() {

    try {

        const raw =

            globalThis.localStorage

                ?.getItem(

                    STORAGE_KEY

                );

        const parsed =

            raw

                ? JSON.parse(raw)

                : {};

        return parsed &&

            typeof parsed === "object"

            ? parsed

            : {};

    }

    catch (error) {

        return {};

    }

}

function writeAll(

    all

) {

    try {

        globalThis.localStorage

            ?.setItem(

                STORAGE_KEY,

                JSON.stringify(all)

            );

    }

    catch (error) {

    }

}

export const PriceOverrideStore = {

    get(

        symbol

    ) {

        const entry =

            readAll()[

                normalizeSymbol(symbol)

            ];

        const price =

            entry

                ? Number(entry.price || 0)

                : 0;

        return price > 0

            ? price

            : 0;

    },

    getEntry(

        symbol

    ) {

        return readAll()[

            normalizeSymbol(symbol)

        ] || null;

    },

    set(

        symbol,

        price,

        source = "manual"

    ) {

        const key =

            normalizeSymbol(symbol);

        const value =

            Number(price || 0);

        if (!key || !(value > 0)) {

            return false;

        }

        const all =

            readAll();

        all[key] = {

            price: value,

            source,

            updatedAt: Date.now()

        };

        writeAll(all);

        return true;

    },

    clear(

        symbol

    ) {

        const key =

            normalizeSymbol(symbol);

        const all =

            readAll();

        if (key in all) {

            delete all[key];

            writeAll(all);

        }

    },

    all() {

        return readAll();

    }

};

export default PriceOverrideStore;
