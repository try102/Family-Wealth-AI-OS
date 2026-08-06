/*

Family Wealth AI OS V7

Audit Logger

*/

const Audit = {

    logs:[],

    record(

        user,

        action,

        result

    ){

        const log = {

            id:

            Date.now(),

            user,

            action,

            result,

            time:

            new Date()

            .toISOString()

        };

        this.logs.push(

            log

        );

        return log;

    },

    list(){

        return this.logs;

    },

    findByUser(

        user

    ){

        return this.logs.filter(

            item =>

            item.user === user

        );

    },

    clear(){

        this.logs=[];

    }

};

export default Audit;
