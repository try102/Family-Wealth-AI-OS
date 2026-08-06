/*

Family Wealth AI OS

Migration Manager

*/

const MigrationManager = {

    migrations:{},

    register(

        version,

        callback

    ){

        this.migrations[version] =

        callback;

    },

    migrate(

        version,

        data

    ){

        const migration =

        this.migrations[version];

        if(!migration){

            return data;

        }

        return migration(

            data

        );

    },

    list(){

        return Object.keys(

            this.migrations

        );

    },

    remove(

        version

    ){

        delete this.migrations[version];

    }

};

export default MigrationManager;
