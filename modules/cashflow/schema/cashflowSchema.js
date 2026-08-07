/*

Family Wealth AI OS V7

Cashflow Schema

家庭现金流数据模型

*/

const cashflowSchema = {

    name:

    "Cashflow Schema V7",

    version:

    "7.0",

    fields:{

        id:{

            type:

            "number",

            required:

            true

        },

        type:{

            type:

            "string",

            required:

            true,

            values:[

                "INCOME",

                "EXPENSE"

            ]

        },

        category:{

            type:

            "string",

            required:

            false

        },

        amount:{

            type:

            "number",

            required:

            true

        },

        account:{

            type:

            "string",

            required:

            false

        },

        owner:{

            type:

            "string",

            required:

            false

        },

        period:{

            type:

            "string",

            required:

            false

        },

        note:{

            type:

            "string",

            required:

            false

        },

        createdAt:{

            type:

            "date",

            required:

            true

        }

    }

};

export default cashflowSchema;
