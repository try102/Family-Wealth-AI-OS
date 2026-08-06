/*

Family Wealth AI OS

Role Manager

*/

const roles = {

    OWNER: "OWNER",

    FAMILY_MEMBER: "FAMILY_MEMBER",

    ADVISOR: "ADVISOR",

    CPA: "CPA",

    VIEWER: "VIEWER"

};

const RoleManager = {

    getRoles(){

        return roles;

    },

    hasRole(

        role

    ){

        return Object.values(

            roles

        ).includes(role);

    }

};

export default RoleManager;
