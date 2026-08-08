/*

Family Wealth AI OS V7

AI Registry

统一 AI 注册中心

*/

const AIRegistry = {

    ais: {},

    register(

        name,

        ai

    ) {

        this.ais[name] = ai;

        return ai;

    },

    get(

        name

    ) {

        return this.ais[name];

    },

    list() {

        return Object.keys(

            this.ais

        );

    },

    remove(

        name

    ) {

        delete this.ais[name];

    },

    clear() {

        this.ais = {};

    }

};

export default AIRegistry;
