/*

Family Wealth AI OS

Queue Manager

*/

const QueueManager = {

    queue:[],

    add(

        task

    ){

        this.queue.push(

            task

        );

        return task;

    },

    next(){

        return this.queue.shift();

    },

    list(){

        return this.queue;

    },

    size(){

        return this.queue.length;

    },

    clear(){

        this.queue=[];

    },

    remove(

        index

    ){

        if(

            index >=0

            &&

            index < this.queue.length

        ){

            return this.queue.splice(

                index,

                1

            )[0];

        }

        return null;

    }

};

export default QueueManager;
