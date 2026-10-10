/*

 *

 * Family Wealth AI OS V7

 *

 * Income Service

 *

 * 收入业务服务层

 *

 * Responsibility:

 *

 * - Income business operations

 * - Income persistence

 * - Income → Transaction integration

 *

 *

 * Architecture:

 *

 * Income View

 *      ↓

 * Income Agent

 *      ↓

 * Income Service

 *      ├── Income Repository

 *      │

 *      └── Transaction Integration

 *                  ↓

 *              Transaction

 *

 *

 * IMPORTANT:

 *

 * Transaction is the system-level

 * Actual Event record.

 *

 * Income remains the business-facing

 * income module.

 *

 */

import IncomeSchema

    from "../schema/incomeSchema.js?v=20261010da";

import IncomeRepository

    from "../repository/incomeRepository.js?v=20261008ae";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js?v=20261010da";


/*

 * Deleting an Income / Expense record also revokes

 * the Transaction it created: the account-balance

 * effect is reversed, its cash-flow entries are

 * removed, and the Transaction itself is deleted,

 * so Dashboard / Cash Flow / Tax stop counting it.

 */

function revokeLinkedTransaction(

    kind,

    recordId

) {

    try {

        const transactions =

            TransactionIntegration

                .getAllTransactions() || [];

        const linked =

            transactions.find(

                transaction =>

                    transaction &&

                    transaction.businessDetails &&

                    transaction.businessDetails[kind] &&

                    String(

                        transaction.businessDetails[kind][

                            kind + "Id"

                        ]

                    ) === String(recordId)

            );

        if (!linked) {

            return;

        }

        TransactionIntegration

            .removeTransaction(

                linked.id

            );

    } catch (transactionError) {

    }

}

const IncomeService = {

    // =====================================================

    //

    // Create

    //

    // =====================================================

    addIncome(

        data = {}

    ){

        /*

         *

         * Create Income business record.

         *

         */

        const income =

            IncomeSchema.create(

                data

            );

        /*

         *

         * Persist Income first.

         *

         * This preserves the existing

         * Income module behavior.

         *

         */

        const savedIncome =

            IncomeRepository.save(

                income

            );

        /*

         *

         * Transaction Integration

         *

         * -------------------------------------------------

         *

         * An Income Transaction requires

         * a real Account.

         *

         * The current Income UI does not yet

         * require accountId.

         *

         * Therefore:

         *

         * accountId exists

         *      ↓

         * create Transaction

         *

         * accountId does not exist

         *      ↓

         * keep Income record only

         *

         * We NEVER create a fake Account ID.

         *

         */

        if (

            savedIncome

        ){

            TransactionIntegration

                .recordIncome({

                    date:

                        savedIncome.date,

                    accountId:

                        savedIncome.accountId,

                    amount:

                        Number(

                            savedIncome.amount ||

                            savedIncome.value ||

                            0

                        ),

                    currency:

                        savedIncome.currency ||

                        "USD",

                    description:

                        savedIncome.name ||

                        savedIncome.source ||

                        "Income",

                    income: {

                        incomeId:

                            savedIncome.id,

                        name:

                            savedIncome.name ||

                            "",

                        source:

                            savedIncome.source ||

                            "",

                        type:

                            savedIncome.type ||

                            "Other",

                        category:

                            savedIncome.category ||

                            savedIncome.type ||

                            "Income"

                    },

                    source:

                        "BusinessModule"

                });

        }

        /*

         *

         * Return the original Income record.

         *

         */

        return savedIncome;

    },

    // =====================================================

    //

    // Read

    //

    // =====================================================

    getAllIncome(){

        return IncomeRepository.findAll();

    },

    getIncomeById(

        id

    ){

        return IncomeRepository.findById(

            id

        );

    },

    // =====================================================

    //

    // Update

    //

    // =====================================================

    updateIncome(

        id,

        data

    ){

        /*

         *

         * Preserve existing Income CRUD.

         *

         */

        const updatedIncome =

            IncomeRepository.update(

                id,

                data

            );

        /*

         *

         * Transaction update is intentionally

         * NOT performed here yet.

         *

         * Reason:

         *

         * One Income record may correspond

         * to a historical Actual Transaction.

         *

         * Automatic mutation of historical

         * Transactions must be handled by

         * an explicit Transaction integration

         * policy.

         *

         */

        return updatedIncome;

    },

    // =====================================================

    //

    // Delete

    //

    // =====================================================

    deleteIncome(

        id

    ){

        revokeLinkedTransaction(

            "income",

            id

        );

        return IncomeRepository.remove(

            id

        );

    },

    // =====================================================

    //

    // Summary

    //

    // =====================================================

    getSummary(){

        const list =

            IncomeRepository.findAll();

        let totalIncome = 0;

        let investmentIncome = 0;

        list.forEach(

            item => {

                const amount =

                    Number(

                        item.amount ||

                        item.value ||

                        0

                    );

                totalIncome +=

                    amount;

                // Only realized capital-gain mirrors stay
                // out of the daily-income caliber. Auto
                // dividends / interest are ordinary income
                // under tax rules, so they count as daily
                // income from 2026-10-10 (option D).

                if(

                    item.autoSource ===

                    "CAPITAL_GAIN"

                ){

                    investmentIncome +=

                        amount;

                }

            }

        );

        return {

            count:

                list.length,

            totalIncome,

            investmentIncome,

            dailyIncome:

                totalIncome -

                investmentIncome

        };

    },

    /*

     * Auto income mirrored from an investment event

     * (realized capital gain, dividend, interest).

     * The economic event already lives in its own

     * Transaction, so NO second transaction is

     * created here; the record only makes the

     * income visible in the Income Center, tagged

     * autoSource so daily-income calibers can keep

     * it separate. Deduped by source trade.

     */

    createLinkedIncome(

        data = {}

    ){

        try {

            if(

                !data.autoSource ||

                !data.tradeId

            ){

                return null;

            }

            const existing =

                (

                    IncomeRepository.findAll() || []

                ).find(

                    record =>

                        record.autoSource &&

                        String(record.tradeId) ===

                            String(data.tradeId)

                );

            if(

                existing

            ){

                return existing;

            }

            const record =

                IncomeSchema.create({

                    id:

                        `auto_${data.autoSource}_${data.tradeId}`,

                    name:

                        data.name || "",

                    category:

                        data.category || "其他",

                    type:

                        data.category || "其他",

                    source:

                        "Auto",

                    amount:

                        Number(data.amount || 0),

                    currency:

                        data.currency || "USD",

                    frequency:

                        "ONE_TIME",

                    taxable:

                        true,

                    accountId:

                        data.accountId || "",

                    memberId:

                        data.memberId || "",

                    note:

                        data.note || ""

                });

            record.autoSource =

                data.autoSource;

            record.type =

                data.category || "其他";

            record.tradeId =

                data.tradeId;

            record.date =

                data.date || "";

            return IncomeRepository.save(

                record

            );

        } catch (linkError) {

            return null;

        }

    },

    deleteLinkedIncome(

        tradeId

    ){

        try {

            (

                IncomeRepository.findAll() || []

            )

                .filter(

                    record =>

                        record.autoSource &&

                        String(record.tradeId) ===

                            String(tradeId)

                )

                .forEach(

                    record =>

                        IncomeRepository.remove(

                            record.id

                        )

                );

        } catch (linkError) {

        }

    }

};

export default IncomeService;
