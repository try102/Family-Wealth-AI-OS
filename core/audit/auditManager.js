/*

Family Wealth AI OS

Audit Manager

*/

const AuditManager = {

    logs:[],

    record(

        action,

        target,

        data={}

    ){

        const log = {

            id:

            Date.now(),

            action,

            target,

            data,

            timestamp:

            new Date()

            .toISOString()

        };

        this.logs.push(

            log

        );

        return log;

    },

    all(){

        return this.logs;

    },

    find(

        action

    ){

        return this.logs

        .filter(

            log =>

            log.action === action

        );

    },

    remove(

        id

    ){

        this.logs =

        this.logs.filter(

            log =>

            log.id !== id

        );

    },

    clear(){

        this.logs=[];

    }

};

export default AuditManager;
