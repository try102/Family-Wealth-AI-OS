/*

Family Wealth AI OS

Storage Adapter

*/

const StorageAdapter = {

    save(

        key,

        data

    ){

        localStorage.setItem(

            key,

            JSON.stringify(data)

        );

        return true;

    },

    load(

        key

    ){

        const data =

        localStorage.getItem(

            key

        );

        if(!data){

            return null;

        }

        return JSON.parse(

            data

        );

    },

    remove(

        key

    ){

        localStorage.removeItem(

            key

        );

        return true;

    },

    clear(){

        localStorage.clear();

        return true;

    }

};

export default StorageAdapter;
