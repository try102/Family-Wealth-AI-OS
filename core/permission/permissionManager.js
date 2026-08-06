/*

Family Wealth AI OS

Permission Manager

*/

const PermissionManager = {

    roles:{},

    createRole(

        role,

        permissions

    ){

        this.roles[role] =

        permissions;

        return permissions;

    },

    check(

        role,

        permission

    ){

        const permissions =

        this.roles[role]

        ||

        [];

        return permissions.includes(

            permission

        );

    },

    addPermission(

        role,

        permission

    ){

        if(

            !this.roles[role]

        ){

            this.roles[role] = [];

        }

        this.roles[role]

        .push(

            permission

        );

    },

    removePermission(

        role,

        permission

    ){

        if(

            !this.roles[role]

        ){

            return;

        }

        this.roles[role] =

        this.roles[role]

        .filter(

            item =>

            item !== permission

        );

    },

    list(){

        return this.roles;

    },

    clear(){

        this.roles={};

    }

};

export default PermissionManager;
