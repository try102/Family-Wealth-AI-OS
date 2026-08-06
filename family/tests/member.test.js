/*

Family Wealth AI OS V7.1

Member Test

*/

import Member from "../member.js";

const member = new Member({

    id:1,

    name:"Owner",

    role:"OWNER",

    relationship:"SELF",

    birthday:"1968-01-01"

});

if(

    member.id !== 1

){

    throw new Error(

        "Member id failed"

    );

}

if(

    member.name !== "Owner"

){

    throw new Error(

        "Member name failed"

    );

}

if(

    member.role !== "OWNER"

){

    throw new Error(

        "Member role failed"

    );

}

if(

    member.relationship !== "SELF"

){

    throw new Error(

        "Member relationship failed"

    );

}

if(

    member.birthday !== "1968-01-01"

){

    throw new Error(

        "Member birthday failed"

    );

}

console.log(

    "Member Test Passed"

);
