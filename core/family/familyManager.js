/*

Family Wealth AI OS

Family Manager

*/

import DataService from "../database/dataService.js";

const FAMILY_KEY =

"family_profile";

const FamilyManager = {

    create(family){

        DataService.save(

            FAMILY_KEY,

            family

        );

        return family;

    },

    get(){

        return DataService.load(

            FAMILY_KEY

        );

    },

    update(family){

        DataService.save(

            FAMILY_KEY,

            family

        );

        return family;

    },

    remove(){

        DataService.remove(

            FAMILY_KEY

        );

    }

};

export default FamilyManager;
