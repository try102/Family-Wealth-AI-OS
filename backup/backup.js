/*

Family Wealth AI OS V7

Backup Manager

*/

import Database from "../storage/database.js";

const Backup = {

    // =====================

    // Create Snapshot

    // =====================

    create(

        name = "Backup"

    ){

        return {

            name,

            timestamp:

            new Date().toISOString(),

            data:

            JSON.parse(

                JSON.stringify(

                    Database.tables

                )

            )

        };

    }

};

export default Backup;
