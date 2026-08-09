/*

    

Family Wealth AI OS V7

Storage Manager

持久化存储层

*/

const Storage = {

    data: {},

    // ==================================================

    // Initialize

    // ==================================================

    init(){

        try{

            const raw =

                localStorage.getItem(

                    "family_wealth_ai_os_v7_storage"

                );

            if(raw){

                const parsed =

                    JSON.parse(

                        raw

                    );

                if(

                    parsed &&

                    typeof parsed === "object"

                ){

                    this.data =

                        parsed;

                }

            }

        }

        catch(error){

            console.error(

                "Storage initialization failed:",

                error

            );

            this.data = {};

        }

        return this.data;

    },

    // ==================================================

    // Set

    // ==================================================

    set(

        key,

        value

    ){

        this.data[key] = value;

        this.persist();

        return value;

    },

    // ==================================================

    // Get

    // ==================================================

    get(

        key

    ){

        return (

            this.data[key]

            ??

            null

        );

    },

    // ==================================================

    // Remove

    // ==================================================

    remove(

        key

    ){

        delete this.data[key];

        this.persist();

    },

    // ==================================================

    // Has

    // ==================================================

    has(

        key

    ){

        return (

            key in this.data

        );

    },

    // ==================================================

    // Clear

    // ==================================================

    clear(){

        this.data = {};

        this.persist();

    },

    // ==================================================

    // All

    // ==================================================

    all(){

        return this.data;

    },

    // ==================================================

    // Persist

    // ==================================================

    persist(){

        try{

            localStorage.setItem(

                "family_wealth_ai_os_v7_storage",

                JSON.stringify(

                    this.data

                )

            );

        }

        catch(error){

            console.error(

                "Storage persist failed:",

                error

            );

        }

    }

};

// ==================================================

// Initialize Storage

// ==================================================

Storage.init();

export default Storage;
