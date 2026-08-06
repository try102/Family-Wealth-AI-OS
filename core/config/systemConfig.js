/*

Family Wealth AI OS

System Config

*/

const SystemConfig = {

    appName:

    "Family Wealth AI OS",

    version:

    "V7.0",

    environment:

    "development",

    locale:

    "en-US",

    currency:

    "USD",

    timezone:

    "America/Los_Angeles",

    debug:

    true,

    get(

        key

    ){

        return this[key];

    },

    set(

        key,

        value

    ){

        this[key] = value;

    },

    all(){

        return {

            appName:

            this.appName,

            version:

            this.version,

            environment:

            this.environment,

            locale:

            this.locale,

            currency:

            this.currency,

            timezone:

            this.timezone,

            debug:

            this.debug

        };

    }

};

export default SystemConfig;
