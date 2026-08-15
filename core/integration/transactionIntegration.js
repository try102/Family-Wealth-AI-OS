/*

 *

 * Family Wealth AI OS V7

 *

 * Transaction Integration

 *

 * Responsibility:

 *

 * - Connect Transaction Module

 *   to the system integration layer

 *

 * - Provide one controlled

 *   Transaction system entry point

 *

 * - Keep SystemBootstrap independent

 *   from Transaction internal architecture

 *

 * Architecture:

 *

 * SystemBootstrap

 *       ↓

 * TransactionIntegration

 *       ↓

 * TransactionModule

 *       ↓

 * TransactionFacade

 *       ↓

 * TransactionController

 *       ↓

 * TransactionService

 *       ↓

 * TransactionManager

 *       ↓

 * TransactionRepository

 *       ↓

 * DataService

 *

 * Transaction remains the

 * Single Source of Truth

 * for financial transactions.

 *

 */

import TransactionModule

    from "../../transaction/transactionModule.js";

/*

 *

 * Transaction Module Instance

 *

 */

const transactionModule =

    new TransactionModule();

/*

 *

 * Transaction Integration

 *

 */

const TransactionIntegration = {

    /*

     *

     * Module name

     *

     */

    name:

        "Transaction",

    /*

     *

     * Module status

     *

     */

    status:

        "ACTIVE",

    /*

     *

     * Get Transaction Facade

     *

     */

    getFacade(){

        return transactionModule

            .getFacade();

    },

    /*

     *

     * Get Transaction Module

     *

     */

    getModule(){

        return transactionModule;

    },

    /*

     *

     * Get Module Status

     *

     */

    getStatus(){

        if(

            transactionModule &&

            typeof transactionModule.getStatus ===

                "function"

        ){

            return transactionModule

                .getStatus();

        }

        return {

            module:

                "Transaction",

            version:

                "V7",

            initialized:

                true

        };

    }

};

/*

 *

 * ES Module Export

 *

 */

export default

    TransactionIntegration;
