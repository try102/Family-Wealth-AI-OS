/*

Family Wealth AI OS V7

Authentication Manager

*/

const Auth = {

    users:[],

    register(

        user

    ){

        this.users.push(

            user

        );

        return user;

    },

    login(

        username,

        password

    ){

        const user =

        this.users.find(

            item =>

            item.username === username &&

            item.password === password

        );

        if(

            user

        ){

            return {

                success:true,

                user

            };

        }

        return {

            success:false

        };

    },

    clear(){

        this.users=[];

    }

};

export default Auth;
