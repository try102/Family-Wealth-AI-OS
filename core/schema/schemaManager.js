/*

Family Wealth AI OS

Data Schema Manager

*/

const SchemaManager = {

    schemas:{},

    register(

        name,

        version,

        structure

    ){

        this.schemas[name] = {

            name,

            version,

            structure

        };

        return this.schemas[name];

    },

    get(

        name

    ){

        return this.schemas[name];

    },

    updateVersion(

        name,

        version

    ){

        if(

            !this.schemas[name]

        ){

            return null;

        }

        this.schemas[name]

        .version = version;

        return this.schemas[name];

    },

    list(){

        return this.schemas;

    },

    remove(

        name

    ){

        delete this.schemas[name];

    },

    clear(){

        this.schemas={};

    }

};

export default SchemaManager;
