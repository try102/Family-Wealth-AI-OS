/*

 * Family Wealth AI OS V7

 *

 * System Event Definitions

 *

 * System-level events shared between modules.

 */

const EventTypes = {

    // =====================

    // Asset

    // =====================

    ASSET_CREATED:

        "ASSET_CREATED",

    ASSET_UPDATED:

        "ASSET_UPDATED",

    ASSET_DELETED:

        "ASSET_DELETED",

    // =====================

    // Account

    // =====================

    ACCOUNT_CREATED:

        "ACCOUNT_CREATED",

    // =====================

    // Transaction

    // =====================

    TRANSACTION_CREATED:

        "TRANSACTION_CREATED",

    // =====================

    // Investment

    // =====================

    /*

     * A real investment trade has been executed.

     *

     * This event represents an Actual execution.

     *

     * It does NOT mean:

     * - investment idea

     * - recommendation

     * - simulation

     * - forecast

     * - planned trade

     */

    TRADE_EXECUTED:

        "TRADE_EXECUTED",

    // =====================

    // Cash Flow

    // =====================

    INCOME_RECEIVED:

        "INCOME_RECEIVED",

    EXPENSE_RECORDED:

        "EXPENSE_RECORDED",

    // =====================

    // Tax

    // =====================

    TAX_PROFILE_UPDATED:

        "TAX_PROFILE_UPDATED"

};

export default EventTypes;
