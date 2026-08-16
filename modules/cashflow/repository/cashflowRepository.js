/*

 *

 * Family Wealth AI OS V7

 *

 * Cashflow Repository

 *

 * 现金流数据仓库

 *

 * Responsibility:

 *

 * - Persist Cashflow records

 * - Read Cashflow records

 * - Update Cashflow records

 * - Delete Cashflow records

 *

 * IMPORTANT:

 *

 * This Repository uses the existing

 * Family Wealth AI OS Database Core.

 *

 */

import Database

    from "../../database/database.js";

const TABLE =

    "cashflows";

const cashflowRepository = {

    name:

        "Cashflow Repository V7",

    // ==================================================

    //

    // Internal Load

    //

    // ==================================================

    loadRecords(){

        const records =

            Database.load(

                TABLE

            );

        if(

            Array.isArray(

                records

            )

        ){

            return records;

        }

        return [];

    },

    // ==================================================

    //

    // Internal Save

    //

    // ==================================================

    saveRecords(

        records

    ){

        return Database.save(

            TABLE,

            records

        );

    },

    // ==================================================

    //

    // Create

    //

    // ==================================================

    create(

        data = {}

    ){

        const records =

            this.loadRecords();

        const now =

            new Date()

                .toISOString();

        const record = {

            id:

                Date.now()

                .toString(),

            ...data,

            createdAt:

                now,

            updatedAt:

                now

        };

        records.push(

            record

        );

        this.saveRecords(

            records

        );

        return record;

    },

    // ==================================================

    //

    // Find All

    //

    // ==================================================

    findAll(){

        return this.loadRecords();

    },

    // ==================================================

    //

    // Find One

    //

    // ==================================================

    findById(

        id

    ){

        const records =

            this.loadRecords();

        return (

            records.find(

                item =>

                    String(

                        item.id

                    ) ===

                    String(

                        id

                    )

            )

        ) || null;

    },

    // ==================================================

    //

    // Update

    //

    // ==================================================

    update(

        id,

        data = {}

    ){

        const records =

            this.loadRecords();

        const index =

            records.findIndex(

                item =>

                    String(

                        item.id

                    ) ===

                    String(

                        id

                    )

            );

        if(

            index === -1

        ){

            return null;

        }

        const updated = {

            ...records[index],

            ...data,

            id:

                records[index]

                    .id,

            createdAt:

                records[index]

                    .createdAt,

            updatedAt:

                new Date()

                    .toISOString()

        };

        records[index] =

            updated;

        this.saveRecords(

            records

        );

        return updated;

    },

    // ==================================================

    //

    // Delete

    //

    // ==================================================

    remove(

        id

    ){

        const records =

            this.loadRecords();

        const index =

            records.findIndex(

                item =>

                    String(

                        item.id

                    ) ===

                    String(

                        id

                    )

            );

        if(

            index === -1

        ){

            return false;

        }

        records.splice(

            index,

            1

        );

        this.saveRecords(

            records

        );

        return true;

    },

    // ==================================================

    //

    // Clear

    //

    // ==================================================

    clear(){

        this.saveRecords(

            []

        );

        return true;

    }

};

export default

    cashflowRepository;
