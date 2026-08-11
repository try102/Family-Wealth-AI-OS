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

 *

 * Account does NOT own:

 * - Transaction logic

 * - Cash Flow logic

 * - Investment decision logic

 * - Asset logic

 * - Liability logic

 * - Tax calculation logic

 * - Retirement logic

 * - Advisor logic

 *

 * Relationship:

 *

 * Family Member

 *      ↓

 * ownerMemberId

 *      ↓

 * Account

 *      ↓

 * accountId

 *      ↓

 * Transaction

 *

 * Investment Center may reference Account,

 * but Investment remains an independent business system.

 */

class Account {

    constructor(data = {}) {

        this.id = data.id || Account.generateId();

        this.name = data.name || "";

        this.accountType = data.accountType || "";

        this.institution = data.institution || "";

        /*

         * References an existing Family Member.

         * Account does not duplicate Family member information.

         */

        this.ownerMemberId = data.ownerMemberId || "";

        this.currency = data.currency || "USD";

        this.status = data.status || "Active";

        /*

         * Indicates where the account information came from.

         *

         * Manual:

         *   User-created account

         *

         * Import:

         *   Bank / brokerage / statement import

         *

         * Sync:

         *   Future external financial connection

         *

         * System:

         *   System-generated account

         */

        this.dataSource = data.dataSource || "Manual";

        /*

         * Describes the tax treatment of the account.

         *

         * This is metadata only.

         * Account does NOT perform tax calculations.

         */

        this.taxTreatment = data.taxTreatment || "Unknown";

        this.description = data.description || "";

        this.createdAt =

            data.createdAt || new Date().toISOString();

        this.updatedAt =

            data.updatedAt || new Date().toISOString();

    }

    /**

     * Generate a stable unique Account ID.

     *

     * Transaction and future Investment Position records

     * will reference this ID.

     */

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

    /**

     * Supported Account Types.

     *

     * This list describes WHAT the account is.

     *

     * It does not describe:

     * - investment strategy

     * - portfolio allocation

     * - security holdings

     * - investment decisions

     */

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

    /**

     * Supported currencies.

     */

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

    /**

     * Supported Account Status values.

     */

    static getStatuses() {

        return [

            "Active",

            "Closed"

        ];

    }

    /**

     * Supported Data Sources.

     */

    static getDataSources() {

        return [

            "Manual",

            "Import",

            "Sync",

            "System"

        ];

    }

    /**

     * Supported Tax Treatment values.

     *

     * Tax logic remains outside Account.

     */

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

    /**

     * Validate Account data.

     *

     * Required user-level fields:

     * - name

     * - accountType

     *

     * ID is generated automatically.

     */

    validate() {

        const errors = [];

        /*

         * Account name

         */

        if (

            !this.name ||

            typeof this.name !== "string" ||

            !this.name.trim()

        ) {

            errors.push(

                "Account name is required."

            );

        }

        /*

         * Account type

         */

        if (

            !this.accountType ||

            typeof this.accountType !== "string"

        ) {

            errors.push(

                "Account type is required."

            );

        }

        /*

         * Account type validation

         */

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

        /*

         * ownerMemberId is optional.

         *

         * If supplied, it must be a string.

         *

         * Actual Family Member existence validation

         * belongs to a higher-level manager/service.

         */

        if (

            this.ownerMemberId &&

            typeof this.ownerMemberId !== "string"

        ) {

            errors.push(

                "Invalid ownerMemberId."

            );

        }

        /*

         * Currency validation

         */

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

        /*

         * Status validation

         */

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

        /*

         * Data source validation

         */

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

        /*

         * Tax treatment validation

         */

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

            valid: errors.length === 0,

            errors

        };

    }

    /**

     * Normalize Account values.

     */

    normalize() {

        if (typeof this.name === "string") {

            this.name = this.name.trim();

        }

        if (typeof this.institution === "string") {

            this.institution =

                this.institution.trim();

        }

        if (typeof this.description === "string") {

            this.description =

                this.description.trim();

        }

        if (typeof this.ownerMemberId === "string") {

            this.ownerMemberId =

                this.ownerMemberId.trim();

        }

        this.updatedAt =

            new Date().toISOString();

        return this;

    }

    /**

     * Return the system-level Account data structure.

     *

     * No business calculations are performed here.

     */

    toJSON() {

        return {

            id: this.id,

            name: this.name,

            accountType: this.accountType,

            institution: this.institution,

            ownerMemberId: this.ownerMemberId,

            currency: this.currency,

            status: this.status,

            dataSource: this.dataSource,

            taxTreatment: this.taxTreatment,

            description: this.description,

            createdAt: this.createdAt,

            updatedAt: this.updatedAt

        };

    }

}

/*

 * CommonJS export.

 *

 * Allows Account to be used by:

 * - Account Manager

 * - Account Controller

 * - Tests when needed

 * - Node-based tooling

 */

if (

    typeof module !== "undefined" &&

    module.exports

) {

    module.exports = Account;

}
