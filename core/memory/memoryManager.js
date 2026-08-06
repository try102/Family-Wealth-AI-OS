/*

Family Wealth AI OS

AI Memory Manager

*/

const MemoryManager = {

    memories:[],

    save(

        type,

        content

    ){

        const memory = {

            id:

            Date.now(),

            type,

            content,

            createdAt:

            new Date()

            .toISOString()

        };

        this.memories.push(

            memory

        );

        return memory;

    },

    all(){

        return this.memories;

    },

    findByType(

        type

    ){

        return this.memories

        .filter(

            item =>

            item.type === type

        );

    },

    remove(

        id

    ){

        this.memories =

        this.memories.filter(

            item =>

            item.id !== id

        );

    },

    clear(){

        this.memories=[];

    }

};

export default MemoryManager;
