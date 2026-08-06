/*

Family Wealth AI OS V7

Environment Configuration

*/

const Environment = {

    current:

    "development",

    isDevelopment(){

        return (

            this.current ===

            "development"

        );

    },

    isProduction(){

        return (

            this.current ===

            "production"

        );

    }

};

export default Environment;
