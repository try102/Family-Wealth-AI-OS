/*

Family Wealth AI OS

Audit Manager

*/

import DataService from "../database/dataService.js";

const AUDIT_KEY =

"wealth_audit_history";

const AuditManager = {

    getAll(){

        return (

            DataService.load(

                AUDIT_KEY

            )

            ||

            []

        );

    },

    record(

        action

    ){

        const logs =

        this.getAll();

        const entry = {

            ...action,

            timestamp:

            new Date()

            .toISOString()

        };

        logs.push(

            entry

        );

        DataService.save(

            AUDIT_KEY,

            logs

        );

        return entry;

    },

    findByUser(

        user

    ){

        return this.getAll()

        .filter(

            item =>

            item.user === user

        );

    },

    clear(){

        return DataService.remove(

            AUDIT_KEY

        );

    }

};

export default AuditManager;
