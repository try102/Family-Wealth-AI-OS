/*

Family Wealth AI OS

Search Manager

*/

const SearchManager = {

    sources:{},

    register(

        name,

        dataProvider

    ){

        this.sources[name] =

        dataProvider;

    },

    search(

        keyword

    ){

        const results = [];

        Object.keys(

            this.sources

        )

        .forEach(

            source =>{

                const data =

                this.sources[source]();

                if(

                    !Array.isArray(data)

                ){

                    return;

                }

                data.forEach(

                    item =>{

                        const text =

                        JSON.stringify(

                            item

                        )

                        .toLowerCase();

                        if(

                            text.includes(

                                keyword

                                .toLowerCase()

                            )

                        ){

                            results.push({

                                source,

                                item

                            });

                        }

                    }

                );

            }

        );

        return results;

    },

    listSources(){

        return Object.keys(

            this.sources

        );

    },

    clear(){

        this.sources = {};

    }

};

export default SearchManager;
