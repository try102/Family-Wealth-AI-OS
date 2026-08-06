/*

Family Wealth AI OS

Feature Manager

*/

const FeatureManager = {

    features:{},

    enable(

        name

    ){

        this.features[name] = true;

        return true;

    },

    disable(

        name

    ){

        this.features[name] = false;

        return false;

    },

    isEnabled(

        name

    ){

        return (

            this.features[name]

            ===

            true

        );

    },

    set(

        name,

        value

    ){

        this.features[name] =

        value;

        return value;

    },

    list(){

        return this.features;

    },

    clear(){

        this.features = {};

    }

};

export default FeatureManager;
