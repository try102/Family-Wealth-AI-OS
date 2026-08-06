/*

Family Wealth AI OS

Permission Service

*/

const permissions = {

    OWNER:[

        "READ",

        "WRITE",

        "DELETE"

    ],

    FAMILY_MEMBER:[

        "READ",

        "WRITE"

    ],

    ADVISOR:[

        "READ"

    ],

    CPA:[

        "READ",

        "TAX"

    ],

    VIEWER:[

        "READ"

    ]

};

const PermissionService = {

    getPermissions(

        role

    ){

        return (

            permissions[role]

            || []

        );

    },

    can(

        role,

        action

    ){

        return this

        .getPermissions(role)

        .includes(action);

    }

};

export default PermissionService;
