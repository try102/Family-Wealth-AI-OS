/*

Family Wealth AI OS

Version Manager

*/

const VersionManager = {

    current:

    "7.0.0",

    history:[

        {

            version:

            "6.4.0",

            name:

            "Asset Classification Build"

        },

        {

            version:

            "7.0.0",

            name:

            "OS Architecture Build"

        }

    ],

    getCurrent(){

        return this.current;

    },

    getHistory(){

        return this.history;

    },

    compare(

        version

    ){

        return {

            current:

            this.current,

            target:

            version,

            same:

            this.current === version

        };

    },

    setVersion(

        version

    ){

        this.current = version;

    }

};

export default VersionManager;
