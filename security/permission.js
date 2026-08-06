/*

Family Wealth AI OS V7

Permission Manager

*/

const Permission = {

    roles:{

        OWNER:[

            "*"

        ],

        ADMIN:[

            "*"

        ],

        ADVISOR:[

            "VIEW_WEALTH",

            "VIEW_REPORT",

            "ANALYZE"

        ],

        MEMBER:[

            "VIEW_WEALTH"

        ],

        VIEWER:[

            "VIEW_REPORT"

        ]

    },

    check(

        role,

        action

    ){

        const permissions =

        this.roles[role];

        if(

            !permissions

        ){

            return false;

        }

        if(

            permissions.includes(

                "*"

            )

        ){

            return true;

        }

        return permissions.includes(

            action

        );

    },

    list(

        role

    ){

        return (

            this.roles[role]

            ||

            []

        );

    }

};

export default Permission;
