/*

Family Wealth AI OS

Feature Flag Manager

*/

const FeatureFlagManager = {

    flags:{},

    create(

        name,

        enabled=false

    ){

        this.flags[name] = {

            name,

            enabled

        };

        return this.flags[name];

    },

    enable(

        name

    ){

        if(

            this.flags[name]

        ){

            this.flags[name]

            .enabled = true;

            return true;

        }

        return false;

    },

    disable(

        name

    ){

        if(

            this.flags[name]

        ){

            this.flags[name]

            .enabled = false;

            return true;

        }

        return false;

    },

    isEnabled(

        name

    ){

        return !!(

            this.flags[name]

            &&

            this.flags[name]

            .enabled

        );

    },

    list(){

        return this.flags;

    },

    remove(

        name

    ){

        delete this.flags[name];

    },

    clear(){

        this.flags={};

    }

};

export default FeatureFlagManager;
