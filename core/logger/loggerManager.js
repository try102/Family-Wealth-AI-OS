/*

Family Wealth AI OS

Logger Manager

*/

const LoggerManager = {

    logs:[],

    log(

        level,

        message,

        data=null

    ){

        const entry = {

            id:

            Date.now(),

            level,

            message,

            data,

            timestamp:

            new Date()

            .toISOString()

        };

        this.logs.push(

            entry

        );

        return entry;

    },

    info(

        message,

        data=null

    ){

        return this.log(

            "INFO",

            message,

            data

        );

    },

    warn(

        message,

        data=null

    ){

        return this.log(

            "WARN",

            message,

            data

        );

    },

    error(

        message,

        data=null

    ){

        return this.log(

            "ERROR",

            message,

            data

        );

    },

    all(){

        return this.logs;

    },

    findByLevel(

        level

    ){

        return this.logs

        .filter(

            item =>

            item.level === level

        );

    },

    clear(){

        this.logs=[];

    }

};

export default LoggerManager;
