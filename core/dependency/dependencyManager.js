/*

Family Wealth AI OS

Dependency Manager

*/

const DependencyManager = {

    dependencies:{},

    register(

        module,

        requires=[]

    ){

        this.dependencies[module] =

        requires;

        return requires;

    },

    get(

        module

    ){

        return this.dependencies[module]

        ||

        [];

    },

    check(

        module,

        available=[]

    ){

        const required =

        this.get(

            module

        );

        return required.every(

            item =>

            available.includes(

                item

            )

        );

    },

    graph(){

        return this.dependencies;

    },

    remove(

        module

    ){

        delete this.dependencies[module];

    },

    clear(){

        this.dependencies={};

    }

};

export default DependencyManager;
