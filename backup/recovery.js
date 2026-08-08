/*

Family Wealth AI OS V7

Recovery Manager

*/

import Database from "../storage/database.js";

const Recovery = {

    // =====================

    // Restore Snapshot

    // =====================

    restore(

        snapshot

    ){

        if(

            !snapshot ||

            !snapshot.data

        ){

            return false;

        }

        Database.tables =

        JSON.parse(

            JSON.stringify(

                snapshot.data

            )

        );

        Database.save();

        return true;

    }

};

export default Recovery;
