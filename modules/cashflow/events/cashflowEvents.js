/*

Family Wealth AI OS V7

Cashflow Events

现金流事件管理

*/

const cashflowEvents = {

    listeners:{},

    on(

        event,

        callback

    ){

        if(

            !this.listeners[event]

        ){

            this.listeners[event]=[];

        }

        this.listeners[event]

        .push(

            callback

        );

    },

    emit(

        event,

        data

    ){

        const callbacks =

        this.listeners[event]

        ||

        [];

        callbacks.forEach(

            callback =>

            callback(

                data

            )

        );

        return true;

    },

    remove(

        event

    ){

        delete this.listeners[event];

    },

    clear(){

        this.listeners={};

    },

    list(){

        return Object.keys(

            this.listeners

        );

    }

};

export default cashflowEvents;
