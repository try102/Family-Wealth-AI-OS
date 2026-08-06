/*

Family Wealth AI OS

Backup Manager

*/

const BackupManager = {

    backups:[],

    create(

        data

    ){

        const backup = {

            id:

            Date.now(),

            createdAt:

            new Date()

            .toISOString(),

            data

        };

        this.backups.push(

            backup

        );

        return backup;

    },

    list(){

        return this.backups;

    },

    restore(

        id

    ){

        return this.backups.find(

            backup =>

            backup.id === id

        );

    },

    remove(

        id

    ){

        this.backups =

        this.backups.filter(

            backup =>

            backup.id !== id

        );

    },

    clear(){

        this.backups = [];

    }

};

export default BackupManager;
