/*

Family Wealth AI OS V7

Cashflow Repository

现金流数据仓库

Responsibility:

- Persist Cashflow records

- Read Cashflow records

- Update Cashflow records

- Delete Cashflow records

Architecture:

CashflowService

        ↓

CashflowRepository

        ↓

Database

        ↓

StorageAdapter

        ↓

localStorage

*/

import Database

    from "../../../core/database/database.js";

const STORAGE_KEY =

    "wealth_cashflows_v7";

const cashflowRepository = {

    name:

        "Cashflow Repository V7",

    // ==================================================

    //

    // Load Records

    //

    // ==================================================

    loadRecords(){

        const data =

            Database.load(

                STORAGE_KEY

            );

        if(

            !Array.isArray(

                data

            )

        ){

            return [];

        }

        return data;

    },

    // ==================================================

    //

    // Save Records

    //

    // ==================================================

    saveRecords(

        records

    ){

        Database.save(

            STORAGE_KEY,

            records

        );

        return true;

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

        if(

            !id

        ){

            return null;

        }

        const records =

            this.loadRecords();

        return (

            records.find(

                record =>

                    String(

                        record.id

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

        if(

            !id

        ){

            return null;

        }

        const records =

            this.loadRecords();

        const index =

            records.findIndex(

                record =>

                    String(

                        record.id

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

        const existing =

            records[index];

        const updated = {

            ...existing,

            ...data,

            id:

                existing.id,

            createdAt:

                existing.createdAt,

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

        if(

            !id

        ){

            return false;

        }

        const records =

            this.loadRecords();

        const index =

            records.findIndex(

                record =>

                    String(

                        record.id

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
