/*

Family Wealth AI OS

Core Helpers

*/

const Helpers = {

    generateId(){

        return (

            Date.now()

            .toString(36)

            +

            Math.random()

            .toString(36)

            .substring(2)

        );

    },

    formatCurrency(

        amount,

        currency="USD"

    ){

        return new Intl

        .NumberFormat(

            "en-US",

            {

                style:"currency",

                currency

            }

        )

        .format(

            amount

        );

    },

    formatDate(

        date

    ){

        return new Date(

            date

        )

        .toISOString()

        .split("T")[0];

    },

    clone(

        data

    ){

        return JSON.parse(

            JSON.stringify(

                data

            )

        );

    }

};

export default Helpers;
