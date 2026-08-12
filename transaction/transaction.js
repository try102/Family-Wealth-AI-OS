/**

 * Family Wealth AI OS V7

 * Transaction Model

 *

 * Responsibility:

 * - Define the system-level Transaction structure

 * - Store one real-world economic event

 * - Store Financial Lines

 * - Store Business Details

 * - Validate and normalize Transaction data

 *

 * Transaction is the system's actual-event record.

 *

 * Transaction does NOT perform:

 * - Account balance calculation

 * - Investment calculations

 * - Cost basis calculation

 * - Capital gain calculation

 * - Liability calculations

 * - Tax calculations

 * - Cash Flow calculations

 *

 * Relationship:

 *

 * Account

 *    ↓

 * accountId

 *    ↓

 * Transaction

 *    ├── Financial Lines

 *    └── Business Details

 *

 * Business Details may contain:

 * - Investment

 * - Liability

 * - Income

 * - Expense

 * - Asset

 * - Tax

 * - Interest

 *

 * IMPORTANT:

 * One Transaction represents one economic event.

 *

 * One actual account cash movement is represented by

 * one Financial Line.

 */

class Transaction {

    constructor(data = {}) {

        this.id =

            data.id ||

            Transaction.generateId();

        this.date =

            data.date ||

            new Date().toISOString();

        this.type =

            data.type ||

            "";

        this.status =

            data.status ||

            "Posted";

        this.currency =

            data.currency ||

            "USD";

        this.description =

            data.description ||

            "";

        /*

         * Identifies how the Transaction entered

         * the system.

         */

        this.source =

            data.source ||

            "Manual";

        /*

         * External transaction identifier.

         *

         * Used primarily for:

         * - Import

         * - Synchronization

         * - Duplicate detection

         */

        this.externalId =

            data.externalId ||

            "";

        /*

         * Financial Lines represent actual

         * account-level financial movement.

         */

        this.lines =

            Array.isArray(data.lines)

                ? data.lines.map(

                    line =>

                        Transaction.normalizeLine(line)

                )

                : [];

        /*

         * Business Details describe what the

         * transaction means from a business

         * perspective.

         *

         * These are not account movements.

         */

        this.businessDetails =

            data.businessDetails &&

            typeof data.businessDetails === "object"

                ? Transaction.normalizeBusinessDetails(

                    data.businessDetails

                )

                : {};

        this.createdAt =

            data.createdAt ||

            new Date().toISOString();

        this.updatedAt =

            data.updatedAt ||

            new Date().toISOString();

    }

    /**

     * Generate a stable unique Transaction ID.

     */

    static generateId() {

        return (

            "txn_" +

            Date.now().toString(36) +

            "_" +

            Math.random()

                .toString(36)

                .substring(2, 8)

        );

    }

    /**

     * Supported Transaction Types.

     */

    static getTransactionTypes() {

        return [

            "INCOME",

            "EXPENSE",

            "TRANSFER",

            "INVESTMENT_BUY",

            "INVESTMENT_SELL",

            "DIVIDEND",

            "INTEREST",

            "LOAN_PAYMENT",

            "ASSET_PURCHASE",

            "ASSET_SALE",

            "TAX_PAYMENT",

            "FEE",

            "OTHER"

        ];

    }

    /**

     * Supported Transaction Status values.

     */

    static getStatuses() {

        return [

            "Pending",

            "Posted",

            "Voided"

        ];

    }

    /**

     * Supported Transaction Sources.

     */

    static getSources() {

        return [

            "Manual",

            "BusinessModule",

            "BankImport",

            "BrokerImport",

            "API",

            "Migration"

        ];

    }

    /**

     * Supported Financial Line Types.

     */

    static getLineTypes() {

        return [

            "INCOME",

            "EXPENSE",

            "TRANSFER",

            "PROCEEDS",

            "FEE",

            "TAX",

            "OTHER"

        ];

    }

    /**

     * Supported Line Directions.

     */

    static getDirections() {

        return [

            "IN",

            "OUT"

        ];

    }

    /**

     * Normalize one Financial Line.

     *

     * Financial Lines remain simple.

     *

     * Business-specific calculations such as:

     * - principal

     * - interest

     * - cost basis

     * - capital gain

     *

     * do NOT belong here.

     */

    static normalizeLine(line = {}) {

        return {

            id:

                line.id ||

                Transaction.generateLineId(),

            accountId:

                line.accountId ||

                "",

            type:

                line.type ||

                "OTHER",

            amount:

                typeof line.amount === "number"

                    ? line.amount

                    : Number(line.amount || 0),

            direction:

                line.direction ||

                "OUT",

            cashEffect:

                line.cashEffect !== false,

            category:

                line.category ||

                "",

            description:

                typeof line.description === "string"

                    ? line.description.trim()

                    : ""

        };

    }

    /**

     * Generate a unique Financial Line ID.

     */

    static generateLineId() {

        return (

            "line_" +

            Date.now().toString(36) +

            "_" +

            Math.random()

                .toString(36)

                .substring(2, 8)

        );

    }

    /**

     * Normalize Business Details.

     *

     * Business Details remain flexible so that

     * business systems can evolve independently.

     *

     * Supported domains:

     * - investment

     * - liability

     * - income

     * - expense

     * - asset

     * - tax

     * - interest

     */

    static normalizeBusinessDetails(

        details = {}

    ) {

        const normalized = {};

        if (

            details.investment &&

            typeof details.investment === "object"

        ) {

            normalized.investment = {

                ...details.investment

            };

        }

        if (

            details.liability &&

            typeof details.liability === "object"

        ) {

            normalized.liability = {

                ...details.liability

            };

        }

        if (

            details.income &&

            typeof details.income === "object"

        ) {

            normalized.income = {

                ...details.income

            };

        }

        if (

            details.expense &&

            typeof details.expense === "object"

        ) {

            normalized.expense = {

                ...details.expense

            };

        }

        if (

            details.asset &&

            typeof details.asset === "object"

        ) {

            normalized.asset = {

                ...details.asset

            };

        }

        /*

         * Tax business details.

         *

         * Tax calculations do NOT belong here.

         * This stores the tax-related meaning

         * of an Actual Transaction.

         */

        if (

            details.tax &&

            typeof details.tax === "object"

        ) {

            normalized.tax = {

                ...details.tax

            };

        }

        /*

         * Interest business details.

         *

         * Interest may originate from:

         * - Bank account

         * - Savings

         * - CD

         * - Bond

         * - Investment

         * - Other financial instruments

         *

         * Interest calculation remains outside

         * Transaction.

         */

        if (

            details.interest &&

            typeof details.interest === "object"

        ) {

            normalized.interest = {

                ...details.interest

            };

        }

        return normalized;

    }

    /**

     * Validate Transaction data.

     */

    validate() {

        const errors = [];

        /*

         * Transaction type

         */

        if (

            !this.type ||

            typeof this.type !== "string"

        ) {

            errors.push(

                "Transaction type is required."

            );

        } else if (

            !Transaction

                .getTransactionTypes()

                .includes(this.type)

        ) {

            errors.push(

                "Invalid transaction type."

            );

        }

        /*

         * Date

         */

        if (!this.date) {

            errors.push(

                "Transaction date is required."

            );

        } else if (

            Number.isNaN(

                new Date(this.date).getTime()

            )

        ) {

            errors.push(

                "Invalid transaction date."

            );

        }

        /*

         * Status

         */

        if (

            !Transaction

                .getStatuses()

                .includes(this.status)

        ) {

            errors.push(

                "Invalid transaction status."

            );

        }

        /*

         * Currency

         */

        if (

            !this.currency ||

            typeof this.currency !== "string"

        ) {

            errors.push(

                "Transaction currency is required."

            );

        }

        /*

         * Source

         */

        if (

            !Transaction

                .getSources()

                .includes(this.source)

        ) {

            errors.push(

                "Invalid transaction source."

            );

        }

        /*

         * Financial Lines

         */

        if (!Array.isArray(this.lines)) {

            errors.push(

                "Transaction lines must be an array."

            );

        } else {

            this.lines.forEach(

                (line, index) => {

                    if (

                        !line.accountId ||

                        typeof line.accountId !== "string"

                    ) {

                        errors.push(

                            `Line ${index + 1}: accountId is required.`

                        );

                    }

                    if (

                        !Transaction

                            .getLineTypes()

                            .includes(line.type)

                    ) {

                        errors.push(

                            `Line ${index + 1}: invalid line type.`

                        );

                    }

                    if (

                        typeof line.amount !== "number" ||

                        !Number.isFinite(line.amount) ||

                        line.amount < 0

                    ) {

                        errors.push(

                            `Line ${index + 1}: amount must be a non-negative number.`

                        );

                    }

                    if (

                        !Transaction

                            .getDirections()

                            .includes(line.direction)

                    ) {

                        errors.push(

                            `Line ${index + 1}: invalid direction.`

                        );

                    }

                }

            );

        }

        /*

         * Business Details

         */

        if (

            this.businessDetails === null ||

            typeof this.businessDetails !== "object" ||

            Array.isArray(this.businessDetails)

        ) {

            errors.push(

                "Business details must be an object."

            );

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

    /**

     * Normalize Transaction values.

     */

    normalize() {

        if (

            typeof this.description === "string"

        ) {

            this.description =

                this.description.trim();

        }

        if (

            typeof this.currency === "string"

        ) {

            this.currency =

                this.currency

                    .trim()

                    .toUpperCase();

        }

        if (

            typeof this.externalId === "string"

        ) {

            this.externalId =

                this.externalId.trim();

        }

        if (

            typeof this.source === "string"

        ) {

            this.source =

                this.source.trim();

        }

        if (

            typeof this.type === "string"

        ) {

            this.type =

                this.type

                    .trim()

                    .toUpperCase();

        }

        this.lines =

            Array.isArray(this.lines)

                ? this.lines.map(

                    line =>

                        Transaction.normalizeLine(

                            line

                        )

                )

                : [];

        this.businessDetails =

            Transaction.normalizeBusinessDetails(

                this.businessDetails

            );

        this.updatedAt =

            new Date().toISOString();

        return this;

    }

    /**

     * Return the standard Transaction

     * data structure.

     */

    toJSON() {

        return {

            id:

                this.id,

            date:

                this.date,

            type:

                this.type,

            status:

                this.status,

            currency:

                this.currency,

            description:

                this.description,

            source:

                this.source,

            externalId:

                this.externalId,

            lines:

                this.lines.map(

                    line => ({

                        ...line

                    })

                ),

            businessDetails:

                {

                    ...this.businessDetails

                },

            createdAt:

                this.createdAt,

            updatedAt:

                this.updatedAt

        };

    }

}

/*

 * CommonJS export.

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports = Transaction;

}
