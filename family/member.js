/*

Family Wealth AI OS V7.1

Family Member

*/

class Member {

    constructor({

        id,

        name,

        role = "OWNER",

        relationship = "SELF",

        birthday = null

    }){

        this.id = id;

        this.name = name;

        this.role = role;

        this.relationship = relationship;

        this.birthday = birthday;

    }

}

export default Member;
