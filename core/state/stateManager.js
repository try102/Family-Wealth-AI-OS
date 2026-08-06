/*

Family Wealth AI OS

State Manager

*/

const StateManager = {

    state:{},

    set(

        key,

        value

    ){

        this.state[key] = value;

        return value;

    },

    get(

        key

    ){

        return this.state[key];

    },

    has(

        key

    ){

        return Object.prototype

        .hasOwnProperty.call(

            this.state,

            key

        );

    },

    remove(

        key

    ){

        delete this.state[key];

    },

    all(){

        return this.state;

    },

    clear(){

        this.state = {};

    }

};

export default StateManager;
