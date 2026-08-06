/*

Family Wealth AI OS

Metrics Manager

*/

const MetricsManager = {

    metrics:{},

    increment(

        name,

        value=1

    ){

        if(

            !this.metrics[name]

        ){

            this.metrics[name] = 0;

        }

        this.metrics[name] += value;

        return this.metrics[name];

    },

    set(

        name,

        value

    ){

        this.metrics[name] = value;

        return value;

    },

    get(

        name

    ){

        return (

            this.metrics[name]

            ||

            0

        );

    },

    all(){

        return this.metrics;

    },

    clear(){

        this.metrics = {};

    }

};

export default MetricsManager;
