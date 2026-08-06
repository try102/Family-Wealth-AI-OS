/*

Family Wealth AI OS

Person Manager

*/

import DataService from "../database/dataService.js";

const PERSON_KEY =

"family_persons";

const PersonManager = {

    add(person){

        let persons =

        DataService.load(

            PERSON_KEY

        ) || [];

        persons.push(

            person

        );

        DataService.save(

            PERSON_KEY,

            persons

        );

        return person;

    },

    list(){

        return (

            DataService.load(

                PERSON_KEY

            )

            || []

        );

    },

    remove(id){

        let persons =

        this.list();

        persons =

        persons.filter(

            p=>p.id!==id

        );

        DataService.save(

            PERSON_KEY,

            persons

        );

    }

};

export default PersonManager;
