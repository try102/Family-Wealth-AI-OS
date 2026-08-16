/**

 *

 * Family Wealth AI OS V7

 *

 * Transaction Model

 *

 * Responsibility:

 *

 * - Define the system-level Transaction structure

 * - Store one real-world economic event

 * - Store Financial Lines

 * - Store Business Details

 * - Validate and normalize Transaction data

 *

 * Transaction is the system's actual-event record.

 *

 * Transaction does NOT perform:

 *

 * - Account balance calculation

 * - Investment calculations

 * - Cost basis calculation

 * - Capital gain calculation

 * - Liability calculations

 * - Tax calculations

 * - Cash Flow calculations

 *

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

        this.source =

            data.source ||

            "Manual";

        this.externalId =

            data.externalId ||

            "";

        this.lines =

            Array.isArray(data.lines)

                ? data.lines.map(

                    line =>

                        Transaction.normalizeLine(line)

                )

                : [];

        this.businessDetails =

            data.businessDetails &&

            typeof data.businessDetails === "object" &&

            !Array.isArray(data.businessDetails)

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

    // =====================================================

    //

    // Generate Transaction ID

    //

    // =====================================================

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

    // =====================================================

    //

    // Transaction Types

    //

    // =====================================================

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

    // =====================================================

    //

    // Status

    //

    // =====================================================

    static getStatuses() {

        return [

            "Pending",

            "Posted",

            "Voided"

        ];

    }

    // =====================================================

    //

    // Sources

    //

    // =====================================================

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

    // =====================================================

    //

    // Financial Line Types

    //

    // =====================================================

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

    // =====================================================

    //

    // Directions

    //

    // =====================================================

    static getDirections() {

        return [

            "IN",

            "OUT"

        ];

    }

    // =====================================================

    //

    // Normalize Financial Line

    //

    // =====================================================

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

    // =====================================================

    //

    // Generate Financial Line ID

    //

    // =====================================================

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

    // =====================================================

    //

    // Normalize Business Details

    //

    // =====================================================

    static normalizeBusinessDetails(

        details = {}

    ) {

        const normalized = {};

        if (

            details.investment &&

            typeof details.investment === "object" &&

            !Array.isArray(details.investment)

        ) {

            normalized.investment = {

                ...details.investment

            };

        }

        if (

            details.liability &&

            typeof details.liability === "object" &&

            !Array.isArray(details.liability)

        ) {

            normalized.liability = {

                ...details.liability

            };

        }

        if (

            details.income &&

            typeof details.income === "object" &&

            !Array.isArray(details.income)

        ) {

            normalized.income = {

                ...details.income

            };

        }

        if (

            details.expense &&

            typeof details.expense === "object" &&

            !Array.isArray(details.expense)

        ) {

            normalized.expense = {

                ...details.expense

            };

        }

        if (

            details.asset &&

            typeof details.asset === "object" &&

            !Array.isArray(details.asset)

        ) {

            normalized.asset = {

                ...details.asset

            };

        }

        if (

            details.tax &&

            typeof details.tax === "object" &&

            !Array.isArray(details.tax)

        ) {

            normalized.tax = {

                ...details.tax

            };

        }

        if (

            details.interest &&

            typeof details.interest === "object" &&

            !Array.isArray(details.interest)

        ) {

            normalized.interest = {

                ...details.interest

            };

        }

        return normalized;

    }

    // =====================================================

    //

    // Validate

    //

    // =====================================================

    validate() {

        const errors = [];

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

        if (

            !Transaction

                .getStatuses()

                .includes(this.status)

        ) {

            errors.push(

                "Invalid transaction status."

            );

        }

        if (

            !this.currency ||

            typeof this.currency !== "string"

        ) {

            errors.push(

                "Transaction currency is required."

            );

        }

        if (

            !Transaction

                .getSources()

                .includes(this.source)

        ) {

            errors.push(

                "Invalid transaction source."

            );

        }

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

    // =====================================================

    //

    // Normalize Transaction

    //

    // =====================================================

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

    // =====================================================

    //

    // Serialization

    //

    // =====================================================

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

            businessDetails: {

                ...this.businessDetails

            },

            createdAt:

                this.createdAt,

            updatedAt:

                this.updatedAt

        };

    }

}

// =====================================================

//

// ES Module Export

//

// =====================================================

export default

    Transaction;
