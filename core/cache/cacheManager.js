/*

Family Wealth AI OS

Cache Manager

*/

const CacheManager = {

    cache:{},

    set(

        key,

        value,

        expire=null

    ){

        this.cache[key] = {

            value,

            expire:

            expire

            ?

            Date.now()

            +

            expire

            :

            null

        };

        return value;

    },

    get(

        key

    ){

        const item =

        this.cache[key];

        if(!item){

            return null;

        }

        if(

            item.expire

            &&

            Date.now()

            >

            item.expire

        ){

            delete this.cache[key];

            return null;

        }

        return item.value;

    },

    has(

        key

    ){

        return this.get(key)

        !== null;

    },

    remove(

        key

    ){

        delete this.cache[key];

    },

    clear(){

        this.cache = {};

    }

};

export default CacheManager;
