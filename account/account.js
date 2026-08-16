/**

 * Family Wealth AI OS V7

 * Account Model

 *

 * Responsibility:

 * - Define the system-level Account structure

 * - Store account identity and account attributes

 * - Validate and normalize Account data

 * - Provide stable Account IDs

 *

 * Account is a foundational data container.

 */

class Account {

    constructor(data = {}) {

        this.id =

            data.id ||

            Account.generateId();

        this.name =

            data.name || "";

        this.accountType =

            data.accountType || "";

        this.institution =

            data.institution || "";

        this.ownerMemberId =

            data.ownerMemberId || "";

        this.currency =

            data.currency || "USD";

        this.status =

            data.status || "Active";

        this.dataSource =

            data.dataSource || "Manual";

        this.taxTreatment =

            data.taxTreatment || "Unknown";

        this.description =

            data.description || "";

        this.createdAt =

            data.createdAt ||

            new Date().toISOString();

        this.updatedAt =

            data.updatedAt ||

            new Date().toISOString();

    }

    // =====================================================

    // Generate ID

    // =====================================================

    static generateId() {

        return (

            "acc_" +

            Date.now().toString(36) +

            "_" +

            Math.random()

                .toString(36)

                .substring(2, 8)

        );

    }

    // =====================================================

    // Account Types

    // =====================================================

    static getAccountTypes() {

        return [

            "Checking",

            "Savings",

            "Brokerage",

            "IRA",

            "401(k)",

            "403(b)",

            "457",

            "529",

            "HSA",

            "Cash",

            "Credit Card",

            "Loan",

            "Mortgage",

            "Other"

        ];

    }

    // =====================================================

    // Currencies

    // =====================================================

    static getCurrencies() {

        return [

            "USD",

            "CNY",

            "EUR",

            "GBP",

            "JPY",

            "Other"

        ];

    }

    // =====================================================

    // Status

    // =====================================================

    static getStatuses() {

        return [

            "Active",

            "Closed"

        ];

    }

    // =====================================================

    // Data Sources

    // =====================================================

    static getDataSources() {

        return [

            "Manual",

            "Import",

            "Sync",

            "System"

        ];

    }

    // =====================================================

    // Tax Treatments

    // =====================================================

    static getTaxTreatments() {

        return [

            "Taxable",

            "Traditional",

            "Roth",

            "Tax-Deferred",

            "Tax-Exempt",

            "Not-Applicable",

            "Unknown"

        ];

    }

    // =====================================================

    // Validate

    // =====================================================

    validate() {

        const errors = [];

        if (

            !this.name ||

            typeof this.name !== "string" ||

            !this.name.trim()

        ) {

            errors.push(

                "Account name is required."

            );

        }

        if (

            !this.accountType ||

            typeof this.accountType !== "string"

        ) {

            errors.push(

                "Account type is required."

            );

        }

        if (

            this.accountType &&

            !Account

                .getAccountTypes()

                .includes(this.accountType)

        ) {

            errors.push(

                "Invalid account type."

            );

        }

        if (

            this.ownerMemberId &&

            typeof this.ownerMemberId !== "string"

        ) {

            errors.push(

                "Invalid ownerMemberId."

            );

        }

        if (

            this.currency &&

            !Account

                .getCurrencies()

                .includes(this.currency)

        ) {

            errors.push(

                "Invalid currency."

            );

        }

        if (

            this.status &&

            !Account

                .getStatuses()

                .includes(this.status)

        ) {

            errors.push(

                "Invalid account status."

            );

        }

        if (

            this.dataSource &&

            !Account

                .getDataSources()

                .includes(this.dataSource)

        ) {

            errors.push(

                "Invalid data source."

            );

        }

        if (

            this.taxTreatment &&

            !Account

                .getTaxTreatments()

                .includes(this.taxTreatment)

        ) {

            errors.push(

                "Invalid tax treatment."

            );

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

    // =====================================================

    // Normalize

    // =====================================================

    normalize() {

        if (

            typeof this.name === "string"

        ) {

            this.name =

                this.name.trim();

        }

        if (

            typeof this.institution === "string"

        ) {

            this.institution =

                this.institution.trim();

        }

        if (

            typeof this.description === "string"

        ) {

            this.description =

                this.description.trim();

        }

        if (

            typeof this.ownerMemberId === "string"

        ) {

            this.ownerMemberId =

                this.ownerMemberId.trim();

        }

        this.updatedAt =

            new Date().toISOString();

        return this;

    }

    // =====================================================

    // JSON

    // =====================================================

    toJSON() {

        return {

            id:

                this.id,

            name:

                this.name,

            accountType:

                this.accountType,

            institution:

                this.institution,

            ownerMemberId:

                this.ownerMemberId,

            currency:

                this.currency,

            status:

                this.status,

            dataSource:

                this.dataSource,

            taxTreatment:

                this.taxTreatment,

            description:

                this.description,

            createdAt:

                this.createdAt,

            updatedAt:

                this.updatedAt

        };

    }

}

// =====================================================

// ES Module Export

// =====================================================

export default Account;
