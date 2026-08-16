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

    from "../schema/incomeSchema.js";

import IncomeRepository

    from "../repository/incomeRepository.js";

import TransactionIntegration

    from "../../../core/integration/transactionIntegration.js";

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

            savedIncome &&

            savedIncome.accountId

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

        /*

         *

         * Preserve existing Income CRUD.

         *

         */

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

        list.forEach(

            item => {

                totalIncome +=

                    Number(

                        item.amount ||

                        item.value ||

                        0

                    );

            }

        );

        return {

            count:

                list.length,

            totalIncome

        };

    }

};

export default IncomeService;
