/*

Family Wealth AI OS

Export Manager

*/

const ExportManager = {

    json(

        data

    ){

        return JSON.stringify(

            data,

            null,

            2

        );

    },

    csv(

        data

    ){

        if(

            !Array.isArray(data)

            ||

            data.length === 0

        ){

            return "";

        }

        const headers =

        Object.keys(

            data[0]

        );

        const rows =

        data.map(

            item =>

            headers.map(

                key =>

                item[key]

            )

            .join(",")

        );

        return [

            headers.join(","),

            ...rows

        ]

        .join("\n");

    },

    downloadName(

        name,

        ext="json"

    ){

        return (

            name

            +

            "_"

            +

            Date.now()

            +

            "."

            +

            ext

        );

    }

};

export default ExportManager;
