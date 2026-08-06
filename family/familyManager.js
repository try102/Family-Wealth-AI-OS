/*

Family Wealth AI OS V7.1

Family Manager

*/

import Member from "./member.js";

const FamilyManager = {

    members: [],

    add(member){

        if(!(member instanceof Member)){

            throw new Error(

                "Invalid family member"

            );

        }

        this.members.push(member);

        return member;

    },

    list(){

        return this.members;

    },

    get(id){

        return this.members.find(

            member => member.id === id

        );

    },

    remove(id){

        this.members = this.members.filter(

            member => member.id !== id

        );

    },

    clear(){

        this.members=[];

    }

};

export default FamilyManager;
