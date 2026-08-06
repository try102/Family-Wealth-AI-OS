/*

Family Wealth AI OS

Import Manager

*/

const ImportManager = {

    json(

        text

    ){

        try{

            return JSON.parse(

                text

            );

        }

        catch(error){

            return null;

        }

    },

    csv(

        text

    ){

        if(

            !text

        ){

            return [];

        }

        const lines =

        text

        .split("\n")

        .filter(

            line =>

            line.trim()

        );

        if(

            lines.length < 2

        ){

            return [];

        }

        const headers =

        lines[0]

        .split(",");

        return lines

        .slice(1)

        .map(

            line =>{

                const values =

                line.split(",");

                const obj = {};

                headers.forEach(

                    (header,index)=>{

                        obj[header]

                        =

                        values[index];

                    }

                );

                return obj;

            }

        );

    },

    validate(

        data

    ){

        return (

            data !== null

            &&

            typeof data ===

            "object"

        );

    }

};

export default ImportManager;
