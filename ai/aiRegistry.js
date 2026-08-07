/*

Family Wealth AI OS V7

AI Registry

*/

const AIRegistry = {

    ais:{},

    register(

        name,

        ai

    ){

        this.ais[name] = ai;

    },

    get(

        name

    ){

        return this.ais[name];

    },

    list(){

        return Object.keys(

            this.ais

        );

    },

    remove(

        name

    ){

        delete this.ais[name];

    }

};

export default AIRegistry;
