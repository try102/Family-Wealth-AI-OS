/*

Family Wealth AI OS

Core Helpers

*/

const Helpers = {

    // =====================

    // Generate ID

    // =====================

    generateId(){

        return (

            Date.now()

            +

            "_"

            +

            Math.random()

            .toString(36)

            .substring(2,10)

        );

    },

    // =====================

    // Currency Format

    // =====================

    formatCurrency(

        value,

        currency="USD"

    ){

        return new Intl.NumberFormat(

            "en-US",

            {

                style:

                "currency",

                currency

            }

        )

        .format(

            Number(value || 0)

        );

    },

    // =====================

    // Percentage Format

    // =====================

    formatPercent(

        value

    ){

        return (

            Number(value || 0)

            .toFixed(2)

            +

            "%"

        );

    },

    // =====================

    // Date

    // =====================

    now(){

        return new Date()

        .toISOString();

    },

    // =====================

    // Number Check

    // =====================

    isNumber(

        value

    ){

        return typeof value ===

        "number"

        &&

        !isNaN(value);

    }

};

export default Helpers;
