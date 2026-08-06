/*

Family Wealth AI OS

Permission Manager

*/

const PermissionManager = {

    roles:{

        owner:[

            "ALL"

        ],

        advisor:[

            "VIEW_WEALTH",

            "VIEW_INVESTMENT",

            "VIEW_REPORT"

        ],

        member:[

            "VIEW_WEALTH"

        ]

    },

    check(

        role,

        permission

    ){

        const permissions =

        this.roles[role]

        ||

        [];

        return (

            permissions.includes(

                "ALL"

            )

            ||

            permissions.includes(

                permission

            )

        );

    },

    getPermissions(

        role

    ){

        return (

            this.roles[role]

            ||

            []

        );

    },

    addRole(

        role,

        permissions

    ){

        this.roles[role] =

        permissions;

    }

};

export default PermissionManager;
