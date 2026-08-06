/*

Family Wealth AI OS

Validation Manager

*/

const ValidationManager = {

    required(

        value

    ){

        return (

            value !== undefined

            &&

            value !== null

            &&

            value !== ""

        );

    },

    number(

        value

    ){

        return typeof value ===

        "number"

        &&

        !isNaN(value);

    },

    positive(

        value

    ){

        return this.number(value)

        &&

        value >= 0;

    },

    object(

        value

    ){

        return (

            typeof value ===

            "object"

            &&

            value !== null

        );

    },

    validate(

        data,

        rules

    ){

        const errors = [];

        Object.keys(rules)

        .forEach(

            field =>{

                const validators =

                rules[field];

                validators.forEach(

                    validator =>{

                        if(

                            !validator(

                                data[field]

                            )

                        ){

                            errors.push(

                                field

                            );

                        }

                    }

                );

            }

        );

        return {

            valid:

            errors.length === 0,

            errors

        };

    }

};

export default ValidationManager;
