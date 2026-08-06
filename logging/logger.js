/*

Family Wealth AI OS V7

System Logger

*/

const Logger = {

    logs:[],

    write(

        level,

        message,

        data=null

    ){

        const log = {

            id:

            Date.now(),

            level,

            message,

            data,

            time:

            new Date()

            .toISOString()

        };

        this.logs.push(

            log

        );

        return log;

    },

    info(

        message,

        data=null

    ){

        return this.write(

            "INFO",

            message,

            data

        );

    },

    warn(

        message,

        data=null

    ){

        return this.write(

            "WARN",

            message,

            data

        );

    },

    error(

        message,

        data=null

    ){

        return this.write(

            "ERROR",

            message,

            data

        );

    },

    debug(

        message,

        data=null

    ){

        return this.write(

            "DEBUG",

            message,

            data

        );

    },

    list(){

        return this.logs;

    },

    clear(){

        this.logs=[];

    }

};

export default Logger;
